import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./modules/counterStore";
import channelReducer from "./modules/channelStore";
import billReducer from "./modules/billStore";

const store = configureStore({   //组合子模块store到根store统一导出
    reducer: {
        counter: counterReducer,
        channel: channelReducer,
        bill: billReducer
    }

})

export default store;