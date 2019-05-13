<template>
    <div>
      <van-tabs v-model="tabs_active" :swipe-threshold="7" class="tabs_type" @click="change_lottype">
        <van-tab v-for="l in lottypes" :key="l.lottype" :title="l.lotname" >
          <div slot="title">
            <img v-if="l.lottype==1004 || l.lottype==1006" src="../../assets/hainan.png" alt="" style="position:absolute;width:30px;right:1px;">
            <span style="padding-top:6px;font-size:0.4rem;">{{l.lotname}}</span>
          </div>
        </van-tab>

      </van-tabs>
      <van-tabs v-model="num_active" :swipe-threshold="7" v-if="poslist && poslist.length>0" @click="change_pos" class="no_bottom_border border_color">
        <van-tab v-for="(p,index) in poslist" :key="index" :title="p.name">
          <div slot="title">
            <img v-if="num_active==index" src="../../assets/an.png" alt="" style="position:absolute;width:0.5rem;left:50%;bottom:0;margin-left:-0.25rem;">
            <span style="padding-bottom:6px;font-size:0.35rem">{{p.name}}</span>
          </div>
        </van-tab>
      </van-tabs>
      <van-row class="text_center btn_group" style="padding-bottom:0.2rem;">
        <van-col span="6" v-for="(y,index) in ycplaytypes" :key="index">
          <van-button :type="index==yc_active?'danger':'default'" size="small" @click="change_yc(index)">{{y.ycplayname}}</van-button>
        </van-col>
        <van-col span="6" v-if="show_zhibiao"><van-button size="small" class="no_border_btn" @click="jumpTo">指标说明</van-button></van-col>
      </van-row>
      <div class="xian"></div>
      <!-- <div class="space_bar"></div> -->
      

    </div>
</template>

<script>
import {getproperty, getzhibiaodesc} from '@/api/home'
import { Dialog } from 'vant'
export default {
    props: {
      // 是否禁用
      ishome: {
        type: Number,
        default: 1
      },
      show_zhibiao:{
        type: Number,
        default: 0
      }
    },
    data() {
        return {
            isFirstEnter:false
        }
    },
    methods:{
      //跳转到指标说明
      jumpTo() {
        this.$router.push({
          path:'/home/indicators',
          query:{
            lottype: this.lottypes[this.tabs_active].lottype
          }
        })
      },
      change_lottype(index){
        this.$store.dispatch('set_tabs_active',index)
        this.$store.dispatch('set_num_active',0)
        this.$store.dispatch('set_yc_active',0)
        this.$emit('change_lottypes');
      },
      change_pos(index){
        this.$store.dispatch('set_num_active',index)
        this.$store.dispatch('set_yc_active',0)
        this.$emit('change_lottypes');
      },
      change_yc(index){
        this.$store.dispatch('set_yc_active',index)
        this.$emit('change_lottypes');
      },
      setLottype(){
        if(this.$route.query.lottype){
            for(var i=0;i<this.$store.getters.lottypes.length;i++){
                if(this.$store.getters.lottypes[i].lottype == this.$route.query.lottype){
                    this.$store.dispatch('set_tabs_active',i)
                }
            }
        }
        if(this.$route.query.postype){
          let active_lottype = this.$store.getters.lottypes[this.tabs_active]
            for(var i=0;i<active_lottype.poslist.length;i++){
                if(active_lottype.poslist[i].type == this.$route.query.postype){
                    this.$store.dispatch('set_num_active',i)
                }
            }
        }
        if(this.$route.query.ycplaytype){
          let active_pos = this.$store.getters.lottypes[this.tabs_active].poslist[this.num_active]
            for(var i=0;i<active_pos.ycplaytypes.length;i++){
                if(active_pos.ycplaytypes[i].ycplaytype == this.$route.query.ycplaytype){
                    this.$store.dispatch('set_yc_active',i)
                }
            }
        }
      },
      // async getzhibiaodesc () {
      //   const { data }    = await getzhibiaodesc({
      //       lottype : this.lottypes[this.tabs_active].lottype,
      //   });
      //   if(data.errorcode==0){
      //     Dialog.alert({
      //       title: data.title,
      //       message: data.content
      //     }).then(() => {
      //       // on close
      //     });
      //   }
      // }

    },

    created(){
        this.isFirstEnter=true;
    },
    activated(){
        if(!this.$store.getters.isback || this.isFirstEnter){
            if(this.$store.getters.lottypes){
                this.setLottype();
                this.$emit('change_lottypes')
            }else{
                getproperty().then(res=>{
                    this.$store.dispatch('set_lottypes',res.data.lottypes)
                    this.setLottype();
                    this.$emit('change_lottypes')
                })
            }
        }
        this.isFirstEnter=false;
        this.$store.dispatch('set_isback',false)
    },
  computed:{
      lottypes(){
          return this.$store.getters.lottypes;
      },
      tabs_active:{
        get: function () {
          return this.$store.getters.tabs_active;//methods里面对这个里面有从新赋值的操作
        },
        set: function (newValue) {
           
        }
      },
      num_active: {
        get: function () {
          return this.$store.getters.num_active;
        },
        set: function (newValue) {
           
        }
      },
      yc_active: {
        get: function () {
          return this.$store.getters.yc_active;
        },
        set: function (newValue) {
           
        }
        
      },
      poslist(){
        if(this.$store.getters.lottypes){
          return this.$store.getters.lottypes[this.$store.getters.tabs_active].poslist
        }else {
          return [];
        }
      },
      ycplaytypes(){
        if(this.$store.getters.lottypes){
          return this.$store.getters.lottypes[this.$store.getters.tabs_active].poslist[this.$store.getters.num_active].ycplaytypes
        }else {
          return [];
        }
      },
      
  }
}
</script>

<style scoped lang="stylus">
.text_center
    // margin-bottom .2rem
    text-align center
    background #fff
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
.border_color
  margin-bottom .2rem

</style>
