export default {
  base: 'btn-wrapper focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 w-full',
  font: 'font-medium',
  rounded: 'rounded-full',
  truncate: 'text-left break-all line-clamp-1',
  block: 'w-full flex justify-center items-center',
  inline: 'inline-flex items-center',
  size: {
    '2xs': 'btn-size-xs',
    xs: 'btn-size-xs',
    sm: 'btn-size-sm',
    md: 'btn-size-md',
    lg: 'btn-size-lg',
    xl: 'btn-size-xl',
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
  square: {
    '2xs': 'p-1',
    xs: 'p-1.5',
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5',
    xl: 'p-2.5',
  },
  variant: {
    solid: 'btn-solid',
    outline: 'btn-outline',
    tertiary: 'btn-tertiary',
    cancel: 'btn-cancel',
  },
  icon: {
    base: 'animation-none',
    loading: 'display-loading',
    size: {
      '2xs': 'h-4 w-4',
      xs: 'h-4 w-4',
      sm: 'h-5 w-5',
      md: 'h-5 w-5',
      lg: 'h-5 w-5',
      xl: 'h-6 w-6',
    },
  },
  default: {
    size: 'sm',
    variant: 'solid',
    loadingIcon: 'i-svg-spinners:3-dots-fade',
  },
}
