/*
 * 约定: store中的fetchXXX都是指从后端请求XXX，
 *       getter.getXXX都是指从store中取数据
 */

import {
  getAllTemplate,
  modifyTemplate,
  addTemplate,
  deleteTemplate,
  addRecord,
  getRecordByID,
  getRecordList,
  modifyRecordByID,
  deleteRecordByID
} from '@/api/record'

export default {
  namespaced: true,
  state: {
    templateData: [],
    recordList: [],
    recordText: ''
  },
  mutations: {
    fetchTemplateData (state) {
      getAllTemplate().then(res => {
        state.templateData = res
      })
    },
    modifyTemplateData (state, data) {
      modifyTemplate(data)
    },
    addTemplateData (state, data) {
      addTemplate(data)
    },
    deleteTemplateData (state, data) {
      deleteTemplate(data)
    },
    addRecordData (state, data) {
      addRecord(data)
    },
    fetchRecordListData (state) {
      getRecordList().then(res => {
        state.recordList = res
      })
    },
    fetchRecordByIDData (state, data) {
      getRecordByID(data).then(res => {
        state.recordText = res
      })
    },
    modifyRecordByIDData (state, data) {
      modifyRecordByID(data)
    },
    deleteRecordByIDData (state, data) {
      deleteRecordByID(data)
    }
  },
  getters: {
    getAllTemplateData: state => {
      return state.templateData
    },
    getRecordListData: state => {
      return state.recordList
    },
    getRecordByIDData: state => {
      return state.recordText
    }
  }
}
