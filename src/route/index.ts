import Vue from 'vue'
import Router from 'vue-router'
import rootRouter from './modules/root-router'
import { ROOT_PATH, ASSIST_ROUTER } from '@/config'

Vue.use(Router)

const router = new Router({
  routes: [
    ...rootRouter,
    {
      path: ROOT_PATH + ASSIST_ROUTER.error.name,
      name: ASSIST_ROUTER.error.name,
      component: () => import('@/views/error-tips/ErrorTips.vue'),
      props: route => ({}),
      meta: {
        icon: '',
        keepAlive: true,
        navigable: false,
        title: ASSIST_ROUTER.error.title
      }
    },
    {
      path: ROOT_PATH + '*',
      redirect: ROOT_PATH + ASSIST_ROUTER.error.name
    }
  ],
  mode: 'history'
})

// 路由拦截
router.beforeEach((to: any, from: any, next: any) => {
  if (to.name === ASSIST_ROUTER.error.name) {
    next()
  } else {
    const verify = true
    if (!verify) {
      next({
        name: ASSIST_ROUTER.error.name
      })
      Vue.prototype.$notify.error({
        message: '缺少必备参数',
        description: '检查 XXXXXXX 等参数',
        duration: 0
      })
    } else {
      next()
    }
  }
})

router.afterEach((to: any) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
})

export default router
