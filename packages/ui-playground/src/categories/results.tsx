import React from 'react'
import RenderComponents from '../RenderComponents'
import { LineGraph, BarGraph, ResultCard, ResultList, Scatter } from '@based/ui'

const scatterData = []

for (let i = 100; i > -1; i--) {
  const y = {
    time: Date.now() - i * 1e3,
    points: [],
  }

  for (let j = 0; j < 20; j++) {
    const prev = scatterData[scatterData.length - 1]?.points[j] || {
      x: Math.random() * 1000,
      y: Math.random() * 1000,
    }

    y.points.push({
      label: j,
      x: prev.x + 2 * Math.random() * Math.cos(j) * 10,
      y: prev.y + 2 * Math.random() * Math.sin(j) * 10,
      color: { color: 'background' },
      info: {
        snurk: Math.random() * 100000,
        flap: Math.random() * 1000000,
      },
    })
  }

  scatterData.push(y)
}

const datax = { de: [], en: [], nl: [] }

for (let i = 0; i < 1000; i++) {
  const x = Date.now() - i * 1000000
  datax.de.push({
    y: i * i + Math.random() * i * 1e3,
    x,
  })
  datax.en.push({
    y: i * i + Math.random() * i * 1e3,
    x,
  })
  datax.nl.push({
    y: i * i + Math.random() * i * 1e3 * 0.1,
    x,
  })
}

const fraction = []
for (let i = 0; i < 200; i++) {
  fraction.push({
    x: i,
    y: Math.random(),
  })
}

const bytes = []
for (let i = 0; i < 200; i++) {
  bytes.push({
    x: i,
    y: Math.round(Math.random() * 2e9),
  })
}

const smallData = []
for (let i = 0; i < 50000; i++) {
  smallData.push({
    x: i,
    y: ~~(Math.random() * 10000000) + i * 100,
  })
}

const barData = [
  {
    label: 'Yes sure if you like ugly shit',
    value: 675,
  },
  {
    label: 'No sorry',
    value: 1000,
  },
  {
    label: 'What logo?',
    value: 146,
  },
]

const barDataStacked = [
  {
    label: 'Yes sure if you like ugly shit',
    value: { en: 675, de: 200, nl: 600 },
  },
  {
    label: 'No sorry',
    value: { en: 275, de: 2200, nl: 50 },
  },
  {
    label: 'What logo?',
    value: { en: 75, de: 201, nl: 30 },
  },
]

const drillDownData = []
for (let i = 0; i < 12; i++) {
  const d = []
  for (let i = 0; i < 10; i++) {
    d.push({
      title: 'Yesh nested ' + i,
      value: ~~(Math.random() * 1e6),
      items: [
        {
          title: 'more nested ' + i,
          value: 10,
        },
      ],
    })
  }
  drillDownData.push({
    title: 'Yesh ' + i,
    items: d,
    value: ~~(Math.random() * 1e6),
  })
}

export default {
  Render: ({ category }) => (
    <RenderComponents grid={false} category={category} />
  ),
  name: 'results',
  components: [
    {
      name: 'Scatter',
      Component: Scatter,
      category: 'results',
      props: [
        () => {
          return (
            <div
              style={{
                width: '100%',
                height: 700,
              }}
            >
              <Scatter
                header="Cheering scatter"
                yLabel="Mean cheer conversion"
                xLabel="Mean clapping performance per country"
                data={scatterData}
                info={{
                  snurk: { format: 'number-bytes', label: 'Snurk' },
                  flap: { format: 'number-dollar', label: 'Flap' },
                }}
              />
            </div>
          )
        },
      ],
    },
    {
      name: 'Result Card',
      Component: ResultCard,
      category: 'results',
      grid: true,
      props: [
        {
          label: 'Awnsers',
          value: 1e3,
        },
        {
          label: 'Xyz',
          value: 100,
        },
        {
          label: 'Cpu',
          value: '20%',
        },
        {
          label: 'Xwnsers',
          value: 10.241214,
        },
        {
          label: 'Ratio',
          value: {
            value: 0.0242221112341231,
            format: 'number-ratio',
          },
        },
        {
          label: 'Ratio',
          value: {
            value: 0.2312133123312,
            format: 'number-ratio',
          },
        },
        {
          label: 'Giga Bytes',
          value: {
            value: 1100000000,
            format: 'number-bytes',
          },
        },
        {
          label: 'Mega Bytes',
          value: {
            value: 110000000,
            format: 'number-bytes',
          },
        },
        {
          label: '1 Mega Byte',
          value: {
            value: 1100000,
            format: 'number-bytes',
          },
        },
        {
          label: 'Kilo Bytes',
          value: {
            value: 110000,
            format: 'number-bytes',
          },
        },
        {
          label: 'Bytes',
          value: {
            value: 110,
            format: 'number-bytes',
          },
        },
        {
          label: 'Euros',
          value: {
            value: 110.1221,
            format: 'number-euro',
          },
        },
        {
          label: 'Dollars',
          value: {
            value: 110.1221,
            format: 'number-dollar',
          },
        },
        {
          label: 'Pounds',
          value: {
            value: 110.1221,
            format: 'number-pound',
          },
        },
        {
          label: 'Euros',
          value: {
            value: 1121.1221,
            format: 'number-euro',
          },
        },
        {
          label: 'Dollars',
          value: {
            value: 11231210.1221,
            format: 'number-dollar',
          },
        },
      ],
    },
    {
      name: 'Line graph',
      Component: LineGraph,
      category: 'results',
      props: [
        () => {
          return (
            <div
              style={{
                width: '100%',
                height: 150,
              }}
            >
              <LineGraph valueFormat="number-ratio" data={fraction} />
            </div>
          )
        },
        () => {
          return (
            <div
              style={{
                width: '100%',
                height: 400,
              }}
            >
              <LineGraph valueFormat="number-bytes" data={bytes} />
            </div>
          )
        },
        () => {
          return (
            <div
              style={{
                width: '100%',
                height: 200,
              }}
            >
              <LineGraph data={fraction} />
            </div>
          )
        },
        () => {
          return (
            <div
              style={{
                width: '100%',
                height: 400,
              }}
            >
              <LineGraph
                legend={{
                  nl: 'Netherlands',
                  de: 'Germany',
                  en: 'Uk',
                }}
                data={{
                  en: [
                    { x: 10, y: 10 },
                    { x: 20, y: 30 },
                    { x: 30, y: 40 },
                  ],
                  nl: [
                    { x: 10, y: 10 },
                    { x: 20, y: 30 },
                    { x: 30, y: 40 },
                  ],
                  de: [
                    {
                      x: 10,
                      y: 20,
                    },
                    { x: 20, y: 40 },
                    { x: 30, y: 43 },
                  ],
                }}
              />
            </div>
          )
        },
        () => {
          return (
            <div
              style={{
                width: '100%',
                height: 400,
              }}
            >
              <LineGraph data={[{ x: 10, y: 10 }]} />
            </div>
          )
        },
        () => {
          return (
            <div
              style={{
                width: '100%',
                height: 400,
              }}
            >
              <LineGraph data={datax} format="date" />
            </div>
          )
        },
        () => {
          return (
            <div
              style={{
                width: '100%',
                height: 400,
              }}
            >
              <LineGraph data={datax.en} format="date" spread />
            </div>
          )
        },
        () => {
          return (
            <div
              style={{
                width: '100%',
                height: 400,
              }}
            >
              <LineGraph data={datax} format="date-time-human" spread />
            </div>
          )
        },
        () => {
          return (
            <div
              style={{
                width: '100%',
                height: 400,
              }}
            >
              <LineGraph data={smallData} spread={false} />
            </div>
          )
        },
        () => {
          return (
            <div
              style={{
                width: '100%',
                height: 400,
              }}
            >
              <LineGraph
                label="Cool curve"
                data={[
                  { x: 0, y: 10 },
                  { x: 1, y: 10 },
                  { x: 2, y: 20 },
                  { x: 3, y: 30 },
                  { x: 4, y: 20 },
                  { x: 5, y: 25 },
                ]}
                spread={false}
              />
            </div>
          )
        },
      ],
    },
    {
      name: 'Result List',
      category: 'results',
      Component: ResultList,
      props: [
        () => {
          return (
            <div
              style={{
                height: 600,
              }}
            >
              <ResultList
                items={drillDownData}
                itemProps={{
                  id: ['id'],
                  title: { path: ['title'] },
                }}
                label="Locations"
                value="Responses"
              />
            </div>
          )
        },
      ],
    },

    {
      name: 'Bar graph',
      Component: BarGraph,
      category: 'results',
      props: [
        {
          label: 'Awnsers',
          value: 'Responses',
          data: barData,
        },
        () => {
          const props = {
            label: 'Awnsers',
            value: 'Responses',
            data: barDataStacked,
            legend: {
              en: 'Uk',
              de: 'Germany',
              nl: 'Netherlands',
            },
          }

          return (
            <div>
              <BarGraph {...props} />
            </div>
          )
        },
      ],
    },
  ],
}
