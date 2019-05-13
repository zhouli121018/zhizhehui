<template>
    <div class="container">
        <title-bar title_name="选号技巧" />
        <van-tabs v-model="tabs_active" :swipe-threshold="7" class="tabs_type" @click="change_lottype">
            <van-tab v-for="l in lottypes" :key="l.lottype" :title="l.lotname" >
                <div slot="title">
                    <img v-if="l.lottype==1004 || l.lottype==1006" src="../../assets/hainan.png" alt="" style="position:absolute;width:30px;right:1px;">
                    <span style="padding-top:6px;font-size:0.4rem;">{{l.lotname}}</span>
                </div>
            </van-tab>
        </van-tabs>
        <div class="xian"></div>
        <div class="message_box" v-for="(l,index) in list" :key="index">
            <van-cell :title="l.title" is-link @click="getjiqiao(l.id)"/>
        </div>
    </div>
</template>

<script>
import {getproperty, getjiqiaolist, getjiqiao } from '@/api/home'
import { Dialog } from 'vant'
export default {
    data() {
        return {
            tabs_active: 0,
            list:[],
            isFirstEnter:false
        }
    },
    methods:{
        async getjiqiaolist () {
          const { data }    = await getjiqiaolist({
              lottype : this.lottypes[this.tabs_active].lottype,
          });
          this.list = data.list;
        },
        getjiqiao(id){
            this.$router.push({
                path:'/home/skillDetail',
                query:{
                    id:id
                }
            })
        },
        change_lottype(index){
            this.tabs_active = index;
            this.getjiqiaolist();
            this.$router.replace({
                path:'/home/picskill',
                query:{
                    lottype:this.lottypes[index].lottype
                }
            })
        },
        setLottype(){
            if(this.$route.query.lottype){
                for(var i=0;i<this.$store.getters.lottypes.length;i++){
                    if(this.$store.getters.lottypes[i].lottype == this.$route.query.lottype){
                        this.tabs_active = i;
                    }
                }
            }
        }
    },
    created(){
        this.isFirstEnter=true;
        
    },
    activated(){
        if(!this.$store.getters.isback || this.isFirstEnter){
            this.tabs_active = this.$store.getters.tabs_active;
            if(this.$store.getters.lottypes){
                this.setLottype();
                this.getjiqiaolist();
            }else{
                getproperty().then(res=>{
                    this.$store.dispatch('set_lottypes',res.data.lottypes)
                    this.setLottype();
                    this.getjiqiaolist();
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
    }
}
</script>

<style lang="stylus" scoped>
.message_box
    margin .2rem 
    border-bottom 0.04rem solid #cccccc
</style>
