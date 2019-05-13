<template>
    <div class="container">
      <title-bar title_name="预测排名"></title-bar>
      <rank :ishome="0"/>
      

    </div>
</template>

<script>
import {getproperty,getexprank} from '@/api/home'
import { Dialog } from 'vant'
export default {
    data() {
        return {
            
        }
    },
}
</script>

<style scoped lang="stylus">

</style>
