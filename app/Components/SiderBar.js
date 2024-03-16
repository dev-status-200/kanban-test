import React, { useEffect } from 'react';
import { useContext } from 'react';
import { State } from '../Context/State';
import '../styles/sidebar.css';
import { MenuIcon } from './Icons';
import { useWindowSize } from '../globalFunctions';

const SiderBar = () => {

  const size = useWindowSize()
  const { state, setState } = useContext(State);

  useEffect(()=>{
    let tempState = state.boards.map((x, i)=>{
      return {...x, id:i+1, active:false}
    });
    tempState[0].active = true;
    setState({
      boards:tempState, 
      selectedBoard:tempState[0]
    });
  }, []);

  const toggleBoard = (index, board) => {
    let tempState = state.boards.map((x, i)=>{
      return {...x, id:i+1, active:i==index?true:false}
    });
    setState({
      boards:tempState,
      selectedBoard:board
    });
  }

  return (
    <>
    {((size.width>500 && !state.collapsed) || size.width<500) && 
      <div className='side-bar'>
        <p className='grey-txt px-3 fw-6 mt-3'>ALL BOARDS {"("}{state.boards.length}{")"}</p>
        {state.boards.map((board, index)=>{
          return(
          <div className={board.active?'bar-active':'bar'} key={board.name} onClick={()=>toggleBoard(index, board)}>
            <MenuIcon fill={(board.active)?"white":"grey"} />
            {board.name}
          </div>
          )
        })}
        <div className='create-board'>
          <MenuIcon fill={"#635fc7"} />
          + Create New Board
        </div>
      </div>
    }
    </>
  );
};

export default React.memo(SiderBar);