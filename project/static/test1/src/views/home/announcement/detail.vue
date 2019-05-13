<template>
    <detail :title_name="title_name"  :title="title" :content="content"/>
    
</template>

<script>
import {notice } from '@/api/home'
export default {
    data(){
        return {
            title_name: '公告详情',
            title:'',
            content:''
        }
    },
    methods:{
        async notice () {
          const { data }    = await notice({
              noticeid:this.$route.query.noticeid
          });
          this.title = data.title;
          this.content = data.content;
        },
    },
    created(){
        // this.title_name = this.$route.query.title
        this.notice();
    }
}
</script>

<style>

</style>
