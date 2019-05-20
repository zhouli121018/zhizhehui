<template>
    <detail :title_name="title_name"  :title="title" :content="content"/>
</template>

<script>
import {getabout } from '@/api'
export default {
    data(){
        return {
            title_name: '关于智者汇',
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
        if(!this.$root.$children[0].timer){
            this.$root.$children[0].getkjring();
            this.$root.$children[0].timer = setInterval(this.$root.$children[0].getkjring, 3000);
        }
    }
}
</script>

<style>

</style>
