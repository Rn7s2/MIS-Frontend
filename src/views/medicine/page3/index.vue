<template>
  <d2-container>
    <template slot="header">
      <h3>新增新药</h3>
    </template>
    <el-form :model="form">
      <el-form-item label="名称" :required="true">
        <el-input v-model="form.name" auto-complete="off" placeholder="输入名称"></el-input>
      </el-form-item>
      <el-form-item label="条码" :required="true">
        <el-input v-model="form.code" auto-complete="off" placeholder="输入名称"></el-input>
      </el-form-item>
      <el-form-item label="数量" :inline=true :required="true">
        <el-input-number v-model="form.number" :min=0></el-input-number>
      </el-form-item>
      <el-form-item label="单位">
        <el-input v-model="form.unit" auto-complete="off"  placeholder="输入单位(盒,瓶等)" :required="true"></el-input>
      </el-form-item>
      <el-form-item label="价格" :inline=true :min=0 :required="true">
        <el-input-number v-model="form.price"></el-input-number>
      </el-form-item>
      <el-form-item label="保质期" :inline=true :required="true">
        <el-date-picker v-model="form.expiration"  placeholder="输入保质期"></el-date-picker>
      </el-form-item>
      <el-form-item label="用法用量">
        <el-input v-model="form.dosage" auto-complete="off"  placeholder="输入用法用量"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button type="primary" @click="addMedicine">确定</el-button>
    </div>
  </d2-container>
</template>

<script>
import { monthAfter } from '@/libs/localdate'

export default {
  name: 'page3',
  data () {
    return {
      form: {
        name: '',
        code: '',
        number: 1,
        unit: '',
        price: 10,
        expiration: monthAfter,
        dosage: ''
      }
    }
  },
  methods: {
    isFormValid () {
      let flag = true
      if (this.form.name === '') {
        flag = false
      }
      if (this.form.code === '') {
        flag = false
      }
      if (typeof (this.form.number) === 'undefined') {
        flag = false
      }
      if (typeof (this.form.price) === 'undefined') {
        flag = false
      }
      if (!this.form.expiration) {
        flag = false
      }
      return flag
    },
    addMedicine () {
      if (this.isFormValid()) {
        this.$store.commit('medicine/medicine/addMedicineData', this.form)
        this.$alert('已提交')
      } else {
        this.$message('未填写必填项目，无法提交！')
      }
    }
  }
}
</script>
