<template>
    <div class="container">
        <title-bar title_name="模拟投注"></title-bar>
        <h4>模拟双色球投注8红球中6奖励1000元</h4>
        <div class="simulate_num" style="margin-top:0.3rem;">
            <span v-for="(item,index) in list" :class="{active:arr.indexOf(item.a) != -1}" :key="index" @click="onclick(index,item.a)">{{item.a}}</span>
        </div>
        <div class="simulate_num">
            <span v-for="(item,index) in list2" :class="{active:arr.indexOf(item.a) != -1}" :key="index" @click="onclick(index,item.a)">{{item.a}}</span>
        </div>
        <div class="simulate_num">
            <span v-for="(item,index) in list3" :class="{active:arr.indexOf(item.a) != -1}" :key="index" @click="onclick(index,item.a)">{{item.a}}</span>
        </div>
        <div class="simulate_num">
            <span v-for="(item,index) in list4" :class="{active:arr.indexOf(item.a) != -1}" :key="index" @click="onclick(index,item.a)">{{item.a}}</span>
        </div>
        <div class="simulate_num">
            <span v-for="(item,index) in list5" :class="{active:arr.indexOf(item.a) != -1}" :key="index" @click="onclick(index,item.a)">{{item.a}}</span>
        </div>
        <div class="simulate_num">
            <span v-for="(item,index) in list6" :class="{active:arr.indexOf(item.a) != -1}" :key="index" @click="onclick(index,item.a)" :style="{visibility:index==3||index==4||index==5?'hidden':'show'}">{{item.a}}</span>
        </div>
        <div class="simulate_div">
        <van-button type="danger" class="simulate_btn" @click="submittouzu" :disabled="disabled" size="large">模拟投注</van-button>
        </div>
        <div class="xian"></div>
        <div class="simulate_rules">
            <h4 class="rules_h" style="color:#111;">模拟投注规则</h4>
            <p>1、任何注册用户可以免费模拟投注；</p>
            <p>2、每期只能模拟投注一注；</p>
            <p>3、开奖结果参考福彩官方；</p>
            <p>4、中4个送10金币；中5个送100金币；中6个送1000金币，再奖励1000元；</p>
            <!-- <p>1.人和注册用户可以免费模拟投注</p>
            <p>2.每项只能模拟投注一注</p> -->
        </div>
    </div>
</template>

<script>
import { submittouzu } from '@/api'
export default {
    data() {
        return {
            list: [],
            list2: [],
            list3: [],
            list4: [],
            list5: [],
            list6: [],
            arr: [],
            disabled: true
        }
    },
    methods: {
        lists() {
            let obj = {}
            for(let i = 1; i < 7; i++) {
                obj = {a:i < 10?'0'+i:i}
                this.list.push(obj)
            }
        },
        lists2() {
            let obj = {}
            for(let i = 7; i < 13; i++) {
                obj = {a:i < 10?'0'+i:i}
                this.list2.push(obj)
            }
        },
        lists3() {
            let obj = {}
            for(let i = 13; i < 19; i++) {
                obj = {a:i < 10?'0'+i:i}
                this.list3.push(obj)
            }
        },
        lists4() {
            let obj = {}
            for(let i = 19; i < 25; i++) {
                obj = {a:i < 10?'0'+i:i}
                this.list4.push(obj)
            }
        },
        lists5() {
            let obj = {}
            for(let i = 25; i < 31; i++) {
                obj = {a:i < 10?'0'+i:i}
                this.list5.push(obj)
            }
        },
        lists6() {
            let obj = {}
            for(let i = 31; i < 37; i++) {
                obj = {a:i < 10?'0'+i:i}
                this.list6.push(obj)
            }
        },
        onclick(n,value) {
            if(this.arr.indexOf(value) != -1) {
                this.arr.splice(this.arr.indexOf(value), 1)
            }else {
                if(this.arr.length < 8) {
                    this.arr.push(value)
                }else {
                    this.$toast('最多选择八个数字')
                }
            }
            if(this.arr.length == 8) {
                this.disabled = false
            }else {
                this.disabled = true
            }
            
        },
        //提交
        async submittouzu() {
            this.disabled = true
            const { data } = await submittouzu({
                uid: localStorage.getItem('uid'),
                sid: localStorage.getItem('sid'),
                nums: this.arr.join(',')
            })
            if(data.errorcode == 0) {
                this.$toast(data.message)
                this.disabled = false
            }else {
                this.$toast(data.message)
            }
        }
    },
    created() {
        this.lists();
        this.lists2();
        this.lists3();
        this.lists4();
        this.lists5();
        this.lists6();
    }
}
</script>

<style lang="stylus" scoped>
.simulate_rules
    width 100%
    padding .2rem
    box-sizing border-box
    text-align left 
    color #111
    p
        line-height .6rem
        font-size .34rem
        color #333
.simulate_btn
    width 90%!important
.simulate_div
    width 100%
    text-align center
    margin-top 1rem
h4
    width 100%
    text-align center
    padding .2rem 0
    border-bottom 1px solid #cccccc
    font-size .4rem
    &.rules_h
        text-align left
        margin-bottom .2rem
.simulate_num
    width 100%
    display flex
    flex-wrap wrap
    justify-content space-around
    align-items center
    span 
        width 1rem
        height 1rem
        border-radius 50%
        border 1px solid #cccccc
        line-height 1rem
        font-size 0.5rem
        text-align center
        margin .2rem
        &.active
            background red
            color #ffffff
</style>
