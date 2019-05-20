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
          if(data.errorcode==0){
              this.title = data.title;
            this.content = data.content;
          }
        },
    },
    created(){
        // this.title_name = this.$route.query.title
        this.notice();
        if(!this.$root.$children[0].timer){
            this.$root.$children[0].getkjring();
            this.$root.$children[0].timer = setInterval(this.$root.$children[0].getkjring, 3000);
        }
    }
}
</script>

<style>

</style>
