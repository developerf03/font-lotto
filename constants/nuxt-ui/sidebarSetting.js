export default {
  profile: [
    {
      key: 'notifications',
      title: 'noiceIcon',
      icon: { icon: 'notice' },
    },
    {
      key: 'faq',
      title: 'faq',
      icon: { icon: 'faq' },
    },
    {
      key: 'feedback',
      title: 'feedback',
      icon: { icon: 'feedback' },
    },
    {
      key: 'mytier',
      title: 'myTier',
      icon: { icon: 'tier' },
    },
    {
      key: 'coupon',
      title: 'myCoupons',
      icon: { icon: 'coupon' },
    },
    {
      key: 'promotion',
      title: 'myPromotion',
      icon: { icon: 'promotions' },
    },
    {
      key: 'accountmanagement',
      title: 'manageAccount',
      icon: { icon: 'account-management' },
      children: [
        {
          key: 'accountmanagement',
          title: 'manageBankAccount',
          icon: { icon: 'bank' },
        },
      ],
    },
    {
      key: 'changepassword',
      title: 'profile.changePassword',
      icon: { icon: 'change-password' },
    },
    {
      key: 'language',
      title: 'changeLanguage',
      icon: { icon: 'globe' },
    },
    {
      key: 'settings',
      title: 'settings',
      icon: { icon: 'setting' },
    },
    {
      key: 'logout',
      title: 'logout',
      icon: { icon: 'logout' },
    },
  ],
  menu: {
    section1: [
      {
        key: 'casino',
        title: 'casino',
        icon: { icon: 'category/casino' },
        to: '/categories/casino',
      },
      {
        key: 'sport',
        title: 'sport',
        icon: { icon: 'category/sports' },
        to: '/categories/sport',
      },
      {
        key: 'slot',
        title: 'slot',
        icon: { icon: 'category/slot' },
        to: '/categories/slot',
      },
      // { key: 'poker', title: 'Poker', icon: { icon: 'category/poker' }, to: '/categories/poker' },
      {
        key: 'categories',
        title: 'categories',
        icon: { icon: 'menu/game' },
        children: [
          {
            key: 'categories',
            title: 'arcade',
            icon: { icon: 'category/arcade' },
            to: '/categories/arcade',
          },
          {
            key: 'categories',
            title: 'fishing',
            icon: { icon: 'fishing' },
            to: '/categories/arcade/fishing',
          },
          {
            key: 'categories',
            title: 'table',
            icon: { icon: 'table' },
            to: '/categories/arcade/table',
          },
          {
            key: 'categories',
            title: 'crypto',
            icon: { icon: 'crypto' },
            to: '/categories/arcade/crypto',
          },
          {
            key: 'categories',
            title: 'crash',
            icon: { icon: 'crash' },
            to: '/categories/arcade/crash',
          },
          {
            key: 'categories',
            title: 'pvp',
            icon: { icon: 'pvp' },
            to: '/categories/arcade/pvp',
          },
        ],
      },
      {
        key: 'demo',
        title: 'demo',
        icon: { icon: 'demo' },
        to: '/categories/demo',
      },
      { key: 'partner', title: 'providers', icon: { icon: 'partner' } },
    ],
    section2: [
      {
        key: 'promotions',
        title: 'promotions',
        icon: { icon: 'promotions' },
      },
      {
        key: 'events',
        title: 'eventsSp',
        icon: { icon: 'event' },
      },
      { key: 'recently', title: 'recently', icon: { icon: 'recently' } },
      { key: 'favorites', title: 'favorites', icon: { icon: 'favorites' } },
    ],
    getMenu(path) {
      const section1 = this.section1.reduce(
        (prev, next) => [...prev, ...('children' in next ? next.children : [next])],
        [],
      )
      const section2 = this.section2.reduce(
        (prev, next) => [...prev, ...('children' in next ? next.children : [next])],
        [],
      )

      return (
        section1.find((v) =>
          'children' in v ? v.children.find((o) => o.to === path) : v.to === path,
        ) ||
        section2.find((v) =>
          'children' in v ? v.children.find((o) => o.to === path) : v.to === path,
        )
      )
    },
  },
}
