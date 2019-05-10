<template>
    <div class="container">
        <title-bar title_name="登录" right_text="注册" right_url="/register/index"/>
        <div class="van_box">
            <van-field label="手机号" maxlength="11" type="number" clearable v-model="mobile" placeholder="请输入手机号" />
        </div>
        <div class="van_box">
            <van-field label="密码" maxlength="11" type="number" class="van_field" clearable v-model="code" placeholder="请输入密码" />
            <!-- <CutDown @click="codeVerify" :disabled="disabled" :moble="mobile"></CutDown> -->
        </div>
        <router-link tag="div" to="/login/verification" class="red van_box_right">验证码登录</router-link>
        <van-button type="danger" @click="loginbypass">登录</van-button>
    </div>
</template>

<script>
import { validatePhone } from '@/utils/validate'
import CutDown from '@/components/CutDown'
import { loginbypass } from '@/api/index'
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
        async loginbypass () {
            const { data }    = await loginbypass({
                phone: this.mobile,
                pass: this.code
            });
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
.van_box_right
    text-align right
    padding .3rem
    box-sizing border-box
</style>
