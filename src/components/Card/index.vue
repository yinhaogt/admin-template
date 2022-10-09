<template>
  <div class="hz-card">
    <el-card :body-style="{ backgroundColor: '#F7F8FA' }">
      <div slot="header" class="clearfix" v-if="headerName">
        <span>{{headerName}}</span>
      </div>
      <slot></slot>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'hz-card',
  props: {
    headerName: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
.hz-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  margin-top: 16px;
}
</style>
