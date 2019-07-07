<template>
  <div id="app" @click.once="test">
    <a :href="apkurl" download v-show="false" id="download_btn">1</a>
    <router-view v-if="!is_qqorwx"/>
    <div class="container" v-if="is_qqorwx" style="padding-top:0 !important;">
        <img src="./assets/jumpborwser.png" alt="" style="width:100%">
    </div>
    <div class='full_sc' v-show="loading">
      <rise-loader class="custom-class" color="#8adff4" :loading="loading" :size="15" sizeUnit="px"></rise-loader>
    </div>
    <audio id="myaudio" preload="load" :src="dingdong" controls="controls" :loop="false" v-show="false"></audio>
    <!-- <van-button @click="test">dingdong</van-button> -->
  </div>
</template>

<script>
import { Dialog } from 'vant'
import { getkjring,gethome} from '@/api/home'
export default {
  data(){
    return {
      is_qqorwx:false,
      endtime: '',
      curtime: '',
      dingdong:'http://sscby.cn/zzh/dingdong.mp3',
      timer:null,
      timer_arr:[],
      curtime_arr:[],
      last_ring_time:null,
      getring_timer_arr:[],
      settimeout_timer :null
    }
  },
  methods:{
    countTime () {
        //时间差
        let leftTime = this.endtime - this.curtime;
        console.log(leftTime > 0)
        if (leftTime > 0) {
          this.curtime = this.curtime +1
        }else {
          this.getkjring(1);
        }
    },
    async getkjring(len) {
      if(this.timer){
        clearInterval(this.timer);
        this.timer = null;
      }
      if(this.settimeout_timer){
        clearTimeout(this.settimeout_timer)
        this.settimeout_timer = null;
      }
      const { data } = await getkjring({
          uid: localStorage.getItem('uid'),
          sid: localStorage.getItem('sid')
      }) 
      if(data.errorcode == 0){
        // this.dingdong = data.soundurl
        this.endtime = data.endtime;
        this.curtime = data.curtime;
        if(data.needring){
          this.timer = setInterval(this.countTime,1000)
          console.log('ring')
          this.$nextTick(()=>{
            document.getElementById('myaudio').play();           
          })
        }else{
          if(len){
            if(this.settimeout_timer){
              clearTimeout(this.settimeout_timer)
              this.settimeout_timer = null;
            }
            this.settimeout_timer = setTimeout(()=>{this.getkjring(len)},5000);
            
          }else{
            if(this.timer){
              clearInterval(this.timer);
              this.timer = null;
            }
            this.timer = setInterval(this.countTime,1000)
          }
        }
      }
    },
    async gethome() {
      let obj = {};
      if(localStorage.getItem('sid')){
        obj.sid = localStorage.getItem('sid')
      }
      if(localStorage.getItem('uid')){
        obj.uid = localStorage.getItem('uid')
      }
      const { data } = await gethome(obj)
      this.$store.dispatch('set_homedata',data)
      this.$store.dispatch('set_kfwecha',data.kfwecha)
      this.$store.dispatch('set_issetkjtx',data.issetkjtx)
      this.$store.dispatch('set_apkurl',data.apkurl)
      if(data.issetkjtx){
        if(this.timer == null){
          this.getkjring();
        }
      }else{
        if(this.timer){
          clearInterval(this.timer);
          this.timer = null;
        }
      }
    },
    test(){
      document.getElementById('myaudio').play()
      document.getElementById('myaudio').pause()
    },
  },
  created(){
    //判断是否微信或qq
    let ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger\/[0-9]/i) || ua.match(/QQ\/[0-9]/i)){
        // this.$router.push('/home/qqOrwx');
        this.is_qqorwx = true;
    }
    //判断 浏览器类型
     if (!this.is_qqorwx && /(Android)/i.test(navigator.userAgent)) {
      if(!navigator.userAgent.match(/lotapkinstalled/i)){
        Dialog.confirm({
          title: '温馨提示',
          cancelButtonText:'关闭',
          confirmButtonText:'安装/升级',
          message: '请务必安装/升级APP以保持最新版本。'
        }).then(() => {
          // on confirm
          document.getElementById('download_btn').click();
        }).catch(() => {
          
          // on cancel
        });
      }
    }
    
  },
  mounted(){
    this.$nextTick(()=>{
      console.log(this.$route)
      console.log(this.$route.path!='/')
      console.log(this.$route.path.indexOf('/home/index'))
      console.log(!this.is_qqorwx && this.$route.path.indexOf('/home/index') == -1 && this.$route.name!='loginIndex' && this.$route.name!='verification' && this.$route.name!='registerIndex')
      if(!this.is_qqorwx && this.$route.path.indexOf('/home/index') == -1 && this.$route.name!='loginIndex' && this.$route.name!='verification' && this.$route.name!='registerIndex' ){
        if(this.$store.getters.issetkjtx == null){
          this.gethome();
        }
      }
    })
  },
  computed: {
    loading () {
      return this.$store.state.loading
    },
    apkurl(){
      return this.$store.getters.apkurl
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
.left_width_box .van-nav-bar__left{
  left: 0;
  width: 1.5rem;
}
.orange_btn{
  background:#FC7953;
  color:#fff;
}
.left_border_ori{
  /* border-left:0.1rem solid #FC7953; */
  display:inline-block;
  /* padding:0; */
  /* padding-left:0.2rem; */
  /* font-size:0.4rem; */
  /* color:#7D7D7D; */
  background:#FC7953;
  width:0.08rem;
  height:0.4rem;
  position:relative;
  top:0.08rem;
  margin-right:0.1rem;
}
.dis_flex{
  display:flex;
}
.dis_flex .flex_grow_1{
  flex-grow:1;
}
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
