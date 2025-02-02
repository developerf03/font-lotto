export default {
  wrapper: 'base-input-wrapper relative',
  base: 'relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0',
  form: 'form-input',
  rounded: 'rounded-md',
  file: {
    base: 'file:mr-1.5 file:font-medium file:text-gray-500 file:text-gray-400 file:bg-transparent file:border-0 file:p-0 file:outline-none',
  },
  size: {
    '2xs': 'text-xs',
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-sm h-[38px]',
    lg: 'text-sm',
    xl: 'text-base',
  },
  gap: {
    '2xs': 'gap-x-1',
    xs: 'gap-x-1.5',
    sm: 'gap-x-1.5',
    md: 'gap-x-2',
    lg: 'gap-x-2.5',
    xl: 'gap-x-2.5',
  },
  padding: {
    '2xs': 'px-2 py-1',
    xs: 'px-2.5 py-1.5',
    sm: 'px-2.5 py-1.5',
    md: 'px-3 py-2',
    lg: 'px-3.5 py-2.5',
    xl: 'px-3.5 py-2.5',
  },
  leading: {
    padding: {
      '2xs': 'ps-7',
      xs: 'ps-8',
      sm: 'ps-9',
      md: 'ps-10',
      lg: 'ps-11',
      xl: 'ps-12',
    },
  },
  trailing: {
    padding: {
      '2xs': 'pe-7',
      xs: 'pe-8',
      sm: 'pe-9',
      md: 'pe-10',
      lg: 'pe-11',
      xl: 'pe-12',
    },
  },
  color: {},
  variant: {
    primary: 'primary-wrapper',
    none: 'bg-transparent focus:ring-0 focus:shadow-none',
  },
  icon: {
    base: 'flex-shrink-0 text-gray-400 text-gray-500',
    color: 'text-{color}-500 text-{color}-400',
    loading: 'animate-spin',
    size: {
      '2xs': 'h-4 w-4',
      xs: 'h-4 w-4',
      sm: 'h-5 w-5',
      md: 'h-5 w-5',
      lg: 'h-5 w-5',
      xl: 'h-6 w-6',
    },
    leading: {
      wrapper: 'absolute inset-y-0 start-0 flex items-center',
      pointer: 'pointer-events-none',
      padding: {
        '2xs': 'px-2',
        xs: 'px-2.5',
        sm: 'px-2.5',
        md: 'px-3',
        lg: 'px-3.5',
        xl: 'px-3.5',
      },
    },
    trailing: {
      wrapper: 'absolute inset-y-0 end-0 flex items-center',
      pointer: 'pointer-events-none',
      padding: {
        '2xs': 'px-2',
        xs: 'px-2.5',
        sm: 'px-2.5',
        md: 'px-3',
        lg: 'px-3.5',
        xl: 'px-3.5',
      },
    },
  },
  default: {
    size: 'md',
    variant: 'primary',
  },
}
