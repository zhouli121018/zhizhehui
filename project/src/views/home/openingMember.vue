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
            <h4 class="rules_h">会员说明</h4>
            <p>1.购买会员3天内可以退款</p>
            <p class="goldcoins_fans">
                2.邀请好友注册免费获取会员
                <van-button class="orange_btn" round @click="jumpTo('/personal/freeUse')" style="white-space:nowrap;">免费获取</van-button>
            </p>
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
    </div>
</template>

<script>
import { getalipayorderinfor } from '@/api'
export default {
    data() {
        return {
            list: [
                {count:'30',money:68.8,oldMoney:99.9},
                {count:'60',money:118.8,oldMoney:169.9},
                {count:'90',money:168.8,oldMoney:199.9},
            ],
            active: 0,
            payType: 1,
            chooseImg: require('../../assets/choose_checked.png'),
            normalImg: require('../../assets/choose_normal.png'),
            money: 99.9
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
    },
    activated(){
        if(!this.$root.$children[0].timer){
            this.$root.$children[0].getkjring();
            this.$root.$children[0].timer = setInterval(this.$root.$children[0].getkjring, 3000);
        }
    }
}
</script>

<style lang="stylus" scoped>
.goldcoins_fans
    display flex
    padding-top .2rem
    align-items center
.orange_btn
    border-radius .6rem
    background #FC7953
    color #fff
    height .75rem
    line-height .75rem
    padding 0 .1rem
    width:2.2rem
    font-size .22rem
    border none!important
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
