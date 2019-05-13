<template>
    <div class="container">
        <title-bar title_name="我的消息" />
        <div class="message_box ellipsis_box" v-for="(l,index) in list" :key="index">
            <van-cell :title="l.title" is-link :value="l.date" @click="goDetail(l)"/>
        </div>
    </div>
</template>

<script>
import {getmymsgs } from '@/api/personal'
export default {
    data(){
        return {
            list:[],
            isFirstEnter:false
        }
    },
    methods:{
        async getmymsgs () {
          const { data }    = await getmymsgs({
              sid:localStorage['sid'],
              uid:localStorage['uid']
          });
          this.list = data.list;
        },
        goDetail(data){
            this.$router.push({
                path: '/personal/message/detail', 
                query: {
                    // title: data.title, 
                    id: data.id
                }
            })
        }
    },
    created(){
        this.isFirstEnter=true;
    },
    activated(){
        if(!this.$store.getters.isback || this.isFirstEnter){
            this.getmymsgs()
        }
        this.isFirstEnter=false;
        this.$store.dispatch('set_isback',false)
    },
}
</script>

<style scoped lang="stylus">
.message_box
    border-bottom 1px solid #cccccc
</style>
