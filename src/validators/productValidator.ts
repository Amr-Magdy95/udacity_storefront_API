/* eslint-disable no-useless-escape */
export const productValidator = (name: string, price: string) => {
  try {
    if (name === '' || price === '') {
      throw new Error('please enter non-empty values')
    }
    if (!/^[a-zA-Z\-]+$/.test(name)) {
      throw new Error('please enter a valid product name')
    }
    const intPrice: number = parseFloat(price)
    const regExp = /[a-zA-Z]/g
    if (isNaN(intPrice) || intPrice <= 0 || regExp.test(price)) {
      throw new Error('Invalid price')
    }
  } catch (err) {
    throw new Error(`${err}`)
  }
}
