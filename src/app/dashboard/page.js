"use client";
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/app/components/Button';
import { Plus } from 'lucide-react';
import useAuth from '@/hooks/useAuth';

const DashboardPage = () => {
  const { user } = useAuth(); // Get user info
  const { register, handleSubmit, reset } = useForm();
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

  const handleAddTask = async (data) => {
    const newTask = {
      title: data.taskTitle,
      description: data.taskDescription,
      deadline: data.taskDeadline,
      priority: data.taskPriority,
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

    reset();
    document.getElementById('task_modal').close();
  };

  const isEmpty = tasks.todo.length === 0 && tasks.ongoing.length === 0 && tasks.completed.length === 0;
  

  return (
    <div className="container mx-auto mt-12 p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">Dashboard</h1>

      {loading ? (
        <div className='flex justify-center '><span className="loading loading-ring loading-lg "></span></div>
      ):
      <div>
        {isEmpty & loading ? (
        <div className="flex items-center flex-col">
          <p className="text-2xl font-semibold mb-6 text-center">You don&apos;t have any tasks</p>
          <div>
            <Button icon={Plus} onClick={() => document.getElementById('task_modal').showModal()}>
              Create Task
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-2xl font-semibold mb-6 text-center text-gray-500">Your Tasks</p>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="p-4 bg-gray-100 rounded-lg shadow min-h-96">
              <h3 className="text-2xl font-semibold mb-4 text-primary">To-do</h3>
              {tasks.todo.map((task) => (
                <div key={task._id} className="p-4 mb-2 bg-white rounded-lg shadow">
                  <h4 className="font-bold text-gray-600">{task.title}</h4>
                  <p className="text-gray-600">{task.description}</p>
                  <p className="text-sm text-gray-500">Deadline: {task.deadline}</p>
                  <p className="text-sm text-gray-500">Priority: {task.priority}</p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-gray-100 rounded-lg shadow min-h-96">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Ongoing</h3>
              {tasks.ongoing.map((task) => (
                <div key={task._id} className="p-4 mb-2 bg-white rounded-lg shadow">
                  <h4 className="font-bold text-gray-600">{task.title}</h4>
                  <p className="text-gray-600">{task.description}</p>
                  <p className="text-sm text-gray-500">Deadline: {task.deadline}</p>
                  <p className="text-sm text-gray-500">Priority: {task.priority}</p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-gray-100 rounded-lg shadow min-h-96">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Completed</h3>
              {tasks.completed.map((task) => (
                <div key={task._id} className="p-4 mb-2 bg-white rounded-lg shadow">
                  <h4 className="font-bold text-gray-600">{task.title}</h4>
                  <p className="text-gray-600">{task.description}</p>
                  <p className="text-sm text-gray-500">Deadline: {task.deadline}</p>
                  <p className="text-sm text-gray-500">Priority: {task.priority}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      </div>
      }

      <dialog id="task_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Create a New Task</h3>
          <div className="w-full max-w-md">
            <form onSubmit={handleSubmit(handleAddTask)}>
              <input
                type="text"
                placeholder="Task Title"
                {...register('taskTitle', { required: true })}
                className="input input-bordered border-primary focus:border-primary focus:outline-none w-full mb-2"
              />
              <textarea
                placeholder="Task Description"
                {...register('taskDescription', { required: true })}
                className="textarea textarea-bordered border-primary focus:border-primary focus:outline-none w-full mb-2"
              />
              <input
                type="date"
                placeholder="Deadline"
                {...register('taskDeadline', { required: true })}
                className="input input-bordered border-primary focus:border-primary focus:outline-none w-full mb-2 text-gray-400"
              />
              <select
                {...register('taskPriority', { required: true })}
                className="select select-bordered border-primary focus:border-primary focus:outline-none w-full mb-2 text-gray-400"
              >
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
              </select>
              <Button type="submit" className="w-full" icon={Plus}>
                Create Task
              </Button>
            </form>
          </div>
          <div className="modal-action">
            <Button onClick={() => document.getElementById('task_modal').close()}>Close</Button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DashboardPage;
