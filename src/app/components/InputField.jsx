'use client';
import React, { useRef } from 'react';

const InputField = ({ todo = '', setTodo, handleAdd }) => {
  const inputRef = useRef(null);

  return (
    <form
      className="flex w-[95%] relative items-center"
      onSubmit={e => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        type="text"
        placeholder="Enter a Task"
        value={todo}
        ref={inputRef}
        onChange={e => setTodo(e.target.value)}
        className="w-full rounded-full py-5 px-8 text-xl border-none transition-shadow duration-200 shadow-inner focus:shadow-[0_0_10px_1000px_rgba(0,0,0,0.5)] focus:outline-none"
      />
      <button
        type="submit"
        className="absolute w-12 h-12 m-3 rounded-full right-0 border-none text-base bg-blue-600 text-white transition-all duration-200 shadow-md hover:bg-blue-700 active:scale-90 active:shadow-sm"
      >
        GO
      </button>
    </form>
  );
};

export default InputField;
