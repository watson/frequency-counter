'use strict'

const test = require('tape')
const Freq = require('./')

test('no incs', function (t) {
  const counter = Freq()
  t.equal(counter.freq(), 0)
  t.end()
})

test('one inc', function (t) {
  const counter = Freq()
  counter.inc()
  t.equal(counter.freq(), 1)
  t.end()
})

test('custom inc', function (t) {
  const counter = Freq()
  counter.inc(42)
  t.equal(counter.freq(), 42)
  t.end()
})

test('multiple incs', function (t) {
  const counter = Freq()
  for (let n = 0; n < 100; n++) counter.inc()
  t.equal(counter.freq(), 100)
  t.end()
})

test('don\'t count old data', function (t) {
  stopTime()
  const counter = Freq()
  let i = 1

  for (; i < 60 * 2; i++) {
    counter.inc()
    const expected = Math.min(i, 60)
    t.equal(counter.freq(), expected, 'after ' + i + ' seconds, the frequency should be ' + expected)
    incTime(1000)
  }

  releaseTime()
  t.end()
})

test('don\'t count old data, custom window', function (t) {
  stopTime()
  const counter = Freq(5)
  let i = 1

  for (; i < 5 * 2; i++) {
    counter.inc()
    const expected = Math.min(i, 5)
    t.equal(counter.freq(), expected, 'after ' + i + ' seconds, the frequency should be ' + expected)
    incTime(1000)
  }

  releaseTime()
  t.end()
})

const origNowFn = Date.now
let stoppedTime

function stopTime () {
  stoppedTime = Date.now()
  Date.now = function () {
    return stoppedTime
  }
}

function releaseTime () {
  Date.now = origNowFn
}

function incTime (ms) {
  stoppedTime += ms
}
