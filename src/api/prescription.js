import {
  request
} from '@/api/service'

export function getPrescriptionList () {
  return request({
    url: '/prescription/getPrescriptionList.lisp',
    method: 'get'
  })
}

export function addPrescription (data) {
  return request({
    url: '/prescription/addPrescription.lisp',
    method: 'post',
    data: data
  })
}

export function deletePrescription (data) {
  return request({
    url: '/prescription/deletePrescription.lisp',
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
    url: '/prescription/getPrescriptionByID.lisp',
    method: 'post',
    data: data
  })
}

export function getPendingPrescriptionList () {
  return request({
    url: '/prescription/getPendingPrescriptionList.lisp',
    method: 'get'
  })
}

export function handlePrescription (data) {
  return request({
    url: '/prescription/handlePrescription.lisp',
    method: 'post',
    data: data
  })
}
