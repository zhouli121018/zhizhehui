<template>
    <div class="container">
        <title-bar title_name="专家预测"></title-bar>
        <div class="perdict_title">
            <div class="title_content">
                <img class="title_photo" :src="this.$https_img+img" alt="">
                <div>
                    <div>
                        <span>{{uname}}</span>
                        <img src="~@/assets/zhuan@2x.png" alt="" v-if="isexp">
                        <img src="~@/assets/vip.png" alt="" v-if="isvip">
                    </div>
                    <p>粉丝: <span class="red">{{fans}}</span></p>
                </div>
            </div>
            <van-button type="danger" size="small" v-if="isfollow==0" @click="follow(1)">关注</van-button>
            <van-button type="danger" size="small" v-if="isfollow==1" @click="follow(0)">取消关注</van-button>
        </div>
        <textarea placeholder="个人简介" id="textarea" v-model="jianjie" style="line-height:1.4" disabled></textarea>
        <div class="xian"></div>
        
        <lottypes @change_lottypes="getexpert" ref="rankChild"/>

        <div class="period_time">
            <span>期次</span>
            <span>开奖码</span>
            <span>预测内容</span>
            <span>状态</span>
        </div>
        <div class="period_content" v-for="(l,index) in list" :key="index">
            <span>{{l.issue}}</span>
            <span class="red red_num">{{l.kjnum}}</span>
            <span v-if="l.cid == 0" >{{l.pred}}</span>
            <span v-if="l.cid > 0" style="color:#2E8BE8;text-decoration:underline;" @click="showTost(l.cid)"> 查看预测 </span>
            <span class="red">{{l.status}}</span>
        </div>
    </div>
</template> 

<script>
import { getexpert, viewpred, follow } from '@/api/personal'
import { Dialog } from 'vant'
export default {
    data(){
        return {
            uname:'',
            img:'',
            fans:'',
            costcoin:'',
            isexp:0,  //1专家   0不是专家
            isvip:0,  //1是vip   0不是vip
            isfollow:0, //0为关注  1已关注
            jianjie:'', //简介
            list:[]
        }
    },
    methods:{
        showTost(cid){
            Dialog.confirm({
                title: '提示',
                message: '查看该预测需花费你'+this.costcoin+'金币，专家不保证100%准确，确定查看吗？'
            }).then(() => {
                // on confirm
                this.viewpred(cid)
            }).catch(() => {
                // on cancel
            });
        },
        async viewpred (cid) {
          const { data }    = await viewpred({
                sid: localStorage['sid'], //localStorage['sid']
                uid: localStorage['uid'],  //localStorage['uid']
                cid: cid,
          });
          if(data.content){
            Dialog.confirm({
            title: '提示',
            message: data.content,
            confirmButtonText: '我的查看',
            cancelButtonText: '关闭',
          }).then(() => {
            // on confirm
            this.$router.push({
              path:'/personal/myLook',
              query:{
                lottype : this.$store.getters.lottypes[this.$refs.rankChild.tabs_active].lottype,
                postype : this.$store.getters.lottypes[this.$refs.rankChild.tabs_active].poslist[this.$refs.rankChild.num_active].type,
                ycplaytype : this.$store.getters.lottypes[this.$refs.rankChild.tabs_active].poslist[this.$refs.rankChild.num_active].ycplaytypes[this.$refs.rankChild.yc_active].ycplaytype,
              }
            })
          }).catch(() => {
            // on cancel
          });
          }
            
        },
        async getexpert () {
            const { data }    = await getexpert({
                    sid: localStorage['sid'], //localStorage['sid']
                    uid: localStorage['uid'],  //localStorage['uid']
                    expid: this.$route.query.expid ,//专家id
                    ishead: 1,
                    lottype: this.$store.getters.lottypes[this.$refs.rankChild.tabs_active].lottype,
                    postype: this.$store.getters.lottypes[this.$refs.rankChild.tabs_active].poslist[this.$refs.rankChild.num_active].type,
                    ycplaytype: this.$store.getters.lottypes[this.$refs.rankChild.tabs_active].poslist[this.$refs.rankChild.num_active].ycplaytypes[this.$refs.rankChild.yc_active].ycplaytype,
            });
            this.uname = data.uname;
            this.img = data.img;
            this.fans = data.fans;
            this.isfollow = data.isfollow;
            this.isexp = data.isexp;
            this.isvip = data.isvip;
            this.jianjie = data.jianjie;
            this.costcoin = data.costcoin;
            this.list = data.list;
        },
        async follow (type) {
            const { data }    = await follow({
                    sid: localStorage['sid'], //localStorage['sid']
                    uid: localStorage['uid'],  //localStorage['uid']
                    expid: this.$route.query.expid ,//专家id
                    type:type
            });
            if(data.errorcode == 0){
                this.isfollow = type;
            }
        },
    }
}
</script>

<style scoped lang="stylus">
.period_content
    width 100%
    background #f8f8f8
    padding .2rem 0
    display flex
    align-items center
    border-bottom 1px solid #E8E8E8
    span 
        width 22%
        text-align center
        border-right 1px solid #E6E6E6
        color #666
        padding .2rem 0
        &:nth-child(1)
            width 50px !important
        &:nth-child(2)
            flex-grow 1
        &:nth-child(3)
            word-break break-word
        &:last-child
            width 60px
            border-right none
.period_time
    display flex
    align-items center
    justify-content space-between
    border-bottom 1px solid #E8E8E8
    background #f8f8f8
    padding-top 0
    position relative
    top -0.1rem
    padding-bottom 0.3rem
    span 
        text-align center
        border-right 1px solid #E6E6E6
        color #666
        padding .2rem 0
        &:nth-child(1)
            width 60px !important
        &:nth-child(2)
            flex-grow 1
        &:nth-child(3)
            flex-grow 1
        &:last-child
            width 60px
.period_content
    background #fff
    span
        font-size .35rem 
        border-right none
        &.red
            color red
.text_center,.btn_group button
    margin-top .1rem
    text-align center
#textarea
    width 94%
    min-height 2rem
    margin .2rem auto 
    display block
    font-size .38rem
    border 1px solid #E4E4E4
    padding .2rem 
    box-sizing border-box
    border-radius 0.2rem
.perdict_title
    width 100%
    padding .2rem
    box-sizing border-box
    display flex
    justify-content space-between
    align-items center
    border-bottom 1px solid #E6E6E6
    button 
        border-radius .2rem
.title_photo
    width 2rem
    height 2rem
    border-radius 50%
    display inline-block
    margin-right .3rem
.title_content
    width 100%
    display flex
    align-items center
    div
        line-height .65rem
        padding-bottom 0.1rem
        div
            font-size 0.42rem
            span
                color #4D4D4C
                font-weight bold
    p
        color #666666  
        font-size 0.35rem          
    img:nth-child(2)
        width .5rem
        height .5rem
        margin 0 0.1rem
        position relative
        top -0.05rem
    img:nth-child(3)
        width .7rem
        
        position relative
        top -0.05rem
</style>
