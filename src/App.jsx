import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished , setshowFinished] = useState(false)
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  },[])
  
  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // }, [todos]);

  const toggleFinish = ()=>
  {
    setshowFinished(!showFinished)
  }


  const saveToLocalStorage = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  const handalAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]) // isko agar sirf ek String array bnana hai to
    //setTodos([...todos, todo]);  //ye karna padega abhi ye ek object array hai
    setTodo("")
    saveToLocalStorage()

  }
  const handalChange = (e) => {
    setTodo(e.target.value)
  }
  const handalEdit = (id) => {
    let t = todos.filter(item => item.id === id) // ye ek array return karta hai jisme item.id = id ho
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    }
    )
    setTodos(newTodos)
    saveToLocalStorage()
  }
  const handalDelete = (id) => {

    let index = todos.findIndex(item => {
      return item.id === id
    }
    )
    let newTodos = todos.filter(item => {
      return item.id !== id
    }
    )
    setTodos(newTodos)
    localStorage.setItem("todos", JSON.stringify(newTodos))

  }
  const handalCheckBox = (e) => {
    let id = e.target.name
    console.log(id)
    let index = todos.findIndex(item => {
      return item.id === id
    }
    )
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    console.log(todos)
    saveToLocalStorage()
  }
  return (
    <>
      <Navbar />
      <div className="container mx-auto w-[90%] my-5 p-5 bg-violet-100 min-h-[75vh] rounded-lg">
        <div className="addTodo flex flex-col gap-2">
          <h1 className='text-lg font-bold w-[100%l text-center text-xl'>Add Todo</h1>
          <input onChange={handalChange} value={todo} className=' rounded-lg p-1 text-center w-[80%l' type="text" />
          <button onClick={handalAdd} className='bg-violet-800 mx-2 p-2 py-1 rounded-lg hover:bg-violet-700'>Add </button>
        </div>
        <h2 className='text-lg font-bold'>Your Todo's</h2>
        <div className='flex gap-2'>  <input type="checkbox" onChange={toggleFinish} name="" id="check" />
        <label htmlFor="">Show Finished</label></div>
      
        {todos.length == 0 && <div className='my-3'>No task here</div>}
        <div className="todos ">
          {todos.map(item => {
            //starting me showFinished false hai or sabhi task ke liye isCompleted bhi false hai condition (showFinished || !item.isCompleted) &&
          // ke according jab isCompleted false hoga to condtion true hogi , jab me kisi task ke checkBox pe click karta hu to us task ke 
          //liye isCompleted true ho jata or showFinished || !item.isCompleted) false ho jati hai tab vo vala task nhi dikhta hai
          // jab show Finished  vale checkbox pe click karta hu to (showFinished || !item.isCompleted) always true ho jati hai
          // tab isCompplete true , false dono condition vale task dikh jate hai
           return (showFinished || !item.isCompleted) && <div key={item.id} className="todo w-1/2 flex gap-2 justify-between my-3">
              <div className='flex gap-4'>
                <input type="checkbox" onChange={handalCheckBox} name={item.id} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>

              <div className='btn  flex'>
                <button onClick={() => { handalEdit(item.id) }} className='bg-violet-800 w-full mx-1 p-2 py-1 rounded-lg hover:bg-violet-700'><FaEdit /></button>
                <button onClick={() => { handalDelete(item.id) }} className='bg-violet-800 mx-1 p-2 py-1 rounded-lg hover:bg-violet-700'><MdDelete /></button>
                {/* jab ham function ko parenthisis () lagake likhte hai to react turant es function ko call kar deti 
                es problem ko solve karne ke liye ham us function ko arrow function me likhte jisse ensure ho ki clicked
                event par hi us function ko fire karna hai */} 
              </div>
            </div>
          }
          )}
        </div>

      </div>
    </>
  )
}
export default App