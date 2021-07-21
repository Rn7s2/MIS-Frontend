<template>
  <d2-container>
    <template slot="header">
      <h3>查看病历</h3>
    </template>
    <el-input v-model="str" v-on:change="handleSearch" placeholder="输入病人名字的一部分">
      <template slot="prepend">搜索：</template>
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-table :data="tableData" stripe>
      <el-table-column prop="id" label="序号" width="50"></el-table-column>
      <el-table-column prop="patient" label="病人"></el-table-column>
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column fixed="right" label="操作" width="190">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row.id, 0)" type="text" size="small">添加处方</el-button>
          <el-button @click="handleClick(scope.row.id, 1)" type="text" size="small">查看/修改</el-button>
          &nbsp;
          <el-popconfirm title="确定删除吗？" v-on:onConfirm="handleClick(scope.row.id, 2)">
            <el-button slot="reference" type="text" size="small">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="查看/修改病历" :visible.sync="modifyDialogVisible" width="1040px">
      <d2-ueditor v-model="text" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="modifyDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleModifyDialogAccept">确定</el-button>
      </div>
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
      modifyDialogVisible: false,
      modifyID: 0,
      text: ''
    }
  },
  created () {
    this.updateData()
  },
  computed: {
    recordList () {
      return this.$store.getters['record/record/getRecordListData']
    }
  },
  methods: {
    handleSearch () {
      this.tableData = this.recordList.filter(p => {
        return (p.patient.includes(this.str))
      })
    },
    handleClick (id, operation) {
      function getContentPosition (text, str, isDiagnosis) {
        let cnt = 0
        const ret = {
          begin: -1,
          end: -1
        }
        for (let i = text.indexOf(str + '</span></strong>'); i < text.length; i++) {
          if (text[i] === '>') {
            cnt++
          }
          if (isDiagnosis) {
            if (cnt === 6 && ret.begin === -1) {
              ret.begin = (i + 2)
            }
            if (cnt === 7) {
              ret.end = (i - 4)
              break
            }
          } else {
            if (cnt === 5 && ret.begin === -1) {
              ret.begin = (i + 2)
            }
            if (cnt === 6) {
              ret.end = (i - 5)
              break
            }
          }
        }
        return ret
      }
      if (operation === 0) {
        // 按病历添加处方
        const patient = {
          name: '',
          gender: '',
          age: 0,
          diagnosis: ''
        }
        this.$store.commit('record/record/fetchRecordByIDData', { id: id })
        setTimeout(() => {
          const recordText = this.$store.getters['record/record/getRecordByIDData']
          let pos = getContentPosition(recordText, '姓名：')
          patient.name = recordText.slice(pos.begin, pos.end)
          pos = getContentPosition(recordText, '性别：')
          patient.gender = recordText.slice(pos.begin, pos.end)
          pos = getContentPosition(recordText, '年龄：')
          patient.age = recordText.slice(pos.begin, pos.end)
          pos = getContentPosition(recordText, '主要诊断：', true)
          patient.diagnosis = recordText.slice(pos.begin, pos.end)
        }, GLOBAL_TIMEOUT)
        setTimeout(() => {
          this.$router.push({ path: '/prescription/page3', query: { id: id, patient: patient } })
        }, GLOBAL_TIMEOUT + 300)
      } else if (operation === 1) {
        this.modifyID = id
        this.$store.commit('record/record/fetchRecordByIDData', { id: id })
        setTimeout(() => {
          this.text = this.$store.getters['record/record/getRecordByIDData']
        }, GLOBAL_TIMEOUT)
        setTimeout(() => {
          this.modifyDialogVisible = true
        }, GLOBAL_TIMEOUT / 2)
      } else if (operation === 2) {
        this.$store.commit('record/record/deleteRecordByIDData', { id: id })
        setTimeout(() => {
          this.updateData()
        }, GLOBAL_TIMEOUT)
      }
    },
    handleModifyDialogAccept () {
      this.$store.commit('record/record/modifyRecordByIDData', {
        id: this.modifyID,
        text: this.text
      })
      this.$alert('已提交')
      this.modifyDialogVisible = false
    },
    updateData () {
      this.$store.commit('record/record/fetchRecordListData')
      setTimeout(() => {
        this.tableData = this.recordList
      }, GLOBAL_TIMEOUT)
    }
  }
}
</script>
