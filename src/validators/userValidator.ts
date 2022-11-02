/* eslint-disable no-useless-escape */
export const userValidator = (
  firstname: string,
  lastname: string,
  email: string,
  password: string
): void => {
  try {
    if (firstname == '' || lastname == '' || password == '' || email == '') {
      throw new Error('Please enter non-empty values')
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      throw new Error('please enter a valid email')
    }
    if (!/^[a-zA-Z\-]+$/.test(firstname)) {
      throw new Error('please enter a valid firstname')
    }
    if (!/^[a-zA-Z\-]+$/.test(lastname)) {
      throw new Error('please enter a valid lastname')
    }

    if (
      !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)
    ) {
      throw new Error('please enter a valid password')
    }
  } catch (err) {
    throw new Error(`${err}`)
  }
}
