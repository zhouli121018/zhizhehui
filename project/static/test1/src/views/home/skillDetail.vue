<template>
    <detail :title_name="title_name"  :title="title" :content="content"/>
</template>

<script>
import { getjiqiao } from '@/api/home'
export default {
    data(){
        return {
            title_name: '技巧详情',
            title:'',
            content:''
        }
    },
    methods:{
        async getjiqiao () {
          const { data }    = await getjiqiao({
              id:this.$route.query.id
          });
          this.title = data.title;
          this.content = data.content;
        }
    },
    created(){
        this.getjiqiao();
    }
}
</script>

<style>

</style>
