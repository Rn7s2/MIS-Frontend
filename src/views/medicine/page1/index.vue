<template>
  <d2-container>
    <template slot="header">
      <h3>查看库存</h3>
    </template>
    <el-input v-model="str" v-on:change="handleSearch" placeholder="输入名称或条码的一部分">
      <template slot="prepend">搜索：</template>
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-table :data="tableData" stripe>
      <el-table-column prop="id" label="序号" width="50"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="code" label="条码"></el-table-column>
      <el-table-column prop="number" label="数量" width="50"></el-table-column>
      <el-table-column prop="unit" label="单位" width="50"></el-table-column>
      <el-table-column prop="price" label="价格" width="50"></el-table-column>
      <el-table-column prop="expiration" label="保质期" width="100"></el-table-column>
      <el-table-column prop="dosage" label="用法用量"></el-table-column>
      <el-table-column fixed="right" label="操作" width="190">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row, 0)" type="text" size="small">入库</el-button>
          <el-button @click="handleClick(scope.row, 1)" type="text" size="small">出库</el-button>
          <el-button @click="handleClick(scope.row, 2)" type="text" size="small">修改</el-button>
          <el-button @click="handleClick(scope.row, 3)" type="text" size="small">出入库情况</el-button>
        </template>
      </el-table-column>
    </el-table>
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
    <el-dialog title="修改药品" :visible.sync="modifyDialogVisible">
      <el-form :model="modifyDialogForm">
        <el-form-item label="名称">
          <el-input v-model="modifyDialogForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="条码">
          <el-input v-model="modifyDialogForm.code" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" :inline=true>
          <el-input-number v-model="modifyDialogForm.number" :min=0></el-input-number>
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="modifyDialogForm.unit" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :inline=true>
          <el-input-number v-model="modifyDialogForm.price"></el-input-number>
        </el-form-item>
        <el-form-item label="保质期" :inline=true>
          <el-date-picker v-model="modifyDialogForm.expiration"></el-date-picker>
        </el-form-item>
        <el-form-item label="用法用量">
          <el-input v-model="modifyDialogForm.dosage" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modifyDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleModifyDialogAccept">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="出入库详情" :visible.sync="historyDialogVisible">
      <el-form :inline="true">
        <el-date-picker
          v-model="historyDialogForm.dateRange"
          v-on:blur="loadHistory"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form>
      在此时间段内，
      总入库<span style="color: red;">{{ historyData.stockIn }}</span>，
      总出库<span style="color: red;">{{ historyData.stockOut }}</span>
      <p></p>
      <div id="historyChart" :style="{width: '600px', height: '300px'}"></div>
    </el-dialog>
  </d2-container>
</template>

<script>
import { GLOBAL_TIMEOUT } from '@/libs/timeout'
import { today, monthBefore, getLocaleISODateStringFromDate } from '@/libs/localdate'

export default {
  name: 'page1',
  data () {
    return {
      str: '',
      tableData: [],
      numberDialogVisible: false,
      numberDialogForm: {
        id: 0,
        number: 1,
        operation: -1
      },
      modifyDialogVisible: false,
      modifyDialogForm: {
        id: 0,
        name: '',
        code: '',
        number: 0,
        unit: '',
        price: 0.0,
        expiration: new Date(),
        dosage: ''
      },
      historyDialogVisible: false,
      historyDialogForm: {
        id: 0,
        dateRange: [monthBefore, today]
      }
    }
  },
  mounted () {
    this.updateMedicineData()
  },
  computed: {
    allMedicine () {
      return this.$store.getters['medicine/medicine/getAllMedicine']
    },
    historyData () {
      return this.$store.getters['medicine/medicine/getHistoryData']
    }
  },
  methods: {
    drawChart () {
      // 先尝试删除之前的实例
      this.$echarts.init(document.getElementById('historyChart')).dispose()
      const myChart = this.$echarts.init(document.getElementById('historyChart'))
      const title = getLocaleISODateStringFromDate(this.historyDialogForm.dateRange[0]) +
                    ' 至 ' + getLocaleISODateStringFromDate(this.historyDialogForm.dateRange[1]) +
                    ' 出入库情况统计图'
      const xData = []
      const inData = []
      const outData = []
      for (let i = 0; i < this.historyData.history.length; i++) {
        xData.push(this.historyData.history[i].date)
        inData.push(this.historyData.history[i].in)
        outData.push(this.historyData.history[i].out)
      }
      myChart.setOption({
        title: { text: title },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              show: true
            }
          }
        },
        tooltip: {},
        legend: {
          orient: 'horizontal',
          x: 'center',
          y: 'bottom',
          data: ['入库', '出库']
        },
        xAxis: {
          data: xData
        },
        yAxis: {},
        series: [
          {
            name: '入库',
            type: 'line',
            data: inData
          },
          {
            name: '出库',
            type: 'line',
            data: outData
          }
        ]
      })
    },
    handleSearch () {
      this.tableData = this.allMedicine.filter(p => {
        return (p.code.includes(this.str) || p.name.includes(this.str))
      })
    },
    handleClick (row, operation) {
      if (operation < 2) {
        this.numberDialogForm.id = row.id
        this.numberDialogForm.operation = operation
        this.numberDialogVisible = true
      } else if (operation === 2) {
        const { ...tmp } = row
        this.modifyDialogForm = tmp
        this.modifyDialogVisible = true
      } else {
        this.historyDialogForm.id = row.id
        this.loadHistory()
        this.historyDialogVisible = true
        this.$nextTick(() => {
          this.drawChart()
        })
      }
    },
    handleNumberDialogAccept () {
      if (this.numberDialogForm.operation === 0) {
        this.$store.commit('medicine/medicine/increaseMedicineData', {
          id: this.numberDialogForm.id,
          number: this.numberDialogForm.number
        })
      } else {
        this.$store.commit('medicine/medicine/increaseMedicineData', {
          id: this.numberDialogForm.id,
          number: 0 - this.numberDialogForm.number
        })
      }
      this.numberDialogForm.id = 0
      this.numberDialogForm.number = 1
      this.numberDialogForm.operation = -1
      location.reload()
    },
    handleModifyDialogAccept () {
      if (typeof (this.modifyDialogForm.expiration) !== 'string') {
        this.modifyDialogForm.expiration = getLocaleISODateStringFromDate(this.modifyDialogForm.expiration)
      }
      this.$store.commit('medicine/medicine/modifyMedicineData', this.modifyDialogForm)
      location.reload()
    },
    loadHistory () {
      this.$store.commit(
        'medicine/medicine/fetchHistoryData', {
          id: this.historyDialogForm.id,
          start: getLocaleISODateStringFromDate(this.historyDialogForm.dateRange[0]),
          end: getLocaleISODateStringFromDate(this.historyDialogForm.dateRange[1])
        })
      setTimeout(() => {
        if (this.historyDialogVisible) {
          this.$nextTick(() => {
            this.drawChart()
          })
        }
      }, GLOBAL_TIMEOUT)
    },
    updateMedicineData () {
      this.$store.commit('medicine/medicine/fetchMedicineData')
      setTimeout(() => {
        this.tableData = this.allMedicine
      }, GLOBAL_TIMEOUT)
      // 小本生意不promise，等一等出奇迹
    }
  }
}
</script>
