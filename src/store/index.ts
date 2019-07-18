import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

import _callNumberStore from './modules/call-number'

import _faceTimeStore from './modules/face-time'

import _mapStore from './modules/map'

export default new Vuex.Store({
  modules: {
    CallNumber: _callNumberStore,
    FaceTime: _faceTimeStore,
    Map: _mapStore
  }
})
