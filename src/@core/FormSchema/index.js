// ** Third Party Imports
import * as yup from 'yup'

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} is a required field`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

export const SalaryItemSchema = yup.object().shape({
  name: yup.string().required('Salary item is required'),
  percentage: yup.number().typeError('Percentage can only be a number').required('Percentage is required')
})

export const personalInfoSchema = yup.object().shape({
  middleName: yup.string(),
  email: yup.string().email().required(),
  lastName: yup.string().required('Last Name is required'),
  firstName: yup.string().required('First Name is required'),
  password: yup.string().min(5).required('Password is required'),
  phone: yup
    .string()
    .typeError('Phone Number  is required')
    .min(11, obj => showErrors('Phone Number', obj.value.length, obj.min)),
  title: yup.string().required('Title is required'),
  dateOfBirth: yup.string().required('Date of Birth is required'),
  residentialAddress: yup.string(),
  maritalStatus: yup.string(),
  gender: yup.string().required('Gender is required'),
  city: yup.string(),
  state: yup.string(),
  lga: yup.string().required('Local Government is required'),
  religion: yup.string(),

  // staffDescription: yup.string().required('Description is required'),

  // additionalInfo: yup.string()
})

export const updateStaffPersonalInfoSchema = yup.object().shape({
  middleName: yup.string(),
  email: yup.string().email().required(),
  lastName: yup.string().required('Last Name is required'),
  firstName: yup.string().required('First Name is required'),
  phone: yup
    .string()
    .typeError('Phone Number  is required')
    .min(11, obj => showErrors('Phone Number', obj.value.length, obj.min)),
  title: yup.string().required('Title is required'),
  dateOfBirth: yup.string().required('Date of Birth is required'),
  residentialAddress: yup.string(),
  maritalStatus: yup.string(),
  gender: yup.string().required('Gender is required'),
  city: yup.string(),
  state: yup.string(),
  lga: yup.string().required('Local Government of Origin is required'),
  religion: yup.string(),
  staffDescription: yup.string().required('Description is required'),

  // additionalInfo: yup.string()
})

export const workInfoSchema = yup.object().shape({
  qualification: yup.string().required('Qualification is required'),
  department_section: yup.string(),
  institutionAttended: yup.string(),
  specialization: yup.string(),
  previousWorkExperience: yup.string(),
  basicSalary: yup.number().typeError('Basic salary must be a number'),
  mealAllowance: yup.number().typeError('Meal Allowance must be a number'),
  transportAllowance: yup.number().typeError('Transport Allowance must be a number'),
  domesticAllowance: yup.number().typeError('Domestic Allowance must be a number'),
  furnitureAllowance: yup.number().typeError('Furniture Allowance must be a number'),
  SalaryArrears: yup.number().typeError('Salary Arrears must be a number'),
  rentAllowance: yup.number().typeError('Rent Allowance must be a number'),
  dateOfEmployment: yup.string().required('Date of Employment is required'),

  // others: yup.number().typeError('Other allowance must be a number'),
  staffDescription: yup.string().required('Role Description is required'),
  accountNumber: yup.string().required('Account Number is required'),
  bankName: yup.string(),
  role: yup.string().required('Role is required'),
  branch: yup.string()
})

export const updatestaffWorkInfoSchema = yup.object().shape({
  qualification: yup.string().required('Qualification is required'),
  department_section: yup.string(),
  institutionAttended: yup.string(),
  specialization: yup.string(),
  previousWorkExperience: yup.string(),
  basicSalary: yup.number().typeError('Basic salary must be a number'),
  mealAllowance: yup.number().typeError('Meal Allowance must be a number'),
  transportAllowance: yup.number().typeError('Transport Allowance must be a number'),
  domesticAllowance: yup.number().typeError('Domestic Allowance must be a number'),
  furnitureAllowance: yup.number().typeError('Furniture Allowance must be a number'),
  SalaryArrears: yup.number().typeError('Salary Arrears must be a number'),
  rentAllowance: yup.number().typeError('Rent Allowance must be a number'),
  dateOfEmployment: yup.string().required('Date of Employment is required'),
  accountNumber: yup.string().required('Account Number is required'),
  bankName: yup.string(),
  branch: yup.string()
})

export const medicalSchema = yup.object().shape({
  drugAllergies: yup.string(),
  foodAllergies: yup.string(),
  genotype: yup.string().required('Genotype is required'),
  bloodGroup: yup.string().required('Blood Group is required'),
  previousSurgery: yup.string(),
  healthStatus: yup.string().required('Health Status is required'),
})

export const nextOfKinSchema = yup.object().shape({
  nameOfRefereeOne: yup.string(),
  nameOfRefereeTwo: yup.string(),
  addressOfRefereeOne: yup.string(),
  addressOfRefereeTwo: yup.string(),
  emailOfRefereeOne: yup.string().email(),
  emailOfRefereeTwo: yup.string().email(),
  phoneOfRefereeOne: yup.string(),
  phoneOfRefereeTwo: yup.string(),
  nextOfKinName: yup.string().required("Next of Kin's name is required"),
  nextOfKinAddress: yup.string(),
  emergencyPhone: yup.string().required("Emergency phone number is required"),
  relationShip: yup.string(),
})


export const requireName = yup.object().shape({
  name: yup.string().required('Department Name is required')
})

export const editDepartmentSchema = yup.object().shape({
  name: yup.string(),
  hodId: yup.number()
})

export const editSalaryItemSchema = yup.object().shape({
  name: yup.string(),
  percentage: yup.number()
})

export const requireReason = yup.object().shape({
  reason: yup.string().required('Reason is required')
})

export const requirePeriod = yup.object().shape({
  period: yup.string().required('Period is required')
})

export const downloadRosterSchema = yup.object().shape({
  departmentId: yup.number().required('Department Name is required'),
  rosterDate: yup.string().required('Date is required')
})

export const signUpSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  middleName: yup.string(),
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
  title: yup.string().required('Title is required'),
  gender: yup.string().required('Gender is required'),

  // status: yup.string().required('Status is required'),
  phone: yup.string().typeError('Phone Number must be at least 11 Characters')
  .min(11, obj => showErrors('Phone number', obj.value.length, obj.min)),
  dateOfEmployment: yup.string().required('Date of Employment is required'),
  dateOfBirth: yup.string().required('Date of Birth is required'),
  residentialAddress: yup.string().required('residentialAddress is required'),
  branch: yup.string().required('branch is required')
})

export const studentSignUpSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  middleName: yup.string().required('Middle Name is required'),
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
  title: yup.string().required('Title is required'),
  status: yup.string().required('status is required'),
  phone: yup.string().typeError('Phone Number is required')
  .min(11, obj => showErrors('Phone number', obj.value.length, obj.min)),

  dateOfBirth: yup.string().required('Date of Birth is required'),
  residentialAddress: yup.string().required('residentialAddress is required'),
  branch: yup.string().required('branch is required')
})

export const createActorSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  middleName: yup.string(),
  email: yup.string().required('Email is required'),
  password: yup.string(),

  // maritalStatus: yup.string(),
  phone: yup.string().required().typeError('Phone Number must be at least 11 Characters')
  .min(11, obj => showErrors('Phone number', obj.value.length, obj.min)),
  dateOfBirth: yup.string(),
  residentialAddress: yup.string().required('Residential Address is required'),
  gender: yup.string().required('Gender is required'),
  relationship: yup.string(),
  religion: yup.string(),
  ethnicity: yup.string(),
})

export const createStudentSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  middleName: yup.string(),
  email: yup.string(),
  password: yup.string(),
  phone: yup.string(),
  dateOfBirth: yup.string().required('Date of Birth is required'),
  currentClassId: yup.string().required('Current Class is required'),
  residentialAddress: yup.string(),
  gender: yup.string().required('Gender is required'),
  religion: yup.string(),
  ethnicity: yup.string(),
  registrationDate: yup.string(),
  lastSchool: yup.string(),
})

export const updateStudentSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  middleName: yup.string(),
  email: yup.string(),
  phone: yup.string(),
  dateOfBirth: yup.string().required('Date of Birth is required'),
  residentialAddress: yup.string(),
  gender: yup.string().required('Gender is required'),
  currentClassId: yup.string().required('Current Class is required'),
  religion: yup.string(),
  ethnicity: yup.string(),
  registrationDate: yup.string(),
  lastSchool: yup.string(),
})

export const updateGuardianSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  middleName: yup.string(),
  email: yup.string(),
  phone: yup.string().required().typeError('Phone Number must be at least 11 Characters')
  .min(11, obj => showErrors('Phone number', obj.value.length, obj.min)),
  dateOfBirth: yup.string(),
  residentialAddress: yup.string(),
  gender: yup.string().required('Gender is required'),
  religion: yup.string(),
  ethnicity: yup.string(),
  relationship: yup.string(),
})


export const editStaffSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  middleName: yup.string().required('Middle Name is required'),
  email: yup.string().required('Email is required'),
  title: yup.string().required('Title is required'),
  status: yup.string().required("Status is required"),
  phone: yup.string().typeError('Phone Number must be at least 11 Characters')
  .min(11, obj => showErrors('Phone number', obj.value.length, obj.min)),
  dateOfBirth: yup.string().required('Date of Birth is required'),
  residentialAddress: yup.string().required('residentialAddress is required'),
  branch: yup.string().required('branch is required')
})

export const createIncomeSchema = yup.object().shape({
  title: yup.string().required('Description is required'),
  amount: yup.number().typeError('Amount must be a number'),
  amountPaid: yup.number().typeError('Amount Received must be a number'),
  categoryId: yup.string().required('Category is required'),
  incomeOwner: yup.string().required('This field is required'),
  paymentMode: yup.string().required('Payment Method is required'),
  
})

export const createExpenditureSchema = yup.object().shape({
  title: yup.string().required('Description is required'),
  amount: yup.number().typeError('Amount must be a number'),
  amountPaid: yup.number().typeError('Amount Paid must be a number'),
  categoryId: yup.string().required('Category is required'),
  expenditureOwner: yup.string().required('This field is required'),
  paymentMode: yup.string().required('Payment Method is required'),
})

export const categorySchema = yup.object().shape({
  name: yup.string().required('Category Name is required'),
 
})

export const subjectSchema = yup.object().shape({
  name: yup.string().required('Subject Title is required'),
  category_name: yup.string().required('Category Name is required'),
})

export const guardianInfoSchema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  email: yup.string(),
  phone: yup.string(),
  gender: yup.string(),
})

export const roomSchema = yup.object().shape({
  name: yup.string().required('Room Name is required'),
  capacity: yup.string().required('Room Capacity is required'),
  category_name: yup.string().required('Category Name is required'),
})