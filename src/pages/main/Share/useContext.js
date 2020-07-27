import React, {Component, useState, createContext, useContext} from 'react'

const CountContext = createContext();

// Consumer
class Foo extends Component {
  render () {
    return (
      <CountContext.Consumer>
        {
          count => <h1>{count}</h1>
        }
      </CountContext.Consumer>
    )
  }
}

// 只适用于类组件
class Bar extends Component {
  static contextType = CountContext;
  render () {
    const count = this.context;
    return (
      <h1>{ count }</h1>
    )
  }
}

// hooks
function Counter () {
  const count = useContext(CountContext);
  return (
    <h1>{ count }</h1>
  )
}

export default function UseContext() {
  const [count, setCount] = useState(0);
  return (
    <div onClick={() => { setCount(count + 1) }}>
      <button>Count：{ count }</button>
      <CountContext.Provider value={count}>
        <Foo />
        <Bar />
        <Counter />
      </CountContext.Provider>
    </div>
  )
}

