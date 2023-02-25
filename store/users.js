import { get, searchBySlugWith } from '../api/users'

export const state = () => ({
  users: [],
})

export const getters = {
  search: (state) => (search) => searchBySlugWith(state.users, search),
}

export const mutations = {
  setUsers(state, users) {
    Vue.set(state, 'users', users)
  },
}

export const actions = {
  async getUser({ state, commit, getters }, search) {
    if (state.users.length === 0) {
      commit('setUsers', await get())
    }
    return getters.search(search)
  },
}
