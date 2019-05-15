<template>
    <div class="container">
        <title-bar title_name="方案列表" />
        <div class="plan_list_box" v-for="(item,index) in list" :key="index" @click="goSinglePlan(item)">
            <p>{{item.name}}</p>
            <p>{{item.fangantitle}}</p>
        </div>
    </div>
</template>

<script>
import { getfanganlist } from '@/api/home'
export default {
    data() {
        return {
            list: [],
            isFirstEnter:false
        }
    },
    methods: {
        async getfanganlists() {
            const { data } = await getfanganlist({
                sid: localStorage.getItem('sid'),
                uid: localStorage.getItem('uid')
            })
            this.list = data.list
        },
        goSinglePlan(p){
            this.$router.push({
                path:'/home/singlePlan',
                query:{
                    fanganid:p.id
                }
            })
        },
    },
    created() {
        this.isFirstEnter=true;
    },
    beforeRouteEnter(to, from, next) {
      if (from.name == 'singlePlan') { // 这个name是下一级页面的路由name
        to.meta.isBack = true; 
      }
      next()
    },
    activated(){
        if(this.$route.meta.isBack){
            this.$store.dispatch('set_isback',true)
        }
        this.$route.meta.isBack=false;
        if(!this.$store.getters.isback || this.isFirstEnter){
            this.getfanganlists()
        }
        this.isFirstEnter=false;
        this.$store.dispatch('set_isback',false)
    },
}
</script>

<style lang="stylus" scoped>
    .container
        background #F5F5F5
    .plan_list_box
        width 94%
        background #ffffff
        border-radius .2rem
        margin .38rem auto
        padding .3rem
        box-sizing border-box
        p 
            line-height .65rem
        p:first-child
            color #6D6462
            font-size .28rem
        p:last-child
            color #3B3B3B
</style>
