import {
  request
} from '@/api/service'

/// mock 数据生成开始
const Mock = require('mockjs')

function getAllMedicineMock () {
  return [
    {
      id: 1,
      name: '测试1',
      code: '00001',
      number: 17,
      unit: '个',
      price: 17.5,
      expiration: '2021-07-17',
      dosage: '每日一次，每次一片'
    },
    {
      id: 2,
      name: '测试2',
      code: '00002',
      number: 17,
      unit: '个',
      price: 17.5,
      expiration: '2021-07-17',
      dosage: '每日一次，每次一片'
    },
    {
      id: 3,
      name: '测试3',
      code: '00003',
      number: 17,
      unit: '个',
      price: 17.5,
      expiration: '2021-07-17',
      dosage: '每日一次，每次一片'
    }
  ]
}

function getHistoryByIDMock (data) {
  return {
    stockIn: 17,
    stockOut: 19,
    history: [
      {
        date: '2021-07-11',
        in: 5,
        out: 7
      },
      {
        date: '2021-07-12',
        in: 9,
        out: 9
      },
      {
        date: '2021-07-15',
        in: 9,
        out: 9
      },
      {
        date: '2021-07-16',
        in: 8,
        out: 10
      },
      {
        date: '2021-07-19',
        in: 9,
        out: 9
      }
    ]
  }
}

function getHistoryOverviewMock (data) {
  return [
    {
      id: 1,
      name: '测试药品1',
      code: '00001',
      price: 17.5,
      in: 17,
      out: 19
    }
  ]
}

function increaseMedicineNumberMock (data) {
  return 'Success'
}

function modifyMedicineMock (form) {
  return 'Success'
}

function addMedicineMock (data) {
  return 'Success'
}
/// mock 数据生成结束

/// 接口开始
// [ { id, name,... }, ... ]
export function getAllMedicine () {
  return request({
    url: '/cgi-bin/medicine/getAllMedicine',
    method: 'get'
  })
}

// { stockIn, stockOut, history: [ { date, number }, ... ] }
export function getHistoryByID (data) {
  return request({
    url: '/cgi-bin/medicine/getHistoryByID',
    method: 'post',
    data: data
  })
}

// [ { id, name, code, price, in, out }, ... ]
export function getHistoryOverview (data) {
  return request({
    url: '/cgi-bin/medicine/getHistoryOverview',
    method: 'post',
    data: data
  })
}

export function increaseMedicineNumber (data) {
  return request({
    url: '/cgi-bin/medicine/increaseMedicine',
    method: 'post',
    data: data
  })
}

export function modifyMedicine (form) {
  return request({
    url: '/cgi-bin/medicine/modifyMedicine',
    method: 'post',
    data: {
      form: form
    }
  })
}

export function addMedicine (data) {
  return request({
    url: '/cgi-bin/medicine/addMedicine',
    method: 'post',
    data: data
  })
}
