import {
  request
} from '@/api/service'

export function getAllMedicine () {
  return request({
    url: '/medicine/getAllMedicine',
    method: 'get'
  })
}

export function getHistoryByID (data) {
  return request({
    url: '/medicine/getHistoryByID',
    method: 'post',
    data: data
  })
}

export function getHistoryOverview (data) {
  return request({
    url: '/medicine/getHistoryOverview',
    method: 'post',
    data: data
  })
}

export function increaseMedicineNumber (data) {
  return request({
    url: '/medicine/increaseMedicine',
    method: 'post',
    data: data
  })
}

export function modifyMedicine (form) {
  return request({
    url: '/medicine/modifyMedicine',
    method: 'post',
    data: {
      form: form
    }
  })
}

export function addMedicine (data) {
  return request({
    url: '/medicine/addMedicine',
    method: 'post',
    data: data
  })
}
