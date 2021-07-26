<template>
  <d2-container>
    <template slot="header">
      <h3>模板管理</h3>
    </template>
    <el-button @click="handleAddTemplate" type="primary">添加模板</el-button>
    <el-table :data="tableData" stripe>
      <el-table-column prop="id" label="序号" width="100"></el-table-column>
      <el-table-column prop="name" label="模板名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row, 0)">修改</el-button>
          &nbsp;
          <el-popconfirm title="确定删除吗？" v-on:onConfirm="handleClick(scope.row, 1)">
            <el-button slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑模板" :visible.sync="modifyDialogVisible" width="1000px">
      <el-form :model="modifyDialogForm">
        <el-form-item label="模板名称">
          <el-input v-model="modifyDialogForm.name" auto-complete="off"  placeholder="请输入模板名称"></el-input>
        </el-form-item>
        <el-form-item label="主诉">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                    v-model="modifyDialogForm.main_issue" auto-complete="off"
                    placeholder="请输入主诉"></el-input>
        </el-form-item>
        <el-form-item label="现病史">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                    v-model="modifyDialogForm.current_illness" auto-complete="off"
                    placeholder="请输入现病史"></el-input>
        </el-form-item>
        <el-form-item label="既往病史">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                    v-model="modifyDialogForm.past_illness" auto-complete="off"
                    placeholder="请输入既往病史"></el-input>
        </el-form-item>
        <el-form-item label="家族史">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                    v-model="modifyDialogForm.family_illness" auto-complete="off"
                    placeholder="请输入家族史"></el-input>
        </el-form-item>
        <el-form-item label="检查">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                    v-model="modifyDialogForm.check" auto-complete="off"
                    placeholder="请输入检查"></el-input>
        </el-form-item>
        <el-form-item label="主要诊断">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                    v-model="modifyDialogForm.main_diagnosis" auto-complete="off"
                    placeholder="请输入主要诊断"></el-input>
        </el-form-item>
        <el-form-item label="处理">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                    v-model="modifyDialogForm.method" auto-complete="off"
                    placeholder="请输入处理"></el-input>
        </el-form-item>
        <el-form-item label="嘱">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                    v-model="modifyDialogForm.note" auto-complete="off"
                    placeholder="请输入建议"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleModifyDialogCancel">取消</el-button>
        <el-button type="primary" @click="handleModifyDialogAccept">确定</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
import { GLOBAL_TIMEOUT } from '@/libs/timeout'

export default {
  name: 'page3',
  data () {
    return {
      tableData: [],
      operation: -1,
      modifyDialogVisible: false,
      modifyDialogForm: {
        id: 0,
        name: '',
        main_issue: '',
        current_illness: '',
        past_illness: '',
        family_illness: '',
        check: '',
        main_diagnosis: '',
        method: '',
        note: ''
      }
    }
  },
  computed: {
    allTemplateData () {
      return this.$store.getters['record/record/getAllTemplateData']
    }
  },
  created () {
    this.updateData()
  },
  methods: {
    handleClick (row, operation) {
      if (operation === 0) {
        let i = 0
        for (; i < this.allTemplateData.length; i++) {
          if (this.allTemplateData[i].id === row.id) {
            break
          }
        }
        const { ...tmp } = this.allTemplateData[i]
        this.operation = 0
        this.modifyDialogForm = tmp
        this.modifyDialogVisible = true
      } else {
        this.$store.commit('record/record/deleteTemplateData', { id: row.id })
        location.reload()
      }
    },
    handleAddTemplate () {
      this.operation = 1
      this.modifyDialogForm = {
        id: 0,
        name: '',
        main_issue: '',
        current_illness: '',
        past_illness: '',
        family_illness: '',
        check: '',
        main_diagnosis: '',
        method: '',
        note: ''
      }
      this.modifyDialogVisible = true
    },
    isFormValid () {
      return (this.modifyDialogForm.name !== '')
    },
    handleModifyDialogAccept () {
      if (this.isFormValid()) {
        if (this.operation === 0) {
          this.$store.commit('record/record/modifyTemplateData', this.modifyDialogForm)
        } else if (this.operation === 1) {
          this.$store.commit('record/record/addTemplateData', this.modifyDialogForm)
        }
        location.reload()
      } else {
        this.$message('未填写必填项目，无法提交！')
      }
    },
    handleModifyDialogCancel () {
      this.modifyDialogVisible = false
      this.operation = -1
    },
    updateData () {
      this.$store.commit('record/record/fetchTemplateData')
      setTimeout(() => {
        this.tableData = []
        for (let i = 0; i < this.allTemplateData.length; i++) {
          this.tableData.push({
            id: this.allTemplateData[i].id,
            name: this.allTemplateData[i].name
          })
        }
      }, GLOBAL_TIMEOUT)
    }
  }
}
</script>
