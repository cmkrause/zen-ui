import { describe, it, expect, vi } from 'vitest'
import {
  aggregateStatistics,
  fetchStatistics,
  isStatisticsCacheFresh,
  shouldFetchStatistics,
  STATISTICS_CACHE_TTL_MS,
  type StatisticsValue,
} from './statistics'
import { toLocalDateString } from '../shared/date'
import type { Hass } from './types'

function makeHass(callWS = vi.fn()): Hass {
  return {
    states: {},
    callApi: vi.fn(),
    callWS,
  }
}

describe('fetchStatistics', () => {
  it('requests only the configured statistic type', async () => {
    const callWS = vi.fn().mockResolvedValue({ 'sensor.test': [] })
    const hass = makeHass(callWS)
    const startDate = new Date('2026-01-01T00:00:00Z')
    const endDate = new Date('2026-01-31T00:00:00Z')

    await fetchStatistics(hass, {
      entityId: 'sensor.test',
      startDate,
      endDate,
      period: 'day',
      statisticsType: 'max',
    })

    expect(callWS).toHaveBeenCalledWith({
      type: 'recorder/statistics_during_period',
      start_time: startDate.toISOString(),
      end_time: endDate.toISOString(),
      statistic_ids: ['sensor.test'],
      period: 'day',
      types: ['max'],
    })
  })

  it('omits the types filter when no statistic type is provided', async () => {
    const callWS = vi.fn().mockResolvedValue({ 'sensor.test': [] })
    const hass = makeHass(callWS)
    const startDate = new Date('2026-01-01T00:00:00Z')
    const endDate = new Date('2026-01-31T00:00:00Z')

    await fetchStatistics(hass, {
      entityId: 'sensor.test',
      startDate,
      endDate,
    })

    expect(callWS).toHaveBeenCalledWith({
      type: 'recorder/statistics_during_period',
      start_time: startDate.toISOString(),
      end_time: endDate.toISOString(),
      statistic_ids: ['sensor.test'],
      period: 'day',
    })
  })
})

describe('statistics fetch caching', () => {
  const now = new Date(2026, 9, 9, 12, 0, 0)
  const today = '2026-10-09'

  it('treats a recent same-day fetch as fresh', () => {
    expect(
      isStatisticsCacheFresh(now.getTime() - 30 * 60 * 1000, today, now),
    ).toBe(true)
  })

  it('expires the cache after one hour', () => {
    expect(
      isStatisticsCacheFresh(
        now.getTime() - STATISTICS_CACHE_TTL_MS,
        today,
        now,
      ),
    ).toBe(false)
  })

  it('expires the cache when the local calendar day changes', () => {
    expect(
      isStatisticsCacheFresh(now.getTime() - 5 * 60 * 1000, '2026-10-08', now),
    ).toBe(false)
  })

  it('skips recorder statistics when valid attribute data exists', () => {
    expect(
      shouldFetchStatistics({
        hasAttributeData: true,
        fetchKey: 'sensor.test|rolling|1|364|',
        now,
      }),
    ).toBe(false)
  })

  it('fetches immediately when the request key changes', () => {
    expect(
      shouldFetchStatistics({
        hasAttributeData: false,
        fetchKey: 'sensor.test|rolling|1|30|',
        lastFetchKey: 'sensor.test|rolling|1|364|',
        lastFetchAt: now.getTime(),
        lastFetchDay: today,
        now,
      }),
    ).toBe(true)
  })

  it('reuses a recent same-day request with an unchanged key', () => {
    const key = 'sensor.test|rolling|1|364|'

    expect(
      shouldFetchStatistics({
        hasAttributeData: false,
        fetchKey: key,
        lastFetchKey: key,
        lastFetchAt: now.getTime() - 30 * 60 * 1000,
        lastFetchDay: today,
        now,
      }),
    ).toBe(false)
  })
})

describe('aggregateStatistics', () => {
  it('returns empty array for empty input', () => {
    expect(aggregateStatistics([])).toEqual([])
  })

  it('returns empty array for null input', () => {
    expect(aggregateStatistics(null as unknown as StatisticsValue[])).toEqual(
      [],
    )
  })

  it('handles Unix timestamp in milliseconds for start field', () => {
    const stats: StatisticsValue[] = [
      {
        statistic_id: 'sensor.test',
        start: 1737982800000,
        end: 1738069200000,
        mean: null,
        min: null,
        max: null,
        sum: 100,
        state: 500,
        change: 50,
        last_reset: null,
      },
    ]

    const result = aggregateStatistics(stats, 'change')

    expect(result).toHaveLength(1)
    expect(result[0].date).toBe(toLocalDateString(1737982800000)!)
    expect(result[0].count).toBe(50)
  })

  it('handles ISO string for start field', () => {
    const stats: StatisticsValue[] = [
      {
        statistic_id: 'sensor.test',
        start: '2025-01-27T11:00:00.000Z',
        end: '2025-01-28T11:00:00.000Z',
        mean: 25,
        min: 10,
        max: 40,
        sum: null,
        state: null,
        change: null,
        last_reset: null,
      },
    ]

    const result = aggregateStatistics(stats, 'max')

    expect(result).toHaveLength(1)
    expect(result[0].date).toBe(
      toLocalDateString('2025-01-27T11:00:00.000Z')!,
    )
    expect(result[0].count).toBe(40)
  })

  it('uses max by default for measurement sensors', () => {
    const stats: StatisticsValue[] = [
      {
        statistic_id: 'sensor.temperature',
        start: 1737982800000,
        end: 1738069200000,
        mean: 22,
        min: 18,
        max: 26,
        sum: null,
        state: null,
        change: null,
        last_reset: null,
      },
    ]

    const result = aggregateStatistics(stats, 'max')

    expect(result[0].count).toBe(26)
  })

  it('uses change for total_increasing sensors', () => {
    const stats: StatisticsValue[] = [
      {
        statistic_id: 'sensor.energy',
        start: 1737982800000,
        end: 1738069200000,
        mean: null,
        min: null,
        max: null,
        sum: 1000,
        state: 5000,
        change: 150,
        last_reset: null,
      },
    ]

    const result = aggregateStatistics(stats, 'change')

    expect(result[0].count).toBe(150)
  })

  it('skips entries with null values for requested type', () => {
    const stats: StatisticsValue[] = [
      {
        statistic_id: 'sensor.test',
        start: 1737982800000,
        end: 1738069200000,
        mean: null,
        min: null,
        max: null,
        sum: 100,
        state: 500,
        change: 50,
        last_reset: null,
      },
    ]

    const result = aggregateStatistics(stats, 'max')

    expect(result).toHaveLength(0)
  })

  it('handles multiple days and sorts by date', () => {
    const stats: StatisticsValue[] = [
      {
        statistic_id: 'sensor.test',
        start: 1738069200000,
        end: 1738155600000,
        mean: null,
        min: null,
        max: null,
        sum: null,
        state: null,
        change: 30,
        last_reset: null,
      },
      {
        statistic_id: 'sensor.test',
        start: 1737982800000,
        end: 1738069200000,
        mean: null,
        min: null,
        max: null,
        sum: null,
        state: null,
        change: 50,
        last_reset: null,
      },
    ]

    const result = aggregateStatistics(stats, 'change')

    expect(result).toHaveLength(2)
    expect(result[0].date).toBe(toLocalDateString(1737982800000)!)
    expect(result[0].count).toBe(50)
    expect(result[1].date).toBe(toLocalDateString(1738069200000)!)
    expect(result[1].count).toBe(30)
  })
})
