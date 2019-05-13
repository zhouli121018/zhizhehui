<template>
    <detail :title_name="title_name"  :title="title" :content="content"/>
</template>

<script>
import { msg } from '@/api/personal'
export default {
    data(){
        return {
            title_name: '消息详情',
            title:'',
            content:''
        }
    },
    methods:{
        async msg () {
          const { data }    = await msg({
              id:this.$route.query.id,
              sid:localStorage['sid'],
              uid:localStorage['uid']
          });
          this.title = data.title;
          this.content = data.content;
        },
    },
    created(){
        // this.title_name = this.$route.query.title
        this.msg();
    }
}
</script>

<style>

</style>
