import React, { useState } from "react";
import { useUser } from "../context/UserContext"; 
import Modal from "./Modal";

function LandingPage() {
  const [addBalanceVisible, setAddBalanceVisible] = useState(true);
  const [addExpenseVisible, setAddExpenseVisible] = useState(false);
  const [activeButton, setActiveButton] = useState("balance");
  const [addValue, setAddValue] = useState(0);
  const [removeValue, setRemoveValue] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);

  const { state, dispatch } = useUser();

  const handleAddBalanceClick = () => {
    setAddBalanceVisible(true);
    setAddExpenseVisible(false);
    setActiveButton("balance");
    setRemoveValue(0);
  };

  const handleAddExpenseClick = () => {
    setAddBalanceVisible(false);
    setAddExpenseVisible(true);
    setActiveButton("expense");
    setAddValue(0);
  };

  const handleAddBalance = () => {
    const updatedBalance = state.balance + Number(addValue);
    const updatedIncome = state.income + Number(addValue);
    dispatch({ type: "UPDATE_BALANCE", payload: { balance: updatedBalance } });
    dispatch({ type: "UPDATE_INCOME", payload: { income: updatedIncome } });
    setAddValue(0);
  };

  const handleRemoveBalance = () => {
    const updatedBalance = state.balance - Number(removeValue);
    const updatedExpense = state.expense + Number(removeValue);
    dispatch({ type: "UPDATE_BALANCE", payload: { balance: updatedBalance } });
    dispatch({ type: "UPDATE_EXPENSE", payload: { expense: updatedExpense } });
    setRemoveValue(0);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.clear();
  };

  return (
    <>
      <p className="text-right px-20 mt-5 font-medium">
        Welcome, {state.loggedIn ? state.name : "Guest"}!
      </p>

      <div id="form" className="flex justify-center flex-col items-center mt-20">
        <div className="w-96">
          <p className="text-center font-semibold mb-10 text-3xl">
            Expense Tracker
          </p>
          <div>
            <p className="font-medium">YOUR BALANCE</p>
            <p className="font-semibold text-3xl">₹{state.balance}.00</p>
            <div
              id="expenseTab"
              className="flex my-5 text-center border py-5 drop-shadow bg-slate-50 justify-around"
            >
              <div>
                <p className="font-medium">INCOME</p>
                <p className="text-2xl font-medium text-green-500">
                  ₹{state.income}.00
                </p>
              </div>
              <div>
                <p className="font-medium">EXPENSE</p>
                <p className="text-2xl font-medium text-red-600">
                  ₹{state.expense}.00
                </p>
              </div>
            </div>
            <p className="font-semibold text-xl border-b border-black my-6">
              Add New Transaction
            </p>
            <div className="flex justify-around">
              <button
                onClick={handleAddBalanceClick}
                className={`font-medium w-1/2 ${
                  activeButton === "balance" ? "" : "text-slate-300"
                }`}
              >
                Add Balance
              </button>
              <button
                onClick={handleAddExpenseClick}
                className={`font-medium w-1/2 ${
                  activeButton === "expense" ? "" : "text-slate-300"
                }`}
              >
                Add Expense
              </button>
            </div>
            <input
              type="number"
              value={addValue}
              onChange={(e) => setAddValue(e.target.value)}
              placeholder="Add Balance"
              className={`w-full border mb-2 ${
                addBalanceVisible ? "" : "hidden"
              }`}
            />
            <input
              type="number"
              value={removeValue}
              onChange={(e) => setRemoveValue(e.target.value)}
              placeholder="Add Expense"
              className={`w-full border mb-2 ${
                addExpenseVisible ? "" : "hidden"
              }`}
            />
            <button
              onClick={addBalanceVisible ? handleAddBalance : handleRemoveBalance}
              className="bg-purple-500 w-full text-lg text-white font-semibold"
            >
              Add Transaction
            </button>
            {state.loggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 w-full text-lg text-white font-semibold mt-1"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => setModalOpen(true)}
                className="bg-cyan-500 w-full text-lg text-white font-semibold mt-1"
              >
                Please Login Here
              </button>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && <Modal onClose={() => setModalOpen(false)} />}
    </>
  );
}

export default LandingPage;
