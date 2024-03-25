/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
// ** Checks if the passed date is today
const isToday = date => {
  const today = new Date()

  return (
    new Date(date).getDate() === today.getDate() &&
    new Date(date).getMonth() === today.getMonth() &&
    new Date(date).getFullYear() === today.getFullYear()
  )
}

export const formatDate = (value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) => {
  if (!value) return value

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

export const formatDateToReadableFormat = (inputDate) => {

  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);

  return inputDate !== null ? formattedDate : '--';
}

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value)
  let formatting = { month: 'short', day: 'numeric' }
  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: 'numeric', minute: 'numeric' }
  }

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

// ? The following functions are taken from https://codesandbox.io/s/ovvwzkzry9?file=/utils.js for formatting credit card details
// Get only numbers from the input value
const clearNumber = (value = '') => {
  return value.replace(/\D+/g, '')
}

// Format credit cards according to their types
export const formatCreditCardNumber = (value, Payment) => {
  if (!value) {
    return value
  }
  const issuer = Payment.fns.cardType(value)
  const clearValue = clearNumber(value)
  let nextValue
  switch (issuer) {
    case 'amex':
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 10)} ${clearValue.slice(10, 15)}`
      break
    case 'dinersclub':
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 10)} ${clearValue.slice(10, 14)}`
      break
    default:
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 8)} ${clearValue.slice(8, 12)} ${clearValue.slice(
        12,
        19
      )}`
      break
  }

  return nextValue.trim()
}

// Format expiration date in any credit card
export const formatExpirationDate = value => {
  const finalValue = value
    .replace(/^([1-9]\/|[2-9])$/g, '0$1/') // 3 > 03/
    .replace(/^(0[1-9]|1[0-2])$/g, '$1/') // 11 > 11/
    .replace(/^([0-1])([3-9])$/g, '0$1/$2') // 13 > 01/3
    .replace(/^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2') // 141 > 01/41
    .replace(/^([0]+)\/|[0]+$/g, '0') // 0/ > 0 and 00 > 0
    // To allow only digits and `/`
    .replace(/[^\d\/]|^[\/]*$/g, '')
    .replace(/\/\//g, '/') // Prevent entering more than 1 `/`

  return finalValue
}

// Format CVC in any credit card
export const formatCVC = (value, cardNumber, Payment) => {
  const clearValue = clearNumber(value)
  const issuer = Payment.fns.cardType(cardNumber)
  const maxLength = issuer === 'amex' ? 4 : 3

  return clearValue.slice(0, maxLength)
}

export const formatFirstLetter = letter => {
  if (letter){

  const formattedString = letter[0].toUpperCase() + letter.slice(1)

  return formattedString
  } else {
    return ''
  }
}

export const formatAndReturnFirstLetter = letter => {
  const formattedString = letter[0].toUpperCase()

  return formattedString
}

export const formatDateToYYYMMDDD = date => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    const dateValue = new Date(date)
    const year = dateValue.getFullYear()
    const month = (dateValue.getMonth() + 1).toString().padStart(2, '0') // Month is zero-indexed
    const day = dateValue.getDate().toString().padStart(2, '0')

    return `${year}-${month}-${day}`
  }
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Month is zero-indexed
  const day = date.getDate().toString().padStart(2, '0')

  return `${year}-${month}-${day}`
}




export const formatMonthYear = date => {
  // Check if date is a valid Date object
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    // If not, return a default value or handle the situation as needed

    const year = date.slice(0, 4)
    const month = date.slice(4)

    const newDate = new Date(`${year}-${month}-01`) // Assuming day is always the first of the month
    const options = { month: 'long', year: 'numeric' }

    return newDate.toLocaleDateString('en-US', options)
  }

  const options = { month: 'long', year: 'numeric' }

  const formattedDate = date.toLocaleDateString('en-US', options)

  return formattedDate
}

export const formatDateToYYYYMM = (dateString)=> {
  
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const formattedDate = `${year}${month}`;
  


  return formattedDate
}

export const formatMonthYearr = date => {
  // Check if date is a valid Date object
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    // If not, return a default value or handle the situation as needed

    const year = date.slice(0, 4)
    const month = date.slice(4, 6)

    const newDate = new Date(`${year}-${month}-01`) // Assuming day is always the first of the month
    const options = { month: 'long', year: 'numeric' }

    const formattedDate = newDate.toLocaleDateString('en-US', options)

    console.log(formattedDate, 'formatteddate')

    // return newDate.toLocaleDateString('en-US', options)
  }
  else {
    console.log('false')

  }


  // const options = { month: 'long', year: 'numeric' }

  // const formattedDate = date.toLocaleDateString('en-US', options)

  // return formattedDate
}



export const parseClass = item => {
  if ( !item || item === '') {
    return 'bg-info'
  } else if (item === 'Monday') {
    return 'bg-primary'
  } else if (item === 'Tuesday' || 'Thursday') {
    return 'bg-danger'
  } else {
    return 'bg-secondary'
  }
}

const getDatesForDayInMonth = (dayOfWeek, month, year) => {
  const dates = [];
  const date = new Date(year, month, 1);

  // Find the first occurrence of the dayOfWeek in the month
  while (date.getDay() !== dayOfWeek) {
    date.setDate(date.getDate() + 1);
  }

  // Add all occurrences of the dayOfWeek in the month to the array
  while (date.getMonth() === month) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 7);
  }

  return dates;
}

export const parseCalendarEvents = (result, teachers) => {
  const dateValue = new Date()
  const year = dateValue.getFullYear()
  const month = (dateValue.getMonth() + 1) 
  let rosters = []

  // result.forEach(item => {
  //   const parsedSchedule = item.schedule ? JSON.parse(item.schedule) : []

  result.forEach(schedule => {
      if (schedule.day !== '') {
        let teacher = teachers?.find((teacher)=> teacher.id == schedule.staffId)
        let day;
        switch (schedule.day) {
          case 'Monday':
            day = 1;
            break;
          case 'Tuesday':
            day = 2;
            break;
          case 'Wednesday':
            day = 3;
            break;
            case 'Thursday':
            day = 4;
            break;
            case 'Friday':
            day = 5;
            break;
          default:
            day = 0;
        }

        const dates = getDatesForDayInMonth(day, month - 1, year);
       const datee = (dates[0].getDate().toString().padStart(2, '0'))
        rosters = [
          ...rosters,
          {
            title: ` ${schedule?.subject?.name?.toUpperCase()} ⏱️ ${schedule.start?.slice(0, 5) || '--'} - ${schedule.end?.slice(0, 5) || '--'} `,

            // title: ` subject Teacher Name `,
            date: `${year}-${month.toString().padStart( 2, '0')}-${datee}`,

            // start: schedule.start,
            // end: schedule.end,

            className: parseClass(schedule.day)
          }
        ]
      }
    })

  // })

  return rosters
}

export const getFirstId = arrayOfObjects => {
  for (const obj of arrayOfObjects) {
    if (obj && obj.id !== undefined) {
      return obj.id
    }
  }

  // Return a default value (or throw an error) if no id is found
  return null
}



export const formatCurrency = (amount, abs) => {
  
  if (!amount) {
    return `₦0.0`
  } else if (amount) {
    const formattedAmount = Number(amount)

    return `₦${(abs ? Math.abs(formattedAmount) : formattedAmount).toLocaleString()}`
  }
}

export const getCurrency = () => {


  return  { symbol: '₦' }
}