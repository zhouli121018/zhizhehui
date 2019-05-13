<template>
    <div class="container">
        <div class="aPlan_title">
            <img src="~@/assets/returnpre.png" alt="">
            <p>方案计划 </p>
            <div class="title_pop_up" @click="isShowClick">
                {{chooseName}} 
                <img v-if="!isShow" src="~@/assets/arrowdown.png" alt="">
                <img v-else src="~@/assets/arrowon.png" alt="">
            </div>
            <ul class="pop_up_down" v-if="isShow">
                <li v-for="(item,index) in lottypeList" :key="index" :class="active==index?'active':''" @click="choose(item.lotname,index)">{{item.lotname}}</li>
            </ul>
        </div>
        <div class="lottery_time">
            <div>距119期开奖: <span class="green"> 00:12:13</span></div>
            <div>当前时间: <span class="blue"> 3月29日 09:22:30</span></div>
        </div>
        <div class="lottery_time lottery_times">
            <span>119期开奖号码:</span> <span class="lottery_number">01,02,03,04,05,06,07,08,09,10</span>
        </div>
        <div class="xian"></div>
        <van-row class="text_center btn_group" style="padding-bottom:0.2rem;">
            <van-col span="6" v-for="(y,index) in fangansList" :key="index">
                <van-button :type="index==yc_active?'danger':'default'" size="small" @click="change_yc(index)">{{y.fangantitle}}</van-button>
            </van-col>
            <van-col span="6"><van-button size="small" class="no_border_btn" @click="jumpTo">方案描述</van-button></van-col>
        </van-row>
    </div>
</template>

<script>
import { gethome } from '@/api/home'
export default {
    data() {
        return {
            lottypeList: [
                {id: 0,name: '北京赛车'},
                {id: 1,name: '重庆时时彩'},
                {id: 2,name: '天津时时彩'}
            ],
            active: 0,
            isShow: false,
            fangansList: [],
            lottypeList: [],
            noticesList: [],
            yc_active: 0
        }
    },
    methods: {
        isShowClick() {
            this.isShow = !this.isShow
        },
        choose(name,i) {
            this.chooseName = name
            this.active = i
        },
        //点击方案
        change_yc(index){
            this.yc_active = index
        },
        jumpTo() {},
        async gethome() {
            const { data } = await gethome({
                sid: localStorage.getItem('sid'),
                uid: localStorage.getItem('uid')
            })
            this.fangansList = data.fangans//方案
            this.lottypeList = data.lottype//标题选择
            this.noticesList = data.notices
            this.chooseName = this.lottypeList[0].lotname
        }
    },
    created() {
        this.gethome()
    }
}
</script>

<style lang="stylus" scoped>
.van-button--danger
    background-color #FC7953
    border none
.van-button--small
    min-width 70px
.text_center
    text-align center
    background #fff
.btn_group button
    margin-top .4rem
.van-col--6
    width 25%
.green
    color #47CE23
.blue 
    color #269EFF
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
.active
    color #FC8563!important
.pop_up_down
    width 30%
    position absolute
    padding .2rem 0 .2rem .2rem
    box-sizing border-box
    top 1.2rem
    right .3rem
    background #ffffff
    z-index 999
    li 
        color #2C2C2C
        padding .2rem .1rem
        border-bottom 1px solid #DCDCDC
        height .7rem
        line-height .7rem
        &:last-child
            border none
.aPlan_title
    color:#fff;
    background:url(../../assets/title.png);
    background-size: 100%;
    position: fixed;
    width: 100%;
    height 1.5rem
    line-height 1.5rem
    left: 0;
    right: 0;
    z-index: 1000;
    top: 0
    padding 0 .2rem
    box-sizing border-box
    display flex
    justify-content space-between
    align-items center
    p
        padding-left 1.1rem
        box-sizing border-box
        font-size 18px
    >img 
        width .25rem
        height .37rem
        z-index 99999
        margin-left .4rem
.title_pop_up
    display flex
    align-items center
    img 
        width .3rem
        height .21rem
        margin-left .1rem

</style>
