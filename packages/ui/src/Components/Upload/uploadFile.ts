import getService from '@based/get-service' // will be replaced at some point
import {
  CreateProgressContextProps,
  ProgressContextItem,
} from './ProgressContext'

// TODO: This should be moved to the actual uploadFileScript
export type UploadFileScript = (
  files: FileList,
  progressContext: CreateProgressContextProps,
  progressId: string,
  type?: 'file' | 'video',
  fake?: boolean
) => Promise<void>

export const uploadFile: UploadFileScript = async (
  files,
  progressContext,
  progressId,
  type = 'file',
  fake
) => {
  // console.log({
  //   files,
  //   progressContext,
  //   progressId,
  //   type,
  // })

  let url
  const body = new global.FormData()
  for (const file of files) {
    // maybe call it file.name?
    // this is wrong we want to do for large files
    // means we need to split the file
    // console.log(file)
    body.append('file', file)
  }

  if (files.length) {
    try {
      const xhr = new global.XMLHttpRequest()
      if (progressContext.items[progressId]) {
        if (progressContext.items[progressId].gettingRemoved) {
          clearTimeout(progressContext.items[progressId].gettingRemoved)
          delete progressContext.items[progressId].gettingRemoved
        }
        if (progressContext.items[progressId].xhr) {
          console.warn('Already uploading', progressId)
          progressContext.items[progressId].xhr.abort()
        }
      }

      const file = files[0]

      const item: ProgressContextItem = {
        xhr: fake ? null : xhr,
        size: file.size,
        id: progressId,
        name: file.name,
        mime: file.type,
        progress: 0,
        type,
      }

      progressContext.items[progressId] = item

      if (fake) {
        const item = progressContext.items[progressId]

        const fakeProgress = () => {
          item.progress = Math.min(
            (item.progress || 0) + Math.ceil(Math.random() * (10 - 4) + 4),
            100
          )
          if (item.progress >= 100) {
            item.url = 'http://fake.' + item.name
            clearInterval(fakeProgressInterval)
            item.isComplete = true
            if (
              Object.keys(progressContext.items).every(
                (key) => progressContext.items[key].isComplete
              )
            ) {
              progressContext.inProgress = false
            }
            delete progressContext.items[progressId].gettingRemoved
            delete progressContext.items[progressId]
            progressContext.listeners.forEach((update) =>
              update({ progressId, removed: true, progress: 100 })
            )
          }
          progressContext.listeners.forEach((update) => update({ ...item }))
        }

        const fakeProgressInterval = setInterval(fakeProgress, 500)
      } else {
        xhr.upload.onprogress = (p: ProgressEvent) => {
          const item = progressContext.items[progressId]

          item.progress =
            // @ts-ignore
            (100 * (p.loaded || p.position)) / (p.totalSize || p.total)
          progressContext.listeners.forEach((update) => update({ ...item }))
        }

        xhr.onerror = (p) => {
          console.error('error', p)
        }

        xhr.timeout = 1e3 * 60 * 60 * 24

        xhr.onabort = (p) => {
          console.error('abort', p)
        }

        xhr.ontimeout = (p) => {
          console.error('on timeout', p)
        }

        xhr.onload = () => {
          const item = progressContext.items[progressId]
          item.isComplete = true
          item.progress = 100

          // TODO: res needs type from service
          let res: any = {}
          try {
            res = JSON.parse(xhr.response)
          } catch (err) {
            console.error('something wrong with file upload', err)
          }

          const checkStatus = () => {
            item.statusXhr = new global.XMLHttpRequest()
            item.statusXhr.onload = () => {
              const status = JSON.parse(item.statusXhr.response)
              item.statusXhr.abort()
              delete item.statusXhr

              if (status.progress < 100 || status.transcoding === true) {
                item.isComplete = false
                item.transcoding = true
                item.progress = status.progress
                item.url = status.url
                progressContext.listeners.forEach((update) =>
                  update({ ...item })
                )
                setTimeout(checkStatus, 1e3)
              } else {
                item.url = status.url
                item.isComplete = true

                progressContext.listeners.forEach((update) =>
                  update({ ...item })
                )
                clearTimeout(item.gettingRemoved)
                xhr.abort()
                delete item.xhr
                item.gettingRemoved = setTimeout(() => {
                  progressContext.inProgress = false
                  if (Object.keys(progressContext.items).length === 1) {
                    item.gettingRemoved = setTimeout(() => {
                      delete progressContext.items[progressId].gettingRemoved
                      delete progressContext.items[progressId]
                      progressContext.listeners.forEach((update) =>
                        update({ progressId, removed: true, progress: 100 })
                      )
                    }, 1e3)
                    progressContext.listeners.forEach((update) =>
                      update({ progressId, removed: true, progress: 100 })
                    )
                  } else {
                    delete progressContext.items[progressId].gettingRemoved
                    delete progressContext.items[progressId]
                    progressContext.listeners.forEach((update) =>
                      update({ progressId, removed: true, progress: 100 })
                    )
                  }
                }, 1e3)
              }
            }
            item.statusXhr.open('GET', url + '/' + res.key)
            item.statusXhr.send()
          }
          checkStatus()
        }
      }

      item.size = (<File>body.get('file')).size

      if (!progressContext.inProgress) {
        progressContext.inProgress = true
      }
      progressContext.listeners.forEach((update) => update({ ...item }))

      if (progressContext.service) {
        console.error('Implement get service')
        url = (
          await getService({
            name: progressContext.service,
            org: 'saulx',
            project: 'based-core',
            env: 'shared-services',
          })
        ).url
      } else {
        url = progressContext.url
      }

      if (!fake) {
        xhr.open('POST', url)
        xhr.setRequestHeader('type', type)
        xhr.send(body)
      }
    } catch (err) {
      /* handle error */
      console.error('Something wrong with xhr upload', err)
    }
  } else {
    console.warn('No files passed to uploadFile')
  }
}
