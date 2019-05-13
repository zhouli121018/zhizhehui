<template>
    <div class="container">
        <title-bar title_name="开通会员" />
        <div class="openingMember_box" @click="onClick(index,item.money)" :class="active == index?'active':''" v-for="(item,index) in list" :key="index">
            <p style="color:#333;">开通{{item.count}}天</p>
            <div>
                <p class="red">
                    <img src="~@/assets/huo@2x.png" alt="" :style="{visibility: index==2?'hidden':'show'}"> 
                    限时特惠: ¥{{item.money}}元</p>
                <p>原价:{{item.oldMoney}}</p>
            </div>
        </div>
        <div class="xian"></div>
        <div class="simulate_rules">
            <h4 class="rules_h">会员特权说明</h4>
            <p>1.查看预测不准，开奖一小时内退金币。</p>
            <p>2.购买金币额外赠送。</p>
            <p>3.会员只有特权，不能查看预测。</p>
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
        <van-button size="large" type="danger" @click="toPay">开通会员</van-button>
    </div>
</template>

<script>
import { getalipayorderinfor } from '@/api'
export default {
    data() {
        return {
            list: [
                {count:'30',money:39.9,oldMoney:69.9},
                {count:'60',money:69.9,oldMoney:139.9},
                {count:'90',money:109.9,oldMoney:219.9},
            ],
            active: 0,
            payType: 1,
            chooseImg: require('../../assets/choose_checked.png'),
            normalImg: require('../../assets/choose_normal.png'),
            money: 39.9
        }
    },
    methods: {
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
        //支付宝支付
        async getalipayorderinfor() {
            const { data } = await getalipayorderinfor({
                sid: localStorage.getItem('sid'),
                uid: localStorage.getItem('uid'),
                money: this.money,
                type: 1
            })
            const div = document.createElement('div');
            div.innerHTML = data
            document.body.appendChild(div);
            document.forms.alipaysubmit.submit(); 
        }
    }
}
</script>

<style lang="stylus" scoped>
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
            width .6rem 
            height .6rem
            margin-right .1rem
    div>p:last-child
        font-size .3rem
        color #666
        min-width 1rem
        justify-content center
        text-decoration:line-through
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
