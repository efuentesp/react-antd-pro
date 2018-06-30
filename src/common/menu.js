import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: 'dashboard',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: 'Analysis',
        path: 'analysis',
      },
      {
        name: 'Monitoring',
        path: 'monitor',
      },
      {
        name: 'Workplace',
        path: 'workplace',
        // hideInBreadcrumb: true,
        // hideInMenu: true,
      },
    ],
  },
  {
    name: 'Form',
    icon: 'form',
    path: 'form',
    children: [
      {
        name: 'Basic form',
        path: 'basic-form',
      },
      {
        name: 'Step form',
        path: 'step-form',
      },
      {
        name: 'Advanced form',
        authority: 'admin',
        path: 'advanced-form',
      },
    ],
  },
  {
    name: 'List',
    icon: 'table',
    path: 'list',
    children: [
      {
        name: 'Table list',
        path: 'table-list',
      },
      {
        name: 'Basic list',
        path: 'basic-list',
      },
      {
        name: 'Card list',
        path: 'card-list',
      },
      {
        name: 'Search',
        path: 'search',
        children: [
          {
            name: 'Articles',
            path: 'articles',
          },
          {
            name: 'Projects',
            path: 'projects',
          },
          {
            name: 'Applications',
            path: 'applications',
          },
        ],
      },
    ],
  },
  {
    name: 'Profile',
    icon: 'profile',
    path: 'profile',
    children: [
      {
        name: 'Basics',
        path: 'basic',
      },
      {
        name: 'Advanced',
        path: 'advanced',
        authority: 'admin',
      },
    ],
  },
  {
    name: 'Result',
    icon: 'check-circle-o',
    path: 'result',
    children: [
      {
        name: 'Success',
        path: 'success',
      },
      {
        name: 'Fail',
        path: 'fail',
      },
    ],
  },
  {
    name: 'Exception',
    icon: 'warning',
    path: 'exception',
    children: [
      {
        name: '403',
        path: '403',
      },
      {
        name: '404',
        path: '404',
      },
      {
        name: '500',
        path: '500',
      },
      {
        name: 'Trigger',
        path: 'trigger',
        hideInMenu: true,
      },
    ],
  },
  {
    name: 'User',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    children: [
      {
        name: 'Login',
        path: 'login',
      },
      {
        name: 'Register',
        path: 'register',
      },
      {
        name: 'Result',
        path: 'register-result',
      },
    ],
  },
  {
    name: 'Afiliados',
    icon: 'user',
    path: 'afiliado',
    children: [
      {
        name: 'Crear',
        path: 'create',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
