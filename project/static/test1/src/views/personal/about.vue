<template>
    <detail :title_name="title_name"  :title="title" :content="content"/>
</template>

<script>
import {getabout } from '@/api'
export default {
    data(){
        return {
            title_name: '关于彩票选号助手',
            title:'',
            content:''
        }
    },
    methods:{
        async getabout() {
            const { data } = await getabout();
            if(data.errorcode == 0 && data.content){
                this.content = data.content;
            }
        },
    },
    created(){
        this.getabout();
    }
}
</script>

<style>

</style>
