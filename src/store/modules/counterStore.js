import { createSlice } from "@reduxjs/toolkit";

const counterStore = createSlice({
    name: "counter", //名字
    initialState: { count: 0 },//数据默认值
     reducers: {  //方法
          increment(state) {
               state.count++;
          },
          decrement(state) {
               state.count--;
          },
           incrementByValue(state, action) { //可接受参数版本，action.payload是传过来的参数
               state.count += action.payload;
          }
     },
})

const { increment, decrement, incrementByValue } = counterStore.actions;//解构出写的方法
const reducer = counterStore.reducer;//解构出reducer
export {increment, decrement,incrementByValue};
export default reducer;//导出reducer