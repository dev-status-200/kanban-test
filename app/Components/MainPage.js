'use client'

import React, { useEffect } from 'react';
import { State } from '../Context/State';
import { useContext } from 'react';
import '../styles/mainpage.css';
import Task from './Task';
import { subTasks } from '../globalFunctions';

const MainPage = () => {

  const { state, setState } = useContext(State);

  const openTask = (task, index) => setState({isOpen:true, task:{...task, index:index}})

  return (
    <div className='main-page'>
      <div className='container'>
        {state.selectedBoard?.columns?.map((column, i)=>{
        return(
          <div key={column.name}>
            <div className='columns'>
              <div className={`dot dot-${i+1}`}></div>
              {column.name} {"("}{column?.tasks?.length}{")"}
            </div>
            {column?.tasks?.map((task, j)=>{
              return(
              <div className='task bg-1' key={j} draggable onClick={()=>openTask(task, j)}>
                <h4 className='f'>{task.title}</h4>
                <p className='grey-txt'>{subTasks(task.subtasks)}</p>
              </div>
            )})}
          </div>
        )})}
        <div className='px-3'></div>
      </div>
      <Task />
    </div>
  );
}

export default React.memo(MainPage);