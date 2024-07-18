import classNames from 'classnames'
import './index.scss'
import { useState,useMemo } from 'react'
import { billTypeToName } from '../../../../contents'
import Icon from '../../../../comp/imgComp/index'

const DailyBill = ({ date, billList }) => {

  const dayResult = useMemo(() => {//根据billList，利用useMemo计算支出、收入、总金额
    const pay = billList.filter((item) => item.type === 'pay').reduce((acc, cur) => acc + cur.money, 0)
    const inCome = billList.filter((item) => item.type === 'income').reduce((acc, cur) => acc + cur.money, 0)
    return {
      pay,
      inCome,
      total: pay + inCome
    }
  }, [billList])

  //控制显隐藏
  const [visible, setVisible] = useState(false)


  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span 
          className={`arrow ${visible && 'expand'}`}
          onClick={() => setVisible(!visible)}
          ></span>
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
      {/* 单日内的列表 block*/}
      <div className="billList" style={{display: visible ? 'block' : 'none'}}>    {/*使用内联样式实现控制显隐，其中block是可见，none隐藏  */}
      
        {billList.map(item => {
          return (
            <div className="bill" key={item.id}>
                <Icon type={item.useFor} />
              <div className="detail">
                <div className="billType">{billTypeToName[item.useFor]}</div>
              </div>
              <div className={classNames('money', item.type)}>
                {item.money.toFixed(2)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default DailyBill