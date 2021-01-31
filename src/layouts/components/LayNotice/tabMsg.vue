<template>
  <el-tabs v-model="activeTitle" class="lay-msg" @tab-click="handleClick">
    <el-tab-pane label="通知(4)" name="first">
      <div class="lay-card">
        <ul class="lay-list-group">
          <li class="lay-list-group-item">
            <div class="media lay-msg-media">
              <img class="lay-msg-media-avatar align-self-start mr-3" src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png">
              <div class="media-body lay-msg-body">
                <h4 class="lay-msg-media-header">你收到了 14 份新周报</h4>
                <div class="lay-msg-media-desc">1 年前</div>
              </div>
            </div>
          </li>
          <li class="lay-list-group-item">
            <div class="media lay-msg-media">
              <img class="lay-msg-media-avatar align-self-start mr-3" src="https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png">
              <div class="media-body lay-msg-body">
                <h4 class="lay-msg-media-header">你推荐的 曲妮妮 已通过第三轮面试</h4>
                <div class="lay-msg-media-desc">1 年前</div>
              </div>
            </div>
          </li>
          <li class="lay-list-group-item">
            <div class="media lay-msg-media">
              <img class="lay-msg-media-avatar align-self-start mr-3" src="https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png">
              <div class="media-body lay-msg-body">
                <h4 class="lay-msg-media-header">这种模板可以区分多种通知类型</h4>
                <div class="lay-msg-media-desc">1 年前</div>
              </div>
            </div>
          </li>
          <li class="lay-list-group-item">
            <div class="media lay-msg-media">
              <img class="lay-msg-media-avatar align-self-start mr-3" src="https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png">
              <div class="media-body lay-msg-body">
                <h4 class="lay-msg-media-header">左侧图标用于区分不同的类型</h4>
                <div class="lay-msg-media-desc">1 年前</div>
              </div>
            </div>
          </li>
          <li class="lay-list-group-item">
            <div class="media lay-msg-media">
              <img class="lay-msg-media-avatar align-self-start mr-3" src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png">
              <div class="media-body lay-msg-body">
                <h4 class="lay-msg-media-header">内容不要超过两行字，超出时自动截断</h4>
                <div class="lay-msg-media-desc">1 年前</div>
              </div>
            </div>
          </li>
        </ul>
        <div class="lay-card-footer text-center">清空 通知</div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="消息(3)" name="second">
      <div class="lay-card">
        <ul class="lay-list-group">
          <li class="lay-list-group-item">
            <div class="media lay-msg-media">
              <img class="lay-msg-media-avatar align-self-center mr-3" src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png">
              <div class="media-body lay-msg-body">
                <h4 class="lay-msg-media-header">曲丽丽 评论了你</h4>
                <div class="lay-msg-media-desc">
                  <div class="mb-1">描述信息描述信息描述信息</div>
                  <div>1 年前</div>
                </div>
              </div>
            </div>
          </li>
          <li class="lay-list-group-item">
            <div class="media lay-msg-media">
              <img class="lay-msg-media-avatar align-self-center mr-3" src="https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png">
              <div class="media-body lay-msg-body">
                <h4 class="lay-msg-media-header">朱偏右 回复了你</h4>
                <div class="lay-msg-media-desc">
                  <div class="mb-1">这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像</div>
                  <div>1 年前</div>
                </div>
              </div>
            </div>
          </li>
          <li class="lay-list-group-item">
            <div class="media lay-msg-media">
              <img class="lay-msg-media-avatar align-self-center mr-3" src="https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png">
              <div class="media-body lay-msg-body">
                <h4 class="lay-msg-media-header">标题</h4>
                <div class="lay-msg-media-desc">
                  <div class="mb-1">这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像</div>
                  <div>1 年前</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="lay-card-footer text-center">清空 消息</div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="待办(4)" name="third">
      <div class="lay-card">
        <ul class="lay-list-group">
          <li class="lay-list-group-item">
            <div class="media lay-msg-media">
              <div class="media-body lay-msg-body">
                <div class="lay-msg-media-header d-flex">
                  <div class="lay-msg-media-title mr-auto">
                    任务名称
                  </div>
                  <div>
                    <el-tag type="info" size="small">未开始</el-tag>
                  </div>
                </div>
                <div class="lay-msg-media-desc">
                  任务需要在 2017-01-12 20:00 前启动
                </div>
              </div>
            </div>
          </li>
          <li class="lay-list-group-item">
            <div class="media lay-msg-media">
              <div class="media-body lay-msg-body">
                <div class="lay-msg-media-header d-flex">
                  <div class="lay-msg-media-title mr-auto">
                    第三方紧急代码变更
                  </div>
                  <div>
                    <el-tag type="danger" size="small">马上到期</el-tag>
                  </div>
                </div>
                <div class="lay-msg-media-desc">
                  冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务
                </div>
              </div>
            </div>
          </li>
          <li class="lay-list-group-item">
            <div class="media lay-msg-media">
              <div class="media-body lay-msg-body">
                <div class="lay-msg-media-header d-flex">
                  <div class="lay-msg-media-title mr-auto">
                    信息安全考试
                  </div>
                  <div>
                    <el-tag type="warning" size="small">已耗时 8 天</el-tag>
                  </div>
                </div>
                <div class="lay-msg-media-desc">
                  指派竹尔于 2017-01-09 前完成更新并发布
                </div>
              </div>
            </div>
          </li>
          <li class="lay-list-group-item">
            <div class="media lay-msg-media">
              <div class="media-body lay-msg-body">
                <div class="lay-msg-media-header d-flex">
                  <div class="lay-msg-media-title mr-auto">
                    ABCD 版本发布
                  </div>
                  <div>
                    <el-tag size="small">进行中</el-tag>
                  </div>
                </div>
                <div class="lay-msg-media-desc">
                  冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="lay-card-footer text-center">清空 待办</div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  props: {
    activeName: {
      type: String,
      default: 'first'
    }
  },
  data() {
    return {
      activeTitle: this.activeName
    }
  },
  methods: {
    handleClick(tab, event) {
      // this.activeTitle = tab.name
      console.log(tab, event)
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
  .lay-card{
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border-radius: .25rem;
  .lay-card-header {
    padding: .75rem 1.25rem;
    margin-bottom: 0;
    background-color: rgba(0,0,0,.03);
    border-bottom: 1px solid #e8e8e8;
  }
  .lay-card-footer {
    padding: .75rem 1.25rem;
    border-top: 1px solid #e8e8e8;
  }
  lay-card-body {
    flex: 1 1 auto;
    padding: 1.25rem;
  }
  .lay-list-group{
    display: flex;
    flex-direction: column;
    margin-top: 0;
  // No need to set list-style: none; since .list-group-item is block level
    padding-left: 0; // reset padding because ul and ol
  margin-bottom: 0;

  }
  .lay-list-group-item {
    position: relative;
    display: block;
    padding: .75rem 1.25rem;
    background-color: #fff;
    border-bottom: 1px solid #e8e8e8;
  &:hover{
     cursor: pointer;
     background-color:#e6f7ff
   }
  &:first-child{
   }
  }

  .lay-card-header {
  &:first-child{}

  + .list-group {
  .list-group-item:first-child {
    border-top: 0;
  }
  }
  }
  .lay-card-footer {
  &:last-child {
     border-top:0
   }
  }
  }
  .lay-msg-media{
  .lay-msg-media-avatar{
    width: 32px;
  }
  .lay-msg-body{}
  .lay-msg-media-header{
    font-weight: 400;
    margin-top: 0;
    margin-bottom: 8px;
    color: rgba(0,0,0,.65);
  }
  .lay-msg-media-desc{
    color: rgba(0,0,0,.45);
  }
  }
  .lay-user-menu{
  .svg-icon{
    margin-right: 12px;
  }
  }
</style>
