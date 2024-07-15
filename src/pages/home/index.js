import { Link, Outlet,useNavigate } from "react-router-dom"; //引入Link和Outlet
import { fetchBillList } from "../../store/modules/billStore";
import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";

import { TabBar } from "antd-mobile"
import {
    BillOutline,
    CalculatorOutline,
    AddCircleOutline
} from 'antd-mobile-icons'
import './index.scss'


const tabs = [
    {
        key: '/',
        title: '月度账单',
        icon: <BillOutline />,
    },
    {
        key: '/new',
        title: '记账',
        icon: <AddCircleOutline />,
    },
    {
        key: '/about',
        title: '年度账单',
        icon: <CalculatorOutline />,
    },
]

const Home = () => {
    const dispatch = useDispatch();
    const { billList } = useSelector((state) => state.bill);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchBillList());
    }, [dispatch]);

    const SwichTab = (path) => {
        navigate(path);
    }


    return (
        <div className="layout">
            <div className="container">
                <Outlet />
            </div>
            <div className="footer">
                <TabBar onChange={SwichTab}>
                    {tabs.map(item => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                    ))}
                </TabBar>
            </div>
        </div>
    )
}


export default Home; 