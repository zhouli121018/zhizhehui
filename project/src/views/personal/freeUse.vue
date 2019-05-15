<template>
    <div class="container" v-if="info">
        <title-bar title_name="免费使用" />
        <div class="freeUse_box">
            <div class="free_use_title"><i></i><span>免费使用说明</span><i></i></div>
            <p>{{info.freeshuoming}}</p>
            <div class="free_use_coupon"><i></i> 会员券</div>
            <div class="free_use_coupon">
                <p>会员券: <span class="free_use_font">{{info.vipticket}}张</span></p>
                <van-button class="warning_btn" @click="exchangeDay">兑换会员天数</van-button>
            </div>
            <p>{{info.vipticketdes}}</p>
        </div>
        <div class="xian"></div>
        <div class="freeUse_box">
            <div class="free_use_title"><i></i><span>邀请内容</span><i></i></div>
            <p>{{info.invitecontent}}</p>
            <div class="free_use_coupon" style="justify-content:center">
                <van-button class="warning_btn" @click="doCopy(info.invitecontent)">复制分享内容</van-button>
            </div>
        </div>
        <div class="xian"></div>
        <div class="freeUse_box">
            <div class="free_use_title"><i></i><span>我的推荐页</span><i></i></div>
            <p>{{info.tuijian}}</p>
            <div class="free_use_coupon" style="justify-content:center">
                <van-button class="warning_btn" @click="toJump('/personal/recommend')">我的推荐页</van-button>
            </div>
        </div>
        <p class="contact">如有疑问请联系微信:SNSN889922</p>
    </div>
</template>

<script>
import { Dialog } from 'vant'
import { getfreeusedesc } from '@/api/home'
import { submitduihuan } from '@/api'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
export default {
    components: {
        Dialog
    },
    data() {
        return {
            info: null,
            vipticket: ''
        }
    },
    methods: {
        //复制
        doCopy (text) {
            this.$copyText(text).then(function (e) {
                Dialog.alert({
                    title: '提示',
                    message: '复制成功，请粘贴到微信QQ或其他地方'
                }).then(() => {
                // on close
                });
            }, function (e) {
                Dialog.alert({
                    title: '提示',
                    message: '复制失败，请手动复制！'
                }).then(() => {
                // on close
                });
                console.log(e)
            })
        },
        async getfreeusedesc() {
            const { data } = await getfreeusedesc({
                sid: localStorage.getItem('sid'),
                uid: localStorage.getItem('uid')
            })
            this.info = data
        },
        exchangeDay() {
            let _this = this
            Dialog.confirm({
                title: '兑换会员天数',
                confirmButtonText:'兑换',
                cancelButtonText:'取消',
                className: 'dialog_content_input',
                message: `会员券: <input class="dialog_input" type="text"/> `
                }).then(async () => {
                    // on confirm
                    if(!_this.vipticket) {
                        _this.$toast('请输入会员券')
                        return
                    }
                   const { data } = await submitduihuan({
                       vipticket: _this.vipticket,
                       uid: localStorage.getItem('uid'),
                       sid: localStorage.getItem('sid')
                   }) 
                    _this.$toast(data.message)
                }).catch(() => {
                    
                    // on cancel
                });
        },
        toJump(url) {
            this.$router.push(url)
        }
    },
    created() {
        this.getfreeusedesc()
    }
}
</script>
<style lang="stylus" scoped>
.warning_btn
    margin-top .2rem
.contact
    width 100%
    height 1.2rem
    line-height 1.2rem
    background #F5F5F5
    font-size .3rem
    color #6C6C6C
    text-align center
.free_use_font
    color #232323
.container
    background #EEEEEE
.freeUse_box
    width 100%
    padding .4rem .3rem 
    box-sizing border-box
    background #ffffff
    line-height .8rem
.free_use_title
    width 100%
    display flex
    justify-content center
    align-items center
    span 
        padding 0 .2rem
        color #6C6C6C
    i 
        display inline-block
        width 2.5rem
        height 1px
        background #C2C2C2
.free_use_coupon
    display flex
    align-items center
    color #6C6C6C
    i 
        display inline-block
        width 4px
        height 13px
        background #FC7A54
        margin-right .2rem
    p 
        color #232323
    .van-button--default
        height 1rem
        line-height 1rem
        background #FC7953
        color #ffffff
        border none
        margin-left .6rem
</style>

