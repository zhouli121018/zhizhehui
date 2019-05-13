<template>
  <div class="container">
    <div class="error">
      <img src="../../assets/404.png" alt>
    <div class="text">
        <p>404</p>
        <span>Sorry,您访问的页面不存在！</span>
    </div>
    </div>
  </div>
</template>

<script>
export default {
    name: '404'
}
</script>

<style lang='stylus' scoped>

.container{
    background :#f9f9f9;
}

.error {
    display:flex;
    justify-content :center;
    align-items :center;
    padding-top:80px;
}

.error img{
    width:143px;
    height:131px;
}

.text{
  color: #666d75;
  line-height :40px;
}

.text p{
    font-size :50px;
    text-align :center;
}

.text span{
    font-size :18px;
}



</style>
