import React, {Component, PureComponent, useState, useMemo, useCallback, memo, useRef} from 'react'

// function Counter (props) {
//   console.log('Counter渲染')
//   return (
//     <h1 onClick={ props.onClick }>{ props.count }</h1>
//   )
// }
// const Counter = memo(function Counter (props) {
//   console.log('Counter渲染')
//   return (
//     <h1>{ props.count }</h1>
//   )
// })
class Counter extends PureComponent {
  render() {
    const { props } = this 
    return (
      <h1 onClick={ props.onClick }>{ props.count }</h1>
    )
  }
}

export default function UseMemo() {
  const [count, setCount] = useState(0);
  const [clickCount, setClickCount] = useState(0)
  const CounterRef = useRef()

  const double = useMemo(() => {
    return count * 2
  }, [count === 3]); // 判断条件改变 false =>  ture => false

  // const double = useMemo(() => {
  //   return count * 2
  // }, [count]);

  // const onClick = () => {
  //   console.log('我被点击')
  // }

  // const onClick = useMemo(() => {
  //   return () => {
  //     console.log('我被点击')
  //   }
  // }, [])

  const onClick = useCallback(() => {
    console.log('我被点击')
    setClickCount((clickCount) => clickCount + 1)
    console.log(CounterRef)
  }, [CounterRef])
  
  // useMemo(() => fn) === useCallback(fn)

  const half = useMemo(() => { // UseMemo可以相互依赖，注意不要循环依赖。
    return double / 4
  }, [double])
  return (
    <div onClick={() => { setCount(count + 1) }}>
      <button>Count：{ count }，double：({ double })，half：({ half })</button>
      <Counter ref={CounterRef} count={ double } onClick={ onClick }/>
    </div>
  )
}

