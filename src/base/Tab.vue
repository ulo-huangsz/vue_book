<template>
  <!--按住alt建选择，按住shift选中-->
    <div class="footer">
      <router-link to="/home">
        <i class="iconfont icon-shouye"></i>
        <span>首页</span>
      </router-link>
      <router-link to="/list">
        <i class="iconfont icon-liebiao"></i>
        <span>列表</span>
      </router-link>
      <router-link to="/collect" >
        <i class="iconfont icon-collection-b"></i>
        <span>收藏</span>
      </router-link>
      <router-link to="/add">
        <i class="iconfont icon-tianjia"></i>
       <span>添加</span>
      </router-link>
    </div>
</template>

<script>
    export default {
        name: "tab"
    }
</script>
<!--
    display: flex;
    flex-direction: column/row; //横向还是纵向
    justify-content: center;//垂直居中
    align-items: center;//横向居中
    flex: 1;//没分占1
    router-link-exact-active //精确匹配激活  /home  有用   /home/a 无用
   router-link-active // 模糊的  /home ，/home/a  都有匹配
    -->
<style scoped lang="less">
 .footer{
   position: fixed;
   bottom: 0;
   left: 0;
   width: 100%;
   height: 50px;
   border-top: 1px solid #ccc;
   display: flex;
   a {
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     flex: 1;
     color:olivedrab;
   }
   a.router-link-active{
     color: red;
   }
 }
</style>
