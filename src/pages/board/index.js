import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useState,useMemo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import _ from 'lodash'
import DayBill from './comp/DayBill/index'


const Board = () => {
    const [visible, setVisible] = useState(false)
    const { billList } = useSelector((state) => state.bill);

    const [date, setDate] = useState(dayjs(new Date()).format('YYYY | M'))//存储格式化后的日期
    

    const setMonth = (date) => {
        const formatDate = dayjs(date).format('YYYY | M')
        setDate(formatDate)
        setCurrentBillList(filterBillList[formatDate] || []) //根据所选年月过滤信息，并存入currentBillList
    }

    const filterBillList = useMemo(() => {  //useMemo对数据进行二次处理，return需要的结果（经过lodash中groupBy与处理后的数据）
        return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY | M'))//将数据按照yyyy|m进行分组
    }, [billList])

    const [currentBillList, setCurrentBillList] = useState(filterBillList[date] || [])//用于存储当前月份的账单信息
    
    const monthResult = useMemo(() => {//根据currentBillList，利用useMemo计算支出、收入、总金额
        const pay = currentBillList.filter((item) => item.type === 'pay').reduce((acc, cur) => acc + cur.money, 0)
        const inCome = currentBillList.filter((item) => item.type === 'income').reduce((acc, cur) => acc + cur.money, 0)
        return {
            pay,
            inCome,
            total: pay + inCome
    }}, [currentBillList])

    useEffect(() => {
        setCurrentBillList(filterBillList[date] || [])
    },[filterBillList, date])

    //当前月的账单按日分组，并取出Key用于渲染列表（一个日期key有多个账单，不能用于列表渲染）
    const DayiyList = useMemo(() => { 
        const groupData = _.groupBy(currentBillList, (item) => dayjs(item.date).format('YYYY-MM-DD'))
        const keys = Object.keys(groupData)
        return {
            groupData,
            keys
        }
    }, [currentBillList])
   

    return (
        <div className="monthContainer">
            <NavBar className="nav" backArrow={false}>
                月度收支
            </NavBar>
            <div className="content">
                <div className="header">
                    {/* 时间切换区域 */}
                    <div className="date" onClick={() => setVisible(true)}>
                        <span className="text">
                            {date}月账单
                        </span>
                        <span className={`arrow ${visible && 'expand'}`}></span>
                    </div>
                    {/* 统计区域 */}
                    <div className='twoLineOverview'>
                        <div className="item">
                            <span className="money">{monthResult.pay.toFixed(2)}</span>
                            <span className="type">支出</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthResult.inCome.toFixed(2)}</span>
                            <span className="type">收入</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthResult.total.toFixed(2)}</span>
                            <span className="type">结余</span>
                        </div>
                    </div>
                    {/* 时间选择器 */}
                    <DatePicker
                        className="kaDate"
                        title="记账日期"
                        precision="month"
                        visible={visible}
                        onClose={() => setVisible(false)}
                        onConfirm={(date) =>setMonth(date)}
                        max={new Date()}
                    />
                </div>

                {DayiyList.keys.map(key => {
                    return <DayBill key={key} date={key} billList={DayiyList.groupData[key]} />
                })}
            </div>

        </div >
    )
}

export default Board