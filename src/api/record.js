import {
  request
} from '@/api/service'

export function getAllTemplate () {
  return request({
    url: '/record/getAllTemplate.rkt',
    method: 'get'
  })
}

export function modifyTemplate (data) {
  return request({
    url: '/record/modifyTemplate.rkt',
    method: 'post',
    data: data
  })
}

// data里面的id没有用
export function addTemplate (data) {
  return request({
    url: '/record/addTemplate.rkt',
    method: 'post',
    data: data
  })
}

export function deleteTemplate (data) {
  return request({
    url: '/record/deleteTemplate.rkt',
    method: 'post',
    data: data
  })
}

export function addRecord (data) {
  return request({
    url: '/record/addRecord.rkt',
    method: 'post',
    data: data
  })
}

export function getRecordList () {
  return request({
    url: '/record/getRecordList.rkt',
    method: 'get'
  })
}

export function getRecordByID (data) {
  return request({
    url: '/record/getRecordByID.rkt',
    method: 'post',
    data: data
  })
}

export function modifyRecordByID (data) {
  return request({
    url: '/record/modifyRecordByID.rkt',
    method: 'post',
    data: data
  })
}

export function deleteRecordByID (data) {
  return request({
    url: '/record/deleteRecordByID.rkt',
    method: 'post',
    data: data
  })
}
