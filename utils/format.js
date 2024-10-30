import numeral from 'numeral'

const $format = {
  currency(number, decimal = 2) {
    const format = !decimal ? '0,0' : '0,0.' + '0'.repeat(decimal)
    const value = numeral(number).format(format, Math.floor)

    return value
  },
  number(number, decimal) {
    return numeral(number).format(!decimal ? '0,0' : '0,0.' + '0'.repeat(decimal), Math.floor)
  },
  removeCommas(o) {
    return parseFloat(String(o).replace(/[,]/gm, ''))
  },
  isEmail(email) {
    return /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(email)
  },
  getLocalDate(d, opts) {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      hour12: false,
      minute: '2-digit',
      second: '2-digit',
      ...opts,
    }
    const date = d ? new Date(d) : new Date()
    const dateTimeStr = date.toLocaleString('en-GB', options).replace(', ', ' ')
    const dateArr = dateTimeStr.slice(0, 10).split('/')

    return date instanceof Date && !isNaN(date)
      ? `${dateArr[2]}-${dateArr[1]}-${dateArr[0]} ${dateTimeStr.slice(11)}`
      : ''
  },
  date(d, opts = {}) {
    if (!d) return ''
    const locale = opts.locale || 'en-GB'

    delete opts.locale
    const _d = new Date(d)

    return _d.toLocaleString(
      locale,
      opts || {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        hour12: false,
        minute: '2-digit',
        second: '2-digit',
      },
    )
  },
  dateOnly(d) {
    if (!d) return ''
    const _d = new Date(d)

    return _d.toLocaleString('en-GB')?.slice(0, 10)
  },
  formatTime(date) {
    if (!date) return ''
    const _d = new Date(date)

    if (_d === 'Invalid Date') return date
    const h = _d.getHours()
    const mn = _d.getMinutes()

    return `${('0' + h).slice(-2)}:${('0' + mn).slice(-2)}`
  },
}

export { $format }
