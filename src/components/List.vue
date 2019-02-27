<template>
  <div>
    <Mheader>列表页</Mheader>
    <div class="content" ref="scroll" @scroll = 'loadMore'>
      <ul>
        <router-link
          v-for="(book,index) in books"
          :key="index"
          :to="{name:'detail',params:{bid:book.bookId}}"
          tag="li"
        >
          <!--<img :src="book.bookUrl">-->
          <!--懒加载图片-->
          <img v-lazy="book.bookUrl">
          <div>
            <h4>{{book.bookName}}</h4>
            <p>{{book.bookInfo}}</p>
            <b>${{book.bookPrice}}</b>
            <button @click.stop="del(book.bookId)">删除</button>
          </div>
        </router-link>
      </ul>
      <div class="more" @click="more">
        加载更多....
      </div>
    </div>
  </div>
</template>

<script>
  import {getBooks,delBook,pagination} from '../api'
  import Mheader from '../base/Mheader'
    export default {
        name: "list",
        data(){
          return {
            books:[],
            offset:0,
            hasMore:true,
            loading:false
          }
        },
      created(){
        this.getData();
      },
      mounted(){
          let scroll = this.$refs.scroll ; //获取到要拖拽的元素
          let top = scroll.offsetTop ;
          let distance = 0;
          scroll.addEventListener('touchstart',(e)=>{
            //滚动条在最顶端的时候 并且当前盒子在顶端的时候 才继续走
            if(scroll.scrollTop !=0 || scroll.offsetTop != top ) return;
               let start = e.touches[0].pageY; //手指点击的开始
               let move = (e) =>{
                 let current = e.touches[0].pageY;
                  distance = current - start; // 求的拉动的距离，负的就不要了
                 if(distance > 0){    //如果大于50了就认为50像素
                    if(distance < 50 ){
                        scroll.style.top = distance + top + 'px';
                    }else {
                      distance = 50;
                      scroll.style.top =  top + 50 +  'px';
                    }
                 }else {
                   //如果不在考虑范围内 移除掉move和end事件
                      scroll.removeEventListener('touchmove',move);
                      scroll.removeEventListener('touchend',end);
                 }
               };
               let end = (e)=>{
                 clearInterval(this.timer1);
                  this.timer1 = setInterval(()=>{  // 一共distance 每次-1
                          if(distance <= 0){
                            clearInterval(this.timer1);
                            distance = 0;
                            scroll.style.top = 40 + 'px';
                            scroll.removeEventListener('touchmove',move);
                            scroll.removeEventListener('touchend',end);
                            this.books = []; //清空数据
                            this.offset = 0;
                            this.getData();
                            return;
                          }
                        distance -= 1;
                        scroll.style.top = top + distance + 'px';
                    },1)
               };
            scroll.addEventListener('touchmove',move);
            scroll.addEventListener('touchend',end);
          },false)
      },
      methods: {
        async getData() {
          if(this.hasMore && !this.loading){ //有更多的数据的时候
            this.loading = true;
            let {hasMore ,books} = await pagination(this.offset);
            this.books = [...this.books,...books];  //每次获取的书拼接到的数组中去
            this.hasMore = hasMore;
            this.loading = false; //加载完毕
            this.offset = this.books.length // 维护偏移量就是书的总数
          }
        },
        loadMore(){
          // 触发scroll事件可能触发N次 先进来开一个定时器，下次触发把上次的定时器清除掉
          clearTimeout(this.timer); // 节流；
          this.timer = setTimeout(() =>{
            //   卷去的盖度 当前可见区域  总高
            let {scrollTop,clientHeight,scrollHeight} = this.$refs.scroll;
                if(scrollTop + clientHeight + 20 > scrollHeight ){
                      this.getData();
                }
          },60);
        },
        more(){
          this.getData();
        },
        async del(id){
         await delBook(id);
          this.books = this.books.filter(item =>item.bookId !== id);
        }
      } ,
      components:{
        Mheader,
      },
    }
</script>

<style scoped lang="less">
  .content ul{
      padding: 10px;
      li{
        display: flex;
        padding: 10px 0;
        border-bottom: 1px solid #f1f1f1;
        img{
          width: 130px;
          height: 150px;
        }
      }
    }
   .content h4{
      font-size: 20px;
      line-height: 35px;
    }
    .content p{
      color: #2a2a2a;
      line-height: 25px;
    }
    .content b{
      color: red;
    }
    .content button{
      display: block;
      width: 60px;
      height: 25px;
      border: none;
      border-radius: 10px;
      background-color: orangered;
       color: #fff;
      outline: none;
     }
  .content .more{
    font-size: 20px;
    line-height: 30px;
    height: 30px;
    margin: 10px;
    background-color: skyblue;
    text-align:center;
  }
</style>
