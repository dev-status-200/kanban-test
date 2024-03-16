import React, { useEffect, useState } from 'react';

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

export const subTasks = (subTasks) => {
  let complete = 0;
  if(subTasks?.length>0){
    subTasks.forEach((x)=>{
      x.isCompleted?
      complete = complete + 1:
      null;
    })
  }
  return `${complete} of ${subTasks?.length} completed`
}