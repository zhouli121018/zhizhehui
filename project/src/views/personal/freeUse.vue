<template>
    <div class="container">
        <title-bar title_name="免费使用" />
        <div class="freeUse_box">
            <div class="free_use_title"><i></i><span>免费使用说明</span><i></i></div>
            <p>邀请好友搞见哦按非农时候第四届防泼水减低 手动减肥是嗽平解释道交发票数据拍摄爱拍等级分配设计费大家分配时间破飞机票三审批单机票时间哦</p>
            <div class="free_use_coupon"><i></i> 会员券</div>
            <div class="free_use_coupon">
                <p>会员券: <span class="free_use_font">10张</span></p>
                <van-button click="warning_btn" @click="exchangeDay">兑换会员天数</van-button>
            </div>
            <p>说明:1张【会员券】可兑换4天会员天数</p>
        </div>
        <div class="xian"></div>
        <div class="freeUse_box">
            <div class="free_use_title"><i></i><span>邀请内容</span><i></i></div>
            <p>邀请好友搞见哦按非农时候第四届防泼水减低 手动减肥是嗽平解释道交发票数据拍摄爱拍等级分配设计费大家分配时间破飞机票三审批单机票时间哦</p>
            <div class="free_use_coupon" style="justify-content:center">
                <van-button click="warning_btn">兑换会员天数</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
    components: {
        Dialog
    },
    data() {
        return {
            
        }
    },
    methods: {
        exchangeDay() {
            Dialog.confirm({
                title: '兑换会员天数',
                confirmButtonText:'兑换',
                cancelButtonText:'取消',
                className: 'dialog_content_input',
                message: `会员券: <input class="dialog_input" type="number"/> 张`
                }).then(() => {
                    // on confirm
                
                }).catch(() => {
                    
                    // on cancel
                });
        }
    }
}
</script>
<style lang="stylus" scoped>
.free_use_font
    color #232323
.container
    background #EEEEEE
.freeUse_box
    width 100%
    padding .3rem 
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

