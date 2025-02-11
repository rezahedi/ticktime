export const convertDateFormat = (date: string): string => {
  const [year, month, day] = date.split('-')
  return `${month}/${day}/${year}`
}

/**
 * @param {string} date format 'mm/dd/yyyy'
 * @returns number
 */
export const calculateRemainedDays = (date: string): number => {
  const currentDate: Date = new Date()
  const inputDate: Date = new Date( convertDateFormat(date) + ' 11:59:59' )

  // Check if the date is valid
  if (isNaN(inputDate.getTime())) {
    return 0;
  }
  
  const differenceInMs: number = inputDate.getTime() - currentDate.getTime()
  const differenceInDays: number = Math.round(differenceInMs / (24 * 60 * 60 * 1000));
  return differenceInDays
}
