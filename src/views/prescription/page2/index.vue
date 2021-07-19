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
        <d2-ueditor />
      </el-aside>
      <el-main>
        病人信息：
        <el-form v-model="prescription.patient">
          <el-form-item label="姓名">
            <el-input v-model="prescription.patient.name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="prescription.patient.gender">
              <el-option value="男"></el-option>
              <el-option value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input-number v-model="prescription.patient.age" :min=0></el-input-number>
          </el-form-item>
          <el-form-item label="诊断">
            <el-input v-model="prescription.patient.diagnosis"></el-input>
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
      }
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
      // TO-DO
      // 这里验证表达是不是合法
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
