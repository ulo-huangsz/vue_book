<template>
  <div class="header">
    <slot></slot>
    <i class="iconfont icon-fanhui" v-if="back" @click="goback"></i>
  </div>
</template>

<script>
    export default {
      props:{
        back:{
          type:Boolean,
          default:false
        }
      },
        name: "mheader",
      methods:{
        goback(){
          this.$router.go(-1)
        }
      }
    }
</script>

<style scoped lang="less">
.header{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  text-align: center;
  background: rgba(200,0,3,0.5);
  line-height: 40px;
  font-weight: bold;
  i{
    position: absolute;
    left: 10px;
    font-size: 20px;
  }
}
</style>
