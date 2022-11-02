import { toast } from 'react-hot-toast'

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

export const registerValidate = ({
  username,
  email,
  password,
  cpassword,
}: {
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
  if (!username) {
    errs.username = 'Required username'
  } else if (username.includes(' ')) {
    errs.username = 'Your username must not contain blank spaces'
  }

  // validation email
  if (!email) {
    errs.email = 'Email required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errs.email = 'Invalid email address'
  }

  // validation password
  if (!password) {
    errs.password = 'Password is required'
  } else if (
    !/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/g.test(password)
  ) {
    errs.password = 'Password requires a capital letter, a number and a symbol'
  } else if (password.includes(' ')) {
    errs.password = 'The password does not include blank spaces'
  }

  // validate confirm password
  if (!cpassword) {
    errs.cpassword = 'Required'
  } else if (cpassword !== password) {
    errs.cpassword = 'Password does not match.'
  } else if (cpassword.includes(' ')) {
    errs.cpassword = 'Password confirmation failed.'
  }

  return errs
}

export const handleBlurUserName = ({
  target: { value },
}: {
  target: { value: string }
}) => {
  if (!value) {
    toast.error('Username is required.', { duration: 1500 })
  } else if (value.includes(' ')) {
    toast.error('Your username must not contain blank spaces.', {
      duration: 1500,
    })
  }
}
export const handleBlurEmail = ({
  target: { value },
}: {
  target: { value: string }
}) => {
  // validation email
  if (!value) {
    toast.error('Email is required.', { duration: 1500 })
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    toast.error('Invalid email address.', { duration: 1500 })
  }
}
export const handleBlurPassword = ({
  target: { value, name },
}: {
  target: { value: string; name: string }
}) => {
  // validation password
  if (name === 'password' && !value) {
    toast.error('Password is required.', { duration: 1500 })
  } else if (name === 'cpassword' && !value) {
    toast.error('You must confirm the password.', { duration: 1500 })
  } else if (
    name === 'password' &&
    !/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/g.test(value)
  ) {
    toast.error(
      'Password requires at least one capital letter, one number and a symbol.',
      {
        duration: 1500,
      },
    )
  } else if (value.includes(' ')) {
    toast.error('The password must not include blank spaces.', {
      duration: 1500,
    })
  }
}

// export const handleBlurCPassword = ({
//   target: { value },
// }: {
//   target: { value: string }
// }) => {
//   // validate confirm password
//   if (!value) {
//     toast.error('need to confirm password', { duration: 1500 })
//   } else if (cpassword !== password) {
//     toast.error('Password Not Match...!')
//   } else if (cpassword.includes(' ')) {
//     errs.cpassword = 'Invalid Confirm Password'
//   }
// }
// export const handleSubmit = (e) => {
// }
