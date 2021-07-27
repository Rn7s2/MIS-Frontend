<template>
  <d2-container>
    <el-container>
      <template slot="header">
        <h3>添加处方</h3>
      </template>
      <el-dialog title="搜索与添加药品" :visible.sync="medicineDialogVisible" width="1000px">
        <el-input v-model="str" v-on:change="handleSearch" placeholder="输入名称或条码的一部分">
          <template slot="prepend">搜索：</template>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-table :data="searchTableData" stripe>
          <el-table-column prop="id" label="序号" width="50"></el-table-column>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="code" label="条码"></el-table-column>
          <el-table-column prop="number" label="数量" width="50"></el-table-column>
          <el-table-column prop="unit" label="单位" width="50"></el-table-column>
          <el-table-column prop="price" label="价格" width="50"></el-table-column>
          <el-table-column prop="expiration" label="保质期" width="95"></el-table-column>
          <el-table-column prop="dosage" label="用法用量"></el-table-column>
          <el-table-column fixed="right" label="操作" width="75">
          <template slot-scope="scope">
            <el-button @click="addMedicine(scope.row.id)" type="text" size="small">加入处方</el-button>
          </template>
          </el-table-column>
        </el-table>
      </el-dialog>
      <el-dialog title="输入数量" :visible.sync="numberDialogVisible">
        <el-form :model="numberDialogForm">
          <el-form-item label="数量">
            <el-input-number v-model="numberDialogForm.number" :min=1></el-input-number>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="numberDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleNumberDialogAccept">确定</el-button>
        </div>
      </el-dialog>
      <el-aside width="700px">
        处方预览：<br /><br />
        <d2-ueditor v-model="preview" />
      </el-aside>
      <el-main>
        处方信息：
        <el-form v-model="prescription.patient">
          <el-form-item label="姓名">
            <el-input v-model="prescription.patient.name" v-on:change="makePreview"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="prescription.patient.gender" v-on:change="makePreview">
              <el-option value="男"></el-option>
              <el-option value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年龄" v-on:change="makePreview">
            <el-input-number v-model="prescription.patient.age" :min=0 v-on:change="makePreview"></el-input-number>
          </el-form-item>
          <el-form-item label="诊断">
            <el-input v-model="prescription.patient.diagnosis" v-on:change="makePreview"></el-input>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker v-model="prescription.date" v-on:change="makePreview"></el-date-picker>
          </el-form-item>
        </el-form>
        <el-button @click="medicineDialogVisible = true" type="primary">搜索与添加药品</el-button><br /><br />
        选中的药品：
        <el-table :data="pendingTableData" stripe>
          <el-table-column prop="id" label="序号" width="50"></el-table-column>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="number" label="数量" width="50"></el-table-column>
          <el-table-column fixed="right" label="操作" width="50">
            <template slot-scope="scope">
              <el-popconfirm title="确定删除吗？" v-on:onConfirm="removeMedicine(scope.row.id)">
                <el-button slot="reference" type="text" size="small">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <br /><el-button @click="addPrescription" type="primary">添加处方</el-button>
  </d2-container>
</template>

<script>
import { GLOBAL_TIMEOUT } from '@/libs/timeout'
import { getLocaleISODateStringFromDate } from '@/libs/localdate'

export default {
  name: 'page2',
  data () {
    return {
      str: '',
      searchTableData: [],
      pendingTableData: [],
      medicineDialogVisible: false,
      prescription: {
        recordID: 0,
        patient: {
          name: '',
          gender: '男',
          age: 25,
          diagnosis: ''
        },
        date: new Date(),
        selectedMedicine: []
      },
      numberDialogVisible: false,
      numberDialogForm: {
        id: 0,
        number: 1
      },
      preview: '<p style="text-align: right;"><span style="font-family: 宋体, SimSun; font-size: 18px;">普通处方&nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; </span><span style="font-family: 宋体, SimSun;"><br/></span></p><p style="text-align: center;"><span style="font-family: 宋体, SimSun; font-size: 28px;"><strong>临渭区社区卫生服务中心（站）门诊处方笺</strong></span></p><table data-sort="sortDisabled" width="637"><tbody><tr class="firstRow"><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;">姓名：<br/></span></td><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;">性别：<br/></span></td><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;">年龄：<br/></span></td><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td></tr><tr><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;">费别:<br/></span></td><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;">科别：<br/></span></td><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;">时间：<br/></span></td><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td></tr><tr><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;">处方号：<br/></span></td><td style="border-color: rgb(0, 0, 0);" rowspan="1" colspan="2" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;">门诊号：<br/></span></td><td style="border-color: rgb(0, 0, 0);" rowspan="1" colspan="2" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td></tr><tr><td rowspan="1" colspan="1" style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;">诊断：<br/></span></td><td rowspan="1" colspan="5" style="border-color: rgb(0, 0, 0);" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td></tr></tbody></table><p><span style="font-size: 48px; font-family: 宋体, SimSun;"><strong>R</strong></span></p><table width="637"><tbody><tr class="firstRow"><td style="border-color: rgb(255, 255, 255);" width="636" valign="top"><span style="font-family: 宋体, SimSun; font-size: 24px;"><br/></span></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="636" valign="top"><span style="font-family: 宋体, SimSun; font-size: 24px;"><br/></span></td></tr></tbody></table><table width="637"><tbody><tr class="firstRow"><td style="border-color: rgb(255, 255, 255);" width="636" valign="top"><span style="font-family: 宋体, SimSun; font-size: 24px;"><br/></span></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="636" valign="top"><span style="font-family: 宋体, SimSun; font-size: 24px;"><br/></span></td></tr></tbody></table><table width="637"><tbody><tr class="firstRow"><td style="border-color: rgb(255, 255, 255);" width="636" valign="top"><span style="font-family: 宋体, SimSun; font-size: 24px;"><br/></span></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="636" valign="top"><span style="font-family: 宋体, SimSun; font-size: 24px;"><br/></span></td></tr></tbody></table><table width="637"><tbody><tr class="firstRow"><td style="border-color: rgb(255, 255, 255);" width="636" valign="top"><span style="font-family: 宋体, SimSun; font-size: 24px;"><br/></span></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="636" valign="top"><span style="font-family: 宋体, SimSun; font-size: 24px;"><br/></span></td></tr></tbody></table><table width="637"><tbody><tr class="firstRow"><td style="border-color: rgb(255, 255, 255);" width="636" valign="top"><span style="font-family: 宋体, SimSun; font-size: 24px;"><br/></span></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="636" valign="top"><span style="font-family: 宋体, SimSun; font-size: 24px;"><br/></span></td></tr></tbody></table><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p><table width="637"><tbody><tr class="firstRow"><td style="border-color: rgb(0, 0, 0);" width="159" valign="middle" align="center"><span style="font-family: 宋体, SimSun; font-size: 20px;">医师签名：<br/></span></td><td style="border-color: rgb(0, 0, 0);" width="133" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td><td style="border-color: rgb(0, 0, 0);" width="212" valign="middle" align="center"><span style="font-family: 宋体, SimSun; font-size: 20px;">审核调配药师：<br/></span></td><td style="border-color: rgb(0, 0, 0);" width="133" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td></tr><tr><td style="border-color: rgb(0, 0, 0);" width="159" valign="middle" align="center"><span style="font-family: 宋体, SimSun; font-size: 20px;">药品费：<br/></span></td><td style="border-color: rgb(0, 0, 0);" width="133" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td><td style="border-color: rgb(0, 0, 0);" width="212" valign="middle" align="center"><span style="font-family: 宋体, SimSun; font-size: 20px;">复核发药药师：<br/></span></td><td style="border-color: rgb(0, 0, 0);" width="133" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td></tr></tbody></table>'
    }
  },
  computed: {
    allMedicine () {
      return this.$store.getters['medicine/medicine/getAllMedicine']
    },
    allMedicineData () {
      return this.$store.getters['medicine/medicine/getAllMedicine']
    }
  },
  created () {
    this.updateMedicineData()
    this.prescription.recordID = this.$route.query.id
    this.prescription.patient = this.$route.query.patient
    this.makePreview()
  },
  methods: {
    handleSearch () {
      this.searchTableData = this.allMedicine.filter(p => {
        return (p.code.includes(this.str) || p.name.includes(this.str))
      })
    },
    isFormValid () {
      let flag = true
      if (this.prescription.patient.name === '') {
        flag = false
      }
      if (this.prescription.patient.gender === '') {
        flag = false
      }
      if (typeof (this.prescription.patient.age) === 'undefined') {
        flag = false
      }
      if (this.prescription.patient.dosage === '') {
        flag = false
      }
      if (this.prescription.selectedMedicine.length === 0) {
        flag = false
      }
      return flag
    },
    addMedicine (id) {
      function isExist (arr, v) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id === v) {
            return true
          }
        }
        return false
      }

      if (this.prescription.selectedMedicine.length >= 5) {
        this.$alert('处方中药品数量已达上限')
      } else {
        if (isExist(this.prescription.selectedMedicine, id)) {
          this.$alert('该药已经位于处方中')
        } else {
          this.numberDialogForm.id = id
          this.numberDialogForm.number = 1
          this.numberDialogVisible = true
        }
      }
    },
    removeMedicine (id) {
      for (let i = 0; i < this.prescription.selectedMedicine.length; i++) {
        if (this.prescription.selectedMedicine[i].id === id) {
          this.prescription.selectedMedicine = this.prescription.selectedMedicine.slice(0, i).concat(this.prescription.selectedMedicine.slice(i + 1))
          break
        }
      }
      for (let i = 0; i < this.pendingTableData.length; i++) {
        if (this.pendingTableData[i].id === id) {
          this.pendingTableData = this.pendingTableData.slice(0, i).concat(this.pendingTableData.slice(i + 1))
          break
        }
      }
      this.makePreview()
    },
    handleNumberDialogAccept () {
      this.prescription.selectedMedicine.push({
        id: this.numberDialogForm.id,
        number: this.numberDialogForm.number
      })
      for (let i = 0; i < this.searchTableData.length; i++) {
        if (this.searchTableData[i].id !== this.numberDialogForm.id) {
          continue
        } else {
          this.pendingTableData.push({
            id: this.numberDialogForm.id,
            name: this.searchTableData[i].name,
            dosage: this.searchTableData[i].dosage,
            number: this.numberDialogForm.number
          })
          break
        }
      }
      this.numberDialogVisible = false
      this.makePreview()
    },
    makePreview () {
      this.preview = '<p style="text-align: right;"><span style="font-family: 宋体, SimSun; font-size: 18px;">普通处方&nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; </span><span style="font-family: 宋体, SimSun;"><br/></span></p><p style="text-align: center;"><span style="font-family: 宋体, SimSun; font-size: 28px;"><strong>临渭区社区卫生服务中心（站）门诊处方笺</strong></span></p><table data-sort="sortDisabled" width="637"><tbody><tr class="firstRow"><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;">姓名：<br/></span></td><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;">性别：<br/></span></td><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;">年龄：<br/></span></td><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td></tr><tr><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;">费别:<br/></span></td><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;">科别：<br/></span></td><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;">时间：<br/></span></td><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td></tr><tr><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;">处方号：<br/></span></td><td style="border-color: rgb(0, 0, 0);" rowspan="1" colspan="2" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;">门诊号：<br/></span></td><td style="border-color: rgb(0, 0, 0);" rowspan="1" colspan="2" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td></tr><tr><td rowspan="1" colspan="1" style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;">诊断：<br/></span></td><td rowspan="1" colspan="5" style="border-color: rgb(0, 0, 0);" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td></tr></tbody></table><p><span style="font-size: 48px; font-family: 宋体, SimSun;"><strong>R</strong></span></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p><table width="637"><tbody><tr class="firstRow"><td style="border-color: rgb(0, 0, 0);" width="159" valign="middle" align="center"><span style="font-family: 宋体, SimSun; font-size: 20px;">医师签名：<br/></span></td><td style="border-color: rgb(0, 0, 0);" width="133" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td><td style="border-color: rgb(0, 0, 0);" width="212" valign="middle" align="center"><span style="font-family: 宋体, SimSun; font-size: 20px;">审核调配药师：<br/></span></td><td style="border-color: rgb(0, 0, 0);" width="133" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td></tr><tr><td style="border-color: rgb(0, 0, 0);" width="159" valign="middle" align="center"><span style="font-family: 宋体, SimSun; font-size: 20px;">药品费：<br/></span></td><td style="border-color: rgb(0, 0, 0);" width="133" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td><td style="border-color: rgb(0, 0, 0);" width="212" valign="middle" align="center"><span style="font-family: 宋体, SimSun; font-size: 20px;">复核发药药师：<br/></span></td><td style="border-color: rgb(0, 0, 0);" width="133" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td></tr></tbody></table>'
      function getContentPosition (text, str) {
        let cnt = 0
        const ret = {
          begin: -1,
          end: -1
        }
        for (let i = text.indexOf(str + '<br/></span>'); i < text.length; i++) {
          if (text[i] === '>') {
            cnt++
          }
          if (cnt === 5 && ret.begin === -1) {
            ret.begin = (i + 1)
          }
          if (cnt === 7) {
            ret.end = (i - 6)
            break
          }
        }
        return ret
      }

      function setContent (text, str, val) {
        const pos = getContentPosition(text, str)
        if (pos.begin !== -1 && pos.end !== -1) {
          text = text.slice(0, pos.begin).concat(val).concat(text.slice(pos.end))
        }
        return text
      }

      let totalPrice = 0.0
      const medicineList = []

      for (let i = 0; i < this.prescription.selectedMedicine.length; i++) {
        for (let j = 0; j < this.allMedicineData.length; j++) {
          if (this.allMedicineData[j].id === this.prescription.selectedMedicine[i].id) {
            medicineList.push({
              name: this.allMedicineData[j].name,
              number: this.prescription.selectedMedicine[i].number,
              unit: this.allMedicineData[j].unit,
              dosage: this.allMedicineData[j].dosage,
              price: this.allMedicineData[j].price
            })
            totalPrice += 1.0 * this.prescription.selectedMedicine[i].number * this.allMedicineData[j].price
            break
          }
        }
      }

      setTimeout(() => {
        this.preview = setContent(this.preview, '姓名：', this.prescription.patient.name)
        this.preview = setContent(this.preview, '性别：', this.prescription.patient.gender)
        this.preview = setContent(this.preview, '年龄：', this.prescription.patient.age)
        this.preview = setContent(this.preview, '时间：', getLocaleISODateStringFromDate(this.prescription.date))
        this.preview = setContent(this.preview, '诊断：', this.prescription.patient.diagnosis)
        if (this.prescription.recordID !== 0) {
          this.preview = setContent(this.preview, '门诊号：', this.prescription.recordID)
        }
        this.preview = setContent(this.preview, '药品费：', totalPrice)

        let itemTable = ''
        let whiteTable = ''
        for (let i = 0; i < medicineList.length; i++) {
          itemTable += '<table width="637"><tbody>'
          itemTable += '<tr class="firstRow"><td style="border-color: rgb(255, 255, 255);" width="636" valign="top"><span style="font-family: 宋体, SimSun; font-size: 24px;">' + '    ' + medicineList[i].name + ' x' + medicineList[i].number + ' ' + medicineList[i].unit + '</span></td></tr>'
          itemTable += '<tr class="firstRow"><td style="border-color: rgb(255, 255, 255);" width="636" valign="top"><span style="font-family: 宋体, SimSun; font-size: 24px;">' + '      ' + medicineList[i].dosage + '</span></td></tr>'
          itemTable += '</tbody></table>'
        }
        for (let i = 0; i < 5 - medicineList.length; i++) {
          whiteTable += '<table width="637"><tbody>'
          whiteTable += '<tr class="firstRow"><td style="border-color: rgb(255, 255, 255);" width="636" valign="top"><span style="font-family: 宋体, SimSun; font-size: 24px;"><br/></span></td></tr>'
          whiteTable += '<tr class="firstRow"><td style="border-color: rgb(255, 255, 255);" width="636" valign="top"><span style="font-family: 宋体, SimSun; font-size: 24px;"><br/></span></td></tr>'
          whiteTable += '</tbody></table>'
        }

        const itemTableBeginPos = this.preview.indexOf('</p>', this.preview.indexOf('<strong>R</strong>')) + 4
        this.preview = this.preview.slice(0, itemTableBeginPos).concat(itemTable.concat(whiteTable)).concat(this.preview.slice(itemTableBeginPos))
      }, GLOBAL_TIMEOUT)
    },
    addPrescription () {
      if (this.isFormValid()) {
        if (typeof (this.prescription.date) !== 'string') {
          this.prescription.date = getLocaleISODateStringFromDate(this.prescription.date)
        }
        this.$store.commit('prescription/prescription/addPrescriptionData', this.prescription)
        this.$alert('已提交')
      } else {
        this.$message('内容或格式错误，无法提交')
      }
    },
    updateMedicineData () {
      this.$store.commit('medicine/medicine/fetchMedicineData')
      setTimeout(() => {
        this.searchTableData = this.allMedicine
      }, GLOBAL_TIMEOUT)
    }
  }
}
</script>
