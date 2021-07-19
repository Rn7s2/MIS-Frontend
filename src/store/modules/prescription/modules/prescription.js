/*
 * 约定: store中的fetchXXX都是指从后端请求XXX，
 *      getXXX都是指从store中取数据
 */

import {
  addPrescription,
  getPrescriptionList,
  deletePrescription,
  getPrescriptionByID
} from '@/api/prescription'

export default {
  namespaced: true,
  state: {
    prescriptionList: [],
    prescriptionData: {}
  },
  mutations: {
    fetchPrescriptionListData (state) {
      getPrescriptionList().then(res => {
        state.prescriptionList = res
      })
    },
    fetchPrescriptionByIDData (state, data) {
      getPrescriptionByID(data).then(res => {
        state.prescriptionData = res
      })
    },
    addPrescriptionData (state, data) {
      addPrescription(data)
    },
    deletePrescriptionData (state, data) {
      deletePrescription(data)
    }
  },
  getters: {
    getPrescriptionListData: state => {
      return state.prescriptionList
    },
    getPrescriptionByIDData: state => {
      return state.prescriptionData
    }
  }
}
