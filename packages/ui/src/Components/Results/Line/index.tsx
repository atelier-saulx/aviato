import React, { FunctionComponent, createContext } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import Graph from './Graph'
import StackedGraph from './StackedGraph'
import { TextValue, TextFormat } from '../../../textParser'

// console.log(datax)

type Data = { x: number; y: number }[]

type Ctx = { hover?: (key: string) => void }

const defCtx: Ctx = {
  hover: (a) => {},
}

export const GraphContext = createContext(defCtx)

GraphContext.displayName = 'GraphContext'

export type LineGraphProps = {
  data: { [key: string]: Data } | Data
  legend?: { [key: string]: TextValue }
  format?: 'date' | 'number' | 'date-time-human'
  valueFormat?: TextFormat
  spread?: boolean
  pure?: boolean
  label?: TextValue
}

// multi line

const LineGraph: FunctionComponent<LineGraphProps> = ({
  data,
  label,
  spread = true,
  format = 'number',
  valueFormat = 'number-short',
  legend,
  pure,
}) => {
  const isStacked = data && typeof data === 'object' && !Array.isArray(data)

  return (
    <AutoSizer>
      {({ height, width }) => {
        return isStacked ? (
          <GraphContext.Provider value={{}}>
            <StackedGraph
              format={format}
              spread={spread}
              label={label}
              legend={legend}
              data={data}
              height={height}
              width={width}
              valueFormat={valueFormat}
            />
          </GraphContext.Provider>
        ) : (
          <Graph
            format={format}
            spread={spread}
            label={label}
            data={data}
            height={height}
            width={width}
            valueFormat={valueFormat}
            pure={pure}
          />
        )
      }}
    </AutoSizer>
  )
}

export { LineGraph }
