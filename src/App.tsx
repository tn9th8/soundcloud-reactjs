import { useState } from 'react';
import './App.css';
import reactLogo from './assets/react.svg';
import InputTodo from './todo/input.todo';
import viteLogo from '/vite.svg';

function App() {
  const name = "Pham Bach Chien";
  const password = 123456;
  const meta = {
    gender: 'male',
    address: 'Tan Binh'
  }

  const initList: string[] = [];

  const [count, setCount] = useState(0);
  const [todoList, setTodoList] = useState(initList);

  const handlePush = (item: string) => {
    if (item.trim() === "") return;

    setCount(count + 1);
    setTodoList([...todoList, item]);
  }

  return (
    <>
      <InputTodo name={name} password={password} meta={meta} handlePush={handlePush} /> <br />

      <h2>number of tasks: {count}</h2>
      <ul>
        {todoList.map((item, index) => {
          //fixing key affects to the performance
          return (<li key={index.toString()}>{item}</li>)
        })}
      </ul>

      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
