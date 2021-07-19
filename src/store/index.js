import Vue from 'vue'
import Vuex from 'vuex'

import d2admin from './modules/d2admin'
import medicine from './modules/medicine'
import record from './modules/record'
import prescription from './modules/prescription'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    d2admin,
    medicine,
    record,
    prescription
  }
})
