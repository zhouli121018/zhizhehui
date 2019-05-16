<template>
    <div class="container" v-if="planInfo">
        <div class="aPlan_title">
            <img @click="goBack" src="~@/assets/returnpre.png" alt="">
            <p>方案计划 </p>
            <div class="title_pop_up" @click="isShowClick">
                {{chooseName}} 
                <img v-if="!isShow" src="~@/assets/arrowdown.png" alt="">
                <img v-else src="~@/assets/arrowon.png" alt="">
            </div>
            <ul class="pop_up_down" v-if="isShow">
                <li v-for="(item,index) in lottypeList" :key="index" :class="active==index?'active':''" @click="choose(item.lotname,index,item.lottype)">{{item.lotname}}</li>
            </ul>
        </div>
        <div class="lottery_time">
            <div>距{{planInfo.curissue}}期开奖: <span class="green"> {{h+':'+m+':'+s}}</span></div>
            <div>当前时间: <span class="blue"> {{curtime}}</span></div>
        </div>
        <div class="lottery_time lottery_times">
            <span>{{planInfo.preissue}}期开奖号码:</span> <span class="lottery_number">{{planInfo.kjnum}}</span>
        </div>
        <div class="xian"></div>
        <van-row class="text_center btn_group" style="padding-bottom:0.2rem;">
            <van-col span="6" v-for="(y,index) in fangansList" :key="index">
                <van-button :type="index==yc_active?'danger':'default'" size="small" @click="change_yc(index,y.fanganid)">{{y.fangantitle}}</van-button>
            </van-col>
            <van-col span="6"><van-button size="small" class="no_border_btn" @click="jumpTo('/home/singlePlan')">方案描述</van-button></van-col>
        </van-row>
        <div class="xian"></div>
        <div class="pop_up_content">
            <p @click="chooseNum(3)">{{posname}} <img v-if="!isNum_top" src="~@/assets/navigationarrow.png" alt="">
                <img v-else src="~@/assets/navigationup.png" alt=""></p>
            <p @click="chooseNum(2)">{{plannum}}码 <img v-if="!isNum_center" src="~@/assets/navigationarrow.png" alt="">
                <img v-else src="~@/assets/navigationup.png" alt=""></p>
            <p @click="chooseNum(1)">{{issuenum}}期 <img v-if="!isNum" src="~@/assets/navigationarrow.png" alt="">
                <img v-else src="~@/assets/navigationup.png" alt="">
            </p>
            <ul v-if="isNum" class="up_content_last">
                <li v-for="(item,index) in lottList.nissues" :class="index==activeNum?'active':''" :key="index" @click="numClick(1,index,item)">{{item}}期</li>
            </ul>
            <ul v-if="isNum_center" class="up_content_last up_content_center">
                <li v-for="(item,index) in lottList.nmaypes" :class="index==activeNums?'active':''" :key="index" @click="numClick(2,index,item)">{{item}}码</li>
            </ul>
            <ul v-if="isNum_top" class="up_content_last up_content_top">
                <li v-for="(item,index) in lottList.plantypes" :class="index==a_activeNum?'active':''" :key="index" @click="numClick(3,index,item)">{{item.posname}}</li>
            </ul>
        </div>
        <table>
            <tr>
                <th>期次</th>
                <th>计划内容</th>
                <th>几期中</th>
                <th>开奖号</th>
            </tr>
            <tr v-for="(item,index) in planInfo.list" :key="index">
                <td>{{item.issue}}</td>
                <td v-if="item.content == '会员权限'"><van-button size="small" class="membership_privileges">{{item.content}}</van-button></td>
                <td>{{item.content}}</td>
                <td>{{item.hitnum}}</td>
                <td>{{item.kjnum}}</td>
            </tr>
        </table>
        <div class="for_more">
            <van-button size="small" class="no_border_btn" @click="getplans">获取更多</van-button>
        </div>
        <div class="replication_solution">
            <van-button size="large" style="background:#FC7953;color:#fff;width:90%">复制方案</van-button>
        </div>
    </div>
</template>

<script>
import { gethome } from '@/api/home'
import { getplan } from '@/api'
import { getdTime, getHMS } from '@/utils'
export default {
    data() {
        return {
            activeNum: 0,
            activeNums: 0,
            a_activeNum: 0,
            lottypeList: [],
            active: 0,
            isShow: false,
            fangansList: [],
            lottypeList: [],
            noticesList: [],
            yc_active: 0,
            isNum: false,
            isNum_center: false,
            isNum_top: false,
            chooseName: '',
            isFirstEnter: false,
            lastid: 0,
            lottype: '',
            fanganid: '',
            plantype: '',
            plannum: '',
            issuenum: '',
            planInfo: null,
            curtime: '',
            lottList: null,
            posname: '',
            endtime: '',
            _curtime: '',
            h: '',
            m: '',
            s: '',
            isCurtime: false,
            timer: null
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
        //选中几期
        numClick(type,index,num) {
            if(type == 1) {
                this.activeNum = index
                this.issuenum = num
                this.isNum = false
            }else if(type == 2) {
                this.activeNums = index 
                this.plannum = num
                this.isNum_center = false
            }else {
                this.a_activeNum = index
                this.posname = num.posname
                this.plantype = num.plantype
                this.isNum_top = false
            }
            clearTimeout(this.timer)
            this.getplans()
        },
        chooseNum(type) {
            if(type == 1) {
                this.isNum = !this.isNum
            }else if(type == 2) {
                this.isNum_center = !this.isNum_center
            }else {
                this.isNum_top = !this.isNum_top
            }
            
        },
        isShowClick() {
            this.isShow = !this.isShow
        },
        choose(name, i, lottype) {
            this.chooseName = name
            this.active = i
            this.lottype = lottype
            this.lottList = this.lottypeList.filter(item => {
                if(item.lottype == this.lottype) {
                    return {
                        ...item
                    }
                }
            })[0]
            this.chooseName = this.lottList.lotname
            this.lottype = this.lottList.lottype
            this.plantype = this.lottList.plantypes[0].pos//计划类型id
            this.posname = this.lottList.plantypes[0].posname//计划类型名称
            this.plannum = this.lottList.nmaypes[0]//几码
            this.issuenum = this.lottList.nissues[0]//几期
            clearTimeout(this.timer)
            this.getplans()
        },
        //点击方案
        change_yc(index,fanganid){
            this.yc_active = index
            this.fanganid = fanganid
            this.getplans()
        },
        jumpTo(url) {
            this.$router.push(url)
        },
        async getplans() {
            clearTimeout(this.timer)
            const { data } = await getplan({
                sid: localStorage.getItem('sid'),
                uid: localStorage.getItem('uid'),
                lottype: this.lottype,
                fanganid: this.fanganid,
                plantype: this.plantype,
                plannum: this.plannum,
                issuenum: this.issuenum,
                lastid: this.lastid
            })
            this.planInfo = data
            this.lastid = this.planInfo.lastid  //获取更多传当前这个lastid 默认传0
            this.curtime = getHMS(this.planInfo.curtime)//开始时间
            this._curtime = this.planInfo.curtime*1000//当前时间
            this.endtime = this.planInfo.endtime*1000//结束时间
            this.isCurtime = false
            this.countTime()
        },
        countTime () {
            //时间差
            let leftTime = this.endtime - this._curtime;
            //定义变量 d,h,m,s保存倒计时的时间
            if (leftTime >= 0) {
                this._curtime = this._curtime + 1000
                // this.d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
                this.h = Math.floor(leftTime / 1000 / 60 / 60 % 24)>=10?Math.floor(leftTime / 1000 / 60 / 60 % 24):'0'+Math.floor(leftTime / 1000 / 60 / 60 % 24);
                this.m = Math.floor(leftTime / 1000 / 60 % 60)>=10?Math.floor(leftTime / 1000 / 60 % 60):'0'+Math.floor(leftTime / 1000 / 60 % 60);
                this.s = Math.floor(leftTime / 1000 % 60)>=10?Math.floor(leftTime / 1000 % 60):'0'+Math.floor(leftTime / 1000 % 60);
				//递归每秒调用countTime方法，显示动态时间效果
				this.timer = setTimeout(this.countTime, 1000);
            }else {
                clearTimeout(this.timer)
            }
            
        },
        async gethome() {
            const { data } = await gethome({
                sid: localStorage.getItem('sid'),
                uid: localStorage.getItem('uid')
            })
            this.fangansList = data.fangans//方案
            this.lottypeList = data.lottype//标题选择
            this.noticesList = data.notices
            this.fanganid = this.fangansList[0].fanganid
            //上一个页面传彩种参数  去获取相关一系列参数
            this.lottList = this.lottypeList.filter(item => {
                if(item.lottype == this.lottype) {
                    return {
                        ...item
                    }
                }
            })[0]
            this.chooseName = this.lottList.lotname
            this.lottype = this.lottList.lottype
            this.plantype = this.lottList.plantypes[0].pos//计划类型id
            this.posname = this.lottList.plantypes[0].posname//计划类型名称
            this.plannum = this.lottList.nmaypes[0]//几码
            this.issuenum = this.lottList.nissues[0]//几期
        }
    },
    created() {
        this.isFirstEnter=true;
    },
    activated(){
        this.isShow = false
        this.active = 0
        this.isNum = false
        this.isNum_center = false
        this.isNum_top = false
        if(!this.$store.getters.isback || this.isFirstEnter){
            this.lottype = this.$route.query.lottype
            this.gethome().then(() => {
                this.getplans()
            })
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
        padding .3rem 0
        text-align center
    td  
        color #2B2B2B
    td:first-child
        color #6B6B6B
    td:first-child
        background #E5E5E5
    th
        background #F5F5F5
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
    ul.up_content_last 
        position absolute
        top 99%
        right 9%
        background #fff
        min-width 20%
        padding .2rem 
        box-sizing border-box  
        z-index 999 
        &.up_content_center
            right 37%
        &.up_content_top
            min-width 23%
            right 68%
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
