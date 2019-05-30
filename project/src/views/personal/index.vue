<template>
    <div class="container">
        <title-bar title_name="用户中心" />
        <div class="my_title" v-if="info != null">
            <img class="my_title_photo" :src="$https_img+info.img" alt="">
            <div class="my_title_center">
                <div>
                    <span style="font-weight:bold;font-size:0.45rem;color:#232323;">{{info.uname}}</span>
                </div>
                <div class="goldcoins_fans">
                    <!-- <p><span>金币: </span><span class="red">{{info.coin}}</span></p>
                    <p><span>粉丝: </span><span class="red">{{info.fans}}</span></p> -->
                    <!-- $isvip='1';//是否VIP 1是vip，0不是vip -->
                    <img v-if="info.isvip == 1" class="my_title_center_img" src="~@/assets/vip.png" alt="">
                    <img v-else class="my_title_center_img" src="~@/assets/vip-gary.png" alt="">
                    <span v-if="info.isvip == 1" class="red">(剩余{{info.vipdate}}天)</span>
                    <span v-else class="red">(非会员)</span>
                </div>
            </div>
            <van-button v-if="info.isvip == 0" class="orange_btn" round @click="jumpTo('/home/openingMember')" style="white-space:nowrap;">开通会员</van-button>
            <van-button v-else class="orange_btn" round @click="jumpTo('/home/openingMember')" style="white-space:nowrap;">会员续费</van-button>
        </div>
        <div class="my_title_box">
            <div class="my_title" style="border:none;width:47.5%" v-if="info">
                <img class="my_title_photo title_photo" src="~@/assets/icon.png" alt="">
                <div class="my_title_center my_centers">
                    <p>
                        <b style="font-size:0.5rem;font-weight:bold;letter-spacing:0.08rem;">{{info.income_cur}}元</b>
                    </p>
                    <p class="goldcoins_fans">
                        佣金金额
                    </p>
                </div>
                <van-button type="danger" size="small" @click="show = true" >返佣提款</van-button>
            </div>
            <div class="my_title" style="border:none;width:51%" v-if="info">
                <img class="my_title_photo title_photo" src="~@/assets/ticketnum.png" alt="">
                <div class="my_title_center my_centers">
                    <p>
                        <b style="font-size:0.5rem;font-weight:bold;letter-spacing:0.08rem;">{{info.ticketnum}}张</b>
                    </p>
                    <p class="goldcoins_fans">
                        会员券数量
                    </p>
                </div>
                <van-button type="danger" size="small" @click="isShow = true" >兑换会员</van-button>
            </div>
        </div>
        <!-- <div class="xian"></div>         -->
        <div>
            <van-cell title="我的推荐页" is-link icon="tj" @click="jumpTo('/personal/recommend')"/>
            <van-cell title="代理赚钱" is-link icon="dlzq"  @click="jumpTo('/home/earnMoney')"/>
            <van-cell title="开奖提醒设置" is-link icon="kjtx"  @click="jumpTo('/home/openRemind')"/>
            <van-cell title="免费使用" is-link icon="free"  @click="jumpTo('/personal/freeUse')"/>
        </div>
        <div class="xian"></div>
        <div>
            <van-cell title="关于智者汇" is-link icon="about"  @click="jumpTo('/personal/about')"/>
        </div>

        <van-dialog 
            v-model="show"
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
        <van-dialog 
            v-model="isShow"
            title="兑换会员天数"
            show-cancel-button
            class="dialog_content_input"
            :before-close="beforeClose"
            >
            <van-field
                v-model.trim="vipticket"
                clearable
                label="会员券(张)："
                type="number"
            /> 
        </van-dialog>
    </div>
</template>

<script>
import { getaccount, submitduihuan } from '@/api'
import { submittikuan } from '@/api/home'
import { Dialog } from 'vant'
export default {
    data() {
        return {
            info: null,
            isFirstEnter:false,
            show:false,
            alipay:'',
            isShow: false,
            ticketnum: '',
            vipticket: ''
        }
    },
    methods:{
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
        async submittikuan() {
            const { data } = await submittikuan({
                sid: localStorage.getItem('sid'),
                uid: localStorage.getItem('uid'),
                alipay:this.alipay
            })
            this.info.income_cur = data.yongjin
        },
        jumpTo(path){
            this.$router.push(path);
        },
        async getaccount() {
            const { data } = await getaccount({
                sid: localStorage.getItem('sid'),
                uid: localStorage.getItem('uid')
            })
            this.info = data
        },
        goAbout(){
            this.$router.push('/personal/about');
        },
        beforeClose(action,done){
            if(action == 'confirm'){
                if(!this.vipticket){
                    this.$toast('请输入会员券!')
                    done(false)
                    return;
                }
                this.submitexchangeDay();
                this.vipticket = ''
            }
            done();
        },
        //兑换会员天数
        async submitexchangeDay() {
            const { data } = await submitduihuan({
                vipticket: this.vipticket,
                uid: localStorage.getItem('uid'),
                sid: localStorage.getItem('sid')
            }) 
            this.ticketnum = data.ticketnum//兑换后剩余优惠券张数
            this.$toast(data.message)
        },
    },
    created() {
        this.isFirstEnter=true;
    },
    beforeRouteEnter(to, from, next) {
      if (from.name == 'openingMember' || from.name == 'recommend' || from.name == 'earnMoney' || from.name == 'openRemind' || from.name == 'freeUse' || from.name == 'about') { // 这个name是下一级页面的路由name
        to.meta.isBack = true; 
      }
      next()
    },
    activated(){
        if(!this.$root.$children[0].timer){
            this.$root.$children[0].getkjring();
            this.$root.$children[0].timer = setInterval(this.$root.$children[0].getkjring, 3000);
        }
        if(this.$route.meta.isBack){
            this.$store.dispatch('set_isback',true)
        }
        this.$route.meta.isBack=false;
        if(!this.$store.getters.isback || this.isFirstEnter){
            this.getaccount()
        }
        this.isFirstEnter=false;
        this.$store.dispatch('set_isback',false)
    },
}
</script>

<style scoped lang="stylus">
.container
    background #F5F5F5
.my_centers
    width 60%!important
    p 
        line-height .6rem
        &:last-child
            color #666
            font-size .18rem
/deep/ .van-cell
    line-height .88rem
/deep/ .van-icon-tj::before
    content ''
    width .88rem
    height .88rem
    background url('~@/assets/tj_p.png') no-repeat
    background-size contain
/deep/ .van-icon-dlzq::before
    content ''
    width .88rem
    height .88rem
    background url('~@/assets/dlzq_p.png') no-repeat
    background-size contain
/deep/ .van-icon-kjtx::before
    content ''
    width .88rem
    height .88rem
    background url('~@/assets/kjtx_p.png') no-repeat
    background-size contain
/deep/ .van-icon-free::before
    content ''
    width .88rem
    height .88rem
    background url('~@/assets/free.png') no-repeat
    background-size contain
/deep/ .van-icon-about::before
    content ''
    width .88rem
    height .88rem
    background url('~@/assets/about_zzh.png') no-repeat
    background-size contain
.my_title
    width: 100%
    padding .2rem 
    box-sizing border-box 
    display flex
    align-items center
    border-bottom 1px solid #f0f0f0
    background #fff
    .my_title_center
        width 53%
        span 
            line-height .5rem
            padding-right .1rem
    .my_title_photo
        width 1.5rem
        height 1.5rem
        border-radius 50%
        margin-right .1rem
    .goldcoins_fans
        display flex
        padding-top .1rem
        align-items center
        span 
            font-size .26rem
        p
            padding-right .3rem
    .my_title_center_img
        width .8rem
        height .7rem
        margin 0 .2rem 0 0
.orange_btn
    border-radius .6rem
    background #FFC131
    color #FF3858
    height 1rem
    line-height 1rem
    padding 0 .3rem
    font-size 0.36rem
.title_photo
    width .77rem!important
    height .77rem!important
.my_title_box
    width 100%
    background #eee
    padding .4rem 0
    box-sizing border-box
    display flex
    justify-content space-between
    align-items center
    .my_title
        width 49%
        padding .3rem .1rem
        .my_centers
            width 45%!important
    /deep/ .van-button--small {
        padding: 0 6px;
        height: 25px;
        min-width: 45px;
        font-size: 8px;
        line-height: 20px;
    }
</style>
