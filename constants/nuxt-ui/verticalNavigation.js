export default {
  wrapper: 'navigation-wrapper relative',
  base: 'navigation-menu group relative flex items-center gap-1.5 focus:outline-none focus-visible:outline-none focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-1 focus-visible:before:ring-primary-500 focus-visible:before:ring-primary-400 before:absolute before:inset-px before:rounded-md disabled:cursor-not-allowed disabled:opacity-75',
  ring: 'focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-primary-400',
  padding: 'px-2.5 py-1.5',
  width: 'w-full',
  rounded: 'rounded-md',
  font: 'font-medium',
  size: 'text-sm',
  active: 'navigation-active',
  inactive: '',
  label: 'truncate relative',
  icon: {
    base: 'navigation-icon flex-shrink-0 w-6 h-6 relative',
    active: '',
    inactive: '',
  },
  divider: {
    wrapper: {
      base: 'p-2',
    },
  },
}
