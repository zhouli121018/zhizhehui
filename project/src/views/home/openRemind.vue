<template>
    <div class="container">
        <title-bar title_name="开奖提醒" />
        <div style="padding:0.2rem 0.36rem;">
            <p style="padding:0.4rem 0;font-size:0.42rem;line-height:1.6;color:#6B6B6B;" v-html="tips"></p>
            <div class="open_remind_item dis_flex" v-for="(item,k) in list" :key="k"  @click="changeStatus(item)">
                <div class="flex_grow_1">
                    <img src="../../assets/clock.png" alt="">
                    <span>{{item.lotname}}</span>
                </div>
                <van-icon name="checked" :color="item.status=='1'?'#FC7953':'#B5B5B5'"/>
            </div>
        </div>
        <div style="padding:0.8rem 1.2rem;">
            <van-button type="default" block size="large" @click="setkjtixing" style="background:#FC7953;color:#fff;font-size:0.42rem;">保存设置</van-button>
        </div>
        
    </div>
</template>

<script>
import { getkjtixing, setkjtixing } from '@/api/home'
export default {
    data() {
        return {
            list: [],
            tips: ''
        }
    },
    methods: {
        async getkjtixing() {
            const { data } = await getkjtixing({
                sid: localStorage.getItem('sid'),
                uid: localStorage.getItem('uid')
            })
            this.list = data.list
            this.tips = data.tips
        },
        async setkjtixing() {
            let str = '';
            this.list.forEach(val => {
                str += val.lottype+','+val.status+';'
            });
            const { data } = await setkjtixing({
                sid: localStorage.getItem('sid'),
                uid: localStorage.getItem('uid'),
                typenstatus:str
            })
            if(this.$root.$children[0].timer){
                clearInterval(this.$root.$children[0].timer);
                this.$root.$children[0].timer = null;
            }
            this.$root.$children[0].gethome();
        },
        changeStatus(item){
            if(item.status=='1'){
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
