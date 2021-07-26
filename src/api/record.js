import {
  request
} from '@/api/service'

export function getAllTemplate () {
  return request({
    url: '/record/getAllTemplate.lisp',
    method: 'get'
  })
}

// data里面的id没有用
export function modifyTemplate (data) {
  return request({
    url: '/record/modifyTemplate.lisp',
    method: 'post',
    data: data
  })
}

export function addTemplate (data) {
  return request({
    url: '/record/addTemplate.lisp',
    method: 'post',
    data: data
  })
}

export function deleteTemplate (data) {
  return request({
    url: '/record/deleteTemplate.lisp',
    method: 'post',
    data: data
  })
}

export function addRecord (data) {
  return request({
    url: '/record/addRecord.lisp',
    method: 'post',
    data: data
  })
}

export function getRecordList () {
  return request({
    url: '/record/getRecordList.lisp',
    method: 'get'
  })
}

export function getRecordByID (data) {
  return request({
    url: '/record/getRecordByID.lisp',
    method: 'post',
    data: data
  })
}

export function modifyRecordByID (data) {
  return request({
    url: '/record/modifyRecordByID.lisp',
    method: 'post',
    data: data
  })
}

export function deleteRecordByID (data) {
  return request({
    url: '/record/deleteRecordByID.lisp',
    method: 'post',
    data: data
  })
}
