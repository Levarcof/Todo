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
  const [showFinished, setshowFinished] = useState(false)
  
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

  const toggleFinish = () => {
    setshowFinished(!showFinished)
  }

  const saveToLocalStorage = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handalAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLocalStorage()
  }

  const handalChange = (e) => {
    setTodo(e.target.value)
  }

  const handalEdit = (id) => {
    let t = todos.filter(item => item.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLocalStorage()
  }

  const handalDelete = (id) => {
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    localStorage.setItem("todos", JSON.stringify(newTodos))
  }

  const handalCheckBox = (e) => {
    let id = e.target.name
    console.log(id)
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    console.log(todos)
    saveToLocalStorage()
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      <Navbar />
      
      <main className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
        {/* Main Glassmorphism Card */}
        <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl shadow-2xl p-6 md:p-8 space-y-8">
          
          {/* Header Section */}
          <div className="addTodo flex flex-col gap-4">
            <h1 className='text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent'>
              Task Manager
            </h1>
            
            {/* Input & Button Container */}
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <input 
                onChange={handalChange} 
                value={todo} 
                className='flex-1 rounded-xl bg-slate-900/80 border border-slate-700 px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-base' 
                type="text" 
                placeholder="What needs to be done?"
              />
              <button 
                onClick={handalAdd} 
                disabled={todo.trim().length === 0}
                className='bg-indigo-600 font-semibold px-6 py-3 rounded-xl hover:bg-indigo-500 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-indigo-600/20'
              >
                Add Task
              </button>
            </div>
          </div>

          <hr className="border-slate-700/60" />

          {/* Controls & Filter Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className='text-lg md:text-xl font-bold text-slate-300 flex items-center gap-2'>
              Your To-Do List
              <span className="text-xs bg-slate-700/50 text-slate-400 px-2 py-0.5 rounded-full font-normal">
                {todos.length} {todos.length === 1 ? 'task' : 'tasks'}
              </span>
            </h2>
            
            {/* Custom Styled Toggle Switch for Show Finished */}
            <div className='flex items-center gap-3 bg-slate-900/50 border border-slate-700/50 px-4 py-2 rounded-xl self-start sm:self-auto'>  
              <input 
                type="checkbox" 
                onChange={toggleFinish} 
                checked={showFinished}
                id="check" 
                className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-slate-700 focus:ring-indigo-500 focus:ring-offset-slate-800 cursor-pointer"
              />
              <label htmlFor="check" className="text-sm font-medium text-slate-400 cursor-pointer select-none">
                Show Completed
              </label>
            </div>
          </div>
          
          {/* Empty State Presentation */}
          {todos.length === 0 && (
            <div className='flex flex-col items-center justify-center py-12 px-4 rounded-xl border border-dashed border-slate-700/50 bg-slate-900/20 text-center'>
              <p className='text-slate-400 font-medium text-lg'>All caught up!</p>
              <p className='text-slate-500 text-sm mt-1'>No pending or active tasks found.</p>
            </div>
          )}

          {/* Todos List Wrapper */}
          <div className="todos space-y-3">
            {todos.map(item => {
              return (showFinished || !item.isCompleted) && (
                <div 
                  key={item.id} 
                  className={`todo flex items-center justify-between gap-4 p-4 rounded-xl border transition-all duration-200 ${
                    item.isCompleted 
                      ? 'bg-slate-900/30 border-slate-800/80 opacity-60' 
                      : 'bg-slate-900/60 border-slate-700/40 hover:border-indigo-500/30 hover:bg-slate-900/80 shadow-sm'
                  }`}
                >
                  {/* Left Side: Checkbox and Text */}
                  <div className='flex items-start gap-4 flex-1 min-w-0'>
                    <input 
                      type="checkbox" 
                      onChange={handalCheckBox} 
                      name={item.id} 
                      checked={item.isCompleted}
                      className="mt-1 w-4.5 h-4.5 rounded text-indigo-600 bg-slate-800 border-slate-600 focus:ring-indigo-500 focus:ring-offset-slate-900 cursor-pointer"
                    />
                    <div className={`text-base md:text-md leading-relaxed text-slate-200 break-words font-medium pr-2 transition-all ${
                      item.isCompleted ? "line-through text-slate-500 decoration-slate-600 decoration-2" : ""
                    }`}>
                      {item.todo}
                    </div>
                  </div>

                  {/* Right Side: Action Buttons */}
                  <div className='btn flex items-center gap-1.5 shrink-0'>
                    <button 
                      onClick={() => { handalEdit(item.id) }} 
                      title="Edit task"
                      className='text-slate-400 p-2.5 rounded-lg hover:bg-slate-800 hover:text-indigo-400 active:scale-95 transition-all'
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => { handalDelete(item.id) }} 
                      title="Delete task"
                      className='text-slate-400 p-2.5 rounded-lg hover:bg-slate-800 hover:text-rose-400 active:scale-95 transition-all'
                    >
                      <MdDelete className="w-4.5 h-4.5" />
                    </button>
                  </div>

                </div>
              )
            })}
          </div>

        </div>
      </main>
    </div>
  )
}

export default App
