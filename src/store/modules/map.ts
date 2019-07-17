import { ActionTree, GetterTree, MutationTree } from 'vuex'

import { LatLng, latLng } from "leaflet";

import { MAX_PANTO_TIMES } from "@/config";

interface MapStore {
  panto: number,
  track: any,
  coord: LatLng
}

const namespaced = true

const state: MapStore = {
  panto: MAX_PANTO_TIMES,
  track: null,
  coord: latLng(0, 0)
}

const getters: GetterTree<MapStore, any> = {
  panto: (state: MapStore) => state.panto,
  track: (state: MapStore) => state.track,
  coord: (state: MapStore) => state.coord,
}

const actions: ActionTree<MapStore, any> = {
  set_panto({ commit }, data: number) {
    commit('update_panto', data)
  },
  set_track({ commit }, data: any) {
    commit('update_track', data)
  },
  set_coord({ commit }, data: LatLng) {
    commit('update_coord', data)
  },
}

const mutations: MutationTree<MapStore> = {
  update_panto(state: MapStore, data: number) {
    state.panto = data
  },
  update_track(state: MapStore, data: any) {
    state.track = data
  },
  update_coord(state: MapStore, data: LatLng) {
    state.coord = data
  }
}

export default {
  state,
  actions,
  getters,
  mutations,
  namespaced
}
