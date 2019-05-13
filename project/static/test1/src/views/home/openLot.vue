<template>
    <div class="container">
        <title-bar title_name="开奖大厅"></title-bar>
        <ul>
            <li class="rank_item" v-for="(l,index) in list" :key="index" :class="{fu:l.type==0,ti:l.type==1}">
                <div style="font-size:0.32rem;padding:0.3rem 0 0.3rem 0.1rem;white-space: nowrap;">
                    <b style="font-size:0.38rem;">{{l.title}}</b>
                    <span style="padding:0 0.03rem;">{{l.kjissue}}</span>
                    <span style="padding:0 0.03rem;">{{l.kjdate}}</span>
                    <span>{{l.kjweek}}</span>
                </div>
                <div class="flex_box" style="padding:10px 8px;" @click="jump('/personal/historyRecord',{lottype:l.lottype,title_name:l.title.substring(0,l.title.length-4)})">
                    <div class="flex_grow_1">
                        <span class="red red_round"  v-for="(red,i) in l.red_num_arr" :key="i">{{red}}</span>
                        <span class="red blue_round"  v-for="(blue,i) in l.blue_num_arr" :key="123+i">{{blue}}</span>
                    </div>
                    <i class="van-icon van-icon-arrow"></i>
                </div>
                <div class="flex_box flex_box_space">
                    <van-button round type="default" size="small" @click="jump('/home/charts',{lottype:l.lottype})" style="background:#E6E6E6;color:#585757;">走势图<i class="van-icon van-icon-arrow"></i></van-button>
                    <van-button round type="default" size="small" @click="jump('/personal/perdictRank',{lottype:l.lottype})" style="background:#E6E6E6;color:#585757;">专家排名<i class="van-icon van-icon-arrow"></i></van-button>
                    <van-button round type="default" size="small" @click="jump('/home/awardSpredict',{lottype:l.lottype})" style="background:#E6E6E6;color:#585757;">大奖组合<i class="van-icon van-icon-arrow"></i></van-button>
                    <van-button round type="default" size="small" @click="jump('/home/picskill',{lottype:l.lottype})" style="background:#E6E6E6;color:#585757;">选号技巧<i class="van-icon van-icon-arrow"></i></van-button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import {getproperty,getlothall } from '@/api/home'
export default {
    data() {
        return {
            list:[],
            isFirstEnter:false
        }
    },
    methods:{
        async getlothall () {
          const { data }    = await getlothall({
            //   lottype : this.$route.query.lottype,
          });
          this.list = data.list;
          this.list.forEach(val => {
              let index_blue = val.kjnum.indexOf('#');
              if(index_blue>-1){
                  let blue_num = val.kjnum.slice(index_blue+1);
                  val.blue_num_arr = blue_num.split(',')
                  let red_arr = val.kjnum.slice(0,index_blue);
                  val.red_num_arr = red_arr.split(',')
              }else{
                  val.red_num_arr = val.kjnum.split(',')
              }
          });
        },
        jump(path,param){
            this.$router.push({
                path:path,
                query:param
            })
        },
        
    },
    created(){
        this.isFirstEnter=true;
        
    },
    activated(){
        if(!this.$store.getters.isback || this.isFirstEnter){
            this.getlothall();
        }
        this.isFirstEnter=false;
        this.$store.dispatch('set_isback',false)
    },
}
</script>

<style scoped lang="stylus">
.message_box
    margin .2rem 
    border-bottom 1px solid #cccccc
.gary
    color #666
    padding .1rem 0
    font-size .36rem
.van-button--small
  border-radius .2rem
.red_round,.blue_round
  border-radius 50%
  background red
  width .8rem
  height .8rem
  color #ffffff
  display inline-block
  line-height .8rem
  text-align center
  margin-right .2rem
  font-size .5rem
.blue_round
  background #4FA7F3
ul
  background #f5f5f5
.container
  background #f8f8f8
  .btn_group{
    margin-bottom:.2rem;
    padding-bottom .2rem
    background #fff
  }
.text_center{
    text-align:center;
  }
  .max_width_100{
    width 1.1rem
    height 1.1rem
    display inline-block
  }
  .btn_group button{
    margin-top:10px;
  }
  .rank_item{
    padding:10px 10px;
    border-top:1px solid #F0F0F0;
    margin:8px 0;
    background:#fff;
    background-repeat :no-repeat;
    background-size:30px;
  }
  .rank_item.fu{
      background-image:url(../../assets/fu.png);
  }
  .rank_item.ti{
      background-image:url(../../assets/ti.png);
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
  .flex_box_space{
      padding:10px 4px;
      justify-content : space-between;
  }
  .van-button--small.van-button--round{
      border-radius: 10em;
  }
</style>