import Vue from 'vue'
import Router from 'vue-router'
import rootRouter from './modules/root-router'
import { ROOT_PATH, ASSIST_ROUTER, ROOT_ROUTER } from '@/config'

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
    let verify = true
    let message = ''
    // if (to.name === ROOT_ROUTER.callNumber.name) {
    //   message = '检查 token | userid 参数'
    //   verify = to.query.token && to.query.userid ? true : false
    // } else if (to.name === ROOT_ROUTER.faceTime.name) {
    //   message = '检查 token | userid | callnumer | staffuser 参数'
    //   verify =
    //     to.query.token &&
    //     to.query.userid &&
    //     to.query.staffuser &&
    //     to.query.callnumer
    //       ? true
    //       : false
    // }
    if (!verify) {
      next({
        name: ASSIST_ROUTER.error.name
      })
      Vue.prototype.$notify.error({
        title: '无权限访问',
        message: '检查 token | userid 参数',
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
