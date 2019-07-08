import { ROOT_PATH, ROOT_ROUTER } from '@/config'

/**
 * meta 可配置参数
 * @param {boolean} icon 页面icon
 * @param {boolean} keepAlive 是否缓存页面
 * @param {string} title 页面标题
 */
const rootRouter = [
  {
    path: ROOT_PATH,
    redirect: ROOT_PATH + ROOT_ROUTER.faceTime.name
  },
  {
    path: ROOT_PATH + ROOT_ROUTER.faceTime.name,
    name: ROOT_ROUTER.faceTime.name,
    component: () => import('@/views/face-time/FaceTime.vue'),
    props: route => ({}),
    meta: {
      icon: '',
      keepAlive: true,
      navigable: true,
      title: ROOT_ROUTER.faceTime.title
    }
  },
  {
    path: ROOT_PATH + ROOT_ROUTER.takeNumber.name,
    name: ROOT_ROUTER.takeNumber.name,
    component: () => import('@/views/take-number/TakeNumber.vue'),
    props: route => ({}),
    meta: {
      icon: '',
      keepAlive: true,
      navigable: true,
      title: ROOT_ROUTER.takeNumber.title
    }
  }
]

export default rootRouter
