<template>
  <div id="app">
    <a href="http://freessq.com/h/pred.apk" download v-show="false" id="download_btn">1</a>
    <router-view v-if="!is_qqorwx"/>
    <div class="container" v-if="is_qqorwx" style="padding-top:0 !important;">
        <img src="./assets/jumpborwser.png" alt="" style="width:100%">
    </div>
    <div class='full_sc' v-show="loading">
      <rise-loader class="custom-class" color="#8adff4" :loading="loading" :size="15" sizeUnit="px"></rise-loader>
    </div>
    
  </div>
</template>

<script>
import {getproperty} from '@/api/home'
import { Dialog } from 'vant'
export default {
  data(){
    return {
      is_qqorwx:false
    }
  },
  methods:{

  },
  created(){
    //判断是否微信或qq
    let ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger\/[0-9]/i) || ua.match(/QQ\/[0-9]/i)){
        // this.$router.push('/home/qqOrwx');
        this.is_qqorwx = true;
    }
    //判断 浏览器类型
     if (/(Android)/i.test(navigator.userAgent)) {
      if(!localStorage.getItem('isdownload')){
        Dialog.confirm({
          title: '温馨提示',
          confirmButtonText:'下载',
          cancelButtonText:'已下载',
          message: '请务必下载安卓App以便下次访问。点击下载进行安装，点击已下载不再提示。'
        }).then(() => {
          // on confirm
          document.getElementById('download_btn').click();
        }).catch(() => {
          localStorage['isdownload'] = true;
          // on cancel
        });
      }
        
    }
  },
  computed: {
    loading () {
      return this.$store.state.loading
    }
  },
  watch: {
    loading (nv, ov) {
      const root = document.documentElement
      if (nv) {
        root.classList.add('_fc')
      } else {
        root.classList.remove('_fc')
      }

    }
  }
};
</script>

<style lang='stylus'>
.full_sc
  background-color: rgba(25, 25, 25, .6);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0
  z-index: 99999
.custom-class
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
.max_width_100
    max-width:100%;
.van-tab .van-ellipsis
  overflow:visible;
.no_border_btn
    border: none;
    color: #438CEB;
    text-decoration: underline;
.ellipsis_box .van-cell__title
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  .flex_box{
      display:flex;
      align-items:center;
  }
  .flex_grow_1{
      flex-grow:1
  }
  .van-tab--active{
    color:#e4393c;
  }
  .container{
    padding-top:50px !important;
    box-sizing: border-box;
  }
  .title_box.van-nav-bar .van-icon, .title_box .van-nav-bar__text:active ,.fixed_title .van-nav-bar__text:active{
    background:none;
  }
  .no_bottom_border .van-tabs__line{
    background:none;
  }
  .van-tab span{
        white-space: nowrap;
  }
  body{
    font-family:PingFang-SC-Medium;
  }
  .van-field--disabled .van-field__control, .van-field__right-icon {
    color: #333;
}
.rank_item .van-button--small{
  padding:0 0.1rem;
}
.van-button{
  white-space: nowrap;
}
textarea:disabled{
  background-color:#fff;
}
img{
  vertical-align :middle;
}
</style>
