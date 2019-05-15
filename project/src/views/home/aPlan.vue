<template>
    <div class="container">
        <div class="aPlan_title">
            <img @click="goBack" src="~@/assets/returnpre.png" alt="">
            <p>方案计划 </p>
            <div class="title_pop_up" @click="isShowClick">
                {{chooseName}} 
                <img v-if="!isShow" src="~@/assets/arrowdown.png" alt="">
                <img v-else src="~@/assets/arrowon.png" alt="">
            </div>
            <ul class="pop_up_down" v-if="isShow">
                <li v-for="(item,index) in lottypeList" :key="index" :class="active==index?'active':''" @click="choose(item.lotname,index)">{{item.lotname}}</li>
            </ul>
        </div>
        <div class="lottery_time">
            <div>距119期开奖: <span class="green"> 00:12:13</span></div>
            <div>当前时间: <span class="blue"> 3月29日 09:22:30</span></div>
        </div>
        <div class="lottery_time lottery_times">
            <span>119期开奖号码:</span> <span class="lottery_number">01,02,03,04,05,06,07,08,09,10</span>
        </div>
        <div class="xian"></div>
        <van-row class="text_center btn_group" style="padding-bottom:0.2rem;">
            <van-col span="6" v-for="(y,index) in fangansList" :key="index">
                <van-button :type="index==yc_active?'danger':'default'" size="small" @click="change_yc(index)">{{y.fangantitle}}</van-button>
            </van-col>
            <van-col span="6"><van-button size="small" class="no_border_btn" @click="jumpTo">方案描述</van-button></van-col>
        </van-row>
        <div class="xian"></div>
        <div class="pop_up_content">
            <p>冠军计划 <img src="~@/assets/navigationarrow.png" alt=""></p>
            <p>5码 <img src="~@/assets/navigationarrow.png" alt=""></p>
            <p @click="chooseNum">2期 <img v-if="!isNum" src="~@/assets/navigationarrow.png" alt="">
                <img v-else src="~@/assets/navigationup.png" alt="">
            </p>
            <ul v-if="isNum">
                <li v-for="(item,index) in list" :class="index==activeNum?'active':''" :key="index" @click="numClick(index)">{{item.number}}期</li>
            </ul>
        </div>
        <table>
            <tr>
                <th>期次</th>
                <th>计划内容</th>
                <th>几期中</th>
                <th>开奖号</th>
            </tr>
            <tr>
                <td>0911</td>
                <td><van-button size="small" class="membership_privileges">会员权限</van-button></td>
                <td>0</td>
                <td>追号中</td>
            </tr>
            <tr>
                <td>0911</td>
                <td>1,6,2,3,4,5</td>
                <td>1</td>
                <td>10,9,3,4,8,5,4,6,7,4</td>
            </tr>
        </table>
        <div class="for_more">
            <van-button size="small" class="no_border_btn" @click="jumpTo">获取更多</van-button>
        </div>
        <div class="replication_solution">
            <van-button size="large" style="background:#FC7953;color:#fff;width:90%">复制方案</van-button>
        </div>
    </div>
</template>

<script>
import { gethome } from '@/api/home'
import { getplan } from '@/api'
export default {
    data() {
        return {
            activeNum: 0,
            lottypeList: [],
            active: 0,
            isShow: false,
            fangansList: [],
            lottypeList: [],
            noticesList: [],
            yc_active: 0,
            list: [
                {id:0,number: '1'},
                {id:0,number: '2'},
                {id:0,number: '3'}
            ],
            isNum: false,
            chooseName: '',
            isFirstEnter: false,
            lastid: 0,
            lottype: '',
            fanganid: ''
        }
    },
    methods: {
        // 返回
        goBack(){
            this.$store.dispatch('set_isback',true)
            setTimeout(() => {
                this.$store.dispatch('set_isback',false)
            }, 500);
            this.$router.go(-1)
        },
        numClick(index) {
            this.activeNum = index
        },
        chooseNum() {
            this.isNum = !this.isNum
        },
        isShowClick() {
            this.isShow = !this.isShow
        },
        choose(name,i) {
            this.chooseName = name
            this.active = i
            this.isShow = false
            this.$router.replace({
                path:'/home/aPlan',
                query:{
                    lottype:this.lottypeList[i].lottype
                }
            })
        },
        //点击方案
        change_yc(index){
            this.yc_active = index
        },
        jumpTo() {},
        async getplans() {
            const { data } = await getplan({
                sid: localStorage.getItem('sid'),
                uid: localStorage.getItem('uid'),
                lottype: this.lottype,
                fanganid: this.fanganid,
                plantype: '',
                plannum: '',
                issuenum: '',
                lastid: this.lastid
            })
        },
        async gethome() {
            const { data } = await gethome({
                sid: localStorage.getItem('sid'),
                uid: localStorage.getItem('uid')
            })
            this.fangansList = data.fangans//方案
            this.lottypeList = data.lottype//标题选择
            this.noticesList = data.notices
            this.chooseName = this.lottypeList[0].lotname
            this.lottype = this.lottypeList[0].lottype
            this.fanganid = this.fangansList[0].fanganid
            if(this.$route.query.lottype){
                for(let i=0;i<this.lottypeList.length;i++){
                    if(this.lottypeList[i].lottype == this.$route.query.lottype){
                        this.active = i;
                        this.chooseName = this.lottypeList[i].lotname
                    }
                }
            }
        }
    },
    created() {
        this.isFirstEnter=true;
    },
    activated(){
        this.isShow = false
        this.active = 0
        if(!this.$store.getters.isback || this.isFirstEnter){
            this.gethome()
        }
        this.isFirstEnter=false;
        this.$store.dispatch('set_isback',false)
    }
}
</script>

<style lang="stylus" scoped>
.replication_solution
    background #EEEEEE
    padding .5rem  0
    text-align center
.for_more
    margin .2rem auto
    text-align center
/deep/ .membership_privileges
    border:none;
    background:#FFBD28!important
    color:#FF0B60;
    height:25px;
    line-height:25px
table 
    font-size .28rem
    width 100%
    border 1px solid #cccccc
    border-right none
    tr,td,th 
        border 1px solid #E5E5E5
    tr 
        border-right none
    td,th   
        color #A8A8A8
    th,td 
        background #F5F5F5
        padding .3rem 0
        text-align center
    td  
        color #2B2B2B
    td:first-child
        color #6B6B6B
    td:first-child,th:first-child 
        background #E5E5E5
.pop_up_content
    width 100%
    display flex
    justify-content space-around
    align-items center
    padding .3rem .2rem 
    box-sizing border-box
    position relative
    p
        color #6B6B6B
    img 
        width .3rem
        height .18rem     
    ul 
        position absolute
        top 99%
        right 9%
        background #fff
        min-width 20%
        padding .2rem 
        box-sizing border-box  
        li  
            text-align center
            padding .2rem 0
            color #6B6B6B
.van-button--danger
    background-color #FC7953
    border none
.van-button--small
    min-width 70px
.text_center
    text-align center
    background #fff
.btn_group button
    margin-top .4rem
.van-col--6
    width 25%
.green
    color #47CE23
.blue 
    color #269EFF
.lottery_time
    width 100%
    display flex
    justify-content space-around
    align-items center
    color #727272
    border-bottom 1px solid #E5E5E5
    box-sizing border-box
    >div
        display flex
        width 49%
        font-size .28rem
        padding .5rem .1rem
        box-sizing border-box
        justify-content center
        &:first-child
            border-right 1px solid #E5E5E5
.lottery_times
    padding .5rem .2rem
    font-size .28rem
    border none!important
    justify-content left 
.lottery_number
    display inline-block
    padding-left .2rem
    color #000
    font-size .45rem
    font-weight bold
.active
    color #FC8563!important
.pop_up_down
    width 30%
    position absolute
    padding .2rem 0 .2rem .2rem
    box-sizing border-box
    top 1.2rem
    right .3rem
    background #ffffff
    z-index 999
    box-shadow: 0 0 0.1rem #ddd;
    li 
        color #2C2C2C
        padding .2rem .1rem
        border-bottom 1px solid #DCDCDC
        height .7rem
        line-height .7rem
        &:last-child
            border none
.aPlan_title
    color:#fff;
    background:url(../../assets/title.png);
    background-size: 100%;
    position: fixed;
    width: 100%;
    height 46px
    line-height 46px
    left: 0;
    right: 0;
    z-index: 1000;
    top: 0
    padding 0 .2rem
    box-sizing border-box
    display flex
    justify-content space-between
    align-items center
    p
        padding-left 1.1rem
        box-sizing border-box
        font-size 18px
    >img 
        width .25rem
        height .37rem
        z-index 99999
        margin-left .4rem
.title_pop_up
    display flex
    align-items center
    img 
        width .3rem
        height .21rem
        margin-left .1rem

</style>
