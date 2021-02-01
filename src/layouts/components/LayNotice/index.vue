<template>
  <div class="lay-header-notice">
    <el-popover
      class="header-action"
      placement="top"
      width="336"
      trigger="click"
    >
      <tab-msg :active-name="activeName" />
      <span slot="reference" class="btn lay-popover-btn">
        <el-badge :value="12" class="item"><lay-icon icon-class="bell" /></el-badge>
      </span>
    </el-popover>
  </div>
</template>
<script>
import TabMsg from './tabMsg'
export default {
  components: {
    TabMsg
  },
  data() {
    return {
      activeName: 'first'
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
.lay-popover-btn{
  display: inline-block;
  height: 100%;
  >.el-badge{
    .el-badge__content.is-fixed{
      top: 12px;
    }
  }
}
.lay-msg{
  margin: -12px;
  .el-tabs__header .el-tabs__nav-wrap .el-tabs__nav-scroll .el-tabs__nav .el-tabs__item{
    display: table-cell;
    width: 1%;
    text-align: center;
    float: none;
  }
  .el-tabs__nav-wrap::after{
    height: 1px;
  }
  .el-tabs__header{
    margin-bottom: 5px;
  }
}
</style>
