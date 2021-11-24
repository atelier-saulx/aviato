import React, { useState } from 'react'
import { useColor, useTheme } from '@based/ui'
import categories from './categories'
import { Overlay, UploadIndicator, Input, Preloader } from '@based/ui'
import { useLanguage } from '@based/ui'
import Actions from './Actions'

const Category = ({ category }) => {
  const Render = category.Render
  return (
    <div>
      <Render category={category} />
    </div>
  )
}

const App = () => {
  const themeid = useTheme('light')
  const lang = useLanguage()

  let q = window.location.search
  let qComponent
  let qCategory

  if (q) {
    q = q.slice(1)
    const params = q.split('&')
    params.forEach((p) => {
      const [field, value] = p.split('=')
      if (field === 'component') {
        qComponent = value
      } else if (field === 'category') {
        qCategory = value
      }
    })
  }

  const [categoryFilter, setCategoryFilter] = useState(qCategory)
  const [filter, setFilter] = useState(qComponent)

  const [loaded, setLoaded] = useState(false)

  if (!loaded) {
    setTimeout(() => {
      setLoaded(true)
    }, 200)
  }

  return (
    <Preloader refs={[lang, themeid]} loading={!loaded}>
      <UploadIndicator service="fake">
        <div
          style={{
            padding: '15px',
            marginBottom: '15px',
          }}
        >
          <Actions />
          {categories
            .filter((c) => {
              if (categoryFilter) {
                return c.name
                  .toLowerCase()
                  .includes(categoryFilter.toLowerCase())
              } else {
                return true
              }
            })
            .map((c) => {
              if (filter) {
                const rc = {
                  ...c,
                  components: c.components.filter((v) => {
                    return v.name.toLowerCase().includes(filter.toLowerCase())
                  }),
                }
                if (rc.components.length === 0) {
                  return null
                }
                return <Category key={rc.name} category={rc} />
              }
              return <Category key={c.name} category={c} />
            })}
        </div>
        <Overlay />
      </UploadIndicator>
    </Preloader>
  )
}

export default () => {
  return <App />
}
