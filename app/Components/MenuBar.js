import React, { useContext } from 'react';
import { State } from '../Context/State';
import SiderBar from './SiderBar';
import { ConfigProvider, Switch } from 'antd';
import { useWindowSize } from '../globalFunctions';

const MenuBar = () => {
    
    const size = useWindowSize()
    const { state, setState } = useContext(State);
    const toggleTheme = () => setState({dark:!state.dark});
    const toggleBar = () => setState({collapsed:!state.collapsed});

  return (
    <div className={state.dark?'dark':'light'}>
    <div className={`sidebar-container${size.width>500?'':'-mobile'}`}>
        <div>
        <div className='logo'>
            <img src={state.dark?'assets/logo-light.svg':'assets/logo-dark.svg'} height={25} />
        </div>
        <SiderBar/>
        </div>
        <div className='sidebar-footer'>
            
        <div className='theme-container' onClick={toggleTheme}>
            <img src='assets/sun-icon.svg' height={15} />
            <ConfigProvider 
                theme={{ 
                    token:{colorPrimary:'#635fc7'} 
                }} 
            >
            <Switch checked={state.dark} size='small'  />
            </ConfigProvider>
            <img src='assets/moon-icon.svg' height={15} />
        </div>
        
        <div className='align-container' onClick={toggleBar}>
            <img src='assets/icon-hide-sidebar.svg' height={size.width<500?22:15} />
            <b className='grey-txt'>Hide Sidebar</b>
        </div>
        </div>
    </div>
    </div>
  );
}

export default React.memo(MenuBar);