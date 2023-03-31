import routeAPI from './router'

export const actions = {

  async register({ state, commit, dispatch }, form) {
    try {
      const url = routeAPI.register;
      let config = { headers: { Authorization: this.$auth.getToken('local') } }
      const res = await this.$axios.$post(url, form, config);
      return res
    } catch (error) {
      const res = error.response.data || error
      return res
    }
  },

}