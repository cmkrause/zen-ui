/**
 * Data Sources - Statistics API
 *
 * Fetches long-term statistics from Home Assistant's recorder.
 * Unlike history API (limited to purge_keep_days), statistics are stored indefinitely.
 * Only works for sensors with state_class attribute.
 */

import type { Hass, DataPoint } from './types'
import { formatLocalDate, toLocalDateString } from '../shared/date'

export type StatisticsPeriod = '5minute' | 'hour' | 'day' | 'week' | 'month'
export type StatisticsType = 'mean' | 'min' | 'max' | 'sum' | 'state' | 'change'

export const STATISTICS_CACHE_TTL_MS = 60 * 60 * 1000

export interface StatisticsValue {
  statistic_id: string
  start: string | number // ISO string or Unix timestamp (milliseconds)
  end: string | number
  mean: number | null
  min: number | null
  max: number | null
  sum: number | null
  state: number | null
  change: number | null
  last_reset: string | null
}

export interface FetchStatisticsOptions {
  entityId: string
  startDate: Date
  endDate: Date
  period?: StatisticsPeriod
  statisticsType?: StatisticsType
}

export interface StatisticsFetchDecisionOptions {
  hasAttributeData: boolean
  fetchKey: string
  lastFetchKey?: string
  lastFetchAt?: number
  lastFetchDay?: string
  now?: Date
}

/**
 * Returns true when a cached statistics response can still be reused.
 * Cache entries expire after one hour and are never reused across local days.
 */
export function isStatisticsCacheFresh(
  lastFetchAt: number | undefined,
  lastFetchDay: string | undefined,
  now: Date = new Date(),
): boolean {
  if (lastFetchAt === undefined || lastFetchDay === undefined) return false

  const nowMs = now.getTime()
  if (!Number.isFinite(lastFetchAt) || nowMs < lastFetchAt) return false

  return (
    nowMs - lastFetchAt < STATISTICS_CACHE_TTL_MS &&
    lastFetchDay === formatLocalDate(now)
  )
}

/**
 * Determines whether the card should request recorder statistics.
 * Attribute data is preferred, and an unchanged statistics request is cached.
 */
export function shouldFetchStatistics({
  hasAttributeData,
  fetchKey,
  lastFetchKey,
  lastFetchAt,
  lastFetchDay,
  now = new Date(),
}: StatisticsFetchDecisionOptions): boolean {
  if (hasAttributeData) return false
  if (lastFetchKey !== fetchKey) return true

  return !isStatisticsCacheFresh(lastFetchAt, lastFetchDay, now)
}

/**
 * Fetches long-term statistics from Home Assistant via WebSocket
 */
export async function fetchStatistics(
  hass: Hass,
  options: FetchStatisticsOptions,
): Promise<StatisticsValue[]> {
  const {
    entityId,
    startDate,
    endDate,
    period = 'day',
    statisticsType,
  } = options

  const request: Record<string, unknown> = {
    type: 'recorder/statistics_during_period',
    start_time: startDate.toISOString(),
    end_time: endDate.toISOString(),
    statistic_ids: [entityId],
    period,
  }

  // Home Assistant supports filtering the returned statistic fields. Requesting
  // only what the card needs reduces recorder work and WebSocket payload size.
  if (statisticsType) {
    request.types = [statisticsType]
  }

  const result = await hass.callWS(request)

  const statistics = result as Record<string, StatisticsValue[]>

  if (!statistics || !statistics[entityId]) {
    return []
  }

  return statistics[entityId]
}

/**
 * Aggregates statistics into daily data points
 */
export function aggregateStatistics(
  statistics: StatisticsValue[],
  type: StatisticsType = 'max',
): DataPoint[] {
  if (!statistics || statistics.length === 0) return []

  const result: DataPoint[] = []

  for (const stat of statistics) {
    const value = stat[type]
    if (value === null || value === undefined) continue

    // Extract date from start - can be ISO string or Unix timestamp (milliseconds)
    const date = toLocalDateString(stat.start)
    if (!date) continue

    result.push({ date, count: value })
  }

  return result.sort((a, b) => a.date.localeCompare(b.date))
}
