import type { Nominal } from './nominal'

/**
 * Nominal primitives. See ./nominal.ts
 */

export type Milliseconds = Nominal<number, 'Milliseconds'>
export type Seconds = Nominal<number, 'Seconds'>
export type Minutes = Nominal<number, 'Minutes'>
export type Hours = Nominal<number, 'Hours'>
export type Month = Nominal<number, 'Month'>
export type Year = Nominal<number, 'Year'>

export type DateString = Nominal<string, 'DateString'>
export type UnixTimestamp = Nominal<number, 'UnixTimestamp'>
