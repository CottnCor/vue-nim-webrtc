import { ActionTree, GetterTree, MutationTree } from 'vuex'

interface FaceTimeStore {
  times: number
  status: number,
  account: string
}

const namespaced = true

const state: FaceTimeStore = {
  times: 0,
  status: -1,
  account: ""
}

const getters: GetterTree<FaceTimeStore, any> = {
  times: (state: FaceTimeStore) => state.times,
  status: (state: FaceTimeStore) => state.status,
  account: (state: FaceTimeStore) => state.account,
}

const actions: ActionTree<FaceTimeStore, any> = {
  add_times({ commit }, data?: number) {
    commit('update_times', data)
  },
  set_status({ commit }, data: number) {
    commit('update_status', data)
  },
  set_account({ commit }, data: string) {
    commit('update_account', data)
  },
}

const mutations: MutationTree<FaceTimeStore> = {
  update_times(state: FaceTimeStore, data?: number) {
    state.times += data || 1
  },
  update_status(state: FaceTimeStore, data: number) {
    state.status = data
  },
  update_account(state: FaceTimeStore, data: string) {
    state.account = data
  }
}

export default {
  state,
  actions,
  getters,
  mutations,
  namespaced
}
