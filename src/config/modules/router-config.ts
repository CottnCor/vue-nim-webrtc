import { APP_PRAMS } from './app-config'

export const ROOT_PATH = '/'

/*
 * 主菜单路由配置
 */
export const ROOT_ROUTER = {
  takeNumber: {
    name: 'take-number',
    label: '',
    icon: 'smile',
    title: APP_PRAMS.title
  },
  faceTime: {
    name: 'face-time',
    label: '',
    icon: 'smile',
    title: APP_PRAMS.title
  }
}

/**
 * 辅助菜单路由配置
 */
export const ASSIST_ROUTER = {
  login: {
    name: 'login',
    label: '',
    icon: '',
    title: '登陆验证' + ' | ' + APP_PRAMS.title
  },
  error: {
    name: 'error',
    label: '',
    icon: '',
    title: '出错了 ～(　TロT)σ' + ' | ' + APP_PRAMS.title
  }
}
