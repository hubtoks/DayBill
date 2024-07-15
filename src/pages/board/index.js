import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'


const Board = () => {
    const [visible, setVisible] = useState(false)
    const { billList } = useSelector((state) => state.bill);
    const [date, setDate] = useState(dayjs(new Date()).format('YYYY | M'))

    const setMonth = (date) => {
        const formatDate = dayjs(date).format('YYYY | M')
        setDate(formatDate)
    }

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
                            <span className="money">{100}</span>
                            <span className="type">支出</span>
                        </div>
                        <div className="item">
                            <span className="money">{200}</span>
                            <span className="type">收入</span>
                        </div>
                        <div className="item">
                            <span className="money">{200}</span>
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
                {/* 账单列表 */}
                <div className="billList">
                    {billList.map((item) => (
                        <div className="item" key={item.id}>
                            <span className="money">{item.money}</span>
                            <span className="date">{item.date}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div >
    )
}

export default Board