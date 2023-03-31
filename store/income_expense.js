import routeAPI from './router'

export const state = () => ({
  lists: []
})

export const getters = {
  lists: (state) => state.lists,
}

export const mutations = {
  setLists(state, data) {
    state.lists = data
  },
}

export const actions = {
  async loadData({ state, commit, dispatch }, group) {
    try {
      const url = routeAPI.income_expense.lists;
      let config = { headers: { Authorization: this.$auth.getToken('local') } }
      if (group) config.params = { group };
      const res = await this.$axios.$get(url, config);
      commit('setLists', res.payload)
      return res
    } catch (error) {
      const res = error.response.data || error
      return res
    }
  },

  async loadInfo({ state, commit, dispatch }, id) {
    try {
      const url = routeAPI.income_expense.info.replace('{:id}', id);
      let config = { headers: { Authorization: this.$auth.getToken('local') } }
      const res = await this.$axios.$get(url, config);
      return res
    } catch (error) {
      const res = error.response.data || error
      return res
    }
  },

  async create({ commit, dispatch }, form) {
    try {
      const url = routeAPI.income_expense.create;
      let config = { headers: { Authorization: this.$auth.getToken('local') } }
      const res = await this.$axios.$post(url, form, config);
      return res
    } catch (error) {
      const res = error.response.data || error
      return res
    }
  },

  async update({ commit, dispatch }, { id, form }) {
    try {
      const url = routeAPI.income_expense.update.replace('{:id}', id);
      let config = { headers: { Authorization: this.$auth.getToken('local') } }
      const res = await this.$axios.$put(url, form, config);
      return res
    } catch (error) {
      const res = error.response.data || error
      return res
    }
  },

  async delete({ commit, dispatch }, id) {
    try {
      const url = routeAPI.income_expense.delete.replace('{:id}', id);
      let config = { headers: { Authorization: this.$auth.getToken('local') } }
      const res = await this.$axios.$delete(url, config);
      return res
    } catch (error) {
      const res = error.response.data || error
      return res
    }
  },
}