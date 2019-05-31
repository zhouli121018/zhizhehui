<template>
    <div class="container" v-if="info">
        <div class="recommend_title">
            <div class="title_top">
                <div @click="goBack" style="width:1rem;height:1rem;line-height:1rem">
                    <img src="~@/assets/returnpre.png" alt="">
                </div>
                <p>我的推荐页</p>
                <span></span>
            </div>
            <div class="title_center">
                <img src="~@/assets/mfsy.png" alt="">
                <div class="flex_grow_1" style="padding-left:0.2rem;letter-spacing: 0.1rem;">
                    <p style="font-weight:bold;">智者汇</p>
                    <p style="font-weight:bold;">方案计划</p>
                </div>
                <div style="font-weight:bold;letter-spacing: 0.1rem;">快速上岸</div>
            </div>
        </div>
        <div class="recommend_content">
            <p class="content_weight">邀请码: {{info.invitecode}}</p>
            <img :src="$https+info.barcode" alt="">
            <div class="content_font fonts">
                {{info.invitedesc}}
            </div>
        </div>
    </div>
</template>

<script>
import { gettuijiancode } from '@/api/home'
export default {
    data() {
        return {
            info: null
        }
    },
    methods: {
        // 返回
        goBack(){
            this.$store.dispatch('set_isback',true)
            setTimeout(() => {
                this.$store.dispatch('set_isback',false)
            }, 500);
            this.$router.go(-1)
        },
        async gettuijiancode() {
            const { data } = await gettuijiancode({
                sid: localStorage.getItem('sid'),
                uid: localStorage.getItem('uid')
            })
            if(data.errorcode == 0) {
                this.info = data
            }
        }
    },
    created() {
        this.gettuijiancode()
    }
}
</script>

<style lang="stylus" scoped>
.content_font
    color #7D7D7D
    padding 0 .1rem
    padding-top .3rem
    text-align left 
    line-height .6rem
    text-align justify
.fonts
    margin-top 1.6rem
    font-size 0.5rem
.recommend_content
    width 90%
    margin -.6rem auto 0 auto 
    padding .4rem .2rem 1rem
    box-sizing border-box
    background #ffffff
    box-shadow 0 0 0.2rem #ddd
    border-radius .25rem
    min-height 5rem
    text-align center
    .content_weight
        font-size .55rem
        padding .4rem 0
        color #232323
    img 
        width 5rem
        height 5rem
.title_center
    width 100%
    display flex
    justify-content space-between
    align-items center
    padding .2rem .3rem
    box-sizing border-box
    >div
        font-size 0.6rem
        color #ffffff
    >div>p 
        font-size 0.52rem
        color #ffffff
    p:last-child
        padding-top .2rem
    img 
        width 2.5rem
        height 2.5rem
        border-radius 50%
.recommend_title
    width 100%
    height 4.92rem
    background url('../../assets/recommend_page.png') no-repeat
    background-size cover
.title_top
    width 100%
    display flex
    align-items center
    color #fff
    height 1.2rem
    line-height 1.2rem
    padding 0 .3rem
    box-sizing border-box
    p
        width 82%
        text-align center
        font-size 16px
    img 
        width .25rem
        height .37rem
        z-index 99999
.container
    padding-top 0!important
</style>

