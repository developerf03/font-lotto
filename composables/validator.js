export { default as Rules } from '../constants/validateRules'
export const useValidator = (form, errors, options = {}) => ({
  form,
  ruleObj: {},
  errors,
  options: { ...options },
  isFormValid: false,

  rules(rules) {
    this.ruleObj = rules

    return this
  },

  async validate(field = '', showAllErrors = false) {
    let errors = []

    const setError = (errorObj, field, errors, value) => {
      errors = errors.filter((v) => v)
      errorObj[field] = errors.length
        ? { message: showAllErrors ? errors : errors[0], status: 'is-danger' }
        : value
        ? { message: '', status: 'is-success' }
        : {}
    }

    const checkError = async (formObj, field, fn) => {
      try {
        let errMsg = ''

        if (fn.name === 'requiredValidate') errMsg = fn.fn(formObj[field])
        else if (fn.name === 'isMatchValidate') errMsg = fn.fn(formObj[field], formObj)
        else if (formObj[field])
          errMsg = fn.name === 'custom' ? await fn.fn()(formObj[field]) : fn.fn(formObj[field])

        return errMsg
      } catch (error) {
        return ''
      }
    }

    if (field) {
      try {
        for (const fn of this.ruleObj[field].validator) {
          errors.push(await checkError(this.form, field, fn))
        }
      } catch (error) {
        console.log(`Error: field ${field} not found.`)
      }

      setError(this.errors, field, errors, this.form[field])
    } else {
      for (const field in this.ruleObj) {
        errors = []

        for (const fn of this.ruleObj[field].validator) {
          errors.push(await checkError(this.form, field, fn))
        }

        setError(this.errors, field, errors, this.form[field])
      }
    }

    this.isFormValid =
      this.validateRequiredField() && Object.keys(this.errors).every((v) => !this.errors[v].message)

    return this
  },

  validateRequiredField() {
    const checkErrors = { ...this.errors }

    for (const key in this.ruleObj) {
      checkErrors[key] = ''

      for (const fn of this.ruleObj[key].validator) {
        if (fn.name === 'requiredValidate' && fn.fn(this.form[key])) {
          checkErrors[key] = 'required'
        }
      }
    }

    return Object.keys(checkErrors).every((v) =>
      typeof checkErrors[v] === 'object' ? !checkErrors[v].message : !checkErrors[v],
    )
  },

  setErrorMsg(field, message = '') {
    Object.keys(this.errors).forEach((key) => {
      this.errors[key] = {
        status: 'is-danger',
        message: key === field ? message : '',
      }
    })
  },

  clearErrorFields(fields = []) {
    if (Array.isArray(fields) && fields.length) {
      fields.forEach((key) => {
        this.errors[key] = {}
      })
    } else {
      Object.keys(this.errors).forEach((key) => {
        this.errors[key] = {}
      })
    }
  },

  clear() {
    Object.keys(this.errors).forEach((key) => (this.errors[key] = {}))
  },

  checkHaveErrors() {
    return Object.keys(this.errors).some((key) => !!this.errors[key]?.message)
  },

  isValidForm() {
    return (
      this.validateRequiredField() && Object.keys(this.errors).every((v) => !this.errors[v].message)
    )
  },

  isValidFormByFields(fields = []) {
    return fields.every((v) => !this.errors[v]?.message) && fields.every((v) => this.form[v])
  },
})

export const clearObj = (obj = {}, initialVal = '') =>
  Object.keys(obj).reduce((p, n) => ({ ...p, [n]: initialVal }), {})
