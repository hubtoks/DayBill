
const Icon = ({type}) => {
    return (
        //根据type请求不同的图标
      <img
        src={`https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/reactbase/ka/${type}.svg`}  
        alt="icon"
        style={{
          width: 20,
          height: 20,
        }}
        />
    )
  }
  
  export default Icon