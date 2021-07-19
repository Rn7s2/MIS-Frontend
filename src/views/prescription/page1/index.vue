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
    <el-dialog title="查看处方" :visible.sync="viewDialogVisible" width="650px">
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
      preview: '',
      viewDialogVisible: false
    }
  },
  created () {
    this.updateData()
  },
  computed: {
    prescriptionList () {
      return this.$store.getters['prescription/prescription/getPrescriptionListData']
    }
  },
  methods: {
    handleSearch () {
      this.tableData = this.prescriptionList.filter(p => {
        return (p.patient.includes(this.str))
      })
    },
    makePreview (prescription) {
      // 预览要建好
      // 这依赖Windows平台上的格式测试
      // aside的宽度也许需要调整
      this.preview = '<p style="text-align: right;">普通处方&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <br/></p><p style="text-align: center;"><span style="font-size: 24px;"><strong>临渭区社区卫生服务中心（站）门诊处方笺</strong></span></p><table data-sort="sortDisabled" width="605"><tbody><tr class="firstRow"><td style="border-color: rgb(255, 255, 255);" width="101" valign="top">姓名：<br/></td><td style="border-color: rgb(255, 255, 255);" width="101" valign="top"><br/></td><td style="border-color: rgb(255, 255, 255);" width="101" valign="top">性别：<br/></td><td style="border-color: rgb(255, 255, 255);" width="101" valign="top"><br/></td><td style="border-color: rgb(255, 255, 255);" width="101" valign="top">年龄：<br/></td><td style="border-color: rgb(255, 255, 255);" width="101" valign="top"><br/></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="101" valign="top">费别:<br/></td><td style="border-color: rgb(255, 255, 255);" width="101" valign="top"><br/></td><td style="border-color: rgb(255, 255, 255);" width="101" valign="top">科别：<br/></td><td style="border-color: rgb(255, 255, 255);" width="101" valign="top"><br/></td><td style="border-color: rgb(255, 255, 255);" width="101" valign="top">时间：<br/></td><td style="border-color: rgb(255, 255, 255);" width="101" valign="top"><br/></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="101" valign="top">处方编号：<br/></td><td style="border-color: rgb(255, 255, 255);" rowspan="1" colspan="2" valign="top"><br/></td><td style="border-color: rgb(255, 255, 255);" width="101" valign="top">门诊号：<br/></td><td style="border-color: rgb(255, 255, 255);" rowspan="1" colspan="2" valign="top"><br/></td></tr></tbody></table><hr/><table><tbody><tr class="firstRow"><td style="word-break: break-all; border-color: rgb(255, 255, 255);" width="80.33333333333333" valign="top">临床诊断：<br/></td><td style="border-color: rgb(255, 255, 255);" width="498.3333333333333" valign="top"><br/></td></tr></tbody></table><hr/><p><span style="font-size: 36px;"><strong>R</strong></span></p><table width="596"><tbody><tr class="firstRow"><td style="border-color: rgb(255, 255, 255);" width="595" valign="top"><br/></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="595" valign="top"><br/></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="595" valign="top"><br/></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="595" valign="top"><br/></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="595" valign="top"><br/></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="595" valign="top"><br/></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="595" valign="top"><br/></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="595" valign="top"><br/></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="595" valign="top"><br/></td></tr><tr><td style="border-color: rgb(255, 255, 255);" width="595" valign="top"><br/></td></tr></tbody></table><table width="605"><tbody><tr class="firstRow"><td style="border-color: rgb(0, 0, 0);" width="151" valign="middle" align="center">医师签名<br/></td><td style="border-color: rgb(0, 0, 0);" width="151" valign="top"><br/></td><td style="border-color: rgb(0, 0, 0);" width="151" valign="middle" align="center">审核调配药师<br/></td><td style="border-color: rgb(0, 0, 0);" width="151" valign="top"><br/></td></tr><tr><td style="border-color: rgb(0, 0, 0);" width="151" valign="middle" align="center">药品费<br/></td><td style="border-color: rgb(0, 0, 0);" width="151" valign="top"><br/></td><td style="border-color: rgb(0, 0, 0);" width="151" valign="middle" align="center">复核发药药师<br/></td><td style="border-color: rgb(0, 0, 0);" width="151" valign="top"><br/></td></tr></tbody></table><p><br/></p>'
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
      this.$store.commit('prescription/prescription/fetchPrescriptionListData')
      setTimeout(() => {
        this.tableData = this.prescriptionList
      }, GLOBAL_TIMEOUT)
    }
  }
}
</script>
