<template>
    <div class="container">
        <title-bar title_name="新用户注册" />
        <div class="van_box">
            <van-field label="手机号" maxlength="11" type="number" clearable v-model="phone" placeholder="请输入手机号" />
        </div>
        <div class="van_box">
            <van-field label="密码" type="number" maxlength="11" clearable v-model="password" placeholder="需6位数字密码" />
        </div>
        <div class="van_box">
            <van-field label="验证码" maxlength="11" type="number" class="van_field" clearable v-model="vcode" placeholder="请输入验证码" />
            <CutDown @click="codeVerify" :disabled="disabled" :mobile="phone" ref="codeEl"></CutDown>
        </div>
        <div class="van_box">
            <van-field label="邀请码" maxlength="11" type="number" :disabled="has_pid" class="van_field_code" clearable v-model="pid" placeholder="输入邀请码双方可得4金币" />
        </div>
        <van-button type="danger" @click="regist">注册</van-button>
    </div>
</template>

<script>
import { validatePhone } from '@/utils/validate'
import CutDown from '@/components/CutDown'
import { getvcode, regist } from '@/api'
import { Toast } from 'vant';
export default {
    components: {
        CutDown
    },
    data() {
        return {
            phone: '',
            pid: '', //邀请码
            password: '',
            vcode: '', //验证码
            device: 0  ,//手机类型,
            has_pid:false
        }
    },
    methods: {
        async codeVerify() {
            const { data } = await getvcode({
                phone: this.phone,
                // pass: this.password,
                // vcode: this.vcode,
                // icode: this.code,
                // device: this.device
            })
            if(data.errorcode == 0){
                this.$refs.codeEl.isStart = true;
                this.$refs.codeEl.start();
            }
            this.$toast(data.message)
            
        },
        async regist() {
            if(!this.phone){
                Toast('请输入手机号！');
                return;
            }
            if(this.phone && !(/^1\d{10}$/.test(this.phone))){
                Toast('请输入正确的手机号！');
                return;
            }
            if(!this.password){
                Toast('请输入密码！');
                return;
            }
            if(!this.vcode){
                Toast('请输入验证码！');
                return;
            }
            let obj = {
                phone: this.phone,
                pass: this.password,
                vcode: this.vcode,
                device: this.device,
                pid: this.pid
            };
            if(sessionStorage.getItem('cid')){ //渠道号
                obj.cid = sessionStorage.getItem('cid')
            }
            const { data } = await regist(obj)
            if(data.errorcode == 0) {
                window.localStorage['uid'] = data.uid
                window.localStorage['sid'] = data.sid
                this.$router.replace('/home/index')
            }
        }
    },
    computed: {
        disabled() {
            return !validatePhone(this.phone)
        },
        submitValidate() {
            if(!this.phone || !this.code) {
                return {
                    ok: false,
                    msg: '请填写完整信息'
                }
            }
            if(!validatePhone(this.phone)) {
                return {
                    ok: false,
                    msg: '请输入正确手机号'
                }
            }
            return {
                ok: true,msg: 'ok'
            }
        }
    },
    created(){
        this.pid = sessionStorage.getItem('pid');
        if(sessionStorage.getItem('pid')){
            this.has_pid = true;
        }
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

<style scoped lang="stylus">
/deep/ .van-field .van-cell__title
    max-width 1.6rem
    text-align left
.van_field
    width 76%
.van_field
    width 76%
.van_field_code
    /deep/ .van-field__control::-webkit-input-placeholder {
        color: orange
    }
button 
    width 90%
    margin-top 1rem
.van_box
    border 1px solid #cccccc
    width 94%
    margin .3rem auto
    display flex
    align-items center
.container
    text-align center
</style>
