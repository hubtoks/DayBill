import classNames from 'classnames'
import './index.scss'
import { useMemo } from 'react'

const DailyBill = ({date, billList}) => {

  const dayResult = useMemo(() => {//根据billList，利用useMemo计算支出、收入、总金额
    const pay = billList.filter((item) => item.type === 'pay').reduce((acc, cur) => acc + cur.money, 0)
    const inCome = billList.filter((item) => item.type === 'income').reduce((acc, cur) => acc + cur.money, 0)
    return {
        pay,
        inCome,
        total: pay + inCome
}}, [billList])
  
  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span className={classNames('arrow')}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{dayResult.pay.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{dayResult.inCome.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">{dayResult.total.toFixed(2)}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DailyBill