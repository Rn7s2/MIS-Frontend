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
      <el-aside width="650px">
        处方预览：<br /><br />
        <d2-ueditor v-model="preview" />
      </el-aside>
      <el-main>
        病人信息：
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

export default {
  name: 'page2',
  data () {
    return {
      str: '',
      searchTableData: [],
      pendingTableData: [],
      medicineDialogVisible: false,
      prescription: {
        patient: {
          name: '',
          gender: '男',
          age: 25,
          diagnosis: ''
        },
        selectedMedicine: []
      },
      numberDialogVisible: false,
      numberDialogForm: {
        id: 0,
        number: 1
      },
      preview: '<p style="text-align: right;">普通处方&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <br/></p><p style="text-align: center;"><span style="font-size: 24px;"><strong>临渭区社区卫生服务中心（站）门诊处方笺</strong></span></p><table data-sort="sortDisabled" width="605"><tbody><tr class="firstRow"><td style="border-color: rgb(255, 255, 255);" width="101" valign="top">姓名：<br/></td><td style="border-color: rgb(255, 255, 255);" width="101" valign="top"><br/></td><td style="border-color: rgb(255, 255, 255);" width="101" valign="top">性别：<br/></td><td style="border-color: rgb(255, 255, 255);" width="101" valign="top"><br/></td><td style="border-color: rgb(255, 255, 255);" width="101" valign="top">年龄：<br/></td><td style="border-color: rgb(255, 255, 255);" width="101" valign="top"><br/></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="101" valign="top">费别:<br/></td><td style="border-color: rgb(255, 255, 255);" width="101" valign="top"><br/></td><td style="border-color: rgb(255, 255, 255);" width="101" valign="top">科别：<br/></td><td style="border-color: rgb(255, 255, 255);" width="101" valign="top"><br/></td><td style="border-color: rgb(255, 255, 255);" width="101" valign="top">时间：<br/></td><td style="border-color: rgb(255, 255, 255);" width="101" valign="top"><br/></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="101" valign="top">处方编号：<br/></td><td style="border-color: rgb(255, 255, 255);" rowspan="1" colspan="2" valign="top"><br/></td><td style="border-color: rgb(255, 255, 255);" width="101" valign="top">门诊号：<br/></td><td style="border-color: rgb(255, 255, 255);" rowspan="1" colspan="2" valign="top"><br/></td></tr></tbody></table><hr/><table><tbody><tr class="firstRow"><td style="word-break: break-all; border-color: rgb(255, 255, 255);" width="80.33333333333333" valign="top">临床诊断：<br/></td><td style="border-color: rgb(255, 255, 255);" width="498.3333333333333" valign="top"><br/></td></tr></tbody></table><hr/><p><span style="font-size: 36px;"><strong>R</strong></span></p><table width="596"><tbody><tr class="firstRow"><td style="border-color: rgb(255, 255, 255);" width="595" valign="top"><br/></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="595" valign="top"><br/></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="595" valign="top"><br/></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="595" valign="top"><br/></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="595" valign="top"><br/></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="595" valign="top"><br/></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="595" valign="top"><br/></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="595" valign="top"><br/></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="595" valign="top"><br/></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="595" valign="top"><br/></td></tr></tbody></table><table width="605"><tbody><tr class="firstRow"><td style="border-color: rgb(0, 0, 0);" width="151" valign="middle" align="center">医师签名<br/></td><td style="border-color: rgb(0, 0, 0);" width="151" valign="top"><br/></td><td style="border-color: rgb(0, 0, 0);" width="151" valign="middle" align="center">审核调配药师<br/></td><td style="border-color: rgb(0, 0, 0);" width="151" valign="top"><br/></td></tr><tr><td style="border-color: rgb(0, 0, 0);" width="151" valign="middle" align="center">药品费<br/></td><td style="border-color: rgb(0, 0, 0);" width="151" valign="top"><br/></td><td style="border-color: rgb(0, 0, 0);" width="151" valign="middle" align="center">复核发药药师<br/></td><td style="border-color: rgb(0, 0, 0);" width="151" valign="top"><br/></td></tr></tbody></table><p><br/></p>'
    }
  },
  computed: {
    allMedicine () {
      return this.$store.getters['medicine/medicine/getAllMedicine']
    }
  },
  created () {
    this.updateMedicineData()
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
      if (isExist(this.prescription.selectedMedicine, id)) {
        this.$alert('该药已经位于处方中')
      } else {
        this.numberDialogForm.id = id
        this.numberDialogForm.number = 1
        this.numberDialogVisible = true
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
      // 预览要建好
      // 这依赖Windows平台上的格式测试
      // aside的宽度也许需要调整
      this.preview = '<p style="text-align: right;">普通处方&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <br/></p><p style="text-align: center;"><span style="font-size: 24px;"><strong>临渭区社区卫生服务中心（站）门诊处方笺</strong></span></p><table data-sort="sortDisabled" width="605"><tbody><tr class="firstRow"><td style="border-color: rgb(255, 255, 255);" width="101" valign="top">姓名：<br/></td><td style="border-color: rgb(255, 255, 255);" width="101" valign="top"><br/></td><td style="border-color: rgb(255, 255, 255);" width="101" valign="top">性别：<br/></td><td style="border-color: rgb(255, 255, 255);" width="101" valign="top"><br/></td><td style="border-color: rgb(255, 255, 255);" width="101" valign="top">年龄：<br/></td><td style="border-color: rgb(255, 255, 255);" width="101" valign="top"><br/></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="101" valign="top">费别:<br/></td><td style="border-color: rgb(255, 255, 255);" width="101" valign="top"><br/></td><td style="border-color: rgb(255, 255, 255);" width="101" valign="top">科别：<br/></td><td style="border-color: rgb(255, 255, 255);" width="101" valign="top"><br/></td><td style="border-color: rgb(255, 255, 255);" width="101" valign="top">时间：<br/></td><td style="border-color: rgb(255, 255, 255);" width="101" valign="top"><br/></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="101" valign="top">处方编号：<br/></td><td style="border-color: rgb(255, 255, 255);" rowspan="1" colspan="2" valign="top"><br/></td><td style="border-color: rgb(255, 255, 255);" width="101" valign="top">门诊号：<br/></td><td style="border-color: rgb(255, 255, 255);" rowspan="1" colspan="2" valign="top"><br/></td></tr></tbody></table><hr/><table><tbody><tr class="firstRow"><td style="word-break: break-all; border-color: rgb(255, 255, 255);" width="80.33333333333333" valign="top">临床诊断：<br/></td><td style="border-color: rgb(255, 255, 255);" width="498.3333333333333" valign="top"><br/></td></tr></tbody></table><hr/><p><span style="font-size: 36px;"><strong>R</strong></span></p><table width="596"><tbody><tr class="firstRow"><td style="border-color: rgb(255, 255, 255);" width="595" valign="top"><br/></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="595" valign="top"><br/></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="595" valign="top"><br/></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="595" valign="top"><br/></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="595" valign="top"><br/></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="595" valign="top"><br/></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="595" valign="top"><br/></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="595" valign="top"><br/></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="595" valign="top"><br/></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="595" valign="top"><br/></td></tr></tbody></table><table width="605"><tbody><tr class="firstRow"><td style="border-color: rgb(0, 0, 0);" width="151" valign="middle" align="center">医师签名<br/></td><td style="border-color: rgb(0, 0, 0);" width="151" valign="top"><br/></td><td style="border-color: rgb(0, 0, 0);" width="151" valign="middle" align="center">审核调配药师<br/></td><td style="border-color: rgb(0, 0, 0);" width="151" valign="top"><br/></td></tr><tr><td style="border-color: rgb(0, 0, 0);" width="151" valign="middle" align="center">药品费<br/></td><td style="border-color: rgb(0, 0, 0);" width="151" valign="top"><br/></td><td style="border-color: rgb(0, 0, 0);" width="151" valign="middle" align="center">复核发药药师<br/></td><td style="border-color: rgb(0, 0, 0);" width="151" valign="top"><br/></td></tr></tbody></table><p><br/></p>'
    },
    addPrescription () {
      if (this.isFormValid()) {
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
