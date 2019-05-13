<template>
    <div class="container">
        <title-bar title_name="登录" right_text="注册" right_url="/register/index"/>
        <div class="van_box">
            <van-field label="手机号" maxlength="11" type="number" clearable v-model="mobile" placeholder="请输入手机号" />
        </div>
        <div class="van_box">
            <van-field label="验证码" maxlength="11" type="number" class="van_field" clearable v-model="code" placeholder="请输入验证码" />
            <CutDown ref="codeEl" @click="getvcode" :disabled="disabled" :mobile="mobile"></CutDown>
        </div>
        <van-button type="danger" @click="loginbyvcode">登录</van-button>
    </div>
</template>

<script>
import { validatePhone } from '@/utils/validate'
import CutDown from '@/components/CutDown'
import { getvcode, loginbyvcode } from '@/api/index'
export default {
    components: {
        CutDown
    },
    data() {
        return {
            mobile: '',
            code: ''
        }
    },
    methods: {
        async getvcode() {
            const { data } = await getvcode({
                noLoading: false,
                phone: this.mobile
            })
            if(data.errorcode == 0){
                this.$refs.codeEl.isStart = true;
                this.$refs.codeEl.start();
            }
            this.$toast(data.message)
        },
        async loginbyvcode () {
            let obj = {
                phone: this.mobile,
                vcode: this.code
            };
            if(sessionStorage.getItem('cid')){ //渠道号
                obj.cid = sessionStorage.getItem('cid')
            }
            if(sessionStorage.getItem('pid')){ //推荐码
                obj.pid = sessionStorage.getItem('pid')
            }
            const { data }    = await loginbyvcode(obj)
            if(data.errorcode == 0) {
                window.localStorage['uid'] = data.uid
                window.localStorage['sid'] = data.sid
                this.$router.replace('/home/index')
            }
        },
    },
    computed: {
        disabled() {
            return !validatePhone(this.mobile)
        },
        submitValidate() {
            if(!this.mobile || !this.code) {
                return {
                    ok: false,
                    msg: '请填写完整信息'
                }
            }
            if(!validatePhone(this.mobile)) {
                return {
                    ok: false,
                    msg: '请输入正确手机号'
                }
            }
            return {
                ok: true,msg: 'ok'
            }
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
