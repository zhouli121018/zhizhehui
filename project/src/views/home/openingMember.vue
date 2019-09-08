<template>
    <div class="container">
        <title-bar title_name="开通会员" />
        <div class="openingMember_box" @click="onClick(index,item.nowprice)" :class="active == index?'active':''" v-for="(item,index) in list" :key="index">
            <p style="color:#333;">开通{{item.days}}天</p>
            <div>
                <p class="red">
                    <img src="~@/assets/huo@2x.png" alt="" :style="{visibility: index==2?'hidden':'show'}"> 
                    限时特惠: ¥{{item.nowprice}}元</p>
                <p>原价:{{item.oldprice}}</p>
            </div>
        </div>
        <div class="xian"></div>
        <div class="simulate_rules">
            <h4 class="rules_h">会员说明</h4>
            <p  v-for="(dom,i) in shuomingList" :key="i" :class="shuomingList.length-1 == i?'goldcoins_fans':''">{{dom}} <van-button v-if="shuomingList.length-1 == i" class="orange_btn" round @click="jumpTo('/personal/freeUse')" style="white-space:nowrap;">免费获取</van-button></p>
            <!-- <p class="goldcoins_fans">
                <van-button class="orange_btn" round @click="jumpTo('/personal/freeUse')" style="white-space:nowrap;">免费获取</van-button>
            </p> -->
        </div>
        <div class="xian"></div>
        <div class="member_pay">
            <p>支付方式</p>
            <div class="pay_choose" @click="choosePay(1)">
                <img src="~@/assets/ali_img.png" alt="">
                <div>
                    <p>支付宝支付</p>
                    <p>0手续费 安全便捷</p>
                </div>
                <img :src="payType == 1?chooseImg:normalImg" alt="">
            </div>
            <div class="pay_choose" @click="choosePay(2)">
                <img src="~@/assets/wechat@2x.png" alt="">
                <div>
                    <p>微信二维码支付</p>
                    <p>微信安全支付</p>
                </div>
                <img :src="payType == 2?chooseImg:normalImg" alt="">
            </div>
        </div>
        <van-button size="large" style="background:#FC7953;color:#fff" @click="toPay">开通会员</van-button>
        <a :href="zhifu_url" v-show="false" id="zhifu_jump" target="_blank">1</a>
    </div>
</template>

<script>
import { getalipayorderinfor, getvipdata, getalipayorderinfor_ex } from '@/api'
export default {
    data() {
        return {
            list: [],
            active: 0,
            payType: 1,
            chooseImg: require('../../assets/choose_checked.png'),
            normalImg: require('../../assets/choose_normal.png'),
            money: 0,
            shuomingList: [],
            zhifu_url:''
        }
    },
    methods: {
        jumpTo(path){
            this.$router.push(path)
        },
        onClick(index,money) {
            this.active = index
            this.money = money
        },
        choosePay(e) {
            this.payType = e
        },
        toPay() {
            if(this.payType == 2) {
                this.$router.push('/personal/pay?type=1&money=' + this.money)
            }else {
                this.getalipayorderinfor()
            }
        },
        async getvipdata() {
            const { data } = await getvipdata()
            this.list = data.list
            this.money = this.list[0].nowprice
            this.shuomingList = data.shuoming
        },
        //支付宝支付
        async getalipayorderinfor() {
            const { data } = await getalipayorderinfor({
                sid: localStorage.getItem('sid'),
                uid: localStorage.getItem('uid'),
                money: this.money
            })
            const div = document.createElement('div');
            div.innerHTML = data.content
            document.body.appendChild(div);
            document.forms.alipaysubmit.submit(); 
        }
    },
    activated(){
        
    },
    mounted() {
        this.getvipdata()
    }
}
</script>

<style lang="stylus" scoped>
.goldcoins_fans
    display flex
    align-items center
.orange_btn
    border-radius .6rem
    background #FC7953
    color #fff
    height .85rem
    line-height .85rem
    padding 0 .1rem
    width:2.2rem
    font-size 14px
    border none!important
    margin 0
    margin-left .2rem
.member_content,.member_pay
    width 100%
    padding .3rem .2rem
    box-sizing border-box
    >p
        padding-left:.3rem
        font-size .4rem
        padding-bottom .2rem
    .content_box
        width 94%
        border 1px solid #cccccc
        text-align center
        margin .2rem auto
        padding .1rem 0
        box-sizing border-box
        p 
            line-height .5rem
            &:first-child
                color #009AF3
                font-size .38rem
            &:last-child
                font-size .3rem
        &.active
            color red
            border 1px solid red
            p
                color red
button 
    width 90%
    margin .5rem
.pay_choose
    width 100%
    padding .2rem
    box-sizing border-box
    display flex
    align-items center
    border-top 1px solid #E8E8E8
    >div
        width 80%
        padding-left .2rem
        >p 
            line-height .5rem
            &:last-child
                font-size .3rem
                color #666
    img
        &:first-child
            width .68rem
            height .68rem
        &:last-child
            width .54rem
            height .54rem
h4
    width 100%
    text-align center
    padding .2rem 0
    font-size .4rem
    &.rules_h
        text-align left
        margin-bottom .2rem

.openingMember_box
    width 94%
    margin .2rem auto 
    border 1px solid #cccccc
    display flex
    justify-content space-around
    align-items center
    padding .2rem 0
    box-sizing border-box
    &.active
        border 1px solid red
    p
        font-size .38rem
        display flex
        align-items center
        text-align center
        line-height .6rem
        img 
            width .45rem 
            height .6rem
            margin-right .1rem
    div>p:last-child
        font-size .4rem
        color #666
        min-width 1rem
        // justify-content center
        text-decoration:line-through
        padding-left: 0.55rem;
.simulate_rules
    width 100%
    padding .2rem
    box-sizing border-box
    text-align left 
    p
        line-height .6rem
        font-size .34rem
        color #666
</style>
