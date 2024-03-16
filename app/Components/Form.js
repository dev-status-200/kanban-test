import React from 'react';
import { State } from '../Context/State';
import { useContext } from 'react';
import { CloseOutlined } from "@ant-design/icons"
import { Checkbox, Select, Popover, Input, Space } from 'antd';
import { subTasks } from '../globalFunctions';

const Form = () => {

    const { state, setState } = useContext(State);

    const columnChange = (e) => {
        let tempBoard = { ...state.selectedBoard };
        let columnIndex = tempBoard.columns.map(x => x.name).indexOf(state.task.status);
        columnIndex < 0 ?
            columnIndex = 0 :
            null;
        const newColumn = tempBoard.columns.map(x => x.name).indexOf(e);
        const boardIndex = state.boards.map(x => x.name).indexOf(tempBoard.name);

        const tempTasks = tempBoard.columns[columnIndex].tasks.filter((x) => {
            return x.title != state.task.title
        })
        tempBoard.columns[columnIndex].tasks = tempTasks;
        tempBoard.columns[newColumn].tasks.unshift({ ...state.task, status: e });

        let boards = [...state.boards];
        boards[boardIndex] = { ...tempBoard, active: true }

        setState({
            selectedBoard: tempBoard,
            task: { ...state.task, status: e },
            boards: boards
        })

    }

    const handleChange = (variable, e) => {
        let editingTask = { ...state.editingTask };
        editingTask[variable] = e
        setState({
            editingTask: editingTask
        })
    };

    const handeleSubChange = (index, e) => {
        let editingTask = { ...state.editingTask };
        editingTask.subtasks[index].title = e
        setState({
            editingTask: editingTask
        })
    }

    const append = (index, e) => {
        let editingTask = { ...state.editingTask };
        editingTask.subtasks.push({ title: '', isCompleted: false })
        setState({
            editingTask: editingTask
        })
    }

    const remove = (index) => {
        let editingTask = { ...state.editingTask };
        let subTasks = editingTask.subtasks.filter((x, i) => {
            return i != index
        });
        editingTask.subtasks = subTasks
        setState({
            editingTask: editingTask
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let tempBoard = { ...state.selectedBoard };
        let columnIndex
        columnIndex = tempBoard.columns.map(x => x.name).indexOf(state.editingTask.status);
        if (state.type == 'Edit') {
            tempBoard.columns[columnIndex].tasks[state.task.index] = state.editingTask;
        } else {
            tempBoard.columns[columnIndex].tasks.push(state.editingTask);
        }

        setState({
            selectedBoard: tempBoard,
            isEdit: false,
            isOpen: false
        })
    }

    const deleteTask = () => {
        let tempBoard = { ...state.selectedBoard };
        let columnIndex = tempBoard.columns.map(x => x.name).indexOf(state.task.status);
        columnIndex < 0 ?
            columnIndex = 0 :
            null;
        const taskIndex = tempBoard.columns[columnIndex].tasks.map(x => x.title).indexOf(state.task.title);
        const boardIndex = state.boards.map(x => x.name).indexOf(tempBoard.name);

        let tasks = tempBoard.columns[columnIndex].tasks.filter((x) => {
            return x.title != state.task.title
        });
        tempBoard.columns[columnIndex].tasks = tasks;

        let boards = [...state.boards];
        boards[boardIndex] = { ...tempBoard, active: true }

        setState({
            boards: boards,
            selectedBoard: tempBoard,
            isOpen: false
        })
    }

    const toggleStatus = (subIndex) => {

        let tempBoard = { ...state.selectedBoard };
        const columnIndex = tempBoard.columns.map(x => x.name).indexOf(state.task.status);
        const taskIndex = tempBoard.columns[columnIndex].tasks.map(x => x.title).indexOf(state.task.title);
        const boardIndex = state.boards.map(x => x.name).indexOf(tempBoard.name);

        let status = tempBoard.columns[columnIndex].tasks[taskIndex].subtasks[subIndex].isCompleted
        tempBoard.columns[columnIndex].tasks[taskIndex].subtasks[subIndex].isCompleted = !status;
        let boards = [...state.boards];
        boards[boardIndex] = { ...tempBoard, active: true }

        setState({
            selectedBoard: tempBoard,
            boards: boards
        })
    };

    const toggleEdit = () => {
        setState({
            editingTask: state.task,
            isEdit: true,
            type: 'Edit'
        })
    }

    const content = (
        <div>
            <b className='grey-txt pointer' onClick={toggleEdit}>Edit</b>
            <br />
            <b className='red-txt pointer' onClick={deleteTask}>Delete</b>
        </div>
    )

    return (
    <>
        {!state.isEdit && <>
            <div className='title'>
                <h3 className='f'>{state.task.title}</h3>
                <Popover placement="bottomRight" content={content}>
                    <img src='assets/icon-vertical-ellipsis.svg' height={20} />
                </Popover>
            </div>
            <p className='grey-txt py-2'>
                {state.task.description || 'No Description added'}
            </p>
            <p className='f2'>
                <b>{subTasks(state?.task?.subtasks)}</b>
            </p>
            {state?.task?.subtasks?.map((subTask, index) => {
                return (
                    <div key={subTask.title} className='task bg-2' onClick={() => toggleStatus(index)}>
                        <Checkbox checked={subTask.isCompleted} />
                        <b>
                            {!subTask.isCompleted && <div className='f'>{subTask.title}</div>}
                            {subTask.isCompleted && <div className='strike'><span className='grey-txt'>{subTask.title}</span></div>}
                        </b>
                    </div>
                )
            })}
            <p className='f mt-2'><b>Current Status</b></p>
            <Select
                style={{ width: '100%' }}
                placeholder="Tags Mode"
                onChange={columnChange}
                value={state.task.status}
                options={state?.selectedBoard?.columns?.map((x) => { return { label: x.name, value: x.name } })}
                optionRender={(option) => (
                    <Space>
                        <div role="img" aria-label={option.value}
                            style={{ color: 'black' }}
                        >
                            {option.label}
                        </div>
                    </Space>
                )}
            />
        </>}
        {state.isEdit && <>
            <h2 className='f'>{state.type == 'Edit' ? 'Edit A Task' : 'Create A Task'}</h2>
            <form className='mt-2' onSubmit={handleSubmit}>
                <div className='f'>Title</div>
                <Input value={state.editingTask.title} onChange={(e) => handleChange('title', e.target.value)} placeholder='Task Title' required />
                <div className='f mt-2'>Description</div>
                <Input.TextArea value={state.editingTask.description} onChange={(e) => handleChange('description', e.target.value)} rows={3} placeholder='Task Description' />
                <div className='f mt-2'>Subtasks</div>
                {state?.editingTask?.subtasks?.map((x, i) => {
                    return (
                        <div key={i} className='mt-1 subtasks'>
                            <Input value={x.title} onChange={(e) => handeleSubChange(i, e.target.value)} placeholder='e.g. Drink coffee & smile' required />
                            <div>
                                <CloseOutlined className='red-txt' onClick={() => remove(i)} />
                            </div>
                        </div>
                    )
                })}
                <button className='purple-btn-2 mt-2 w-100' type="button" onClick={append}>+ Add a new Sub Task</button>
                <div className='f mt-2'>Status</div>
                <Select
                    style={{ width: '100%' }}
                    placeholder="Tags Mode"
                    onChange={(e) => handleChange('status', e)}
                    value={state.editingTask.status}
                    options={state?.selectedBoard?.columns?.map((x) => { return { label: x.name, value: x.name } })}
                    optionRender={(option) => (
                        <Space>
                            <div role="img" aria-label={option.value}
                                style={{ color: 'black' }}
                            >
                                {option.label}
                            </div>
                        </Space>
                    )}
                />
                <button className='purple-btn-3 mt-2 w-100' type="submit">{state.type == 'Edit' ? 'Update' : 'Create'} Task</button>
            </form>
        </>}
    </>
    );
}

export default React.memo(Form);