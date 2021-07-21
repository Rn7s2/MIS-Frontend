import {
  request
} from '@/api/service'

/// mock 开始
const Mock = require('mockjs')

function addPrescriptionMock () {
  return 'Success'
}

function getPrescriptionListMock () {
  return [
    {
      id: 1,
      patient: '张三',
      date: '2021-07-10'
    },
    {
      id: 2,
      patient: '李四',
      date: '2021-07-11'
    },
    {
      id: 3,
      patient: '王五',
      date: '2021-07-12'
    }
  ]
}

function deletePrescriptionMock () {
  return 'Success'
}

function getPrescriptionByIDMock () {
  return {
    id: 2,
    recordID: 1,
    date: '2021-07-17',
    patient: {
      name: '李四',
      gender: '男',
      age: 25,
      diagnosis: '不知道啥病'
    },
    selectedMedicine: [
      {
        id: 1,
        number: 2
      },
      {
        id: 2,
        number: 1
      }
    ]
  }
}

function getPendingPrescriptionListMock () {
  return [
    {
      id: 2,
      recordID: 1,
      isHandled: 0,
      date: '2021-07-17',
      patient: {
        name: '李四',
        gender: '男',
        age: 25,
        diagnosis: '没啥毛病'
      },
      selectedMedicine: [
        {
          id: 1,
          number: 2
        },
        {
          id: 2,
          number: 1
        }
      ]
    }
  ]
}
/// mock 结束

/// 接口开始
export function getPrescriptionList () {
  return request({
    url: '/cgi-bin/prescription/getPrescriptionList',
    method: 'get'
  })
}

export function addPrescription (data) {
  return request({
    url: '/cgi-bin/prescription/addPrescription',
    method: 'post',
    data: data
  })
}

export function deletePrescription (data) {
  return request({
    url: '/cgi-bin/prescription/deletePrescription',
    method: 'post',
    data: data
  })
}

// data: { id }
/* response: {
  id,                   // 处方编号
  recordID,             // 所属病历编号
  isHandled,            // 是否已经出库
  date,
  patient: {
    name: '',
    gender: '男',
    age: 25,
    diagnosis: ''
  },
  selectedMedicine: []
}
*/
export function getPrescriptionByID (data) {
  return request({
    url: '/cgi-bin/prescription/getPrescriptionByID',
    method: 'post',
    data: data
  })
}

export function getPendingPrescriptionList () {
  return request({
    url: '/cgi-bin/prescription/getPendingPrescriptionList',
    method: 'get'
  })
}

export function handlePrescription (data) {
  return request({
    url: '/cgi-bin/prescription/handlePrescription',
    method: 'post',
    data: data
  })
}
