export const timeDiff = (date1, date2) => {
  let difference = date1 - date2
  const secondTotal = Math.floor(difference / 1000)
  const days = Math.floor(difference / 1000 / 60 / 60 / 24)

  difference -= days * 1000 * 60 * 60 * 24
  const hours = Math.floor(difference / 1000 / 60 / 60)

  difference -= hours * 1000 * 60 * 60
  const minutes = Math.floor(difference / 1000 / 60)

  difference -= minutes * 1000 * 60
  const seconds = Math.floor(difference / 1000)

  return {
    days,
    hours,
    minutes,
    seconds,
    secondTotal
  }
}

