<template>
  <d2-container>
    <template slot="header">
      <h3>确认发药</h3>
    </template>
    <el-table :data="tableData" stripe>
      <el-table-column prop="id" label="处方号" width="100"></el-table-column>
      <el-table-column prop="patient" label="病人"></el-table-column>
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="viewPrescription(scope.row.id)">查看待出库药品</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="确认发药" :visible.sync="confirmDialogVisible" width="800px">
      <el-table :data="medicineData" stripe>
      <el-table-column prop="id" label="序号" width="100"></el-table-column>
      <el-table-column prop="medicine" label="药品名称"></el-table-column>
      <el-table-column prop="outNumber" label="出库数量"></el-table-column>
      <el-table-column prop="currentNumber" label="库存数量"></el-table-column>
    </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleConfirmDialogAccept">确认发药</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
import { GLOBAL_TIMEOUT } from '@/libs/timeout'

export default {
  name: 'page4',
  data () {
    return {
      tableData: [],
      medicineData: [],
      confirmDialogVisible: false,
      currentPrescription: 0
    }
  },
  computed: {
    allMedicineData () {
      return this.$store.getters['medicine/medicine/getAllMedicine']
    },
    pendingPrescriptionList () {
      return this.$store.getters['prescription/prescription/getPendingPrescriptionList']
    }
  },
  created () {
    this.updateData()
  },
  methods: {
    viewPrescription (id) {
      this.currentPrescription = id
      this.$store.commit('prescription/prescription/fetchPrescriptionByIDData', { id: id })
      let prescription = {}
      setTimeout(() => {
        prescription = this.$store.getters['prescription/prescription/getPrescriptionByIDData']
      }, GLOBAL_TIMEOUT)
      setTimeout(() => {
        this.medicineData = []
        for (let i = 0; i < prescription.selectedMedicine.length; i++) {
          let medicine = {}
          for (let j = 0; j < this.allMedicineData.length; j++) {
            if (this.allMedicineData[j].id === prescription.selectedMedicine[i].id) {
              medicine = this.allMedicineData[j]
              break
            }
          }
          this.medicineData.push({
            id: prescription.selectedMedicine[i].id,
            medicine: medicine.name,
            outNumber: prescription.selectedMedicine[i].number,
            currentNumber: medicine.number
          })
        }
      }, GLOBAL_TIMEOUT + 100)
      this.confirmDialogVisible = true
    },
    isCanStockOut () {
      for (let i = 0; i < this.medicineData.length; i++) {
        if (this.medicineData[i].currentNumber < this.medicineData[i].outNumber) {
          return false
        }
      }
      return true
    },
    handleConfirmDialogAccept () {
      if (this.isCanStockOut()) {
        this.$store.commit('prescription/prescription/handlePrescriptionData', { id: this.currentPrescription })
        this.currentPrescription = 0
        this.confirmDialogVisible = false
        setTimeout(() => {
          this.updateData()
        }, GLOBAL_TIMEOUT)
      } else {
        this.$alert('不满足出库条件，请检查库存是否充足')
      }
    },
    updateData () {
      this.$store.commit('medicine/medicine/fetchMedicineData')
      this.$store.commit('prescription/prescription/fetchPendingPrescriptionList')
      setTimeout(() => {
        this.tableData = []
        for (let i = 0; i < this.pendingPrescriptionList.length; i++) {
          this.tableData.push({
            id: this.pendingPrescriptionList[i].id,
            patient: this.pendingPrescriptionList[i].name,
            date: this.pendingPrescriptionList[i].date
          })
        }
      }, GLOBAL_TIMEOUT)
    }
  }
}
</script>
