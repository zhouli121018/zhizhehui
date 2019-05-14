<template>
    <div class="container">
        <title-bar title_name="推荐赚钱" />
        <div style="padding:0.4rem 0.2rem;">
            <div style="line-height:1.6;padding-bottom:0.4rem;">
                通过分享短链接内容和我的推荐页带来的用户开通会员都可以获取佣金。<br />佣金比例是40%。如果你是非会员，第一笔佣金作为开通会员使用，后面的佣金可以提款。
            </div>
            <div class="earn_money_item">
                <span class="left_border_ori"></span> <span style="padding-left:0.1rem;font-size:0.4rem;color:#666666;">分享短链接内容</span> 
            </div>
            <div style="line-height:1.6;padding-top:0.1rem;">
                智者汇方案计划是一个经过验证的算法，让你跟号更放心。时时彩、PK10、11选5、分分彩都可以用。下载链接：';
            </div>
            <div class="text-center" style="padding:0.4rem 0;">
                <van-button class="orange_btn" @click="doCopy('智者汇方案计划是')">分享内容复制</van-button>
            </div>
            <div class="earn_money_item">
                <span class="left_border_ori"></span> <span style="padding-left:0.1rem;font-size:0.4rem;color:#666666;">我的推荐页</span>
            </div>
            <div  style="line-height:1.6;padding-top:0.1rem;">
                通过截屏‘我的推荐页’分享到微信、QQ等平台，推荐页有你的专有二维码、链接和邀请码。
            </div>
            <div class="text-center"  style="padding:0.4rem 0;">
                <van-button class="orange_btn" @click="go_recommend">我的推荐页</van-button>
            </div>
            <div class="earn_money_item">
                <span class="left_border_ori"></span> <span style="padding-left:0.1rem;font-size:0.4rem;color:#666666;">我的佣金</span> 
            </div>
            <div>
                <span>佣金：</span>
                <b style="font-size:0.5rem;font-weight:bold;">201.23元</b>
                <van-button class="orange_btn tikuan" @click="show_tikuan">提 款</van-button>
            </div>
            <div style="color:#A0A0A0;font-size:0.32rem;">*需满50元才能提款</div>
            
        </div>
    </div>
</template>

<script>
import { getearnmoneydesc } from '@/api/home'
import { Dialog } from 'vant'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
export default {
    data() {
        return {
            list: [],
        }
    },
    methods: {
        async getearnmoneydesc() {
            const { data } = await getearnmoneydesc({
                sid: localStorage.getItem('sid'),
                uid: localStorage.getItem('uid')
            })
        },
        show_tikuan(){
            Dialog.confirm({
                title: '提款提示',
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                className: 'dialog_content_input',
                message: `支付宝: <input class="dialog_input" type="number" />`
            }).then(() => {
                // on confirm
            }).catch(() => {
                // on cancel
            });
        },
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
        go_recommend(){
            this.$router.push('/personal/recommend')
        }
        
    },
    created() {
        this.getearnmoneydesc()
    }
}
</script>

<style lang="stylus" scoped>
    .earn_money_item
        padding: 0.2rem 0
    .orange_btn
        height 40px
        line-height 38px 
    .orange_btn.tikuan
        padding-left 0.6rem
        padding-right 0.6rem
        font-size 0.4rem
        height 32px
        line-height 30px
</style>
