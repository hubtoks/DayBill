import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '../../comp/imgComp/index'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '../../utils/index'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBillList } from '../../store/modules/billStore'

const New = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [billType, setBillType] = useState('pay')  //pay和income要与数据对应
  const [money, setMoney] = useState('0')
  const [useFor, setUseFor] = useState('')


  const saveBill = () => {
      const data = {
        type:billType,
        money:billType==='pay' ? -money : +money,
        date:new Date(),
        useFor:useFor
      }
      dispatch(addBillList(data))  //store里写方法，写异步，组件里用dispatch调用异步，异步调用方法
  }

  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(billType==='pay'?'selected':'')}
            onClick={() => setBillType('pay')}
          >
            支出
          </Button>
          <Button
            shape="rounded"
            className={classNames(billType==='income'?'selected':'')}
            onClick={() => setBillType('income')}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text">{'今天'}</span>
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={(value) => setMoney(value)}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[billType].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div
                      className={classNames(
                        'item',
                        ''
                      )}
                      key={item.type}
                      onClick={() => setUseFor(item.type)}

                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={saveBill}>
          保 存
        </Button>
      </div>
    </div>
  )
}

export default New