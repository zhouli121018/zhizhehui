<template>
    <div class="container">
        <title-bar :title_name="fanganname" />
        <div style="background:#fff;padding:0.4rem 0.2rem;line-height:2;padding-bottom:0.8rem;">
            <div><span class="left_border_ori"></span> <span style="padding-left:0.1rem;font-size:0.4rem;color:#666666;">{{fanganname}}</span> </div>
            <div style="color:#232323;font-size:0.4rem;">
                {{fangancontent}}
            </div>
            <div style="padding-top:0.6rem;padding-bottom:0.2rem"><span class="left_border_ori"></span> <span style="padding-left:0.1rem;font-size:0.4rem;color:#666666;">适用彩种</span> </div>
            <div class="btn_box">
                <van-button v-for="l in lottype" :key="l.lottype"  class="orange_btn lot_btn" @click="jumpTo(l.lottype)">{{l.lotname}}</van-button>
            </div>
        </div>
        <div style="padding:0.6rem 0.2rem;">
            <div>提示：</div>
            <div v-html="tips" style="line-height:2.4;font-size:0.36rem;"></div>
        </div>
        
    </div>
</template>

<script>
import { getfangan } from '@/api/home'
export default {
    data() {
        return {
            list: [],
            fanganid:0,
            fanganname:'方案',
            fangancontent:'',
            lottype:[],
            tips:'',
        }
    },
    methods: {
        async getfangan() {
            const { data } = await getfangan({
                sid: localStorage.getItem('sid'),
                uid: localStorage.getItem('uid'),
                id:this.$route.query.fanganid
            })
            this.list = data.list
            this.fanganname = data.fanganname;
            this.fangancontent = data.fangancontent;
            this.lottype = data.lottype;
            this.tips = data.tips;
        },
        jumpTo(lottype){
            this.$router.push({
                path:'/home/aPlan',
                query:{
                    lottype:lottype
                }
            })
        }
        
    },
    created() {
        this.isFirstEnter=true;
        
    },
    beforeRouteEnter(to, from, next) {
      if (from.name == 'aPlan') { // 这个name是下一级页面的路由name
        to.meta.isBack = true; 
      }
      next()
    },
    activated(){
        if(!this.$root.$children[0].timer){
            this.$root.$children[0].getkjring();
            this.$root.$children[0].timer = setInterval(this.$root.$children[0].getkjring, 3000);
        }
        this.fanganid = this.$route.query.fanganid;
        if(this.$route.meta.isBack){
            this.$store.dispatch('set_isback',true)
        }
        this.$route.meta.isBack=false;
        // if(!this.$store.getters.isback || this.isFirstEnter){
            this.getfangan()
        // }
        this.isFirstEnter=false;
        this.$store.dispatch('set_isback',false)
    }
}
</script>

<style lang="stylus" scoped>
    .container
        background #F5F5F5
    .btn_box .van-button
        height 40px
        line-height 38px
    .lot_btn
        width 30%
        margin-right 3%
        // margin-left 0.6rem
    .lot_btn:first-child
        // margin 0   
</style>
