// app.config.ts
// Imports
import sidebarSetting from '~/constants/nuxt-ui/sidebarSetting'
import button from '~/constants/nuxt-ui/button'
import card from '~/constants/nuxt-ui/card'
import modal from '~/constants/nuxt-ui/modal'
import input from '~/constants/nuxt-ui/input'
import formGroup from '~/constants/nuxt-ui/formGroup'
import select from '~/constants/nuxt-ui/select'
import popover from '~/constants/nuxt-ui/popover'
import verticalNavigation from '~/constants/nuxt-ui/verticalNavigation'
import horizontalNavigation from '~/constants/nuxt-ui/horizontalNavigation'

export default defineAppConfig({
  sidebarSetting,
  ui: {
    button,
    card,
    modal,
    input,
    formGroup,
    select,
    popover,
    verticalNavigation,
    horizontalNavigation,
  },
})
