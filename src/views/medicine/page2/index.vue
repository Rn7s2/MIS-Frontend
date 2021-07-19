<template>
  <d2-container>
    <template slot="header">
      <h3>统计总表</h3>
    </template>
    <el-form>
      <el-form-item label="选择日期">
        <el-date-picker
          v-model="dateRange"
          v-on:blur="updateData"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" stripe>
      <el-table-column prop="id" label="序号" width="100"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="code" label="条码"></el-table-column>
      <el-table-column prop="price" label="价格" width="100"></el-table-column>
      <el-table-column prop="in" label="入库量" width="100"></el-table-column>
      <el-table-column prop="out" label="出库量" width="100"></el-table-column>
    </el-table>
  </d2-container>
</template>

<script>
import { GLOBAL_TIMEOUT } from '@/libs/timeout'
import { today, monthBefore, getLocaleISODateStringFromDate } from '@/libs/localdate'

export default {
  name: 'page2',
  data () {
    return {
      dateRange: [monthBefore, today],
      tableData: []
    }
  },
  mounted () {
    this.updateData()
  },
  methods: {
    updateData () {
      this.$store.commit('medicine/medicine/fetchHistoryOverview', {
        start: getLocaleISODateStringFromDate(this.dateRange[0]),
        end: getLocaleISODateStringFromDate(this.dateRange[1])
      })
      setTimeout(() => {
        this.tableData = this.$store.getters['medicine/medicine/getHistoryOverview']
      }, GLOBAL_TIMEOUT)
    }
  }
}
</script>
