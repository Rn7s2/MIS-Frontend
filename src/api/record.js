import {
  request
} from '@/api/service'

/// mock 开始
const Mock = require('mockjs')

function getAllTemplateMock () {
  return [
    {
      id: 1,
      name: '测试模板1',
      main_issue: '这里填写主诉',
      current_illness: '这里填写现病史',
      past_illness: '这里填写既往病史',
      family_illness: '这里填写家族史',
      check: '这里填写检查',
      main_diagnosis: '这里填写主要诊断',
      method: '1. 处理1\r\n2. 处理2\r\n3. 处理3',
      note: '这里填写医嘱'
    },
    {
      id: 2,
      name: '测试模板2',
      main_issue: '这里填写主诉',
      current_illness: '这里填写现病史',
      past_illness: '这里填写既往病史',
      family_illness: '这里填写家族史',
      check: '这里填写检查',
      main_diagnosis: '这里填写主要诊断',
      method: '这里填写处理',
      note: '这里填写医嘱'
    },
    {
      id: 3,
      name: '测试模板3',
      main_issue: '这里填写主诉',
      current_illness: '这里填写现病史',
      past_illness: '这里填写既往病史',
      family_illness: '这里填写家族史',
      check: '这里填写检查',
      main_diagnosis: '这里填写主要诊断',
      method: '这里填写处理',
      note: '这里填写医嘱'
    },
    {
      id: 4,
      name: '测试模板4',
      main_issue: '这里填写主诉',
      current_illness: '这里填写现病史',
      past_illness: '这里填写既往病史',
      family_illness: '这里填写家族史',
      check: '这里填写检查',
      main_diagnosis: '这里填写主要诊断',
      method: '这里填写处理',
      note: '这里填写医嘱'
    },
    {
      id: 5,
      name: '测试模板5',
      main_issue: '这里填写主诉',
      current_illness: '这里填写现病史',
      past_illness: '这里填写既往病史',
      family_illness: '这里填写家族史',
      check: '这里填写检查',
      main_diagnosis: '这里填写主要诊断',
      method: '这里填写处理',
      note: '这里填写医嘱'
    },
    {
      id: 6,
      name: '测试模板6',
      main_issue: '这里填写主诉',
      current_illness: '这里填写现病史',
      past_illness: '这里填写既往病史',
      family_illness: '这里填写家族史',
      check: '这里填写检查',
      main_diagnosis: '这里填写主要诊断',
      method: '这里填写处理',
      note: '这里填写医嘱'
    }
  ]
}

function modifyTemplateMock () {
  return 'Success'
}

function addTemplateMock () {
  return 'Success'
}

function deleteTemplateMock () {
  return 'Success'
}

function addRecordMock () {
  return 'Success'
}

function getRecordListMock () {
  return [
    {
      id: 1,
      patient: '测试病人1',
      date: '2021-07-15'
    },
    {
      id: 2,
      patient: '测试病人2',
      date: '2021-07-16'
    }
  ]
}

function getRecordByIDMock () {
  return '<p style="text-align: center;"> <span style="font-size: 24px;"><strong><span style="font-family: 宋体, SimSun;">临渭区杜桥办西岳社区卫生服务站门诊病历</span></strong></span><span style="font-size: 18px;"><strong><span style="font-family: 宋体, SimSun;"></span></strong><strong><span style="font-family: 宋体, SimSun;"><br/></span></strong></span> </p> <hr/> <table width="949"> <tbody> <tr class="firstRow"> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" width="137"> <span style="font-size: 18px;"><strong><span style="font-size: 18px; font-family: 宋体, SimSun;">日期：</span></strong> </span> </td> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" width="137"> 2021-07-18 </td> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" width="137"> <span style="font-size: 18px;"><strong><span style="font-size: 18px; font-family: 宋体, SimSun;">科别：</span></strong> </span> </td> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" width="137"> <span style="font-size: 18px;">全科</span> </td> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" width="137"> <span style="font-size: 18px;"><strong><span style="font-size: 18px; font-family: 宋体, SimSun;">就诊号：</span></strong> </span> </td> <td valign="top" style="border-color: rgb(255, 255, 255); word-break: break-all;" width="137"></td> </tr> </tbody> </table> <hr/> <table data-sort="sortDisabled" width="949"> <tbody> <tr class="firstRow"> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" width="97"> <span style="font-size: 18px;"><strong><span style="font-size: 18px; font-family: 宋体, SimSun;">姓名：</span></strong> </span> </td> <td valign="top" style="border-color: rgb(255, 255, 255); word-break: break-all;" width="97"> 测试者 </td> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" width="97"> <span style="font-size: 18px;"><strong><span style="font-size: 18px; font-family: 宋体, SimSun;">性别：</span></strong> </span> </td> <td valign="top" style="border-color: rgb(255, 255, 255); word-break: break-all;" width="97"> 男 </td> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" width="97"> <span style="font-size: 18px;"><strong><span style="font-size: 18px; font-family: 宋体, SimSun;">民族：</span></strong> </span> </td> <td valign="top" style="border-color: rgb(255, 255, 255); word-break: break-all;" width="97"> 汉 </td> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" width="97"> <span style="font-size: 18px;"><strong><span style="font-size: 18px; font-family: 宋体, SimSun;">年龄：</span></strong> </span> </td> <td valign="top" style="border-color: rgb(255, 255, 255); word-break: break-all;" width="97"> 15 </td> </tr> <tr> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" width="97"> <span style="font-size: 18px;"><strong><span style="font-size: 18px; font-family: 宋体, SimSun;">职业：</span></strong> </span> </td> <td valign="top" style="border-color: rgb(255, 255, 255); word-break: break-all;" width="97"> 无业 </td> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" rowspan="1" colspan="2"> <span style="font-size: 18px;"><strong><span style="font-size: 18px; font-family: 宋体, SimSun;">住址或联系方式：</span></strong> </span> </td> <td valign="top" rowspan="1" colspan="4" style="border-color: rgb(255, 255, 255); word-break: break-all;"></td> </tr> </tbody> </table> <hr/> <p> <span style="font-family: 宋体, SimSun; font-size: 18px;"></span> </p> <table> <tbody> <tr class="firstRow"> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" align="right" width="111"> <span style="font-size: 18px;"><strong><span style="font-size: 18px; font-family: 宋体, SimSun;">主诉：</span></strong> </span> </td> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" width="795"> 头疼 </td> </tr> <tr> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" align="right" width="111"> <span style="font-size: 18px;"><strong><span style="font-size: 18px; font-family: 宋体, SimSun;">现病史：</span></strong> </span> </td> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" width="795"> xxx </td> </tr> <tr> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" align="right" width="111"> <span style="font-size: 18px;"><strong><span style="font-size: 18px; font-family: 宋体, SimSun;">既往病史：</span></strong> </span> </td> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" width="795"> xxx </td> </tr> <tr> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" align="right" width="111"> <span style="font-size: 18px;"><strong><span style="font-size: 18px; font-family: 宋体, SimSun;">家族史：</span></strong></span> </td> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" width="795"> xxx </td> </tr> <tr> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" align="right" width="111"> <span style="font-size: 18px;"><strong><span style="font-size: 18px; font-family: 宋体, SimSun;">体格检查：</span></strong> </span> </td> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" width="795"> xxx </td> </tr> <tr> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" align="right" width="111"> <span style="font-size: 18px;"><strong><span style="font-size: 18px; font-family: 宋体, SimSun;">主要诊断：</span></strong> </span> </td> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" width="795"> <p> xxx </p> </td> </tr> <tr> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" align="right" width="111"> <span style="font-size: 18px;"><strong><span style="font-size: 18px; font-family: 宋体, SimSun;">处理意见：</span></strong> </span> </td> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" width="795"> <p> xxx </p> </td> </tr> <tr> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" align="right" width="111"> <span style="font-size: 18px;"><strong><span style="font-size: 18px; font-family: 宋体, SimSun;">医嘱：</span></strong> </span> </td> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" width="795"> xxx </td> </tr> </tbody> </table> <hr/> <p style="text-align: right;"> <span style="font-size: 18px;"><strong>医师：xxx&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</strong></span><strong>&nbsp;</strong> </p>'
}

function modifyRecordByIDMock () {
  return 'Success'
}

function deleteRecordByIDMock () {
  return 'Success'
}

Mock.mock('/api/record/getAllTemplate', 'get', getAllTemplateMock)
Mock.mock('/api/record/modifyTemplate', 'post', modifyTemplateMock)
Mock.mock('/api/record/addTemplate', 'post', addTemplateMock)
Mock.mock('/api/record/deleteTemplate', 'post', deleteTemplateMock)
Mock.mock('/api/record/addRecord', 'post', addRecordMock)
Mock.mock('/api/record/getRecordList', 'get', getRecordListMock)
Mock.mock('/api/record/getRecordByID', 'post', getRecordByIDMock)
Mock.mock('/api/record/modifyRecordByID', 'post', modifyRecordByIDMock)
Mock.mock('/api/record/deleteRecordByID', 'post', deleteRecordByIDMock)
/// mock 结束

/// 接口开始
// [ { id, name, content }, ... ]
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
