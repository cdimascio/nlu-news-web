import * as types from '../mutation.types'
import { analyze, lookupLocation } from '../../services/nlu'

const state = {
  analysis: null,
}

const getters = {}

const actions = {
  analyze({ commit, state }, url) {
    commit(types.NLU_REQUEST)
    return analyze(url).then(r => {
      commit(types.NLU_SUCCESS, r)
      return r
    })
  },

  lookup({ commit, state }, place) {
    console.log('lookup on place', place)
    commit(types.LOOKUP_LOCATION_REQUEST)
    return lookupLocation({ place }).then(r => {
      commit(types.LOOKUP_LOCATION_SUCCESS, r)
      return r
    })
  },

  analyzeAndLookup({ dispatch, commit, state }, url) {
    console.log('analyzeAndLookup store invoked', url)
    commit(types.ANALYZE_AND_LOOKUP_REQUEST)
    return dispatch('analyze', url).then(r => {
      console.log('analyze complete, lookup all start', r.entities)
      const entities = r.entities || []
      const set = new Set()
      const ps = entities
        .filter(e => {
          const name = (e.disambiguation && e.disambiguation.name) || e.text
          console.log('---', name)
          const visited = set.has(name)
          set.add(name)
          return !visited
        })
        .map(e => {
          const reshape = o => 
            Object.keys(o).reduce((r, k) => ({
              ...r,
              [k === 's' ? 'uri' : k]: o[k].value,
            }), {})
          const name = (e.disambiguation && e.disambiguation.name) || e.text
          return dispatch('lookup', name).then(r => ({
            db_pedia: reshape(r.results.bindings[0]),
            entity: e,
          }))
        })

      return Promise.all(ps).then(r => {
        const all = r.reduce((a, b) => a.concat(b), []) // a.concat(b.results.bindings), [])
        commit(types.ANALYZE_AND_LOOKUP_SUCCESS, all)
        console.log('lookup all done', all)
        return all
      })
    })
  },
}

const mutations = {
  [types.NLU_REQUEST](state) {
    state.analysis = null
  },

  [types.NLU_SUCCESS](state, analysis) {
    state.analysis = analysis
  },

  [types.NLU_FAILURE](state) {
    state.analysis = null
  },
  [types.LOOKUP_LOCATION_REQUEST](state) {},

  [types.LOOKUP_LOCATION_SUCCESS](state, result) {},

  [types.LOOKUP_LOCATION_FAILURE](state) {},

  [types.ANALYZE_AND_LOOKUP_REQUEST](state) {},

  [types.ANALYZE_AND_LOOKUP_SUCCESS](state, result) {},

  [types.ANALYZE_AND_LOOKUP_FAILURE](state) {},
}

export default {
  state,
  getters,
  actions,
  mutations,
}
