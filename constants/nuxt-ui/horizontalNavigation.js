export default {
  wrapper: 'navigation-horizontal-wrapper relative w-full flex items-center justify-between',
  container: 'flex items-center min-w-0',
  inner: 'min-w-0',
  base: 'navigation-menu group relative w-full flex items-center gap-1.5 px-2.5 py-3.5 rounded-md font-medium text-sm focus:outline-none focus-visible:outline-none focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-primary-400 disabled:cursor-not-allowed disabled:opacity-75',
  before:
    'before:absolute before:inset-x-0 before:inset-y-2 before:inset-px before:rounded-md hover:before:bg-gray-50 hover:before:bg-gray-800/50',
  after: 'after:absolute after:bottom-0 after:inset-x-2.5 after:block after:h-[2px] after:mt-2',
  active: 'navigation-active',
  inactive: '',
  label: 'truncate relative',
  icon: {
    base: 'navigation-icon flex-shrink-0 w-6 h-6 relative',
    active: '',
    inactive: '',
  },
}
