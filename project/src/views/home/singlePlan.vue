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
                <van-button v-for="l in lottype" :key="l.lottype"  class="orange_btn lot_btn">{{l.lotname}}</van-button>
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
        
    },
    created() {
        this.fanganid = this.$route.query.fanganid;
        this.getfangan()
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
