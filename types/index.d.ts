/**
 * The `$.cacheTax` noun as every caller sees it: read-only, so another mod
 * (a status band, say) can show keepwarm without parsing /cache-tax output.
 * Where cache-tax is not installed there is no `$.cacheTax`, so a caller
 * tests for it before use.
 */

/** Where keepwarm stands: `on` while a window is open, `stopped` after it gave up, `off` otherwise. */
export type CacheTaxKeepwarm = 'on' | 'stopped' | 'off'

export type CacheTaxStatus = {
  keepwarm: CacheTaxKeepwarm
  /** Time left in the window, in ms; 0 unless `on`. */
  leftMs: number
  /** Time to the next ping, in ms, when one is scheduled. */
  nextPingMs: number | null
  /** The /keepwarm always switch. */
  always: boolean
  /** The "Auto keepwarm" option: whether a paid cold write arms keepwarm by itself. */
  autoWarm: boolean
  /** What a cold send does: refuse once, or warn. */
  guard: 'refuse' | 'warn'
  /** Whether the cache is cold now, or null before the first turn or after compaction. */
  cold: boolean | null
  /** Why keepwarm stopped, when it did. */
  stopped: string | null
  /** Cold writes this session. */
  coldWrites: number
}

export type CacheTax = {
  /** The state as /cache-tax reads it, at this moment. */
  status: () => Promise<CacheTaxStatus>
}

declare module 'claude-code' {
  interface EngineInterface {
    cacheTax: CacheTax
  }
}
