export const login_valid = (values: { email: string; password: string }) => {
  const errs = {} as { email: string; password: string }

  // validation email
  if (!values.email) {
    errs.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errs.email = 'Invalid email address'
  }

  // validation password
  if (!values.password) {
    errs.password = 'Required'
  } else if (
    !/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/g.test(values.password)
  ) {
    errs.password = 'Invalid password'
  } else if (values.password.includes(' ')) {
    errs.password = 'Invalid password'
  }

  return errs
}

export const registerValidate = (values: {
  username: string
  email: string
  password: string
  cpassword: string
}) => {
  const errs = {} as {
    username: string
    email: string
    password: string
    cpassword: string
  }

  // validater username
  if (!values.username) {
    errs.username = 'Required username'
  } else if (values.username.includes(' ')) {
    errs.username = 'Invalid username'
  }

  // validation email
  if (!values.email) {
    errs.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errs.email = 'Invalid email address'
  }

  // validation password
  if (!values.password) {
    errs.password = 'Required'
  } else if (
    !/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/g.test(values.password)
  ) {
    errs.password = 'Invalid password'
  } else if (values.password.includes(' ')) {
    errs.password = 'Invalid password'
  }

  // validate confirm password
  if (!values.cpassword) {
    errs.cpassword = 'Required'
  } else if (values.cpassword !== values.password) {
    errs.cpassword = 'Password Not Match...!'
  } else if (values.cpassword.includes(' ')) {
    errs.cpassword = 'Invalid Confirm Password'
  }

  return errs
}