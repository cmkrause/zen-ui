import { describe, expect, it } from 'vitest'
import { validateConfig, CONFIG_DEFAULTS } from './config'
import { getHeatmapSvgStyle } from './cards/heatmap/render'

const baseConfig = {
  entity: 'sensor.test',
  card: 'heatmap' as const,
}

describe('heatmap sizing config', () => {
  it('preserves current defaults when sizing options are omitted', () => {
    const config = validateConfig(baseConfig)

    expect(config.zoom).toBe(CONFIG_DEFAULTS.zoom)
    expect(config.cardPadding).toBeUndefined()
    expect(config.titleGap).toBeUndefined()
  })

  it('accepts valid zoom values', () => {
    expect(validateConfig({ ...baseConfig, zoom: 0.5 }).zoom).toBe(0.5)
    expect(validateConfig({ ...baseConfig, zoom: 1.5 }).zoom).toBe(1.5)
    expect(validateConfig({ ...baseConfig, zoom: 3 }).zoom).toBe(3)
  })

  it('falls back to 1x for invalid zoom values', () => {
    expect(validateConfig({ ...baseConfig, zoom: 0.49 }).zoom).toBe(1)
    expect(validateConfig({ ...baseConfig, zoom: 3.01 }).zoom).toBe(1)
    expect(validateConfig({ ...baseConfig, zoom: 'large' }).zoom).toBe(1)
  })

  it('accepts compact padding and title-gap overrides including zero', () => {
    const config = validateConfig({
      ...baseConfig,
      cardPadding: 8,
      titleGap: 0,
    })

    expect(config.cardPadding).toBe(8)
    expect(config.titleGap).toBe(0)
  })

  it('ignores invalid pixel overrides', () => {
    const config = validateConfig({
      ...baseConfig,
      cardPadding: -1,
      titleGap: 49,
    })

    expect(config.cardPadding).toBeUndefined()
    expect(config.titleGap).toBeUndefined()
  })
})

describe('heatmap SVG sizing', () => {
  it('preserves the existing full-year style at 1x', () => {
    expect(getHeatmapSvgStyle(53, 724, 1)).toBe('')
  })

  it('zooms a full-year graph by widening the SVG', () => {
    expect(getHeatmapSvgStyle(53, 724, 1.5)).toBe('width: 150%;')
  })

  it('scales the max-width cap for shorter ranges', () => {
    expect(getHeatmapSvgStyle(10, 165, 2)).toBe('width: 200%;max-width: 330px;')
  })
})
