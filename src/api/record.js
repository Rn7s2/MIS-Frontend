import {
  request
} from '@/api/service'

export function getAllTemplate () {
  return request({
    url: '/record/getAllTemplate',
    method: 'get'
  })
}

// data里面的id没有用
export function modifyTemplate (data) {
  return request({
    url: '/record/modifyTemplate',
    method: 'post',
    data: data
  })
}

export function addTemplate (data) {
  return request({
    url: '/record/addTemplate',
    method: 'post',
    data: data
  })
}

export function deleteTemplate (data) {
  return request({
    url: '/record/deleteTemplate',
    method: 'post',
    data: data
  })
}

export function addRecord (data) {
  return request({
    url: '/record/addRecord',
    method: 'post',
    data: data
  })
}

export function getRecordList () {
  return request({
    url: '/record/getRecordList',
    method: 'get'
  })
}

export function getRecordByID (data) {
  return request({
    url: '/record/getRecordByID',
    method: 'post',
    data: data
  })
}

export function modifyRecordByID (data) {
  return request({
    url: '/record/modifyRecordByID',
    method: 'post',
    data: data
  })
}

export function deleteRecordByID (data) {
  return request({
    url: '/record/deleteRecordByID',
    method: 'post',
    data: data
  })
}
