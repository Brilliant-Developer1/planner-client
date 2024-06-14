'use client';

import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import Button from '@/app/components/Button';
import { Edit2, Plus, Trash2 } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import toast, { Toaster } from 'react-hot-toast';


const TaskManagement = () => {
    const { user } = useAuth(); // Get user info
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDeadline, setTaskDeadline] = useState('');
    const [taskPriority, setTaskPriority] = useState('Low');
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTaskStatus, setEditTaskStatus] = useState(null);
    const [tasks, setTasks] = useState({
      todo: [],
      ongoing: [],
      completed: [],
    });
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      if (user) {
        fetchTasks();
      }
    }, [user]);
  
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:6173/tasks', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        const organizedTasks = {
          todo: data.filter(task => task.status === 'todo'),
          ongoing: data.filter(task => task.status === 'ongoing'),
          completed: data.filter(task => task.status === 'completed'),
        };
        setTasks(organizedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
      setLoading(false);
    };
  
    const handleAddTask = async () => {
      if (taskTitle.trim() === '') return;
  
      const newTask = {
        title: taskTitle,
        description: taskDescription,
        deadline: taskDeadline,
        priority: taskPriority,
        status: 'todo',
        email: user.email,
      };
  
      try {
        const response = await fetch('http://localhost:6173/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(newTask),
        });
  
        if (response.ok) {
          const savedTask = await response.json();
          setTasks((prev) => ({
            ...prev,
            todo: [...prev.todo, savedTask],
          }));
        } else {
          console.error('Error saving task:', await response.json());
        }
      } catch (error) {
        console.error('Error saving task:', error);
      }
  
      setTaskTitle('');
      setTaskDescription('');
      setTaskDeadline('');
      setTaskPriority('Low');
      document.getElementById('task_modal').close();
    };
  
    const handleEditTask = async () => {
        if (taskTitle.trim() === '') return;
      
        try {
          const response = await fetch(`http://localhost:6173/tasks/${editTaskId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
              title: taskTitle,
              description: taskDescription,
              deadline: taskDeadline,
              priority: taskPriority,
              status: editTaskStatus,
            }),
          });
      
          if (response.ok) {
            toast.success('Successfully Updated!')
            const updatedTask = await response.json();
            setTasks((prev) => {
              const updatedTasks = { ...prev };
              const list = updatedTasks[updatedTask.status];
              const index = list.findIndex(task => task._id === updatedTask._id);
              if (index > -1) {
                list[index] = updatedTask;
              } else {
                list.push(updatedTask);
              }
              return updatedTasks;
            });
          } else {
            console.error('Error updating task:', await response.json());
          }
        } catch (error) {
          console.error('Error updating task:', error);
        }
      
        setTaskTitle('');
        setTaskDescription('');
        setTaskDeadline('');
        setTaskPriority('Low');
        setEditTaskId(null);
        setEditTaskStatus(null); // Reset the status
        document.getElementById('task_modal').close();
      };
  
      const handleOpenEditModal = (task) => {
        setTaskTitle(task.title);
        setTaskDescription(task.description);
        setTaskDeadline(task.deadline);
        setTaskPriority(task.priority);
        setEditTaskId(task._id);
        setEditTaskStatus(task.status);
        document.getElementById('task_modal').showModal();
      };
  
    const handleDragEnd = (result) => {
      const { destination, source } = result;
  
      if (!destination) return;
  
      if (destination.droppableId === source.droppableId && destination.index === source.index) {
        return;
      }
  
      const sourceList = [...tasks[source.droppableId]];
      const [movedTask] = sourceList.splice(source.index, 1);
      movedTask.status = destination.droppableId; // Update the status
  
      if (source.droppableId === destination.droppableId) {
        sourceList.splice(destination.index, 0, movedTask);
        setTasks((prev) => ({
          ...prev,
          [source.droppableId]: sourceList,
        }));
      } else {
        const destinationList = [...tasks[destination.droppableId]];
        destinationList.splice(destination.index, 0, movedTask);
        setTasks((prev) => ({
          ...prev,
          [source.droppableId]: sourceList,
          [destination.droppableId]: destinationList,
        }));
  
        // Update the task status in the backend
        updateTaskStatus(movedTask._id, movedTask.status);
      }
    };
  
    const updateTaskStatus = async (taskId, status) => {
      try {
        await fetch(`http://localhost:6173/tasks/${taskId}/status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ status }),
        });
      } catch (error) {
        console.error('Error updating task status:', error);
      }
    };
  
    const handleDeleteTask = async (taskId, status) => {
      try {
        const response = await fetch(`http://localhost:6173/tasks/${taskId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        if (response.ok) {
          toast.success('Successfully Deleted!')
          setTasks((prev) => ({
            ...prev,
            [status]: prev[status].filter(task => task._id !== taskId),
          }));
        } else {
          console.error('Error deleting task:', await response.json());
        }
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    };

  return (
    <div className="container mx-auto mt-12 p-6">
      <h2 className="text-4xl font-bold text-center mb-8 text-primary">Tasks</h2>
      <div className='flex justify-end'>
        <Button icon={Plus} className="mb-6" onClick={() => {
          setEditTaskId(null);
          setTaskTitle('');
          setTaskDescription('');
          setTaskDeadline('');
          setTaskPriority('Low');
          document.getElementById('task_modal').showModal();
        }}>
          Create Task
        </Button>
      </div>
      <dialog id="task_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">{editTaskId ? 'Edit Task' : 'Create a New Task'}</h3>
          <div className="w-full max-w-md">
            <input
              type="text"
              placeholder="Task Title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="input input-bordered border-primary focus:border-primary focus:outline-none w-full mb-2"
            />
            <textarea
              placeholder="Task Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="textarea textarea-bordered border-primary focus:border-primary focus:outline-none w-full mb-2"
            />
            <input
              type="date"
              placeholder="Deadline"
              value={taskDeadline}
              onChange={(e) => setTaskDeadline(e.target.value)}
              className="input input-bordered border-primary focus:border-primary focus:outline-none w-full mb-2 text-gray-400"
            />
            <select
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value)}
              className="select select-bordered border-primary focus:border-primary focus:outline-none w-full mb-2 text-gray-400"
            >
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
            </select>
            <Button onClick={editTaskId ? handleEditTask : handleAddTask} className="w-full" icon={Plus}>
              {editTaskId ? 'Update Task' : 'Create Task'}
            </Button>
          </div>
          <div className="modal-action">
            <Button className="" onClick={() => document.getElementById('task_modal').close()}>Close</Button>
          </div>
        </div>
      </dialog>
      {
        loading ? (
          <div className='flex justify-center '><span className="loading loading-ring loading-lg "></span></div>
        ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {['todo', 'ongoing', 'completed'].map(status => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="p-4 bg-gray-100 rounded-lg shadow min-h-96"
                >
                  <h3 className="text-2xl font-semibold mb-4 text-gray-500">{status.charAt(0).toUpperCase() + status.slice(1)}</h3>
                  {tasks[status].map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="p-4 mb-2 bg-white rounded-lg shadow"
                        >
                          <div className="flex flex-col ">
                            <div>
                              <h4 className="font-bold text-primary">{task.title}</h4>
                              <p>{task.description}</p>
                              <p className="text-sm text-gray-500">Deadline: {task.deadline}</p>
                              <p className="text-sm text-gray-500">Priority: {task.priority}</p>
                            </div>
                            <div className="flex justify-end ">
                              <Button
                                className="border-none"
                                onClick={() => handleOpenEditModal(task)}
                                icon={Edit2}
                              />
                              <Button
                                className="border-none btn-error"
                                onClick={() => handleDeleteTask(task._id, status)}
                                icon={Trash2}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
        </DragDropContext>
        )
      }
       <Toaster />
    </div>
  );
};

export default TaskManagement;