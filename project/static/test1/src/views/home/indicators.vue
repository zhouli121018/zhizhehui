<template>
    <detail :title_name="title_name"  :title="title" :content="content"/>
    
</template>

<script>
import { getzhibiaodesc } from '@/api'
export default {
    data(){
        return {
            title_name:'指标说明',
            title:'',
            content:''
        }
    },
    methods:{
        async notice () {
          const { data }    = await getzhibiaodesc({
              lottype: this.$route.query.lottype
          })
         this.title = data.title;
         this.content = data.content;
        },
    },
    created(){
        this.notice();
    }
}
</script>

<style>

</style>
