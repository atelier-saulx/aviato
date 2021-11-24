import React, { useState } from 'react'
import { Text, useDrag, useSelect, useMultipleEvents, useDrop } from '@based/ui'
import RenderComponents from '../RenderComponents'
import { useColor } from '@based/ui'

import jsonexport from 'jsonexport/dist'

import csvtojson from 'csvtojson'

const isBinary = (str) => /(image)|(video)|(bin)/.test(str)

function readFile(file) {
  return new Promise((r) => {
    // Check if the file is an image.
    const reader = new FileReader()

    if (file.type === 'application/gzip') {
      // extract and show!
      console.log('GZIP GO EXTRACT!')
    }

    reader.addEventListener('load', (event) => {
      console.log('DONE', event.target.result)

      console.log(file)
      //

      if (!isBinary(file.type)) {
        const parsed = atob(event.target.result.split('base64,')[1])
        if (file.type === 'text/csv') {
          csvtojson()
            .fromString(parsed)
            .then((v) => {
              r(v)
            })
        } else {
          r(parsed)
        }
      } else {
        r(event.target.result)
      }
    })
    reader.readAsDataURL(file)
  })
}

const Dragger = ({ data, index }) => {
  const [things, setThings] = useState()

  const [drop, isDragOver] = useDrop(async (transfer) => {
    const fileList = transfer.dataTransfer.files

    console.log(
      'x',
      JSON.parse(transfer.dataTransfer.getData('application/json'))
    )

    for (const file of fileList) {
      // Not supported in Safari for iOS.
      const name = file.name ? file.name : 'NOT SUPPORTED'
      // Not supported in Firefox for Android or Opera for Android.
      const type = file.type ? file.type : 'NOT SUPPORTED'
      // Unknown cross-browser support.
      const size = file.size ? file.size : 'NOT SUPPORTED'

      const x = await readFile(file)

      console.log(x)
    }
  })

  const [drag] = useDrag({ data, index }, undefined, {
    setDragData: async (data, e) => {
      // lets make some helpers

      // url (just adds the url in the download link e.g for file)

      // data (converts to base64)

      // filename

      // text - can be url or for example the data

      // data - changes application json

      // csv helper

      // multi select helper

      // Zip lib to create multiple files

      // if just data (to csv for exmample combine them)

      // can also pass selection (for all data in here)

      // also helper for drag csv in

      const x = btoa('hello')

      console.log('SET D TRANSFER')

      // if multiple

      // how to give access to file settings? - store a map with drag events make a id field on data

      // if multiple will make this a csv automaticly
      e.dataTransfer.setData('text/plain', 'yesh')

      e.dataTransfer.setData(
        'DownloadURL',
        'application/octet-stream:fileName.jpeg:data:image/jpeg;base64,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'
      )

      const gurk = []

      for (let i = 0; i < 100; i++) {
        gurk.push({
          label: i,
          snurk: true,
        })
      }

      const xx = btoa(await jsonexport(gurk))

      e.dataTransfer.setData(
        'DownloadURL',
        'application/octet-stream:fileName.csv:data:image/jpeg;base64,' + xx
      )
    },
  })
  const [select, isSelected] = useSelect({ data, index })
  return (
    <div
      {...useMultipleEvents(drag, select, drop)}
      style={{
        padding: 25,
        borderRadius: 4,
        marginBottom: 10,
        border:
          '1px solid ' +
          useColor({
            color: isSelected || isDragOver ? 'primary' : 'background',
            tone: 3,
          }),
      }}
    >
      <Text noSelect>Drag or drop?</Text>
    </div>
  )
}

export default {
  name: 'drag',
  Render: ({ category }) => <RenderComponents grid category={category} />,
  components: [
    {
      name: 'drag and selection',
      category: 'drag',
      props: [
        () => {
          const items = [
            { data: 1, title: 'flap' },
            { data: 1, title: 'flap' },
          ]

          return (
            <div>
              {items.map((data, i) => {
                return <Dragger key={i} index={i} data={data} />
              })}
            </div>
          )
        },
      ],
    },
  ],
}
