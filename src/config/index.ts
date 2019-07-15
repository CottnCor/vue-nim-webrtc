export {
  IS_MOCK,
  ONLINE_HOST,
  QA_HOST,
  MOCK_HOST,
  CURRENT_HOST
} from './modules/api-config'

export { APP_PRAMS } from './modules/app-config'

export {
  AXIOS_DEFAULT_CONFIG,
  API_DEFAULT_CONFIG,
  CONMOM_PRAMS
} from './modules/http-config'

export { ROOT_PATH, ROOT_ROUTER, ASSIST_ROUTER } from './modules/router-config'

export { MAP_URL, MAP_ZOOM, MAP_CENTER, MAP_BOUND } from './modules/map-config'

export { NIM_CONFIG } from './modules/nim-config'

// 平台
export const HOST_PLATFORM = 'WEB'

// 环境
export const NODE_ENV = process.env.NODE_ENV || 'prod'

// 是否生产环境
export const IS_PROD = process.env.NODE_ENV === 'production' ? true : false
