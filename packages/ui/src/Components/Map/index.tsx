import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'
import './mapbox-gl.css'
import './popup.css'
import mapboxgl from 'mapbox-gl'
import {
  initMap,
  updateCircleRadius,
  addValues,
  addCountries,
  fitToData,
} from './mapActions'
import { useColor } from '../../theme'

mapboxgl.accessToken =
  'pk.eyJ1IjoibmZyYWRlIiwiYSI6ImNra3h0cDhtNjA0NWYyb21zcnBhN21ra28ifQ.m5mqJjuX7iK9Z8JvNNcnfg'

type EmbeddedMapProps = {
  data: GeoJSON.FeatureCollection<GeoJSON.Geometry>
}

export const EmbeddedMap = forwardRef(({ data }: EmbeddedMapProps, ref) => {
  const mapContainer = useRef(null)
  const map = useRef<mapboxgl.Map>(null)
  const hoverVoteId = useRef(null)

  useImperativeHandle(ref, () => ({
    fitToData: () => {
      if (!map.current) return
      fitToData({ data, map: map.current })
    },
  }))

  useEffect(() => {
    const m = initMap({
      mapContainer,
      onLoad: () => {
        addValues({ data, map: m, hoverVoteId })
        addCountries({ map: m })
        updateCircleRadius({ data, map: m })
        map.current = m
      },
      onZoom: () => {
        updateCircleRadius({ data, map: m })
      },
    })
    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
  }, [])

  useEffect(() => {
    if (map.current) {
      updateCircleRadius({ data, map: map.current })
      ;(map.current.getSource('values') as mapboxgl.GeoJSONSource).setData(data)
    }
  }, [map, data])

  return (
    <div
      ref={mapContainer}
      style={{
        border: '1px solid ' + useColor({ color: 'divider' }),
        borderRadius: 4,
        overflow: 'hidden',
        width: '100%',
        height: 'calc(100vh /2)',
      }}
    />
  )
})
