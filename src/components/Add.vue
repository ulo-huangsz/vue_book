<template>
   <div>
     <Mheader>添加</Mheader>
     <div class="content">
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
           <label for="bookUrl">书的封面</label>
           <input type="text" v-model="book.bookUrl" id="bookUrl">
         </li>
         <li>
           <button @click="add">确认修改</button>
         </li>
       </ul>
     </div>
   </div>
</template>

<script>
  import {addBook} from '../api'
  import Mheader from '../base/Mheader'
    export default {
      name: "add",
      data(){
        return {
          book:{}
        }
      },
      created(){
      },
      methods: {
        async add(){
          await addBook(this.book);
          this.$router.push('/list')
        }
      } ,
      components:{
        Mheader,
      },
    }
</script>

<style scoped lang="less">
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
