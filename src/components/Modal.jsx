import React, { useState } from "react";
import { useUser } from "../context/UserContext"; 

const Modal = ({ onClose }) => {
  const { dispatch } = useUser();
  const [name, setName] = useState("");

  const handleLogin = () => {
    dispatch({ type: "LOGIN", payload: name });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 w-full px-3 py-2 rounded mb-4"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
        <button
          onClick={onClose}
          className="text-gray-500 px-4 py-2 mt-2 block text-center"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
