<template>
    <div class="container">
        <title-bar title_name="邀请明细" />
        <div>
            <table style="width:100%;" v-if="list.length>0">
                <tr>
                    <td class="head_td" style="padding-left:.2rem;">时间</td>
                    <td class="head_td">被邀人</td>
                    <td class="head_td">状态</td>
                </tr>
                <!-- <tr >
                    <td style="padding-left:.2rem">2019/01/01 19:19:12</td>
                    <td>176****9682</td>
                    <td>已开通会员</td>
                </tr>
                <tr >
                    <td style="padding-left:.2rem">2019/01/01 19:19:12</td>
                    <td>176****9682</td>
                    <td>还差一个</td>
                </tr> -->
                <tr v-for="(l,index) in list" :key="index">
                    <td style="padding-left:.2rem">{{l.createtime}}</td>
                    <td>{{l.username}}</td>
                    <td>{{l.status}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import {getinvitelist } from '@/api'
export default {
    data(){
        return {
            title_name: '邀请明细',
            title:'',
            list:[],
            content:''
        }
    },
    methods:{
        async getinvitelist() {
            let obj = {};
            if(localStorage.getItem('uid')){
                obj.uid = localStorage.getItem('uid');
            }
            if(localStorage.getItem('sid')){
                obj.sid = localStorage.getItem('sid');
            }
            const { data } = await getinvitelist(obj);
            this.list = data.list;
        },
    },
    created(){
        this.getinvitelist();
    }
}
</script>

<style  lang="stylus" scoped>
table td.head_td{
    background:#eee;
    padding:.2rem 0;
    font-weight:bold;
    font-size:.42rem;
}
table td{
    padding-top:.2rem;
    padding-bottom:.2rem;
    font-size:.4rem
}
    
</style>
