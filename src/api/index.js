import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

axios.interceptors.response.use( res =>{
    return res.data;
   //在这里统一拦截结果 把结果处理成res.data
});
//获取轮播图
export let getSliders = () =>{   // 返回一个promise对象
  return axios.get('/slider')
};
//获取热门图书
export let getHotBook = () =>{   // 返回一个promise对象
  return axios.get('/hot')
};
//获取全部图书
export let getBooks = () =>{   // 返回一个promise对象
  return axios.get('/book')
};
//删除某一本图书
export let delBook = (id) =>{   // 返回一个promise对象
  return axios.delete(`/book?id=${id}`)
};
//获取某一本图书
export let findOneBook = (id) =>{   // 返回一个promise对象
  return axios.get(`/book?id=${id}`)
};

/**
 * 修改某一本图书
 * @param id
 * @param data 数据，请求头发送
 * @returns {AxiosPromise<any>}
 */
export let updateBook = (id,data) =>{   // 返回一个promise对象
  return axios.put(`/book?id=${id}`,data)
};
/**
 * 添加一本书
 * @param data
 * @returns {AxiosPromise<any>}
 */
export let addBook = (data) =>{   // 返回一个promise对象
  return axios.post('/book',data)
};

export let getAll = ()=>{
  return axios.all([getSliders(),getHotBook()])  //多个请求
};

//根据偏移量返回对应数据
export let pagination = (offset)=>{
  return axios.get(`/page?offset=${offset}`)
};
