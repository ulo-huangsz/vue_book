<template>
    <div class="detail">
      <Mheader :back="true">详情页</Mheader>
      <ul>
        <li>
          <label for="bookName">书的名称</label>
          <input type="text" v-model="book.bookName" id="bookName">
        </li>
        <li>
          <label for="bookName">书本信息</label>
          <input type="text" v-model="book.bookInfo" id="bookInfo">
        </li>
        <li>
          <label for="bookName">书的价格</label>
          <input type="text" v-model.number="book.bookPrice" id="bookPrice">
        </li>
        <li>
          <button @click="update">确认修改</button>
        </li>
      </ul>
    </div>
</template>

<script>
  import Mheader from '../base/Mheader'
  import {findOneBook,updateBook} from "../api";
  export default {
        name: "detail",
      data(){
        return {
          book:{}
        }
      },
    watch:{
        $route(){  //只要路径变化，重新获取数据
          this.getData()
        }
    },
      computed:{
        bid(){
          return this.$route.params.bid  //将路径参数的id映射到bid上
        }
      },
    created(){
      this.getData()
    },
    methods:{
      async  getData(){
          this.book = await findOneBook(this.bid);
          //如果是空对象 需要跳转回列表页
          Object.keys(this.book).length > 0 ?  void 0 :this.$router.push('/list')
      },
      async  update(){
         await updateBook(this.bid,this.book);
        this.$router.push('/list')
      }
    },
    components:{
      Mheader,
    }
    }
</script>

<style scoped lang="less">
  .detail{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    z-index: 100;
}
  ul{
    margin: 50px 20px 0;
    li{
      label{
        display: block;
        font-size: 25px;
      }
      input{
        margin: 10px 0;
        height: 25px;
        width: 100%;
      }
      button{
        display: block;
        width: 80px;
        height: 35px;
        border: none;
        border-radius: 10px;
        background-color: deepskyblue;
        color: #fff;
        outline: none;
      }
    }
  }
</style>
