import Vue from 'vue'
import { banner, types, page } from '../api'

export const strict = false

export const plugins = [
  (store) => {
    if (process.server) return
    const setBreakpoint = () => {
      const currentBp = store.state.breakpoint
      let newBp = 'base'
      const isBetween = (min, max) =>
        window.innerWidth >= min && window.innerWidth < max
      if (isBetween(480, 960)) {
        newBp = 'small'
      } else if (isBetween(960, 1440)) {
        newBp = 'medium'
      } else if (isBetween(1440, Infinity)) {
        newBp = 'large'
      }
      if (currentBp !== newBp) {
        store.commit('setBreakpoint', newBp)
      }
    }
    window.onNuxtReady(setBreakpoint)
    window.addEventListener('DOMContentLoaded', setBreakpoint)
    window.addEventListener('resize', setBreakpoint)
  },
]

export const state = () => ({
  types: {},
  pages: {},
  banner: [],
  breakpoint: 'base',
})

export const mutations = {
  setBannerData(state, data) {
    Vue.set(state, 'banner', data)
  },
  setBreakpoint(state, breakpoint) {
    state.breakpoint = breakpoint
  },
  setTypes(state, types) {
    Vue.set(state, 'types', types)
  },
  setPage(state, page) {
    Vue.set(state.pages, page.metadata.slug, page)
  },
}

export const actions = {
  async getBannerData({ commit }) {
    commit('setBannerData', await banner())
  },
  async getTypes({ commit }) {
    commit('setTypes', await types())
  },
  async getPage({ state, commit }, slug) {
    if (!(slug in state)) {
      commit('setPage', await page(slug))
    }
  },
}
