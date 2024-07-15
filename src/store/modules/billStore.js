import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const billStore = createSlice({  
    name: "bill",
    initialState: {
        billList: [],  //要接收的是个数组
    },
    reducers: {
        setBillList(state, action) {
            state.billList = action.payload;
        },
    },
})
const { setBillList } = billStore.actions;
//异步请求


const fetchBillList = () => {
    return async (dispatch) => {
        const res = await axios.get("http://localhost:3004/ka");
        dispatch(setBillList(res.data));  //用传参的版本将整个数组传入reducer里的action.payload
    }
    
}
export { fetchBillList , setBillList };  //按需导出
const reducer = billStore.reducer;
export default reducer