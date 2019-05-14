<template>
    <div class="container">
        <title-bar title_name="开奖提醒" />
        <div style="padding:0.2rem;">
            <p style="padding:0.4rem 0;font-size:0.42rem;line-height:1.6;color:#6B6B6B;">设置彩种开奖提醒后，倒计时开奖后将有声音提醒用户查看开奖号码</p>
            <div class="open_remind_item dis_flex" v-for="(item,k) in list" :key="k">
                <div class="flex_grow_1">
                    <img src="../../assets/clock.png" alt="">
                    <span>{{item.lotname}}</span>
                </div>
                <van-icon name="checked" :color="item.status?'#FC7953':'#B5B5B5'" @click="changeStatus(item)"/>
            </div>
        </div>
        <div style="padding:0.8rem;">
            <van-button type="default" block size="large" @click="setkjtixing" style="background:#FC7953;color:#fff;font-size:0.42rem;">保存设置</van-button>
        </div>
        
    </div>
</template>

<script>
import { getkjtixing, setkjtixing } from '@/api/home'
export default {
    data() {
        return {
            list: []
        }
    },
    methods: {
        async getkjtixing() {
            const { data } = await getkjtixing({
                sid: localStorage.getItem('sid'),
                uid: localStorage.getItem('uid')
            })
            this.list = data.list
        },
        async setkjtixing() {
            let str = 0;
            this.list.forEach(val => {
                str += val.lottype+','+val.status+';'
            });
            const { data } = await setkjtixing({
                sid: localStorage.getItem('sid'),
                uid: localStorage.getItem('uid'),
                typenstatus:str
            })
        },
        changeStatus(item){
            if(item.status){
                item.status = 0
            }else{
                item.status = 1
            }
        }
    },
    created() {
        this.getkjtixing()
    }
}
</script>

<style lang="stylus" scoped>
    .container
        background #F5F5F5
    .plan_list_box
        width 94%
        background #ffffff
        border-radius .2rem
        margin .2rem auto
        padding .3rem
        box-sizing border-box
        p 
            line-height .65rem
        p:first-child
            color #6D6462
            font-size .28rem
        p:last-child
            color #3B3B3B
    .open_remind_item
        background #fff  
        padding 0.6rem 0.3rem  
        border-radius 0.2rem
        align-items center 
        font-size 0.55rem
        margin-bottom 0.6rem
        .flex_grow_1 
            span 
                padding-left 0.2rem   
                font-size 0.42rem
        img 
            width 0.45rem
            height 0.45rem
            vertical-align middle
            position relative
            top -0.05rem
</style>
