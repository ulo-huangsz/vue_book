<template>
  <div id="app">
    <!--路由过渡动画-->
    <transition name="fadeIn">
      <!--需要缓存-->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="fadeIn">
      <!--正常的访问走下面-->
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <Tab></Tab>
  </div>
</template>

<script>
  import Tab from './base/Tab'
export default {
  name: 'App',
  components:{
      Tab
  }
}
</script>

<style>
    *{
      margin: 0;
      padding: 0;
    }
   ul,li{
     list-style: none;
   }
  a{
    text-decoration: none;
  }
  input,button{
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  .content{
    position: fixed;
    top: 40px;
    bottom: 50px;
    width: 100%;
    overflow: auto;

  }
  .fadeIn-enter{
    opacity: 0;
  }
  .fadeIn-enter-active{
    transition: all 0.3s linear;
  }
    .fadeIn-leave-active{
      transition: all 0.3s linear;
      opacity: 0;
    }
</style>
