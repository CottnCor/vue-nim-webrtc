import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

import _commonStore from './modules/common'

export default new Vuex.Store({
  modules: {
    Common: _commonStore
  }
})
