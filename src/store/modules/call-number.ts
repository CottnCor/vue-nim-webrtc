import { ActionTree, GetterTree, MutationTree } from 'vuex'

interface CallNumberStore {
  token: string,
  userid: number
}

const namespaced = true

const state: CallNumberStore = {
  token: "",
  userid: -1,
}

const getters: GetterTree<CallNumberStore, any> = {
  token: (state: CallNumberStore) => state.token,
  userid: (state: CallNumberStore) => state.userid
}

const actions: ActionTree<CallNumberStore, any> = {
  set_token({ commit }, data?: string) {
    commit('update_token', data)
  },
  set_userid({ commit }, data?: number) {
    commit('update_userid', data)
  }
}

const mutations: MutationTree<CallNumberStore> = {
  update_token(state: CallNumberStore, data: string) {
    state.token = data
  },
  update_userid(state: CallNumberStore, data: number) {
    state.userid = data
  }
}

export default {
  state,
  actions,
  getters,
  mutations,
  namespaced
}
