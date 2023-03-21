import React , { useState, useRef} from 'react'
import TodoTable from './TodoTable';


export default function Todolist() {
   const [todo, setTodo] = useState({ description: '', date: '', priority: ''});
   const [todos, setTodos] = useState([])
   const gridRef = useRef()

   const handleAddTodo = () => {
      setTodos([todo, ...todos]);
      setTodo({ description: '', date: '', priority: ''});
   }

   const deleteTodo = (event) => {
      event.preventDefault()
      if(gridRef.current.getSelectedNodes().length > 0) {
         setTodos(todos.filter((todo, index) => 
            index != gridRef.current.getSelectedNodes()[0].id))
      }
      else {
         alert('Please select a row first')
      }   
   }

   return(
      <React.Fragment>
        <h1>My To-Do-List</h1>
        <input 
          placeholder='Description'
          value={todo.description}
          onChange={e => setTodo({...todo, description: e.target.value})} 
        />
        <input 
          type='date'
          placeholder='Date'
          value={todo.date}
          onChange={e => setTodo({...todo, date: e.target.value})} 
        />
        <input 
          placeholder='Priority'
          value={todo.priority}
          onChange={e => setTodo({...todo, priority: e.target.value})} 
        />
         <button onClick={handleAddTodo}>Add</button>
         <button onClick={deleteTodo}>Delete</button>
         <TodoTable todos={todos} deleteTodo={deleteTodo} gridRef={gridRef}/>
         

      </React.Fragment>
   )
}

