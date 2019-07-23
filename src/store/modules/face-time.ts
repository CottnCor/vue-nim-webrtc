import { ActionTree, GetterTree, MutationTree } from 'vuex'

interface FaceTimeStore {
  token: string,
  callnumber: string,
  from: any,
  to: any,
  times: number,
  status: number,
}

const namespaced = true

const state: FaceTimeStore = {
  token: "",
  callnumber: "",
  from: null,
  to: null,
  times: 0,
  status: -1
}

const getters: GetterTree<FaceTimeStore, any> = {
  token: (state: FaceTimeStore) => state.token,
  callnumber: (state: FaceTimeStore) => state.callnumber,
  from: (state: FaceTimeStore) => state.from,
  to: (state: FaceTimeStore) => state.to,
  times: (state: FaceTimeStore) => state.times,
  status: (state: FaceTimeStore) => state.status
}

const actions: ActionTree<FaceTimeStore, any> = {
  set_token({ commit }, data?: string) {
    commit('update_token', data)
  },
  set_callnumber({ commit }, data?: string) {
    commit('update_callnumber', data)
  },
  set_from({ commit }, data?: any) {
    commit('update_from', data)
  },
  set_to({ commit }, data: any) {
    commit('update_to', data)
  },
  add_times({ commit }, data?: number) {
    commit('update_times', data)
  },
  set_status({ commit }, data: number) {
    commit('update_status', data)
  }
}

const mutations: MutationTree<FaceTimeStore> = {
  update_callnumber(state: FaceTimeStore, data: string) {
    state.callnumber = data
  },
  update_token(state: FaceTimeStore, data: string) {
    state.token = data
  },
  update_from(state: FaceTimeStore, data: any) {
    state.from = data
  },
  update_to(state: FaceTimeStore, data: any) {
    state.to = data
  },
  update_times(state: FaceTimeStore, data?: number) {
    state.times += data || 1
  },
  update_status(state: FaceTimeStore, data: number) {
    state.status = data
  }
}

export default {
  state,
  actions,
  getters,
  mutations,
  namespaced
}
