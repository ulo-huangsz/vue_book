<template>
  <div>
    <Mheader>首页</Mheader>
    <div class="content">
      <loading v-if="loading">疯狂加载中。。。。。</loading>
      <template v-else>
        <carrousel :swiperSlides = sliders></carrousel>
        <div class="container">
          <h3>热门图书</h3>
          <ul>
            <li v-for="hot in hotBooks">
              <img :src="hot.bookUrl">
              <b>{{hot.bookName}}</b>&nbsp;&nbsp;&nbsp;
              <b class="red">￥{{hot.bookPrice}}</b>
            </li>
          </ul>
        </div>
      </template>


    </div>
  </div>
</template>

<script>
  import Mheader from '../base/Mheader'
  import carrousel from '../base/Swiper'
  import loading from '../base/loading'
  import {getAll} from "../api";
  export default {

        name: "home",
        data(){
          return {
            sliders : [],
            hotBooks : [],
            loading:true
          }
        },
       components:{
         Mheader,
         carrousel,
         loading
       },
       created(){
          this.getData();
      },
    methods:{
      async getData(){
        let [slider,hotBooks] = await getAll();
        this.sliders = slider;
        this.hotBooks = hotBooks;
        //轮播图和热门图书已经获取完成
        this.loading =false;
      },
    }
    }
</script>

<style scoped lang="less">
    .container{
      width: 90%;
      margin: 0 auto;
      h3{
        color: #999;
        padding: 5px 0;
      }
      ul{
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 10px;
        li{
          width: 50%;
          text-align: center;
          margin: 5px 0;
          b{
            font-size: 14px;
            font-weight: normal;
          }
          b.red{
            color: red;
          }
          img{
            width: 100%;
          }
        }
      }
    }

    　.clearfix:before,.clearfix:after {
      content: "";
      display: block;
      clear: both;
    }

</style>
