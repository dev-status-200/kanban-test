import React from 'react';
import { State } from '../Context/State';
import { useContext } from 'react';
import { Modal, ConfigProvider, Checkbox, Select, Popover, Input, Space } from 'antd';
import '../styles/task.css';
import Form from './Form';

const Task = ({}) => {

  const { state, setState } = useContext(State);

  const handleCancel = () => setState({isOpen:false, isEdit:false});

  const handleOk = () => { }


  return (
    <ConfigProvider 
      theme={{ 
        token:{colorPrimary:'#635fc7', borderRadius:5, colorBgContainer:state.dark?'#2b2c37':'white', colorText:!state.dark?'#2b2c37':'white'},
        components: { 
          Modal:{ contentBg:state.dark?'#2b2c37':'white' },
          Input:{ contentBg:'black', colorTextPlaceholder:'grey' },
          Select:{ colorTextPlaceholder:'grey' }
        },
      }} 
    >
      <Modal 
        centered
        open={state.isOpen} 
        onOk={handleOk} 
        onCancel={handleCancel} 
        footer={[]}
        width={480}
        closeIcon={false}
      >
        <div className={`${state.dark?'dark':'light'} task-styles`}>
          <Form/>
        </div>
      </Modal>
    </ConfigProvider>
  );
}

export default React.memo(Task);