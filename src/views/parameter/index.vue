<template>
  <div class="app-container parameter-config-container">
    <section class="config-panel">
      <div class="filter-toolbar">
        <div class="filter-item">
          <label for="app-filter">APP:</label>
          <el-select id="app-filter" v-model="filters.app" clearable placeholder="全部">
            <el-option
              v-for="app in appOptions"
              :key="app"
              :label="app"
              :value="app"
            />
          </el-select>
        </div>
        <div class="filter-item">
          <label for="type-filter">TYPE:</label>
          <el-select id="type-filter" v-model="filters.type" clearable placeholder="全部">
            <el-option
              v-for="type in typeOptions"
              :key="type"
              :label="type"
              :value="type"
            />
          </el-select>
        </div>
        <div class="filter-item keyword-filter">
          <label for="keyword-filter">KEYWORD:</label>
          <el-input
            id="keyword-filter"
            v-model="filters.keyword"
            clearable
            placeholder="参数名或备注"
            @keyup.enter.native="applyFilters"
          />
        </div>
        <div class="filter-actions">
          <el-button type="primary" icon="el-icon-search" @click="applyFilters">查询</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="openCreateDialog">新增</el-button>
        </div>
      </div>

      <el-table
        :data="filteredList"
        row-key="id"
        empty-text="暂无匹配的参数"
        border
        stripe
        highlight-current-row
        class="parameter-table"
      >
        <el-table-column prop="key" label="参数名" min-width="200" show-overflow-tooltip />
        <el-table-column prop="value" label="值" min-width="190" show-overflow-tooltip />
        <el-table-column prop="remark" label="备注" min-width="230" show-overflow-tooltip />
        <el-table-column label="适用设备" width="130">
          <template slot-scope="scope">
            <el-tag size="small" type="info">{{ scope.row.device }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="适用渠道" width="130">
          <template slot-scope="scope">
            <el-tag size="small" type="info">{{ scope.row.channel }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="country" label="适用国家" width="130" />
        <el-table-column prop="version" label="适用版本" width="130" />
        <el-table-column prop="priority" label="优先级" width="100" align="center" />
      </el-table>
    </section>

    <el-dialog
      title="新增参数"
      :visible.sync="dialogVisible"
      width="560px"
      @closed="resetForm"
    >
      <el-form
        ref="parameterForm"
        :model="form"
        :rules="formRules"
        label-width="96px"
        class="parameter-form"
      >
        <el-form-item label="APP" prop="app">
          <el-select v-model="form.app" placeholder="请选择 APP">
            <el-option
              v-for="app in appOptions"
              :key="app"
              :label="app"
              :value="app"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="TYPE" prop="type">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option
              v-for="type in typeOptions"
              :key="type"
              :label="type"
              :value="type"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="参数名" prop="key">
          <el-input v-model.trim="form.key" placeholder="请输入参数名" />
        </el-form-item>
        <el-form-item label="参数值" prop="value">
          <el-input v-model="form.value" type="textarea" :rows="2" placeholder="请输入参数值" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model.trim="form.remark" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="适用设备" prop="device">
          <el-input v-model.trim="form.device" placeholder="例如：android 或 ALL" />
        </el-form-item>
        <el-form-item label="适用渠道" prop="channel">
          <el-input v-model.trim="form.channel" placeholder="例如：official 或 ALL" />
        </el-form-item>
        <el-form-item label="适用国家" prop="country">
          <el-input v-model.trim="form.country" placeholder="例如：ALL" />
        </el-form-item>
        <el-form-item label="适用版本" prop="version">
          <el-input v-model.trim="form.version" placeholder="例如：>=1.0.0 或 ALL" />
        </el-form-item>
        <el-form-item label="优先级" prop="priority">
          <el-input-number v-model="form.priority" :min="0" :max="9999" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="createParameter">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const createEmptyForm = () => ({
  app: '融合版',
  type: '客户端配置',
  key: '',
  value: '',
  remark: '',
  device: 'ALL',
  channel: 'ALL',
  country: 'ALL',
  version: 'ALL',
  priority: 0
})

export default {
  name: 'ParameterConfiguration',
  data() {
    return {
      appOptions: ['融合版', 'Android版', 'iOS版'],
      typeOptions: ['客户端配置', '服务端配置'],
      filters: {
        app: '',
        type: '',
        keyword: ''
      },
      appliedFilters: {
        app: '',
        type: '',
        keyword: ''
      },
      list: [
        {
          id: 1,
          app: '融合版',
          type: '客户端配置',
          key: 'ad_countdown_time',
          value: '5000',
          remark: '广告展示倒计时（毫秒）',
          device: 'android',
          channel: 'ALL',
          country: 'ALL',
          version: '>=4.1.1',
          priority: 0
        },
        {
          id: 2,
          app: '融合版',
          type: '客户端配置',
          key: 'ad_max_click',
          value: '4',
          remark: '广告点击次数限制阈值',
          device: 'ALL',
          channel: 'ALL',
          country: 'ALL',
          version: 'ALL',
          priority: 0
        },
        {
          id: 3,
          app: '融合版',
          type: '客户端配置',
          key: 'android_enable_sponsor',
          value: 'true',
          remark: '是否启用 Android Sponsor 展示',
          device: 'android',
          channel: 'ALL',
          country: 'ALL',
          version: 'ALL',
          priority: 0
        },
        {
          id: 4,
          app: 'Android版',
          type: '客户端配置',
          key: 'android_push_msg',
          value: '如使用遇到问题，请联系在线客服。',
          remark: '客户端问题提示文案',
          device: 'android',
          channel: 'official',
          country: 'ALL',
          version: '>=2.2.5',
          priority: 0
        }
      ],
      nextId: 5,
      dialogVisible: false,
      form: createEmptyForm(),
      formRules: {
        app: [{ required: true, message: '请选择 APP', trigger: 'change' }],
        type: [{ required: true, message: '请选择类型', trigger: 'change' }],
        key: [{ required: true, message: '请输入参数名', trigger: 'blur' }],
        value: [{ required: true, message: '请输入参数值', trigger: 'blur' }],
        device: [{ required: true, message: '请输入适用设备', trigger: 'blur' }],
        channel: [{ required: true, message: '请输入适用渠道', trigger: 'blur' }],
        country: [{ required: true, message: '请输入适用国家', trigger: 'blur' }],
        version: [{ required: true, message: '请输入适用版本', trigger: 'blur' }]
      }
    }
  },
  computed: {
    filteredList() {
      const { app, type, keyword } = this.appliedFilters
      const query = keyword.toLowerCase()

      return this.list.filter(item => {
        const matchesApp = !app || item.app === app
        const matchesType = !type || item.type === type
        const matchesKeyword = !query ||
          `${item.key} ${item.value} ${item.remark}`.toLowerCase().includes(query)
        return matchesApp && matchesType && matchesKeyword
      })
    }
  },
  methods: {
    applyFilters() {
      this.appliedFilters = {
        app: this.filters.app,
        type: this.filters.type,
        keyword: this.filters.keyword.trim()
      }
    },
    openCreateDialog() {
      this.dialogVisible = true
      this.form = createEmptyForm()
      this.$nextTick(() => {
        if (this.$refs.parameterForm) {
          this.$refs.parameterForm.clearValidate()
        }
      })
    },
    resetForm() {
      this.form = createEmptyForm()
      if (this.$refs.parameterForm) {
        this.$refs.parameterForm.clearValidate()
      }
    },
    createParameter() {
      this.$refs.parameterForm.validate(valid => {
        if (!valid) return

        const duplicate = this.list.some(item =>
          item.app === this.form.app &&
          item.type === this.form.type &&
          item.key === this.form.key
        )
        if (duplicate) {
          this.$message.error('该 APP 和类型下已存在相同参数名')
          return
        }

        this.list.unshift({
          ...this.form,
          id: this.nextId++
        })
        this.filters = { app: '', type: '', keyword: '' }
        this.appliedFilters = { app: '', type: '', keyword: '' }
        this.dialogVisible = false
        this.$message.success('参数已添加')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.parameter-config-container {
  padding: 20px;
}

.config-panel {
  padding: 20px;
  background: $surfaceBg;
  border: 1px solid $borderColor;
  border-radius: 8px;
}

.filter-toolbar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px 24px;
  margin-bottom: 20px;
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 12px;

  label {
    flex: none;
    color: $textPrimary;
    font-weight: 500;
  }

  .el-select {
    width: 200px;
  }
}

.keyword-filter {
  .el-input {
    width: 220px;
  }
}

.filter-actions {
  display: flex;
  gap: 12px;
  margin-left: auto;
}

.parameter-table {
  width: 100%;
}

.parameter-form {
  .el-select {
    width: 100%;
  }

  .el-input-number {
    width: 180px;
  }
}

@media (max-width: 768px) {
  .parameter-config-container {
    padding: 12px;
  }

  .config-panel {
    padding: 14px;
  }

  .filter-item,
  .filter-item .el-select,
  .keyword-filter .el-input {
    width: 100%;
  }

  .filter-actions {
    width: 100%;
    margin-left: 0;
  }
}
</style>
