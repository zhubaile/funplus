// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: 'feedback',
    path: 'https://github.com/alibaba/ice',
    external: true,
    newWindow: true,
    icon: 'message',
  },
  {
    name: 'help',
    path: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'bangzhu',
  },
];

const asideMenuConfig = [
  {
    name: 'monitor',
    path: '/userdata', // 用户数据信息
    icon: 'yonghu',
  },
  {
    name: 'pay',
    path: '/pay', // 支付场景
    icon: 'yonghu',
    children: [
      {
        name: 'crossborder',
        path: '/pay/crossborder',
        // authority: 'admin',
      },
      {
        name: 'enterprise',
        path: '/pay/enterprise',
      },
      {
        name: 'submerchants',
        path: '/pay/submerchants',
      },
    ],
  },
  {
    name: '表格页',
    path: '/table',
    icon: 'table',
    children: [
      {
        name: 'basic',
        path: '/table/basic',
        // authority: 'admin',
      },
      {
        name: 'general',
        path: '/table/general',
        // authority: 'user',
      },
    ],
  },
  {
    name: '列表页',
    path: '/list',
    icon: 'copy',
    children: [
      {
        name: 'basic',
        path: '/list/basic',
      },
      {
        name: 'general',
        path: '/list/general',
      },
    ],
  },
  {
    name: 'profile',
    path: '/profile',
    icon: 'cascades',
    children: [
      {
        name: 'basic',
        path: '/profile/basic',
      },
      {
        name: 'terms',
        path: '/profile/general',
      },
    ],
  },
  {
    name: 'result',
    path: '/result',
    icon: 'edit2',
    children: [
      {
        name: 'success',
        path: '/result/success',
      },
      {
        name: 'fail',
        path: '/result/fail',
      },
    ],
  },
  {
    name: 'account',
    path: '/account',
    icon: 'person',
    children: [
      {
        name: 'setting',
        path: '/account/setting',
      },
    ],
  },

  {
    name: 'exception',
    path: '/exception',
    icon: 'gaojingxinxi',
    children: [
      {
        name: '204',
        path: '/exception/204',
      },
      {
        name: '403',
        path: '/exception/403',
      },
      {
        name: '404',
        path: '/exception/404',
      },
      {
        name: '500',
        path: '/exception/500',
      },
    ],
  },
];

export { headerMenuConfig, asideMenuConfig };
