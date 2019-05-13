<template>
  <div >
    <div class="container" id="home_page">
      <div class="fixed_title">
        <van-nav-bar
          title="彩票选号助手"
          :left-text="left_text"
          @click-left="onClickLeft"
        />
      </div>
      <van-swipe :autoplay="3000" indicator-color="#007BC2">
        <van-swipe-item  v-for="(image, index) in advs" :key="index">
          <div class="swipe_img_box" @click="jumpTo(image.url)">
            <img :src="$https+image.pic" />
          </div>
        </van-swipe-item>
      </van-swipe>
      <div class="gonggao_box" v-if="notice && notice.length>0">
          <van-button plain type="danger" @click="jumpTo('/home/announcement/index')" size="mini" class="no_radius_btn">公告</van-button>
          <img src="~@/assets/gonggao.png" alt="" class="gonggao_img">
          <div class="grow_1">
            <van-notice-bar>
              <span v-for="(n,index) in notice" :key="index" style="margin-right:50px;color:#000;" @click="goAnnounceDetail(n)">
                {{n.text}}
              </span>
            </van-notice-bar>
          </div>
      </div>
      <van-row :gutter="30" class="list_box text_center">
        <van-col span="6" style="width:23%;padding-left:0;padding-right:0" v-for="(l,index) in list" :key="index">
          <div class="item_box"  @click="jumpTo(l.link,l.islink)">
            <img :src="l.src" alt="" class="max_width_100">
            <span>{{l.title}}</span>
          </div>
        </van-col>
      </van-row>
      <div class="xian"></div>
      
      <rank  :ishome="1" @get_notices="get_notices" @set_isios="set_isios"/>
      <a :href="banner_url" v-show="false" id="banner_a">1</a>
    </div>

    <div class="container" v-if="is_ios" style="background:#F6F5F5;padding-top:0.4rem !important;position:absolute;top:0;z-index:1001;padding-bottom:2rem;">
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
import {getproperty,getexprank} from '@/api/home'
import { Dialog } from 'vant'
export default {
  data () {
    return {
      notice_img:require('../../assets/gonggao.png'),
      list:[
        {src:require('../../assets/open.png'),title:'开奖大厅',link:'/home/openlot',islink: false},
        {src:require('../../assets/group.png'),title:'大奖组合',link:'/home/awardSpredict',islink: false},
        {src:require('../../assets/rank.png'),title:'预测排名',link:'/personal/perdictRank',islink: localStorage.getItem('uid')?false:true},
        {src:require('../../assets/chart.png'),title:'走势图',link:'/home/charts',islink: false},
        {src:require('../../assets/simulated.png'),title:'模拟奖励',link:'/personal/simulateBetting',islink: localStorage.getItem('uid')?false:true},
        {src:require('../../assets/goldcoin.png'),title:'领金币',link:'/home/broughtGold',islink: localStorage.getItem('uid')?false:true},
        {src:require('../../assets/notice.png'),title:'公告',link:'/home/announcement/index',islink: false},
        {src:require('../../assets/skill.png'),title:'选号技巧',link:'/home/picskill',islink: false},
      ],
      notice:'',
      advs:[],
      left_text:'登录',
      left_path:'/login/index',
      banner_url:'#',
      is_ios:false,
      isFirstEnter:false
    }
  },
  methods: {
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
    jumpTo( path, islink ){
      if(path.indexOf('/')==0){
        this.$router.push(path)
      }else{
        this.banner_url = path;
        this.$nextTick(()=>{
          document.getElementById('banner_a').click();
        })
      }
      
    },
    get_notices (data) {
        this.notice = data.notices;
        this.advs = data.advs;
    },
    set_isios(msg){
      this.$nextTick(()=>{
        this.is_ios = msg;
      })
    },
    goAnnounceDetail(param){
      let url = param.url;
      let index = url.indexOf('=');
      let noticeid = url.slice(index+1);
      this.$router.push({
        path:'/home/announcement/detail',
        query:{
          // title: param.text, 
          noticeid: noticeid
        }
      })
    }
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
      sessionStorage['cid'] = this.$route.query.cid;
    }else{
      sessionStorage['cid'] = ''
    }
    if(this.$route.query.pid){
      sessionStorage['pid'] = this.$route.query.pid;
    }else{
      sessionStorage['pid'] = ''
    }
  },
  activated(){
    if(localStorage['uid'] && localStorage['uid']!=''){
      this.left_text = '会员中心';
      this.left_path = '/personal/index'
    }
  },
}
</script>

<style scoped>
.max_width_100{
  margin-bottom: .15rem;
  width:1.2rem;
  height: 1.2rem;
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
  #home_page .van-nav-bar__text{
    color:#000;
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
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  }
  .item_box{
    padding:.2rem 0;
    width:100%;
  }
  .item_box span{
    display: block;
    color: #666;
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
