/* eslint-disable no-useless-escape */
export const idQuantityValidator = (
  value: string,
  type = 'id'
) => {
  const intValue: number = parseInt(value)
  const regExp = /[a-zA-Z]/g
  if (isNaN(intValue) || intValue <= 0 || regExp.test(value)) {
    throw new Error(`Invalid ${type}`)
  }
  // if(isInt===true && !/[1-9][0-9]*/.test(value)){
  //   throw new Error('enter a valid integer for quantity and id');
  // }
}
