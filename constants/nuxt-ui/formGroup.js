export default {
  wrapper: '',
  inner: '',
  label: {
    wrapper: 'base-form-wrapper flex content-center items-center justify-between',
    base: 'form-label block font-normal text-gray-700 text-gray-200',
    required: 'after:content-[\'*\'] after:ms-0.5 after:text-red-500 after:text-red-400',
  },
  size: {
    '2xs': 'text-base',
    xs: 'text-base',
    sm: 'text-base',
    md: 'text-base',
    lg: 'text-base',
    xl: 'text-base',
  },
  container: 'mt-1 relative',
  description: 'text-gray-500 text-gray-400',
  hint: 'text-gray-500 text-gray-400',
  help: 'mt-2 text-gray-500 text-gray-400',
  error: 'mt-[2px] text-sm form-text-error',
  default: {
    size: 'md',
  },
}
