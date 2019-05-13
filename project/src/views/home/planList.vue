<template>
    <div class="container">
        <title-bar title_name="方案列表" />
        <div class="plan_list_box" v-for="(item,index) in list" :key="index">
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
            list: []
        }
    },
    methods: {
        async getfanganlists() {
            const { data } = await getfanganlist({
                sid: localStorage.getItem('sid'),
                uid: localStorage.getItem('uid')
            })
            this.list = data.list
        }
    },
    created() {
        this.getfanganlists()
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
</style>
