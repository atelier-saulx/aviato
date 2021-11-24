import React, { useEffect, useRef, useState } from 'React'
import {
  Button,
  FileUpload,
  Loader,
  ProgressIndicator,
  SideMenu,
  EmbeddedMap,
} from '@based/ui'
import RenderComponents from '../../RenderComponents'

import { cities } from './eu-cities'

export const createMapTestData = (
  data: GeoJSON.FeatureCollection<GeoJSON.Geometry> = {
    type: 'FeatureCollection',
    features: [],
  }
): GeoJSON.FeatureCollection<GeoJSON.Geometry> => {
  if (Array.isArray(data.features)) {
    for (let i = 0; i < 10; i++) {
      const city = cities[Math.floor(Math.random() * cities.length)]
      const existingFeature = data.features.find(
        (f) => f.properties.name === city.name
      )
      const value = Math.ceil(Math.random() * 25)
      if (existingFeature) {
        existingFeature.properties.value += value
      } else {
        data.features.push({
          id: data.features.length + 1,
          type: 'Feature',
          properties: {
            value,
            name: city.name,
          },
          geometry: {
            type: 'Point',
            coordinates: [Number(city.longitude), Number(city.latitude), 0.0],
          },
        })
      }
    }
    return data
  }
}

export default {
  name: 'misc',
  Render: RenderComponents,
  components: [
    {
      name: 'Loader',
      category: 'misc',
      Component: Loader,
      props: [{ fadeIn: true }],
    },
    {
      name: 'ProgressIndicator',
      category: 'misc',
      Component: ProgressIndicator,
      props: [{ value: 40 }],
    },
    {
      name: 'SideMenu',
      category: 'sidemenu',
      Component: SideMenu,
      props: [
        {
          items: [
            {
              title: 'Shows',
              icon: 'Shows',
              active: true,
            },
            {
              title: 'Dashboard',
              icon: 'Dashboard',
            },
            {
              title: 'Settings',
              icon: 'Settings',
            },
            {
              title: 'SubItems',
              items: [
                {
                  title: 'Subitem 1',
                  icon: 'Custom',
                },
                {
                  title: 'Subitem 2',
                  icon: 'Custom',
                },
                {
                  title:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed ultrices est. Mauris tortor metus, fringilla eget turpis in, suscipit facilisis ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin blandit id risus sed pharetra. Vestibulum ante velit, posuere eget auctor nec, scelerisque ut tortor. Duis rhoncus mauris tincidunt magna mattis pretium. Etiam sit amet ipsum quis justo condimentum vulputate ac sed eros. Vivamus pretium finibus leo ac suscipit. Cras sit amet tortor in augue ultrices fringilla non at metus. Nullam mattis eleifend nisi quis aliquam. Vestibulum a euismod nibh. Sed vitae ligula nulla.disable',
                  icon: 'Custom',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'FileUpload',
      category: 'misc',
      Component: FileUpload,
      props: [
        {
          value: 'This is value',
          fake: true,
        },
        {
          value: 'This is also a value',
          fake: true,
        },
      ],
    },
    {
      name: 'Map',
      category: 'misc',
      props: [
        () => {
          const [mapData, setMapData] = useState(createMapTestData())
          const mapRef = useRef<any>()

          useEffect(() => {
            const timer = setInterval(() => {
              setMapData({ ...createMapTestData(mapData) })
            }, 3000)

            return () => {
              clearInterval(timer)
            }
          }, [mapData])
          return (
            <div>
              <EmbeddedMap ref={mapRef} data={mapData} />
              <Button
                color={{ color: 'background', tone: 1 }}
                onClick={() => {
                  mapRef.current.fitToData()
                }}
              >
                Fit data
              </Button>
            </div>
          )
        },
      ],
    },
  ],
}
