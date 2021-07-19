<template>
  <d2-container>
    <template slot="header">
      <h3>添加病历</h3>
      <span style="color: red;">注意：不要对原有格式进行任何修改！就诊号为保存后生成，请保持其为空！</span>
    </template>
    <el-button @click="applyTemplateDialogVisible = true" type="primary">套用模板</el-button><br /><br />
    <d2-ueditor v-model="text" />
    <el-dialog title="套用模板" :visible.sync="applyTemplateDialogVisible">
      <el-table :data="tableData" stripe>
        <el-table-column prop="id" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column fixed="right" label="操作" width="190">
          <template slot-scope="scope">
            <el-button @click="handleApplyTemplate(scope.row.id)" type="text" size="small">套用</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="applyTemplateDialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <div slot="footer">
      <el-button type="primary" @click="handleAddRecord">确定</el-button>
    </div>
  </d2-container>
</template>

<script>
import { GLOBAL_TIMEOUT } from '@/libs/timeout'
import { getLocaleISODateString } from '@/libs/localdate'

export default {
  name: 'page2',
  data () {
    return {
      text: '<p style="text-align: center;"> <span style="font-size: 24px;"><strong><span style="font-family: 宋体, SimSun;">临渭区杜桥办西岳社区卫生服务站门诊病历</span></strong></span><span style="font-size: 18px;"><strong><span style="font-family: 宋体, SimSun;"></span></strong><strong><span style="font-family: 宋体, SimSun;"><br/></span></strong></span> </p> <hr/> <table width="949"> <tbody> <tr class="firstRow"> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" width="137"> <span style="font-size: 18px;"><strong><span style="font-size: 18px; font-family: 宋体, SimSun;">日期：</span></strong> </span> </td> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" width="137"></td> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" width="137"> <span style="font-size: 18px;"><strong><span style="font-size: 18px; font-family: 宋体, SimSun;">科别：</span></strong> </span> </td> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" width="137"> <span style="font-size: 18px;">全科</span> </td> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" width="137"> <span style="font-size: 18px;"><strong><span style="font-size: 18px; font-family: 宋体, SimSun;">就诊号：</span></strong> </span> </td> <td valign="top" style="border-color: rgb(255, 255, 255); word-break: break-all;" width="137"></td> </tr> </tbody> </table> <hr/> <table data-sort="sortDisabled" width="949"> <tbody> <tr class="firstRow"> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" width="97"> <span style="font-size: 18px;"><strong><span style="font-size: 18px; font-family: 宋体, SimSun;">姓名：</span></strong> </span> </td> <td valign="top" style="border-color: rgb(255, 255, 255); word-break: break-all;" width="97"></td> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" width="97"> <span style="font-size: 18px;"><strong><span style="font-size: 18px; font-family: 宋体, SimSun;">性别：</span></strong> </span> </td> <td valign="top" style="border-color: rgb(255, 255, 255); word-break: break-all;" width="97"></td> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" width="97"> <span style="font-size: 18px;"><strong><span style="font-size: 18px; font-family: 宋体, SimSun;">民族：</span></strong> </span> </td> <td valign="top" style="border-color: rgb(255, 255, 255); word-break: break-all;" width="97"></td> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" width="97"> <span style="font-size: 18px;"><strong><span style="font-size: 18px; font-family: 宋体, SimSun;">年龄：</span></strong> </span> </td> <td valign="top" style="border-color: rgb(255, 255, 255); word-break: break-all;" width="97"></td> </tr> <tr> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" width="97"> <span style="font-size: 18px;"><strong><span style="font-size: 18px; font-family: 宋体, SimSun;">职业：</span></strong> </span> </td> <td valign="top" style="border-color: rgb(255, 255, 255); word-break: break-all;" width="97"></td> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" rowspan="1" colspan="2"> <span style="font-size: 18px;"><strong><span style="font-size: 18px; font-family: 宋体, SimSun;">住址或联系方式：</span></strong> </span> </td> <td valign="top" rowspan="1" colspan="4" style="border-color: rgb(255, 255, 255); word-break: break-all;"></td> </tr> </tbody> </table> <hr/> <p> <span style="font-family: 宋体, SimSun; font-size: 18px;"></span> </p> <table> <tbody> <tr class="firstRow"> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" align="right" width="111"> <span style="font-size: 18px;"><strong><span style="font-size: 18px; font-family: 宋体, SimSun;">主诉：</span></strong> </span> </td> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" width="795"></td> </tr> <tr> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" align="right" width="111"> <span style="font-size: 18px;"><strong><span style="font-size: 18px; font-family: 宋体, SimSun;">现病史：</span></strong> </span> </td> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" width="795"></td> </tr> <tr> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" align="right" width="111"> <span style="font-size: 18px;"><strong><span style="font-size: 18px; font-family: 宋体, SimSun;">既往病史：</span></strong> </span> </td> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" width="795"></td> </tr> <tr> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" align="right" width="111"> <span style="font-size: 18px;"><strong><span style="font-size: 18px; font-family: 宋体, SimSun;">家族史：</span></strong> </span> </td> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" width="795"></td> </tr> <tr> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" align="right" width="111"> <span style="font-size: 18px;"><strong><span style="font-size: 18px; font-family: 宋体, SimSun;">体格检查：</span></strong> </span> </td> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" width="795"></td> </tr> <tr> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" align="right" width="111"> <span style="font-size: 18px;"><strong><span style="font-size: 18px; font-family: 宋体, SimSun;">主要诊断：</span></strong> </span> </td> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" width="795"> <p> <br/> </p> </td> </tr> <tr> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" align="right" width="111"> <span style="font-size: 18px;"><strong><span style="font-size: 18px; font-family: 宋体, SimSun;">处理意见：</span></strong> </span> </td> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" width="795"> <p> <br/> </p> </td> </tr> <tr> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" align="right" width="111"> <span style="font-size: 18px;"><strong><span style="font-size: 18px; font-family: 宋体, SimSun;">医嘱：</span></strong> </span> </td> <td valign="top" style="word-break: break-all; border-color: rgb(255, 255, 255);" width="795"></td> </tr> </tbody> </table> <hr/> <p style="text-align: right;"> <span style="font-size: 18px;"><strong>医师：&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</strong></span><strong>&nbsp;</strong> </p>',
      applyTemplateDialogVisible: false,
      tableData: []
    }
  },
  created () {
    this.text = this.text.slice(0, 701) + getLocaleISODateString() + this.text.slice(701)
    this.updateData()
  },
  computed: {
    allTemplateData () {
      return this.$store.getters['record/record/getAllTemplateData']
    }
  },
  methods: {
    handleApplyTemplate (id) {
      function getContentPosition (text, str) {
        let cnt = 0
        const ret = {
          begin: -1,
          end: -1
        }
        for (let i = text.indexOf(str + '</span></strong>'); i < text.length; i++) {
          if (text[i] === '>') {
            cnt++
          }
          if (cnt === 5 && ret.begin === -1) {
            ret.begin = (i + 1)
          }
          if (cnt === 7) {
            ret.end = (i - 4)
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
      let i = 0
      for (; i < this.allTemplateData.length; i++) {
        if (this.allTemplateData[i].id === id) {
          break
        }
      }
      const { ...tmp } = this.allTemplateData[i]
      this.text = setContent(this.text, '主诉：', tmp.main_issue)
      this.text = setContent(this.text, '现病史：', tmp.current_illness)
      this.text = setContent(this.text, '既往病史：', tmp.past_illness)
      this.text = setContent(this.text, '家族史：', tmp.family_illness)
      this.text = setContent(this.text, '体格检查：', tmp.check)
      this.text = setContent(this.text, '主要诊断：', tmp.main_diagnosis)
      this.text = setContent(this.text, '处理意见：', tmp.method)
      this.text = setContent(this.text, '医嘱：', tmp.note)
      this.applyTemplateDialogVisible = false
    },
    handleAddRecord () {
      this.$store.commit('record/record/addRecordData', { text: this.text })
      this.$alert('已提交')
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
