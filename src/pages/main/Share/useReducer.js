import React, { useReducer } from 'react';
function UseReducer() {
  const [ count , dispatch ] = useReducer((state, action)=>{
      switch(action.type){
        case 'add':
          return state + 1
        case 'reduce':
          return state - 1
        default:
          return state
      }
  }, 0)
  return (
    <div>
      <h2>现在的分数是{count}</h2>
      <button onClick={()=>dispatch({type: 'add'})}>加</button>
      <button onClick={()=>dispatch({type: 'reduce'})}>减</button>
    </div>
  )
}
export default UseReducer