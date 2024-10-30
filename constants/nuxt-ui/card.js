export default {
  wrapper: 'relative group overflow-hidden flex items-center rounded-lg',
  to: 'hover:ring-1 hover:ring-[--color-light] hover:ring-[--color-dark] hover:bg-gray-100/50 hover:bg-gray-800/50',
  icon: {
    base: 'w-6 h-6 mb-4 inline-flex items-center text-[--color-light] text-[--color-dark] pointer-events-none',
  },
  body: {
    base: 'flex-1',
  },
  externalIcon: {
    name: 'Test Card',
    base: 'w-4 h-4 absolute right-2 top-2 text-gray-400 text-gray-500 group-hover:text-[--color-light] group-hover:text-[--color-dark]',
  },
  title: 'text-gray-900 text-white font-semibold text-base my-0',
  description: 'text-[15px] text-gray-500 text-gray-400 mt-1 mb-0',
}
