/*
 * 约定: store中的fetchXXX都是指从后端请求XXX，
 *      getXXX都是指从store中取数据
 */

import {
  getAllMedicine,
  getHistoryByID,
  getHistoryOverview,
  increaseMedicineNumber,
  modifyMedicine,
  addMedicine
} from '@/api/medicine'

export default {
  namespaced: true,
  state: {
    medicine: [],
    historyData: {},
    historyOverview: []
  },

  mutations: {
    fetchMedicineData (state) {
      getAllMedicine().then(res => {
        state.medicine = res
      })
    },
    fetchHistoryData (state, data) {
      getHistoryByID(data).then(res => {
        state.historyData = res
      })
    },
    fetchHistoryOverview (state, data) {
      getHistoryOverview(data).then(res => {
        state.historyOverview = res
      })
    },
    increaseMedicineData (state, data) {
      increaseMedicineNumber(data)
    },
    modifyMedicineData (state, form) {
      modifyMedicine(form)
    },
    addMedicineData (state, data) {
      addMedicine(data)
    }
  },
  getters: {
    getAllMedicine: state => {
      return state.medicine
    },
    getHistoryData: state => {
      return state.historyData
    },
    getHistoryOverview: state => {
      return state.historyOverview
    }
  }
}
