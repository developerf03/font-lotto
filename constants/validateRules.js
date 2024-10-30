const defaultErrorMsg = {
  REQUIRED: 'Please input',
  EMAIL: 'Email is invalid format',
  NUMBER: 'Must be number',
  MIN_LENGTH: (min) => `Enter at least ${min} characters`,
  MAX_LENGTH: (max) => `Enter at least ${max} characters`,
  MIN_VALUE: (min) => `Minimum ${min}`,
  MAX_VALUE: (max) => `Maximum ${max}`,
  CHECK_LENGTH: (len) => `Length must be equal ${len}`,
  WHITESPACE: 'No spaces',
  NOTTHAI: 'Do not enter Thai password',
  ISMATCH: 'Passwords do not match',
  ISENGALPHABETORNUMERIC: 'Please enter English alphabet or numbers',
  IS_ENGALPHABETOR_NUMERIC_UNDERSCORE: 'Please enter English alphabet, numbers or _',
  IS_ENGALPHABETOR_NUMERIC_DOT_UNDERSCORE: 'Please enter English alphabet, numbers, dot or _',
  IS_SPECIAL_CHARACTER: 'Please enter special character',
  NO_SPECIAL_CHARACTER: 'Do not enter special character',
  UPPERCASE_ENG_ALPHABET: 'Please enter englist alphabet in uppercase',
  PASSWORD: 'Please enter a valid password format',
  IS_PHONE_NUMBER: 'Please enter a valid phone number format',
  INVALID_DATE_FORMAT: 'Invalid date format',
}

export default () => ({
  validator: [],

  custom(fn) {
    // if success return '', if error return message
    const custom = () => fn

    this.validator.push({
      name: 'custom',
      fn: custom,
    })

    return this
  },

  option() {
    const optionValidate = () => {
      return ''
    }

    this.validator.push({
      name: 'optionValidate',
      fn: optionValidate,
    })

    return this
  },

  required(errMsg) {
    const requiredValidate = (val) => {
      if (typeof val === 'string') val = val.trim()

      return val ? '' : errMsg || defaultErrorMsg.REQUIRED
    }

    this.validator.push({
      name: 'requiredValidate',
      fn: requiredValidate,
    })

    return this
  },

  number(errMsg) {
    const numberValidate = (val) => {
      return !/[^\d]/gm.test(val) ? '' : errMsg || defaultErrorMsg.NUMBER
    }

    this.validator.push({
      name: 'numberValidate',
      fn: numberValidate,
    })

    return this
  },

  email(errMsg) {
    const emailValidate = (val) => {
      // eslint-disable-next-line no-useless-escape
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)
        ? ''
        : errMsg || defaultErrorMsg.EMAIL
    }

    this.validator.push({
      name: 'emailValidate',
      fn: emailValidate,
    })

    return this
  },

  minLength({ errMsg = '', min = 0 }) {
    const minLengthValidate = (val) => {
      val = val.trim()

      return val.length >= min ? '' : errMsg || defaultErrorMsg.MIN_LENGTH(min)
    }

    this.validator.push({
      name: 'minLengthValidate',
      fn: minLengthValidate,
    })

    return this
  },

  maxLength({ errMsg = '', max = 0 }) {
    const maxLengthValidate = (val) => {
      val = val.trim()

      return val.length <= max ? '' : errMsg || defaultErrorMsg.MAX_LENGTH(max)
    }

    this.validator.push({
      name: 'maxLengthValidate',
      fn: maxLengthValidate,
    })

    return this
  },

  checkLength({ errMsg = '', len = 0 }) {
    const checkLengthValidate = (val) => {
      val = val.trim()

      return val.length === len ? '' : errMsg || defaultErrorMsg.CHECK_LENGTH(len)
    }

    this.validator.push({
      name: 'checkLengthValidate',
      fn: checkLengthValidate,
    })

    return this
  },

  minValue({ errMsg = '', min = 0 }) {
    const minLengthValidate = (val) => {
      val = +`${val}`.replace(/,/g, '') || 0

      return val >= min ? '' : errMsg || defaultErrorMsg.MIN_VALUE(min)
    }

    this.validator.push({
      name: 'minLengthValidate',
      fn: minLengthValidate,
    })

    return this
  },

  maxValue({ errMsg = '', max = 0 }) {
    const maxLengthValidate = (val) => {
      val = +`${val}`.replace(/,/g, '') || 0

      return val <= max ? '' : errMsg || defaultErrorMsg.MAX_VALUE(max)
    }

    this.validator.push({
      name: 'maxLengthValidate',
      fn: maxLengthValidate,
    })

    return this
  },

  whiteSpace(errMsg) {
    const whiteSpaceValidate = (val) => {
      return !/\s/.test(val) ? '' : errMsg || defaultErrorMsg.WHITESPACE
    }

    this.validator.push({
      name: 'whiteSpaceValidate',
      fn: whiteSpaceValidate,
    })

    return this
  },

  notThai(errMsg) {
    const notThaiValidate = (val) => {
      return !/[\u0E00-\u0E7F]/gmu.test(val) ? '' : errMsg || defaultErrorMsg.NOTTHAI
    }

    this.validator.push({
      name: 'notThaiValidate',
      fn: notThaiValidate,
    })

    return this
  },

  isMatch({ errMsg = '', field = '' }) {
    const isMatchValidate = (val, data) => {
      return val === data[field] ? '' : errMsg || defaultErrorMsg.ISMATCH
    }

    this.validator.push({
      name: 'isMatchValidate',
      fn: isMatchValidate,
    })

    return this
  },

  engAlphabetOrNumeric(errMsg) {
    const engAlphabetOrNumericValidate = (val) => {
      return !/[^a-zA-Z0-9]/gm.test(val) ? '' : errMsg || defaultErrorMsg.ISENGALPHABETORNUMERIC
    }

    this.validator.push({
      name: 'engAlphabetOrNumericValidate',
      fn: engAlphabetOrNumericValidate,
    })

    return this
  },

  upperCaseEngAlphabet(errMsg) {
    const upperCaseEngAlphabetValidate = (val) => {
      return /[A-Z]/gm.test(val) ? '' : errMsg || defaultErrorMsg.UPPERCASE_ENG_ALPHABET
    }

    this.validator.push({
      name: 'upperCaseEngAlphabetValidate',
      fn: upperCaseEngAlphabetValidate,
    })

    return this
  },

  lowerCaseEngAlphabet(errMsg) {
    const lowerCaseEngAlphabetValidate = (val) => {
      return /[a-z]/gm.test(val) ? '' : errMsg || defaultErrorMsg.LOWERCASE_ENG_ALPHABET
    }

    this.validator.push({
      name: 'lowerCaseEngAlphabetValidate',
      fn: lowerCaseEngAlphabetValidate,
    })

    return this
  },

  engAlphabetNumericOrUnderscore(errMsg) {
    const engAlphabetNumericOrUnderscoreValidate = (val) => {
      return !/[^a-zA-Z0-9_]/gm.test(val)
        ? ''
        : errMsg || defaultErrorMsg.IS_ENGALPHABETOR_NUMERIC_UNDERSCORE
    }

    this.validator.push({
      name: 'engAlphabetNumericOrUnderscoreValidate',
      fn: engAlphabetNumericOrUnderscoreValidate,
    })

    return this
  },

  specialCharacter(errMsg) {
    const specialCharacterValidate = (val) => {
      return /[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]+/gm.test(val)
        ? ''
        : errMsg || defaultErrorMsg.IS_SPECIAL_CHARACTER
    }

    this.validator.push({
      name: 'specialCharacterValidate',
      fn: specialCharacterValidate,
    })

    return this
  },

  noSpecialCharacter(errMsg) {
    const specialCharacterValidate = (val) => {
      return !/[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]+/gm.test(val)
        ? ''
        : errMsg || defaultErrorMsg.NO_SPECIAL_CHARACTER
    }

    this.validator.push({
      name: 'specialCharacterValidate',
      fn: specialCharacterValidate,
    })

    return this
  },

  username(errMsg) {
    const usernameValidate = (val) => {
      return !/[^a-zA-Z0-9_.]/gm.test(val)
        ? ''
        : errMsg || defaultErrorMsg.IS_ENGALPHABETOR_NUMERIC_DOT_UNDERSCORE
    }

    this.validator.push({
      name: 'usernameValidate',
      fn: usernameValidate,
    })

    return this
  },

  password(errMsg) {
    const passwordValidate = (val) => {
      return /^(.{8,18})$/.test(val) &&
        /(?=.*[A-Z])/.test(val) &&
        /(?=.*[a-z])/.test(val) &&
        /(?=.*[0-9])/.test(val) &&
        // /(?=.*[-!@#$%^&*()_+={};|,.<>?~])/.test(val) &&
        /^[-!@#$%^&*()_+={};|,.<>?~a-zA-Z0-9]+$/.test(val)
        ? ''
        : errMsg || defaultErrorMsg.PASSWORD
    }

    this.validator.push({
      name: 'passwordValidate',
      fn: passwordValidate,
    })

    return this
  },

  passwordOrigin(errMsg) {
    const passwordValidate = (val) => {
      return /^(.{8,18})$/.test(val) &&
        /(?=.*[A-Z])/.test(val) &&
        /(?=.*[a-z])/.test(val) &&
        /(?=.*[0-9])/.test(val) &&
        /(?=.*[-!@#$%^&*()_+={};|,.<>?~\\[\]':"])/.test(val) &&
        /^[-!@#$%^&*()_+={};|,.<>?~\\[\]':"a-zA-Z0-9]+$/.test(val)
        ? ''
        : errMsg || defaultErrorMsg.PASSWORD
    }

    this.validator.push({
      name: 'passwordValidate',
      fn: passwordValidate,
    })

    return this
  },

  isPhoneNumber({ prefix = '06|08|09', quantifiers = 8, errMsg } = {}) {
    const isPhoneNumberValidate = (val) => {
      const rangeNumber = Number.isInteger(quantifiers)
        ? quantifiers
        : Array.isArray
        ? quantifiers.join(',')
        : 8
      const phoneNumberPattern = new RegExp('^' + prefix + '\\d{' + rangeNumber + '}$')

      return phoneNumberPattern.test(val) ? '' : errMsg || defaultErrorMsg.IS_PHONE_NUMBER
    }

    this.validator.push({
      name: 'isPhoneNumberValidate',
      fn: isPhoneNumberValidate,
    })

    return this
  },

  date(errMsg) {
    const dateValidate = (val) => {
      const input = {
        date: val.slice(0, 2),
        month: val.slice(3, 5),
        year: val.slice(6, 10),
      }
      const invalid = {
        date: false,
        month: false,
        year: false,
      }

      // Check date
      if (input.date.length === 2 && (input.date < 1 || input.date > 31)) {
        invalid.date = true
      }

      // Check month
      if (input.month.length === 2 && (input.month < 1 || input.month > 12)) {
        invalid.month = true
      }

      // Check year
      if (input.year.length === 4 && (input.year < 1900 || input.year > new Date().getFullYear())) {
        invalid.year = true
      }

      return invalid.date || invalid.month || invalid.year || val.length !== 10
        ? errMsg || defaultErrorMsg.INVALID_DATE_FORMAT
        : ''
    }

    this.validator.push({
      name: 'dateValidate',
      fn: dateValidate,
    })

    return this
  },
})
