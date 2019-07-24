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
    props: route => ({
      token: route.query.token,
      userid: route.query.userid,
      username: route.query.username
    }),
    meta: {
      icon: '',
      keepAlive: true,
      navigable: true,
      title: ROOT_ROUTER.faceTime.title
    }
  },
  {
    path: ROOT_PATH + ROOT_ROUTER.callNumber.name,
    name: ROOT_ROUTER.callNumber.name,
    component: () => import('@/views/call-number/CallNumber.vue'),
    props: route => ({
      token: route.query.token,
      userid: route.query.userid,
      username: route.query.username
    }),
    meta: {
      icon: '',
      keepAlive: true,
      navigable: true,
      title: ROOT_ROUTER.callNumber.title
    }
  }
]

export default rootRouter
