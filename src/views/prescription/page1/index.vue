<template>
  <d2-container>
    <template slot="header">
      <h3>查看处方</h3>
    </template>
    <el-input v-model="str" v-on:change="handleSearch" placeholder="输入病人名字的一部分">
      <template slot="prepend">搜索：</template>
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-table :data="tableData" stripe>
      <el-table-column prop="id" label="序号" width="50"></el-table-column>
      <el-table-column prop="patient" label="病人"></el-table-column>
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row.id, 0)" type="text" size="small">查看</el-button>
          &nbsp;
          <el-popconfirm title="确定删除吗？" v-on:onConfirm="handleClick(scope.row.id, 1)">
            <el-button slot="reference" type="text" size="small">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="查看处方" :visible.sync="viewDialogVisible" width="720px">
      <d2-ueditor v-model="preview" />
    </el-dialog>
  </d2-container>
</template>

<script>
import { GLOBAL_TIMEOUT } from '@/libs/timeout'

export default {
  name: 'page1',
  data () {
    return {
      str: '',
      tableData: [],
      preview: '<p style="text-align: right;"><span style="font-family: 宋体, SimSun; font-size: 18px;">普通处方&nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; </span><span style="font-family: 宋体, SimSun;"><br/></span></p><p style="text-align: center;"><span style="font-family: 宋体, SimSun; font-size: 28px;"><strong>临渭区社区卫生服务中心（站）门诊处方笺</strong></span></p><table data-sort="sortDisabled" width="637"><tbody><tr class="firstRow"><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;">姓名：<br/></span></td><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;">性别：<br/></span></td><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;">年龄：<br/></span></td><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td></tr><tr><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;">费别:<br/></span></td><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;">科别：<br/></span></td><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;">时间：<br/></span></td><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td></tr><tr><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;">处方号：<br/></span></td><td style="border-color: rgb(0, 0, 0);" rowspan="1" colspan="2" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td><td style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;">门诊号：<br/></span></td><td style="border-color: rgb(0, 0, 0);" rowspan="1" colspan="2" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td></tr><tr><td rowspan="1" colspan="1" style="border-color: rgb(0, 0, 0);" width="85" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;">诊断：<br/></span></td><td rowspan="1" colspan="5" style="border-color: rgb(0, 0, 0);" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td></tr></tbody></table><p><span style="font-size: 48px; font-family: 宋体, SimSun;"><strong>R</strong></span></p><table width="637"><tbody><tr class="firstRow"><td style="border-color: rgb(255, 255, 255);" width="636" valign="top"><span style="font-family: 宋体, SimSun; font-size: 24px;"><br/></span></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="636" valign="top"><span style="font-family: 宋体, SimSun; font-size: 24px;"><br/></span></td></tr></tbody></table><table width="637"><tbody><tr class="firstRow"><td style="border-color: rgb(255, 255, 255);" width="636" valign="top"><span style="font-family: 宋体, SimSun; font-size: 24px;"><br/></span></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="636" valign="top"><span style="font-family: 宋体, SimSun; font-size: 24px;"><br/></span></td></tr></tbody></table><table width="637"><tbody><tr class="firstRow"><td style="border-color: rgb(255, 255, 255);" width="636" valign="top"><span style="font-family: 宋体, SimSun; font-size: 24px;"><br/></span></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="636" valign="top"><span style="font-family: 宋体, SimSun; font-size: 24px;"><br/></span></td></tr></tbody></table><table width="637"><tbody><tr class="firstRow"><td style="border-color: rgb(255, 255, 255);" width="636" valign="top"><span style="font-family: 宋体, SimSun; font-size: 24px;"><br/></span></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="636" valign="top"><span style="font-family: 宋体, SimSun; font-size: 24px;"><br/></span></td></tr></tbody></table><table width="637"><tbody><tr class="firstRow"><td style="border-color: rgb(255, 255, 255);" width="636" valign="top"><span style="font-family: 宋体, SimSun; font-size: 24px;"><br/></span></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="636" valign="top"><span style="font-family: 宋体, SimSun; font-size: 24px;"><br/></span></td></tr></tbody></table><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p><table width="637"><tbody><tr class="firstRow"><td style="border-color: rgb(0, 0, 0);" width="159" valign="middle" align="center"><span style="font-family: 宋体, SimSun; font-size: 20px;">医师签名：<br/></span></td><td style="border-color: rgb(0, 0, 0);" width="133" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td><td style="border-color: rgb(0, 0, 0);" width="212" valign="middle" align="center"><span style="font-family: 宋体, SimSun; font-size: 20px;">审核调配药师：<br/></span></td><td style="border-color: rgb(0, 0, 0);" width="133" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td></tr><tr><td style="border-color: rgb(0, 0, 0);" width="159" valign="middle" align="center"><span style="font-family: 宋体, SimSun; font-size: 20px;">药品费：<br/></span></td><td style="border-color: rgb(0, 0, 0);" width="133" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td><td style="border-color: rgb(0, 0, 0);" width="212" valign="middle" align="center"><span style="font-family: 宋体, SimSun; font-size: 20px;">复核发药药师：<br/></span></td><td style="border-color: rgb(0, 0, 0);" width="133" valign="top"><span style="font-family: 宋体, SimSun; font-size: 20px;"><br/></span></td></tr></tbody></table>',
      viewDialogVisible: false
    }
  },
  created () {
    this.updateData()
  },
  computed: {
    prescriptionList () {
      return this.$store.getters['prescription/prescription/getPrescriptionListData']
    },
    allMedicineData () {
      return this.$store.getters['medicine/medicine/getAllMedicine']
    }
  },
  methods: {
    handleSearch () {
      this.tableData = this.prescriptionList.filter(p => {
        return (p.patient.includes(this.str))
      })
    },
    makePreview (prescription) {
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

      for (let i = 0; i < prescription.selectedMedicine.length; i++) {
        for (let j = 0; j < this.allMedicineData.length; j++) {
          if (this.allMedicineData[j].id === prescription.selectedMedicine[i].id) {
            medicineList.push({
              name: this.allMedicineData[j].name,
              number: prescription.selectedMedicine[i].number,
              unit: this.allMedicineData[j].unit,
              dosage: this.allMedicineData[j].dosage,
              price: this.allMedicineData[j].price
            })
            totalPrice += 1.0 * prescription.selectedMedicine[i].number * this.allMedicineData[j].price
            break
          }
        }
      }

      setTimeout(() => {
        this.preview = setContent(this.preview, '姓名：', prescription.patient.name)
        this.preview = setContent(this.preview, '性别：', prescription.patient.gender)
        this.preview = setContent(this.preview, '年龄：', prescription.patient.age)
        this.preview = setContent(this.preview, '时间：', prescription.date)
        this.preview = setContent(this.preview, '处方号：', prescription.id)
        this.preview = setContent(this.preview, '门诊号：', prescription.recordID)
        this.preview = setContent(this.preview, '诊断：', prescription.patient.diagnosis)
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
    handleClick (id, operation) {
      if (operation === 0) {
        this.$store.commit('prescription/prescription/fetchPrescriptionByIDData', { id: id })
        setTimeout(() => {
          this.makePreview(this.$store.getters['prescription/prescription/getPrescriptionByIDData'])
        }, GLOBAL_TIMEOUT)
        setTimeout(() => {
          this.viewDialogVisible = true
        }, GLOBAL_TIMEOUT)
      } else if (operation === 1) {
        this.$store.commit('prescription/prescription/deletePrescriptionData', { id: id })
        this.updateData()
      }
    },
    updateData () {
      this.$store.commit('medicine/medicine/fetchMedicineData')
      this.$store.commit('prescription/prescription/fetchPrescriptionListData')
      setTimeout(() => {
        this.tableData = this.prescriptionList
      }, GLOBAL_TIMEOUT)
    }
  }
}
</script>
