export const roundToDecimalPlaces =(decimalPlaces, number)=> {
    // Check if the number has a decimal point
    if (Number.isInteger(number)) {
      // If the number is an integer, return it without rounding
      return number;
    } else {
      // If the number has a decimal point, round it to two decimal places
      return number.toFixed(decimalPlaces);
    }
  }
