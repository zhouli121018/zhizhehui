<template>
    <div class="container">
        <title-bar title_name="走势图"></title-bar>
        <van-tabs v-model="tabs_active" :swipe-threshold="7" class="tabs_type" @click="change_lottype">
            <van-tab v-for="l in lottypes" :key="l.lottype" :title="l.lotname" >
                <div slot="title">
                    <img v-if="l.lottype==1004 || l.lottype==1006" src="../../assets/hainan.png" alt="" style="position:absolute;width:30px;right:1px;">
                    <span style="padding-top:6px;font-size:0.4rem;">{{l.lotname}}</span>
                </div>
            </van-tab>
        </van-tabs>
        <div class="xian"></div>
        <div class="message_box">
            <van-cell v-for="(l,index) in list" :key="index" :title="l.title" is-link @click="jumpTo(l.url)"/>
        </div>
        <a :href="banner_url" v-show="false" id="banner_a">1</a>
    </div>
</template>

<script>
import {getproperty,gettrendlist } from '@/api/home'
export default {
    data() {
        return {
            tabs_active: 0,
            list:[],
            banner_url:'#'
        }
    },
    methods:{
        jumpTo( path ){
            this.banner_url = path;
                this.$nextTick(()=>{
                document.getElementById('banner_a').click();
            })
        },
        async gettrendlist () {
          const { data }    = await gettrendlist({
              lottype : this.lottypes[this.tabs_active].lottype,
          });
          this.list = data.list;
        },
        change_lottype(index){
            this.tabs_active = index;
            this.gettrendlist();
            this.$router.replace({
                path:'/home/charts',
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
        this.tabs_active = this.$store.getters.tabs_active;
        if(this.$store.getters.lottypes){
            this.setLottype()
            this.gettrendlist();
            }else{
            getproperty().then(res=>{
                this.$store.dispatch('set_lottypes',res.data.lottypes)
                this.setLottype();
                this.gettrendlist();
            })
        }
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
    border-bottom 1px solid #cccccc
</style>
