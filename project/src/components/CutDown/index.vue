<template>
  <div class="d_cutdonw">
    <button
      :plain='true'
      :disabled='disabled || isStart' :style="{color:color}"
      v-if="!isStart" @click.stop="onClick" style="white-space: nowrap;">
      获取验证码
    </button>
    <button v-else :style="{color:color}">
      {{ count }}秒
    </button>
  </div>
</template>

<script>
  export default {
    props: {
      // 是否禁用
      disabled: {
        type: Boolean,
        default: false
      },
      color: {
        type: String,
        default: 'red'
      },
      toStart: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        count: 300,  // 初始倒计时数
        isStart: false, // 是否开始
        timer: null   // 定时器
      }
    },
    methods: {
      // 点击事件
      onClick() {
        if (this.disabled || this.isStart) {
          return
        }
        // 广播click事件给父组件
        this.$emit('click')
        // 开启倒计时
        // this.isStart = true
        // this.start()
      },
      start() {
        if (!this.count) {
          this.count = 60
          this.isStart = false
          clearTimeout(this.timer)
          return
        } else {
          // 倒计时定时器
          this.count--
          this.timer = setTimeout(() => {
            this.start()
          }, 1000)
        }
      }
    },
    created() {
      if (this.toStart){
        this.isStart = true
        this.start()
      }
    }
  }
</script>

<style lang='stylus'>
  $main = #333333;

  .d_cutdonw
    color $main
    z-index 99
    font-size 28 rpx

    button
      color $main
      border 0
      padding 0
      font-size inherit
      background inherit
</style>
