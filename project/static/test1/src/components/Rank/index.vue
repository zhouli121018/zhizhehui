<template>
    <div>
      <lottypes @change_lottypes="getexprank" ref="rankChild" :show_zhibiao="1"/>

      <!-- <div class="xian"></div> -->
      <div class="clear text_box ranking_box">
        <span class="fl">{{kjdes}}</span>
        <!-- <select class="no_border fr" v-model="issuenum" @change="changeIssuenum">
          <option :value="3">近三期排名</option>
          <option :value="7">近七期排名</option>
          <option :value="10">近十期排名</option>
          <option :value="30">近三十期排名</option>
        </select> -->
        <p @click="isShow">{{rankName}} <img :class="show?'go':'aa'" src="~@/assets/top.png" alt=""></p>
        <ul class="ranking_ul" v-show="show">
          <li v-for="(item,index) in rankList" @click="changeIssuenum(item)" :class="rankName == item.name?'active':''" :key="index">{{item.name}}</li>
        </ul>
      </div>
      <ul class="rank_ul">
        <li class="rank_item" v-for="(item,index) in rank_list" :key="index">
          <van-row type="flex" align="center">
            <van-col span="18">
              <div  @click="goPerRank(item.uid)">
                <van-row :gutter="10">
                  <van-col span="5">
                    <img :src="$https_img+item.uicon" alt="" class="max_width_100">
                  </van-col>
                  <van-col span="19" class="desc">
                    <h3 class="flex_box"><span class="name_s">{{item.uname}}</span> <van-tag color="#6B5BFF" class="fans">{{item.fans}}人关注</van-tag></h3>
                    <!-- <div style="color:#666;padding-top:.2rem;font-size:.34rem">{{item.viewtimes}}次查看</div> -->
                    <div style="margin-top:0.2rem;color:#666;font-size:0.34rem">{{item.viewtimes}}次查看   
                      <span style="font-size:0.34rem">{{ '测'+issuenum+'期对'+item.hittimes+'期' }}</span></div>
                  </van-col>
                </van-row>
              </div>
              
            </van-col>
            <van-col span="6" class="text_right">
              <van-button type="primary" size="small" v-if="item.curstatus==0" @click="goPerRank(item.uid)" disabled>未 发 布</van-button>
              <van-button type="danger" size="small" v-if="item.curstatus==1" @click="showTost(item.costcoin,item.cid)">本期预测</van-button>
              <van-button type="danger" size="small" @click="viewpred(item.cid)"  v-if="item.curstatus==2">已 查 看</van-button>
            </van-col>
          </van-row>
          <van-row class="rank_item_bottom">
            <van-col  style="color:#666;padding-top:.2rem;font-size:.34rem">{{item.prepred}} <span class="red">{{item.prestatus}}</span></van-col>
          </van-row>
        </li>
      </ul>
    </div>
</template>

<script>
import {getproperty,getexprank} from '@/api/home'
import { viewpred } from '@/api/personal'
import { Dialog } from 'vant'
export default {
    props: {
      // 是否禁用
      ishome: {
        type: Number,
        default: 1
      },
    },
    data() {
        return {
            rank_list:[
                
            ],
            issuenum: 7,
            kjdes:'',
            rankList: [
              {id: 3,name:'近三期排名'},
              {id: 7,name:'近七期排名'},
              {id: 10,name:'近十期排名'},
              {id: 30,name:'近三十期排名'}
            ],
            rankName: '近七期排名',
            show: false,
            isfirstEnter:false,
            device:0
        }
    },
    methods:{
      isShow() {
        this.show = !this.show
      },
      changeIssuenum(item){
        this.rankName = item.name
        this.issuenum = item.id
        this.show = false
        this.getexprank();
      },
      showTost(cost,uid){
        if(!localStorage.getItem('uid') || !localStorage.getItem('sid')){
          Dialog.confirm({
            title: '提示',
            confirmButtonText:'前往登录',
            message: '请登录后查看该预测~'
          }).then(() => {
            // on confirm
            this.$router.push('/login/index')
          }).catch(() => {
            // on cancel
          });
        }else{
          Dialog.confirm({
            title: '提示',
            message: '查看该预测需花费你'+cost+'金币，专家不保证100%准确，确定查看吗？'
          }).then(() => {
            // on confirm
            this.viewpred(uid)
          }).catch(() => {
            // on cancel
          });
        }
      },
      async viewpred (cid) {
        const { data }    = await viewpred({
              sid: localStorage['sid'], //localStorage['sid']
              uid: localStorage['uid'],  //localStorage['uid']
              cid: cid,
        });
        if(data.errorcode == 0 && data.content){
          Dialog.confirm({
            title: '提示',
            message: data.content,
            confirmButtonText: '我的查看',
            cancelButtonText: '关闭',
          }).then(() => {
            // on confirm
            this.$router.push({
              path:'/personal/myLook',
              query:{
                lottype : this.$store.getters.lottypes[this.$refs.rankChild.tabs_active].lottype,
                postype : this.$store.getters.lottypes[this.$refs.rankChild.tabs_active].poslist[this.$refs.rankChild.num_active].type,
                ycplaytype : this.$store.getters.lottypes[this.$refs.rankChild.tabs_active].poslist[this.$refs.rankChild.num_active].ycplaytypes[this.$refs.rankChild.yc_active].ycplaytype,
              }
            })
          }).catch(() => {
            // on cancel
          });
        }
          
      },
      goPerRank(expid){
        this.$router.push({
          path:'/personal/perdictRanking',
          query:{
            expid:expid
          }
        })
      },
      async getexprank () {
        let obj = {
              ishome :this.ishome,
              lottype : this.$store.getters.lottypes[this.$refs.rankChild.tabs_active].lottype,
              postype : this.$store.getters.lottypes[this.$refs.rankChild.tabs_active].poslist[this.$refs.rankChild.num_active].type,
              ycplaytype : this.$store.getters.lottypes[this.$refs.rankChild.tabs_active].poslist[this.$refs.rankChild.num_active].ycplaytypes[this.$refs.rankChild.yc_active].ycplaytype,
              issuenum : this.issuenum,
              device: this.device
            }
            if(localStorage.getItem('uid')){
              obj.uid = localStorage.getItem('uid')
            }
            if(localStorage.getItem('sid')){
              obj.sid = localStorage.getItem('sid')
            }
            const { data }    = await getexprank(obj);
            this.rank_list = data.list;
            this.kjdes = data.kjdes;
            if(this.ishome == 1){
              this.$emit('get_notices', {notices:data.notices,advs:data.advs});
              
            }
          // }
          
      },
      
    },

    created(){
     this.isfirstEnter = true;
     let u = navigator.userAgent, app = navigator.appVersion;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
          this.device = 0
      }
      if (isIOS) {
          this.device = 1
      }
  },
}
</script>

<style scoped lang="stylus">
/deep/ .dialog_content .van-dialog__message
  border-top 1px dashed #ccc
  margin-top .3rem
.aa 
  transform rotate(-180deg)
.ranking_ul
  min-width 2rem
  padding 0 .15rem
  box-sizing border-box 
  position absolute
  right .2rem
  top 1rem
  background #fff
  z-index 999
  border 1px solid #e9e9e9
  box-shadow 0 0 .08rem #e9e9e9
  transition  all 1s
  li 
    padding .3rem .2rem
    font-size .4rem
    border-bottom 1px solid #e9e9e9
    &.active 
      color #EC493C
.ranking_box
  display flex
  align-items center
  justify-content space-between
  position relative
  span
    flex-grow 1
  p 
    font-size .38rem
    padding-left .15rem
    color #EC493C
  img
    width .25rem
    height .15rem
    margin-left .2rem
.max_width_100
  border-radius 50%
/deep/ .van-button--primary
  background #999
  border 1px solid #999
.text_center
    margin-top .2rem
    text-align center
.no_border{
    border:none;
  }
.btn_group button
    margin-top .2rem
.text_box{
    padding:.3rem .2rem;
}
.rank_item{
    padding:.2rem
    border-top:1px solid #F0F0F0;
  }
.gary
    color #666
    padding .1rem 0
    font-size .36rem
.rank_item_bottom
    padding .1rem 0
    color #666
.flex_box
   .name_s
      width:2.8rem
      padding-right:0.2rem
      display:inline-block
      overflow:hidden
      white-space: nowrap;
      text-overflow: ellipsis;
      font-weight:bold;
.rank_ul
  padding 0 0.2rem
</style>
