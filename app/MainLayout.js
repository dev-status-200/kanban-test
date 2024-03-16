"use client"
import React,{ useReducer } from 'react';
import { State } from './Context/State';
import { Layout, Modal, ConfigProvider } from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { initialValues, reducerFunction } from './states';
import { useWindowSize } from './globalFunctions';
import MenuBar from './Components/MenuBar';

const { Header, Content, Sider } = Layout;

export const MainLayout = ({children}) => {

  const size = useWindowSize()
  const [state, dispatch] = useReducer(reducerFunction, initialValues);
  const setState = (data) => dispatch({payload:data})

  const toggleBar = () => setState({collapsed:!state.collapsed});

  const toggleCreate = () => {
    setState({
      editingTask:{
        subtasks:[]
      },
      isEdit:true,
      type:'Create',
      isOpen:true
    })
  }

  return (
  <AntdRegistry>
    <div className={state.dark?'dark':'light'}>
      <State.Provider value={{ state, setState }}>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={state.collapsed} trigger={null} collapsedWidth={0} width={size.width<500?0:250}>
            <MenuBar/>
          </Sider>
          <Layout>
            {size.width>=500 && 
            <Header className='header'>
              <p className='f fs-22 fw-5'>Platform Launch</p>
              <button className='purple-btn' onClick={toggleCreate}>+ Add New Task</button>
            </Header>
            }
            {size.width<500 && 
            <Header className='header-mobile'>
              <div className='f fs-22 fw-5' onClick={toggleBar}>
                <img src='assets/logo-mobile.svg' height={18} /> 
                {" "}
                Platform Launch
                {" "}
                <img src='assets/icon-chevron-down.svg' height={12} /> 
              </div>
              <button className='purple-btn-mobile' onClick={toggleCreate}>+ </button>
            </Header>
            }
            <Content>
              <div className='content-container'>
                {children}
              </div>
            </Content>
            {size.width<500 && 
            <ConfigProvider
              theme={{ 
                token:{colorPrimary:'#635fc7', borderRadius:5, colorBgContainer:state.dark?'#2b2c37':'white', colorText:!state.dark?'#2b2c37':'white'},
                components: { 
                  Modal:{ contentBg:state.dark?'#2b2c37':'white' }
                },
              }} 
            >
              <Modal
                open={state.collapsed} 
                onOk={toggleBar} 
                onCancel={toggleBar} 
                footer={[]} 
                closeIcon={false}
              >
                <MenuBar/>
              </Modal>
            </ConfigProvider>
            }
          </Layout>
        </Layout>
        {(state.collapsed && size.width>=500) && 
          <div className='sidebar-show' onClick={toggleBar}>
            <img src='assets/icon-show-sidebar.svg' height={12} />
          </div>
        }
      </State.Provider>
    </div>
  </AntdRegistry>
  );
};