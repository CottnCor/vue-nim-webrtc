import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

import _commonStore from './modules/common'

import _faceTimeStore from './modules/face-time'

export default new Vuex.Store({
  modules: {
    Common: _commonStore,
    FaceTime: _faceTimeStore
  }
})
