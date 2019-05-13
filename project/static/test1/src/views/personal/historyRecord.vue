<template>
    <div class="container">
        <title-bar :title_name="title_name"></title-bar>
        <div class="history_box" v-for="(l,index) in list" :key="index">
            <div class="box_top" style="font-size:18px;">
                <span>{{l.kjissue}}</span>
                <span>{{l.kjdate}}</span>
                <span>{{l.kjweek}}</span>
            </div>
            <p style="padding:10px">
                <span class="red_round" :class="{red:index==0}"  v-for="(red,i) in l.red_num_arr" :key="i"> {{red}}</span>
                <span class="red blue_round"  v-for="(blue,i) in l.blue_num_arr" :key="123+i">{{blue}}</span>
            </p>
        </div>
    </div>
</template>

<script>
import { gethiskj } from '@/api/personal'
export default {
    data(){
        return {
            title_name:'',
            list:[],
        }
    },
    methods:{
        async gethiskj () {
          const { data }    = await gethiskj({
              lottype : this.$route.query.lottype,
          });
          this.list = data.list;
          this.list.forEach(val => {
              let index_blue = val.kjnum.indexOf('#');
              if(index_blue>-1){
                  let blue_num = val.kjnum.slice(index_blue+1);
                  val.blue_num_arr = blue_num.split(',')
                  let red_arr = val.kjnum.slice(0,index_blue);
                  val.red_num_arr = red_arr.split(',')
              }else{
                  val.red_num_arr = val.kjnum.split(',')
              }
          });
        },
    },
    created(){
        this.title_name = this.$route.query.title_name+'历史记录';
        this.gethiskj();
    }
}
</script>

<style lang="stylus" scoped>
.history_box
    width 100%
    padding .2rem
    box-sizing border-box
    border-bottom 2px solid #cccccc
    .box_top
        min-width 80%
        display flex
        align-items center
        padding .2rem 0
        span 
            color #666
            padding-right .8rem
            &:not(:first-child)
                font-size .36rem
            
.red_round,.blue_round
  border-radius 50%
  width .8rem
  height .8rem
  color red
  border: 1px solid red;
  display inline-block
  line-height .8rem
  text-align center
  margin-right .2rem
  font-size .5rem
.blue_round
  background #4FA7F3
  border-color #4FA7F3
  color #fff
.red_round&.red
    background red
    color #ffffff
</style>
