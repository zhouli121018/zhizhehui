<template>
    <div class="container">
        <title-bar title_name="反馈" />
        <input type="text" maxlength="10" v-model="contact" placeholder="QQ或者微信号">
        <textarea class="textarea" v-model="content" placeholder="请输入反馈内容"></textarea>
        <van-button type="danger" @click="submitfeedback" :disabled="disabled" size="large">提交反馈</van-button>
    </div>
</template>

<script>
import { submitfeedback } from '@/api'
import { truncate } from 'fs';
export default {
    data() {
        return {
            contact: '',
            content: '',
            device: '',
            disabled: false
        }
    },
    methods: {
        async submitfeedback() {
            if(!this.contact || !this.content) {
                this.$toast('请填写完整')
                return 
            }
            this.disabled = true
            const { data } = await submitfeedback({
                contact: this.contact,
                content: this.content,
                clientytpe: this.device,//0是安卓用户，1是苹果用户
                sid: localStorage.getItem('sid'),
                uid: localStorage.getItem('uid')
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
        let u = navigator.userAgent, app = navigator.appVersion;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
            this.device = 0
        }
        if (isIOS) {
            this.device = 1
        }
    }

}
</script>

<style lang="stylus" scoped>
input 
    border 1px solid #cccccc
    margin-top .4rem 
    background #ffffff
    height 1rem
    line-height 1rem
    padding .2rem
    box-sizing border-box
    width 94%
    border-radius .2rem
::-webkit-input-placeholder { /* WebKit browsers */
    font-size .36rem;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    font-size .36rem;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
    font-size .36rem;
}
:-ms-input-placeholder { /* Internet Explorer 10+ */
    font-size .36rem;
}
.container
    background #f8f8f8
    text-align center
.textarea
    width 94%
    height 3rem
    margin .5rem auto 
    background #ffffff
    border-color #cccccc
    padding .2rem
    box-sizing border-box
    border-radius .2rem
button 
    width 90%
input,textarea
     font-size .36rem;
</style>
