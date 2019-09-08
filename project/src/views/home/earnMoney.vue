<template>
    <div class="container">
        <title-bar title_name="推荐赚钱" />
        <div style="padding:0.4rem 0.2rem;" v-if="info">
            <div style="line-height:1.6;padding-bottom:0.4rem;font-size:0.36rem" v-html="info.content"></div>
            <div class="earn_money_item">
                <span class="left_border_ori"></span> <span style="padding-left:0.1rem;font-size:0.4rem;color:#666666;">分享链接</span> 
            </div>
            <div style="line-height:1.6;padding-top:0.1rem;font-size:0.36rem" v-html="info.invitecontent"></div>
            <div class="text-center" style="padding:0.4rem 0;">
                <van-button class="orange_btn" @click="doCopy(info.invitecontent)">复制分享链接</van-button>
            </div>
            <div class="earn_money_item">
                <span class="left_border_ori"></span> <span style="padding-left:0.1rem;font-size:0.4rem;color:#666666;">我的推荐页</span>
            </div>
            <div  style="line-height:1.6;padding-top:0.1rem;font-size:0.36rem" v-html="info.tuijian">
            </div>
            <div class="text-center"  style="padding:0.4rem 0;">
                <van-button class="orange_btn" @click="go_recommend">我的推荐页</van-button>
            </div>
            <div class="earn_money_item">
                <span class="left_border_ori"></span> <span style="padding-left:0.1rem;font-size:0.4rem;color:#666666;">我的佣金</span> 
            </div>
            <div>
                <span>佣金：</span>
                <b style="font-size:0.5rem;font-weight:bold;letter-spacing:0.08rem;padding-right:0.3rem;">{{info.yongjin}}元</b>
                <van-button class="orange_btn tikuan" @click="show_tikuan" :disabled="info.yongjin < info.limitmoney">提 款</van-button>
            </div>
            <div style="color:#A0A0A0;font-size:0.32rem;padding-top:0.2rem">*需满{{info.limitmoney}}元才能提款</div>

            <p class="contact text-center" style="color:#6E6E6E;font-size:0.35rem;padding-top:1.6rem;">如有疑问请联系微信:{{$store.getters.kfwecha}}</p>

            <van-dialog 
                v-model="show_tt"
                title="提款提示"
                show-cancel-button
                class="dialog_content_input"
                :before-close="beforeClose"
                >
                <van-field
                    v-model.trim="alipay"
                    clearable
                    label="支付宝："
                />
            </van-dialog>
            
        </div>

        
    </div>
</template>

<script>
import { getearnmoneydesc, submittikuan, gethome } from '@/api/home'
import { Dialog } from 'vant'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
export default {
    data() {
        return {
            isFirstEnter: false,
            info: null,
            show_tt:false,
            alipay:''
        }
    },
    methods: {
        async gethome() {
            const { data } = await gethome({
                sid: localStorage.getItem('sid'),
                uid: localStorage.getItem('uid')
            })
            this.$store.dispatch('set_kfwecha',data.kfwecha)
        },
        beforeClose(action,done){
            if(action == 'confirm'){
                if(!this.alipay){
                    this.$toast('请输入支付宝账号！')
                    done(false)
                    return;
                }
                this.submittikuan();
                this.alipay = ''
            }
            done();
        },
        async getearnmoneydesc() {
            const { data } = await getearnmoneydesc({
                sid: localStorage.getItem('sid'),
                uid: localStorage.getItem('uid')
            })
            this.info = data
        },
        async submittikuan() {
            const { data } = await submittikuan({
                sid: localStorage.getItem('sid'),
                uid: localStorage.getItem('uid'),
                alipay:this.alipay
            })
            this.info.yongjin = data.yongjin
        },
        show_tikuan(){
            this.show_tt = true;
            return;
            Dialog.confirm({
                title: '提款提示',
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                className: 'dialog_content_input',
                message: `<span style="white-space: nowrap;">支付宝:</span> <input class="dialog_input" type="text" />`
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
                    message: '复制成功，请粘贴分享到微信或QQ。'
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
        this.isFirstEnter=true;
        
    },
    beforeRouteEnter(to, from, next) {
      if (from.name == 'recommend') { // 这个name是下一级页面的路由name
        to.meta.isBack = true; 
      }
      next()
    },
    activated(){
        this.show_tt = false
        if(this.$route.meta.isBack){
            this.$store.dispatch('set_isback',true)
        }
        this.$route.meta.isBack=false;
        if(!this.$store.getters.isback || this.isFirstEnter){
            this.getearnmoneydesc()
        }
        this.isFirstEnter=false;
        this.$store.dispatch('set_isback',false)
        if(!this.$store.getters.kfwecha){
            this.gethome();
        }
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
