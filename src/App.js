import './App.css';
import React, { useReducer, useState } from 'react'

const reduce = (state, action) => {
  switch (action['type']) {
    case "inp1":
      return {
        ...state,
        inputA: action['payload']
      }
    case "inp2":
      return {
        ...state,
        inputB: action['payload']
      }
    default:
      return state;
  }
}

let isReaded = { read: false }, isTrue = { check: false }
function App() {
  const [state, dispatch] = useReducer(reduce, { inputA: "", inputB: "" })
  const [empArray, setArray] = useState([])
  const [listAdded, setListAdded] = useState(0)
  const [readCount, setReadCount] = useState(0)
  const [totalItem, setTotalItem] = useState([])

  const handleClick = () => {
    setArray([...empArray, { state }])
    isTrue['check'] = true;
    setListAdded(listAdded + 1)
  }

  const handleDelete = (index) => {
    const store = empArray.filter((value) => empArray.indexOf(value) !== index)
    setArray(store)
    setListAdded(listAdded - 1)
  }

  const handleReadButton = (arr, index) => {
    let store = arr[index]
    setTotalItem([...totalItem, { store }])
    isReaded['read'] = true
    setReadCount(readCount + 1)
    const another = empArray.filter((value) => empArray.indexOf(value) !== index)
    setArray(another)
    setListAdded(listAdded - 1)
  }

  return (
    <div className="App">
      <div className='divA'>
        <div>
          <h3 className='title'>booklist app</h3>
        </div>
        <div className='divB'>
          <h3>title</h3>
          <h3>author</h3>
        </div>
      </div>
      <p className='lineLabel'></p>
      <div>
        <h2 className='headA'>bookList application</h2>
        <h3 className='countLib'>listAdded : {listAdded} readCount : {readCount}</h3>
        <form className='form'>
          <label>Title</label>
          <input type='text' className='inputBox' onInput={(event) => dispatch({ type: "inp1", payload: event.target.value })} placeholder='what is the task today ?' value={state['inputA']} />
          <label>Author</label>
          <input type='text' className='inputBox' onInput={(event) => dispatch({ type: "inp2", payload: event.target.value })} placeholder='mention name' value={state['inputB']} />
          <input type='button' value="Add" className='submitBtn' onClick={() => handleClick()} />
        </form>
      </div>
      <div className='outBorder'>
        <div className='bor' >
          <h2 className='readA'>Unreaded part</h2>
          {
            (isTrue['check']) ? (empArray.map((value) => {
              return (
                <div className='oper'>
                  <div className='innerDivA'>
                    <h1>{value['state']['inputA']}</h1>
                    <p>{value['state']['inputB']}</p>
                  </div>
                  <div className='buttons'>
                    <button onClick={() => handleDelete(empArray.indexOf(value))} className='exitBtn'>x</button>
                    <button className='readLabel' onClick={() => handleReadButton(empArray, empArray.indexOf(value))} >read</button>
                  </div>
                </div>
              )
            }))
              : <p></p>
          }
        </div>
        <div className='readDiv'>
          <h2 className='readA'>Readed part</h2>
          {
            (isReaded['read']) ? (totalItem.map((value) => {
              return (
                <div className='bottomLabelA'>
                  <p>Title : {value['store']['state']['inputA']}</p>
                  <p>Author : {value['store']['state']['inputB']}</p>
                </div>
              )
            })) : <p></p>
          }
        </div>
      </div>
    </div>
  );
}

export default App;