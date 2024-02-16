export const  calculateAge =(dateString)=> {
    // Parse the date string into a Date object
    const birthDate = new Date(dateString);
    
    // Get the current date
    const currentDate = new Date();
  
    // Calculate the difference in years
    let age = currentDate.getFullYear() - birthDate.getFullYear();
  
    // Check if the birthday hasn't occurred yet this year
    if (currentDate.getMonth() < birthDate.getMonth() || 
        (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return `${age} years`;
  }
  
  