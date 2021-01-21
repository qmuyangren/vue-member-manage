<template>
  <div>
    <h3>找回密码</h3>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item>
        <el-input v-model="form.name" placeholder="请输入用户名/邮箱/已验证手机号" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.name" placeholder="点击进行验证（滑块）" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">下一步(去选择找回方式)</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
