export default [
  // 工作台
  {
    'path': '/workplace',
    'name': 'Workplace',
    'redirect': '/workplace/dashboard',
    'meta': { title: '工作台', 'icon': 'gongzuotai' },
    'children': [
      {
        'path': 'dashboard',
        'name': 'Dashboard',
        'meta': { title: '仪表盘' }
      },
      {
        'path': 'analysis',
        'name': 'Analysis',
        'meta': { title: '分析页' }
      },
      {
        'path': 'monitor',
        'name': 'Monitor',
        'meta': { title: '监控页' }
      }
    ]
  },
  {
    'path': '/nested',
    'name': 'nested',
    'meta': { title: '路由嵌套', 'icon': 'nested' },
    'children': [
      {
        'path': 'menu1',
        'name': 'menu1',
        'meta': { title: '菜单1' },
        'children': [
          {
            'path': 'menu1-1',
            'name': 'menu1-1',
            'meta': { title: '菜单1-1' }
          },
          {
            'path': 'menu1-2',
            'name': 'menu1-2',
            'meta': { title: '菜单1-2' },
            'children': [
              {
                'path': 'menu1-2-1',
                'name': 'menu1-2-1',
                'meta': { title: '菜单1-2-1' }
              },
              {
                'path': 'menu1-2-2',
                'name': 'menu1-2-2',
                'meta': { title: '菜单1-2-2' }
              },
              {
                'path': 'menu1-2-3',
                'name': 'menu1-2-3',
                'meta': { title: '菜单1-2-3' }
              },
              {
                'path': 'menu1-2-4',
                'name': 'menu1-2-4',
                'meta': { title: '菜单1-2-4' }
              },
              {
                'path': 'menu1-2-5',
                'name': 'menu1-2-5',
                'meta': { title: '菜单1-2-5' }
              },
              {
                'path': 'menu1-2-6',
                'name': 'menu1-2-6',
                'meta': { title: '菜单1-2-6' }
              }
            ]
          },
          {
            'path': 'menu1-3',
            'name': 'menu1-3',
            'meta': { title: '菜单1-3' }
          }
        ]
      },
      {
        'path': 'menu2',
        'name': 'menu2',
        'meta': { title: '菜单2' }
      },
      {
        'path': 'menu3',
        'name': 'menu3',
        'meta': { title: '菜单3' }
      }
    ]
  },
  {
    'path': '/err',
    'name': 'err',
    'meta': { title: 'err', 'icon': 'err' },
    'children': [
      {
        'path': '403',
        'name': '403',
        'meta': { title: '403' }
      },
      {
        'path': '404',
        'name': '404',
        'meta': { title: '404' }
      },
      {
        'path': '500',
        'name': '500',
        'meta': { title: '500' }
      }
    ]
  },
  {
    'path': '/member',
    'name': 'member',
    'meta': { title: '菜单1', 'icon': 'member' }
  }
]
