'use client';
import React from 'react';
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';

const TodoList = ({
  todos = [],
  setTodos,
  completedTodos = [],
  setCompletedTodos,
}) => {
  return (
    <div className="w-[95%] flex mt-2.5 justify-between items-start flex-wrap">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`rounded-lg flex flex-col w-[47.5%] p-4 bg-cyan-500 ${
              snapshot.isDraggingOver ? 'bg-cyan-300' : ''
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="text-2xl text-white">Active Tasks</span>
            {todos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={todos}
                todo={todo}
                key={todo.id}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`rounded-lg flex flex-col w-[47.5%] p-4 ${
              snapshot.isDraggingOver ? 'bg-red-500' : 'bg-red-400'
            }`}
          >
            <span className="text-2xl text-white">Completed Tasks</span>
            {completedTodos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={completedTodos}
                todo={todo}
                key={todo.id}
                setTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
