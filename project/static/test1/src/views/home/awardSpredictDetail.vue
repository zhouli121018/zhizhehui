<template>
    <detail :title_name="title_name"  :title="title" :content="content"/>
</template>

<script>
import { getpredzuhe_detail } from '@/api/home'
export default {
    data(){
        return {
            title_name:'大奖组合预测详情',
            title:'',
            content:''
        }
    },
    methods:{
        async getpredzuhe_detail () {
            const { data }    = await getpredzuhe_detail({
                lottype: this.$route.query.lottype,
                tid: this.$route.query.tid
            });
            if(data.errorcode==0){
                this.title = data.title;
                this.content = data.content;
            }
        }
    },
    created(){
        this.getpredzuhe_detail();
    }
}
</script>

