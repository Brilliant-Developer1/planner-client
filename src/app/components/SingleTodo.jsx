'use client';
import { Check, Delete, File } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';

import { Draggable } from 'react-beautiful-dnd';

const SingleTodo = ({ index, todo, todos, setTodos }) => {
  const [edit, setEdit] = useState(false);
  const [editTodo, setEditTodo] = useState(todo.todo);

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e, id) => {
    e.preventDefault();
    setTodos(
      todos.map(todo => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const handleDelete = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleDone = id => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          onSubmit={e => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`flex rounded-lg p-5 mt-3 bg-cover transition-shadow duration-200 ${
            snapshot.isDragging
              ? 'shadow-lg'
              : 'hover:shadow-sm transform hover:scale-[1.03]'
          }`}
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-photo/crumpled-yellow-paper-background-close-up_60487-2390.jpg?size=626&ext=jpg')",
          }}
        >
          {edit ? (
            <input
              value={editTodo}
              onChange={e => setEditTodo(e.target.value)}
              className="flex-1 p-1.5 border-none text-lg focus:outline-none"
              ref={inputRef}
            />
          ) : todo.isDone ? (
            <s className="flex-1 p-1.5 text-lg">{todo.todo}</s>
          ) : (
            <span className="flex-1 p-1.5 text-lg">{todo.todo}</span>
          )}
          <div className="flex space-x-2.5">
            <span
              className="text-2xl cursor-pointer"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <File />
            </span>
            <span
              className="text-2xl cursor-pointer"
              onClick={() => handleDelete(todo.id)}
            >
              <Delete />
            </span>
            <span
              className="text-2xl cursor-pointer"
              onClick={() => handleDone(todo.id)}
            >
              <Check />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
