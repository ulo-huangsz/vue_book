let http = require('http');
let fs = require('fs');
let url = require('url');

let slider = require('./slider');
function read(cb) {  // 用来读取数据
    fs.readFile('./book.json','utf8',function (err,data) {
      if(err || data.length == 0){
        cb([])
      }else {
        cb(JSON.parse(data));
      }
    })
}
function write(data,cb) { //写入内容
  fs.writeFile('./book.json',JSON.stringify(data),cb)
}

let pageSize = 5; //每次显示5个



http.createServer((req,res) =>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By",' 3.2.1');
  if(req.method=="OPTIONS") return res.end();/*让options请求快速返回*/
  let {pathname,query} = url.parse(req.url,true); //把query转化为对象
  if(pathname === '/page'){
    let offset = parseInt(query.offset) || 0; //拿到当前前端传的值
    read(function (books) {
      let result = books.reverse().slice(offset,offset + pageSize); //数据倒叙
      let hasMore = true;
      if(books.length <= offset + pageSize){ //已经显示的数目大于总条数
        hasMore = false ;
      }
      res.setHeader('Content-Type','text/javascript;charset=UTF-8');
      res.end(JSON.stringify({hasMore,books:result}))
    });
    return

  }
  if(pathname === '/slider'){
    res.setHeader('Content-Type','text/javascript;charset=UTF-8');
    return res.end(JSON.stringify(slider));
  }
  if(pathname === '/hot'){
      read(function (books) {
         let hot = books.reverse().slice(0,6);
        res.setHeader('Content-Type','text/javascript;charset=UTF-8');
        setTimeout(()=>{
          res.end(JSON.stringify(hot))
        },500);
      });
    return
  }
  if(pathname === '/book'){
    let id = parseInt(query.id);
    switch (req.method){
      case 'GET':
        // if(typeof id !== 'undefined' && !isNaN(id)){
        if(!isNaN(id)){  //这里有个问题如果路由是字母会显示所有数据
          read(function (books) {
            let book= books.find(item =>item.bookId === id)
            if(!book) book = {};   //如果没找到则是undefined
            res.setHeader('Content-Type','text/javascript;charset=UTF-8');
            res.end(JSON.stringify(book))
          })
        }else {
          read(function (books) {
            res.setHeader('Content-Type','text/javascript;charset=UTF-8');
            res.end(JSON.stringify(books.reverse()))
          });
        }
        break;
      case 'POST':
        let str = '';
        req.on('data',chunk =>{
          str += chunk;
        });
        req.on('end' , ()=>{
          let book = JSON.parse(str);
          read(function (books) {
            book.bookId = books.length? books[books.length-1].bookId + 1 : 1;
            books.push(book);
            write(books,function () {
              res.end(JSON.stringify(book));
            })
          })
        });
        break;
      case 'PUT':
        if(id){
          let str = '';
          req.on('data',chunk =>{
            str += chunk;
          });
          req.on('end',()=>{
            let book = JSON.parse(str); //book要改成什么样子
            read(function (books) {
              books = books.map(item =>{
                if(item.bookId === id){
                  return book
                }
                return  item;  //其他正常返回即可
              });
              write(books,function () {  //将数据写回json中
                res.end(JSON.stringify(book));
              })
            })
          })
        }
        break;
      case 'DELETE':
        read(function (books) {
           books = books.filter(data =>data.bookId !== id);
          write(books,function () {
            res.end(JSON.stringify({})); //删除返回空对象

          })
        });
        break;
    }
    return
  }


  // /**
  //  * 读取一个路径
  //  */
  //     fs.stat('.' + pathname,function (err,stats) {
  //       if(err){
  //         res.statusCode = 404 ;
  //         res.end('NOT FOUND');
  //       }else {
  //         if(stats.isDirectory()){
  //             let p =  require('path').join('.'+ pathname , './index.html');
  //             fs.createReadStream(p).pipe(res);
  //         }else {
  //           fs.createReadStream('.'+ pathname).pipe(res);
  //         }
  //       }
  //     })
}).listen(3000);

