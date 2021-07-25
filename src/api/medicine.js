import {
  request
} from '@/api/service'

export function getAllMedicine () {
  return request({
    url: '/medicine/getAllMedicine.cgi',
    method: 'get'
  })
}

export function getHistoryByID (data) {
  return request({
    url: '/medicine/getHistoryByID.cgi',
    method: 'post',
    data: data
  })
}

export function getHistoryOverview (data) {
  return request({
    url: '/medicine/getHistoryOverview.cgi',
    method: 'post',
    data: data
  })
}

export function increaseMedicineNumber (data) {
  return request({
    url: '/medicine/increaseMedicine.cgi',
    method: 'post',
    data: data
  })
}

export function modifyMedicine (form) {
  return request({
    url: '/medicine/modifyMedicine.cgi',
    method: 'post',
    data: {
      form: form
    }
  })
}

export function addMedicine (data) {
  return request({
    url: '/medicine/addMedicine.cgi',
    method: 'post',
    data: data
  })
}
