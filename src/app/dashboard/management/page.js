'use client';

import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import Button from '@/app/components/Button';
import { Plus } from 'lucide-react';

const TaskManagement = () => {
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState({
    pending: [],
    inProgress: [],
    completed: [],
  });

  const handleAddTask = () => {
    if (taskInput.trim() === '') return;

    const newTask = {
      id: uuidv4(),
      content: taskInput,
    };

    setTasks((prev) => ({
      ...prev,
      pending: [...prev.pending, newTask],
    }));

    setTaskInput('');
  };

  const handleDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const sourceList = [...tasks[source.droppableId]];
    const [movedTask] = sourceList.splice(source.index, 1);

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
    }
  };

  return (
    <div className="container mx-auto mt-12 p-6">
      <h2 className="text-4xl font-bold text-center mb-8">Tasks</h2>
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="New Task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className="input input-bordered focus:outline-none border-primary focus:border-primary w-full max-w-md"
        />
        <Button onClick={handleAddTask} className='max-w-40' icon={Plus}>
        Create Task
        </Button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Droppable droppableId="pending">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="p-4 bg-gray-100 rounded-lg shadow min-h-96"
              >
                <h3 className="text-2xl font-semibold mb-4">Pending</h3>
                {tasks.pending.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-4 mb-2 bg-white rounded-lg shadow"
                      >
                        <p>{task.content}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="inProgress">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="p-4 bg-gray-100 rounded-lg shadow min-h-96"
              >
                <h3 className="text-2xl font-semibold mb-4">In Progress</h3>
                {tasks.inProgress.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-4 mb-2 bg-white rounded-lg shadow"
                      >
                        <p>{task.content}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="completed">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="p-4 bg-gray-100 rounded-lg shadow min-h-96"
              >
                <h3 className="text-2xl font-semibold mb-4">Completed</h3>
                {tasks.completed.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-4 mb-2 bg-white rounded-lg shadow"
                      >
                        <p>{task.content}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskManagement;
