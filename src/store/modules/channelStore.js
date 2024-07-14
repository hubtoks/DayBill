import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const channelStore = createSlice({  
    name: "channel",
    initialState: {
        channelList: [],  //要接收的是个数组
    },
    reducers: {
        setChannelList(state, action) {
            state.channelList = action.payload;
        },
        // setCurrentChannel(state, action) {
        //     state.currentChannel = action.payload;
        // },
    },
})

//异步请求
const { setChannelList } = channelStore.actions;

const fetchChannelList = () => {
    return async (dispatch) => {
        const res = await axios.get("https://geek.itheima.net/v1_0/channels");
        dispatch(setChannelList(res.data.data.channels));  //用传参的版本将整个数组传入reducer里的action.payload
    }
    
}
export { fetchChannelList };  //按需导出
const reducer = channelStore.reducer;
export default reducer