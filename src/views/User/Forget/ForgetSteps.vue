<template>
  <div><h3>找回密码</h3>
    <div>
      <div>
        <el-steps :active="1">
          <el-step title="身份认证" description="" />
          <el-step title="设置操作" description="" />
          <el-step title="完成" description="" />
        </el-steps>
      </div>

      <div>选择方式（手机验证码/邮箱） -> 设置操作 -> 完成</div>
      <div>您正在对qmuyangren@163.com进行重置密码操作,请先进行安全验证：</div>
      <div>点击获取验证码，短信将发送至安全手机********222</div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item>
          <el-input v-model="form.name" placeholder="获取验证码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">下一步</el-button>
        </el-form-item>
      </el-form>
      <div>
        若无法验证，您可以申请客服申诉
      </div>

      <div>密码重置</div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item>
          <el-input v-model="form.name" placeholder="新密码" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.name" placeholder="确认新密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">下一步</el-button>
        </el-form-item>
      </el-form>
      <div>
        若无法验证，您可以申请客服申诉
      </div>

      <div>密码重置成功，去登录</div>
    </div>
  </div>
</template>
