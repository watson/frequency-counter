'use strict'

module.exports = FrequencyCounter

function FrequencyCounter (windowSize) {
  if (!(this instanceof FrequencyCounter)) return new FrequencyCounter(windowSize)

  this._windowSize = windowSize || 60 // default to a window of 60 seconds (rpm)
  this._window = new Uint32Array(this._windowSize).fill(0)
  this._lastInc = epoch()
}

FrequencyCounter.prototype.inc = function (n) {
  const now = epoch()
  const index = now % this._windowSize
  this._clearGaps(index, now)
  this._window[index] += n || 1
  this._lastInc = now
}

FrequencyCounter.prototype.freq = function () {
  const now = epoch()
  const index = now % this._windowSize
  this._clearGaps(index, now)
  return this._window.reduce(sum)
}

// Set all buckets between the last index and the current index to zero
// (including the current index, excluding the last index)
FrequencyCounter.prototype._clearGaps = function (currentIndex, now) {
  let gaps = Math.min(now - this._lastInc, this._windowSize)
  while (gaps-- > 0) {
    const offset = (currentIndex - gaps) % this._windowSize
    const index = offset < 0 ? this._windowSize + offset : offset
    this._window[index] = 0
  }
}

function sum (a, b) {
  return a + b
}

function epoch () {
  // TODO: Use hrtime
  return Math.floor(Date.now() / 1000)
}
