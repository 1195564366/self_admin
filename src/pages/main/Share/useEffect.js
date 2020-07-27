import React, { useState, useEffect } from 'react'

export default function UseEffect() {
  const [count, setCount] = useState(0)
  const [list, setList] = useState([0])
  useEffect(() => {
    console.log('我只在第一次触发')
  }, [])
  useEffect(() => {
    console.log('每次都触发')
  })
  useEffect(() => {
    console.log('count改变才触发')
  },[count])
  useEffect(() => {
    console.log('绑定监听')
    document.getElementById('el').addEventListener('click', fn, false)
    return () => {
      console.log('解除监听')
      document.getElementById('el').removeEventListener('click', fn, false)
    }
  })
  const fn = () => {
    console.log('当前时间', new Date())
  }
  return (
    <div>
      <button onClick={() => {
        setCount(count + 1)
      }}>count：{count}</button>
      <button 
      style={{ margin: '0 30px' }}
      onClick={() => {
        setList([...list, ...[list[list.length - 1] + 1]])
      }}>
        list: {JSON.stringify(list)}
      </button>
      <button id="el">监听</button>
    </div>
  )
}
