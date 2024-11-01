export default {
    wrapper: 'relative space-y-2 tabs-wrapper',
    container: 'relative w-full',
    base: 'focus:outline-none',
    list: {
      base: 'relative',
      background: 'card-secondary',
      rounded: 'rounded-lg',
      shadow: '',
      padding: 'p-1',
      height: 'h-10',
      width: 'w-full',
      marker: {
        wrapper: 'absolute top-[4px] left-[4px] duration-200 ease-out focus:outline-none',
        base: 'w-full h-full',
        background: 'tab-marker',
        rounded: 'rounded-md',
        shadow: 'shadow-sm'
      },
      tab: {
        base: 'relative inline-flex items-center justify-center flex-shrink-0 w-full ui-focus-visible:outline-0 ui-focus-visible:ring-2 ui-focus-visible:ring-primary-500 dark:ui-focus-visible:ring-primary-400 ui-not-focus-visible:outline-none focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 transition-colors duration-200 ease-out',
        background: '',
        active: 'tab-btn-active',
        inactive: 'tab-btn-inactive',
        height: 'h-8',
        padding: 'px-3',
        size: 'text-sm',
        font: 'font-medium',
        rounded: 'rounded-md',
        shadow: '',
        icon: 'w-4 h-4 flex-shrink-0 me-2'
      }
    }
  }
  