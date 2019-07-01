<template>
  <div >
    <div class="container" id="home_page">
      <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
        <div class="fixed_title">
          <van-nav-bar
            title="智者汇方案计划"
            :left-text="left_text"
            right-text="关于"
            @click-left="onClickLeft"
          >
            <span slot="title" @click="gethome">智者汇方案计划
              <!-- <van-icon name="replay" /> -->
            </span>
            <div slot="right" v-if="lottype && lottype.length>0">
              <span class="top_right_title" @click="show_ul">
                {{lottype[active_lt].lotname}}
                <van-icon name="arrow-down" style="vertical-align: text-top;"/>
              </span>
              <ul class="right_top_ul" v-show="show_lt">
                <li :class="{active:k== active_lt}" v-for="(l,k) in lottype" @click="change_lt(k)" :key="k">{{l.lotname}}</li>
              </ul>
            </div>
          </van-nav-bar>
        </div>
        <van-swipe :autoplay="3000" indicator-color="#007BC2">
          <van-swipe-item  v-for="(image, index) in advs" :key="index">
            <div class="swipe_img_box" @click="jumpTo(image.url)">
              <img :src="$https+image.pic" />
            </div>
          </van-swipe-item>
        </van-swipe>
        <a :href="banner_url" v-show="false" id="banner_a">1</a>
        
        <van-row :gutter="30" class="list_box text_center">
          <van-col span="6" style="width:23%;padding-left:0;padding-right:0" v-for="(l,index) in list" :key="index">
            <div class="item_box"  @click="jumpTo(l.link,l.islink)">
              <img :src="l.src" alt="" class="max_width_100">
              <span>{{l.title}}</span>
            </div>
          </van-col>
        </van-row>

        

        <div style="background:#F5F5F5;height:0.2rem;"></div>
        <div v-if="planInfo">
          <div class="lottery_time flex">
            <div style="width:47%;font-size: 0.38rem;white-space:nowrap;">距{{planInfo.curissue}}期开奖：<span class="green"> {{kjdjs}}</span></div>
            <div style="width:51%;text-align: center;font-size: 0.38rem;"><span style="display:inline-block;white-space: nowrap;">当前时间：</span><span class="blue" style="white-space:nowrap;"> {{curtime}}</span></div>
          </div>
          <div class="lottery_time lottery_times">
              <span>{{planInfo.preissue}}期开奖号码:</span> <i class="lottery_number">{{planInfo.kjnum}}</i>
          </div>
        </div>

        <div style="background:#F5F5F5;height:0.2rem"></div>

        <van-row :gutter="10" class="flex" style="padding-bottom:0.2rem;padding:.2rem;flex-wrap: wrap;" v-if="lottype.length>0 && lottype[active_lt].plantypes">
            <van-col :span="6" v-for="(y,index) in lottype[active_lt].plantypes" :key="index" >
                <van-button class="btn_fa" :class="{active_color:index==active_pt}" size="large" @click="change_pt(index,y.plantype)">{{y.planname}}</van-button>
            </van-col>
        </van-row>

        <div style="background:#F5F5F5;padding:0.2rem .4rem;text-align:right;color:red;font-size:.35rem;" v-if="lottype.length>0 && lottype[active_lt].plantypes">
          {{lottype[active_lt].plantypes[active_pt].plandesc}}
        </div>

        <van-row :gutter="10" class="flex" style="padding-bottom:0.2rem;padding:.2rem;flex-wrap: wrap;">
            <van-col :span="6" v-for="(y,index) in fangansList" :key="index" >
                <van-button class="btn_fa" :class="{active_color:index==active_fa}" size="large" @click="change_fa(index,y.fanganid)">{{y.fanganname}}</van-button>
            </van-col>
        </van-row>


        <table>
            <tr>
                <th>期次</th>
                <th>计划内容</th>
                <th>几期中</th>
                <th>盈亏</th>
            </tr>
            <tr v-for="(item,index) in planInfoList" :key="index">
                <td>{{item.issue}}</td>
                <td v-if="item.content == '会员权限'" @click="toOpeningMember"><van-button size="small" class="membership_privileges">{{item.content}}</van-button></td>
                <td v-else>{{item.content}}</td>
                <td>{{item.hitnum}}</td>
                <td>{{item.yingkui}}</td>
            </tr>
        </table>

        <div class="for_more">
            <van-button size="small" class="no_border_btn" @click="getplans">获取更多</van-button>
        </div>
        
        <div class="replication_solution">
            <van-button size="large" style="background:#FC7953;color:#fff;width:90%" @click="show_tt = true">复制方案</van-button>
        </div>

        <van-dialog 
            v-model="show_tt"
            title="复制方案提示"
            show-cancel-button
            class="dialog_content_input"
            :before-close="beforeClose"
            >
            <van-field
                v-model.trim.number="count_input"
                clearable
                label="最近条数："
            />
        </van-dialog>




      <!-- </van-pull-refresh> -->

    </div>

    <div class="container" v-if="is_ios" style="background:#F5F5F5;padding-top:0.4rem !important;position:absolute;top:0;z-index:1001;padding-bottom:2rem;">
        <!-- <title-bar title_name="添加到主屏幕" /> -->
        <div style="background:#EFEFEF;padding:0.2rem 0.15rem;margin:0 0.3rem 0.2rem;">
            <div style="text-align:center;font-size:0.5rem;color:#DB3030;font-weight:bold;padding:0.2rem 0;">温馨提示</div>
            <div style="line-height:1.6;padding-left:0.2rem;font-size:0.4rem;">
              请务必添加本页面到主屏幕，以便下次访问，点击“已添加”不再提醒
            </div>
            <div style="text-align:center;padding:0.4rem 0;">
              <van-button style="width:3rem;background-color:#D4D4D4;color:#1A1A1A;font-size:0.45rem;" @click="addfn">已添加</van-button>
              <van-button style="width:3rem;margin-left:1rem;background-color:#DB3030;color:#fff;font-size:0.45rem;" @click="ignore">关闭</van-button>
            </div>
        </div>
        <img src="../../assets/down_iphone.png" alt="" style="width:100%">
    </div>
    
  </div>
</template>

<script>
import { Dialog } from 'vant'
import { gethome, getfanganrank } from '@/api/home'
import { getplan } from '@/api'
import { getdTime, getHMS } from '@/utils'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
export default {
  data () {
    return {
      show_tt:false,
      count_input: 20,
      show_lt:false,
      planInfo:null,
      curtime:'12',
      kjdjs:'',
      lastid:0,
      time_add:true,
      _curtime: '',
      planInfoList: [],
      endtime: '',
      current_time:'',
      isCurtime: false,
      cur_timer:null,
      kj_number_timer:null,
      timer: null,
      h: '',
      m: '',
      s: '',
      lottype:[],
      active_fa:0,
      active_lt:0,
      active_pt:0,


      list:[
        {src:require('../../assets/mfsy.png'),title:'免费使用',link:'/personal/freeUse',islink: false},
        // {src:require('../../assets/fajh.png'),title:'方案计划',link:'/home/aPlan',islink: false},
        {src:require('../../assets/kjtx.png'),title:'开奖提醒',link:'/home/openRemind',islink: false},
        {src:require('../../assets/gg.png'),title:'公告',link:'/home/announcement/index',islink: localStorage.getItem('uid')?false:true},
        
        {src:require('../../assets/dlzq.png'),title:'代理赚钱',link:'/home/earnMoney',islink: localStorage.getItem('uid')?false:true}
        
      ],
      notice:'',
      advs:[],
      left_text:'登录',
      left_path:'/login/index',
      banner_url:'#',
      is_ios:false,
      isFirstEnter:false,
      fangansList:null,
      notices:[],
      isLoading:false
    }
  },
  methods: {
    beforeClose(action,done){
        if(action == 'confirm'){
            if(!this.count_input){
                this.$toast('请输入要复制的最近条数！')
                done(false)
                return;
            }
            this.doCopy(this.planInfoList);
            this.count_input = 20
        }
        done();
    },
    //复制
    doCopy (text) {
        let arr = []
        // let txt = text.map(item => {
        //     arr.push(`${item.issue}  ${item.content}  ${item.hitnum}  `)
        // })
        let len = this.count_input;
        if(len > text.length){
            len = text.length;
        }
        for(let i = 0;i<len;i++){
            let item = text[i]
            arr.push(`${item.issue}  ${item.content}  ${item.hitnum}  `)
        }
        arr = `--------------------------- \n ${arr.join('\n')} \n--------------------------- ` 
        this.$copyText(arr).then( (e) => {
            Dialog.alert({
                title: '提示',
                message: '复制成功，请粘贴分享到微信或QQ。'
            }).then(() => {
            // on close
            });
        },  (e) => {
            Dialog.alert({
                title: '提示',
                message: '复制失败，请手动复制！'
            }).then(() => {
            // on close
            });
            console.log(e)
        })
    },
    show_ul(){
      this.show_lt = !this.show_lt;
    },
    //点击会员权限跳转开通会员页面
    toOpeningMember() {
        if(!localStorage.getItem('sid') || !localStorage.getItem('uid')) {
            this.$router.push('/login/index')
        }else {
            this.$router.push('/home/openingMember')
        }
    },
    change_lt(index){
      this.show_lt = false;
      this.lastid = 0
      this.active_pt = 0
      this.active_fa = 0
      this.active_lt = index
      this.getfanganrank().then(()=>{
        this.getplans();
      })

    },
    change_fa(index){
        this.active_fa = index
        this.lastid = 0
        this.getplans()
    },
    change_pt(index){
        this.active_fa = 0
        this.active_pt = index
        this.lastid = 0
        this.getfanganrank().then(()=>{
          this.getplans();
        })
    },
    async getfanganrank(){
      let obj = {
        lottype: 801,
        plantype: 0,
      }
      if(localStorage.getItem('sid')){obj.sid = localStorage.getItem('sid') }
      if(localStorage.getItem('uid')){obj.uid = localStorage.getItem('uid') }
      const { data } = await getfanganrank(obj)
      this.fangansList = data.list
    },
    async getplans() {
        if(this.timer){
          clearTimeout(this.timer)
          this.timer = null
        }
        if(this.cur_timer){
          clearInterval(this.cur_timer)
          this.cur_timer = null
        }
        let obj = {
          lottype: this.lottype[this.active_lt].lottype,
          fanganid: this.fangansList[this.active_fa].fanganid,
          plantype: this.lottype[this.active_lt].plantypes[this.active_pt].plantype,
          lastid: this.lastid
        }
        if(localStorage.getItem('sid')){obj.sid = localStorage.getItem('sid') }
        if(localStorage.getItem('uid')){obj.uid = localStorage.getItem('uid') }
        const { data } = await getplan(obj)
        this.planInfo = data
        let planInfoList = data.list
        if(this.lastid != 0 && this.time_add) {
            planInfoList = planInfoList.map(item => {
                this.planInfoList.push(item)
            })
        }else {
            this.planInfoList = planInfoList
        }  
        this.time_add = true; 
        this.lastid = this.planInfo.lastid  //获取更多传当前这个lastid 默认传0

        
        this.curtime = getHMS(this.planInfo.curtime)//开始时间
        this._curtime = this.planInfo.curtime*1000//当前时间
        this.endtime = this.planInfo.endtime*1000//结束时间
        this.current_time = this.planInfo.curtime*1000//当前时间
        this.isCurtime = false
        this.countTime()
        this.curTime();
        this.cur_timer = setInterval(this.curTime,1000)

        if(data.kjnum == '正在开奖...'){
            if(this.kj_number_timer){
              clearInterval(this.kj_number_timer)
              this.kj_number_timer = null;
            }
            this.lastid = 0;
            this.kj_number_timer = setInterval(this.getplans,3000);
            return;
        }else{
            if(this.kj_number_timer){
                clearInterval(this.kj_number_timer)
                this.kj_number_timer = null;
            }
        }
    },
    countTime () {
        //时间差
        let leftTime = this.endtime - this._curtime;
        //定义变量 d,h,m,s保存倒计时的时间
        if (leftTime >= 0) {
            if(leftTime == 0){
                this.time_add = false;
                this.lastid = 0
                this.getplans();
                if(this.timer){
                  clearTimeout(this.timer)
                  this.timer = null
                }
                return;
            }
            this._curtime = this._curtime + 1000
            // this.d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
            this.h = Math.floor(leftTime / 1000 / 60 / 60 % 24)>=10?Math.floor(leftTime / 1000 / 60 / 60 % 24):'0'+Math.floor(leftTime / 1000 / 60 / 60 % 24);
            this.m = Math.floor(leftTime / 1000 / 60 % 60)>=10?Math.floor(leftTime / 1000 / 60 % 60):'0'+Math.floor(leftTime / 1000 / 60 % 60);
            this.s = Math.floor(leftTime / 1000 % 60)>=10?Math.floor(leftTime / 1000 % 60):'0'+Math.floor(leftTime / 1000 % 60);
            this.kjdjs = this.h+':'+this.m+':'+this.s
            //递归每秒调用countTime方法，显示动态时间效果
            this.timer = setTimeout(this.countTime, 1000);
        }else {
            if(this.timer){
              clearTimeout(this.timer)
              this.timer = null;
            }
        }
    },
    curTime () {
        this.current_time = this.current_time + 1000
        var date=new Date(this.current_time);
        var year=date.getFullYear();
        var month=date.getMonth()+1;
        var day=date.getDate();
        var hour="00"+date.getHours();
        hour=hour.substr(hour.length-2);
        var minute="00"+date.getMinutes();
        minute=minute.substr(minute.length-2);
        var second="00"+date.getSeconds();
        second=second.substr(second.length-2);
        // let str = year+"-"+month+"-"+day+" "+" "+hour+":"+minute+":"+second
        let str = month+"月"+day+"日"+" "+hour+":"+minute+":"+second
        this.curtime = str
    },
    onRefresh() {
      this.pull_refresh();
    },
    goDetail(data){
        this.$router.push({
            path: '/home/announcement/detail', 
            query: {
                // title: data.title, 
                noticeid: data.noticeid
            }
        })
    },
    addfn(){
      localStorage['isadd'] = true;
      this.is_ios = false;
    },
    ignore(){
      this.is_ios = false;
    },
    onClickLeft() {
      this.$router.push(this.left_path)
    },
    onClickRight(){
      this.$router.push('/personal/about')
    },
    jumpTo( path, islink ){
      if(path.indexOf('/')==0){
        if(path == '/home/aPlan' && localStorage.getItem('_lottype')){
          this.$router.push({
            path:path,
            query:{
              lottype:localStorage.getItem('_lottype')
            }
          })
          return;
        }
        this.$router.push(path)
      }else{
        this.banner_url = path;
        this.$nextTick(()=>{
          document.getElementById('banner_a').click();
        })
      }
    },
    goSinglePlan(p){
      this.$router.push({
        path:'/home/singlePlan',
        query:{
          fanganid:p.fanganid
        }
      })
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
      this.isLoading = false;
      this.advs = data.advs 
      this.$store.dispatch('set_homedata',data)
      localStorage.setItem('aPlan_home',JSON.stringify(data))
      this.$store.dispatch('set_kfwecha',data.kfwecha)
      this.$store.dispatch('set_issetkjtx',data.issetkjtx)
      this.$store.dispatch('set_apkurl',data.apkurl)
      // this.lottypeList = data.lottype//标题选择
      this.lottype = data.lottype;
      this.notices = data.notices
      // this.chooseName = this.lottypeList[0].lotname
      if(data.issetkjtx){
        if(this.$root.$children[0].timer == null){
          this.$root.$children[0].getkjring();
        }
      }else{
        if(this.$root.$children[0].timer){
          clearInterval(this.$root.$children[0].timer);
          this.$root.$children[0].timer = null;
        }
        if(this.$root.$children[0].settimeout_timer){
            clearTimeout(this.$root.$children[0].settimeout_timer)
            this.$root.$children[0].settimeout_timer = null;
        }
      }


      
    },
    pull_refresh(){
        if(this.$root.$children[0].timer){
            clearInterval(this.$root.$children[0].timer);
            this.$root.$children[0].timer = null;
        }
        this.gethome();
    },
  },
  created(){
    this.isFirstEnter=true;
    //判断 浏览器类型
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      if(!localStorage.getItem('isadd')){
        this.is_ios = true;
      }
    }

    if(this.$route.query.cid){
      localStorage['cid'] = this.$route.query.cid;
    }else{
      localStorage['cid'] = ''
    }
    if(this.$route.query.pid){
      localStorage['pid'] = this.$route.query.pid;
    }else{
      localStorage['pid'] = ''
    }
    
    if(localStorage['uid'] && localStorage['uid']!=''){
      this.left_text = '会员中心';
      this.left_path = '/personal/index'
    }
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          
        } else {
          this.gethome();
        }
    })
  },
  activated(){  
    this.lastid = 0;
    this.show_lt = false;
    this.gethome().then(()=>{
      this.getfanganrank().then(()=>{
        this.getplans();
      })
    })
    this.isFirstEnter=false;
    this.$store.dispatch('set_isback',false)
    
    if(localStorage['uid'] && localStorage['uid']!=''){
      this.left_text = '会员中心';
      this.left_path = '/personal/index'
    }
  },
  beforeRouteLeave (to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      if(this.timer) {
          clearTimeout(this.timer)
          this.timer = null;
      }
      if(this.cur_timer){
          clearInterval(this.cur_timer)
          this.cur_timer = null;
      }
      if(this.kj_number_timer){
          clearInterval(this.kj_number_timer)
          this.kj_number_timer = null;
      }
      next();
  }
}
</script>

<style scoped lang="stylus">
.replication_solution
    background #EEEEEE
    padding .5rem  0
    text-align center
.right_top_ul
  background #fff
  position absolute
  top 1rem
  right -0.2rem
  box-shadow 0 0 .1rem #aaa
  line-height 2
  >li.active
    color #ff5c0a
  >li
    padding .1rem .2rem
    text-align left
    white-space nowrap
.top_right_title
  color #ff5c0a
  .van-icon
    color #ff5c0a

.green
  color #2fc900
.blue
  color #0096ff
/deep/ .membership_privileges
    border:none;
    background:#FFBD28!important
    color:#FF0B60;
    height:.6rem;
    line-height:.4rem
    font-size .32rem
.for_more
    margin .2rem auto
    text-align center
table 
    font-size .32rem
    width 100%
    border 1px solid #cccccc
    border-right none
    tr,td,th 
        border 1px solid #E5E5E5
    tr 
        border-right none
    td,th   
        color #A8A8A8
    th,td 
        padding .3rem 0
        text-align center
    td  
        color #2B2B2B
        font-size .4rem
    td:first-child
        color #6B6B6B
    td:first-child
        background #E5E5E5
    th
        background #F5F5F5
        font-size .42rem
.btn_fa
  height:.8rem;
  line-height:.6rem;
  margin: .1rem 0
  font-size .42rem
.lottery_time
    width 100%
    display flex
    justify-content space-around
    align-items center
    color #727272
    border-bottom 1px solid #E5E5E5
    box-sizing border-box
    >div
        display flex
        width 49%
        font-size .28rem
        padding .5rem .1rem
        box-sizing border-box
        justify-content center
        &:first-child
            border-right 1px solid #E5E5E5
.lottery_times
    padding .5rem .2rem
    font-size .28rem
    border none!important
    justify-content left 
.lottery_number
    display inline-block
    padding-left .2rem
    color #000
    font-size .45rem
    font-weight bold
button.active_color{
  background:#fc7953;
  border-color:#fc7953;
  color:#fff;
}
.msg_box .van-cell{
  padding:0.12rem 0;
}
.msg_box .msg_item .van-cell__title span{
  color:#363636;
  /* font-size:0.4rem; */
}
.van-cell:not(:last-child)::after{
  content:"";
  border:none;
}
.van-cell__value{
  flex:unset;
  padding-left:0.1rem;
}
.diy_font.van-cell{
  padding-bottom:0.2rem;
}
.diy_font .van-cell__right-icon{
  font-size:0.3rem;
}
.fangan_item_box{
  background:#fff;
  border-radius:0.2rem;
  box-shadow: 0 0 0.2rem #ddd;
  padding:0.4rem .2rem;
  line-height:1.6;
  margin-bottom:0.4rem;
}
.fangan_item_box>span{
  color:#6C6361;
  font-size:0.3rem;
}
.van-cell .van-cell__title span{
  /* font-size:0.4rem; */
  color:#7D7D7D;
}
.van-cell__value span{
  font-size:0.3rem;
}
.van-cell{
  background:none;
  padding:0;
  padding-bottom:0.1rem;
}
/deep/ .van-dialog__content .van-cell{
  padding: 10px 15px;
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
.max_width_100{
  margin-bottom: .15rem;
  width:1.4rem;
  height: 1.4rem;
}
  .btn_group button{
    margin-top:.1rem;
  }
  .btn_group{
    padding-bottom:.1rem;
  }
  select{
    outline: none;
  }
  .red{
    color:red;
  }
  .no_border{
    border:none;
  }
  .text_box{
    padding:20px 4px;
  }
  .text_center{
    text-align:center;
  }
  /* #home_page .van-nav-bar__title{ */
    /* font-size:0.5rem; */
  /* } */
  #home_page .van-nav-bar__left .van-nav-bar__text{
    color:#FC8463;
  }
  #home_page .van-nav-bar__right .van-nav-bar__text{
    color:#2C2C2C;
  }
  .swipe_img_box{
    width:100%;
    padding:0 12px;
    box-sizing: border-box;
  }
  #home_page .van-swipe-item img{
    width:100%;
  }
  .gonggao_box{
    background:#F5F5F5;
    padding:4px;
    margin: 4px 0;
    display:flex;
    align-items:center;
    height:30px;
    padding-left:12px;
  }
  .gonggao_box .grow_1{
    flex-grow:1;
  }
  .grow_1 .van-notice-bar{
    padding:0;
    background:none !important;
  }
  .gonggao_img{
    width:20px;
    height:16px;
    vertical-align: middle;
    margin:0 10px;
  }
  .list_box{
    padding:10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  .item_box{
    padding:.2rem 0;
    width:100%;
  }
  .item_box span{
    display: block;
    color: #767676;
    font-size:.38rem
  }
  .rank_item{
    padding:10px 10px;
    border-top:1px solid #F0F0F0;
  }
  .rank_item .desc>h3{
    font-weight:bold;
  }
  .rank_item .desc>div{
    color:#8D8D8D;
    padding:8px 0 0;
  }
  .rank_item_bottom{
    color:#707070;
    padding:10px 0;
    font-size:16px;
  }
  #home_page .tabs_type .van-tab{
    color:#1D1D1D;
    padding:0;
  }
  #home_page .tabs_type .van-tab>span{
    font-weight:bold;
  }
  #home_page .tabs_type .van-tab--active,#home_page .van-tab--active{
    color:#E55546;
  }
  .fixed_title{
    position: fixed;
    width: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
    top: 0;
  }
  .no_radius_btn{
    border-radius:0.1rem;
    line-height:1;
    width:1.1rem;
    background:#fff;
  }
  
</style>
