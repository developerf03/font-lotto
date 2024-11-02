export default {
  wrapper: 'relative flex items-center radio-wrapper cursor-pointer',
  container: 'flex items-center h-5',
  base: 'h-4 w-4 dark:checked:bg-current dark:checked:border-transparent disabled:opacity-50 disabled:cursor-not-allowed focus:ring-0 focus:ring-transparent focus:ring-offset-transparent',
  form: 'form-radio',
  color: 'text-red',
  background: 'bg-transparent cursor-pointer',
  border: 'border text-secondary rounded',
  ring: '',
  inner: 'ms-3 flex flex-col',
  label: 'text-base font-medium text-primary cursor-pointer',
  required: 'text-sm text-error',
  help: 'text-sm text-secondary',
  default: {
    color: 'primary',
  },
}
