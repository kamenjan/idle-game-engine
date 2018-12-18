/**
 * Self-adjusting interval to account for drifting
 *
 * @param {function} callback  Callback containing the work to be done
 *                             for each interval
 * @param {int}      interval  Interval speed (in milliseconds) - This
 * @param {function} onError (Optional) Callback to run if the drift
 *                             exceeds interval
 */
export default function selfAdjustingInterval(callback, interval, onError) {
  let expected, timeout

  this.start = () => {
    expected = Date.now() + interval
    timeout = setTimeout(step, interval)
  }

  this.stop = () => clearTimeout(timeout)

  const step = () => {
    let drift = Date.now() - expected
    if (drift > interval) {
      this.stop()
      if (onError) onError()
    } else {
      callback()
      expected += interval
      timeout = setTimeout(step, Math.max(0, interval-drift))
    }
  }

  return this
}