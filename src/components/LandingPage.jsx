import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import Modal from "./Modal";
import { MdDeleteForever } from "react-icons/md";

function LandingPage() {
  const [addBalanceVisible, setAddBalanceVisible] = useState(true);
  const [addExpenseVisible, setAddExpenseVisible] = useState(false);
  const [activeButton, setActiveButton] = useState("balance");
  const [addValue, setAddValue] = useState(0);
  const [removeValue, setRemoveValue] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [titleText, setTitleText] = useState("");
  const { state, dispatch } = useUser();

  const handleReset = () => {
    dispatch({ type: "UPDATE_BALANCE", payload: { balance: 0 } });
    dispatch({ type: "UPDATE_INCOME", payload: { income: 0 } });
    dispatch({ type: "UPDATE_EXPENSE", payload: { expense: 0 } });
    dispatch({ type: "UPDATE_HISTORY", payload: [] });
    setAddValue(0);
    setRemoveValue(0);
    setTitleText("");
  };

  const handleAddTitle = (amount, type) => {
    const newHistoryItem = { text: titleText, amount, type };
    const updatedHistory = [...state.history, newHistoryItem];
    setTitleText("");
    dispatch({ type: "UPDATE_HISTORY", payload: updatedHistory });
  };

  const handleTitleInput = (e) => {
    setTitleText(e.target.value);
  };

  const handleRemoveTitle = (index) => {
    const updatedHistory = state.history.filter((_, i) => i !== index);
    dispatch({ type: "UPDATE_HISTORY", payload: updatedHistory });
  };

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
    handleAddTitle(Number(addValue), "income");
    const updatedBalance = state.balance + Number(addValue);
    const updatedIncome = state.income + Number(addValue);
    dispatch({ type: "UPDATE_BALANCE", payload: { balance: updatedBalance } });
    dispatch({ type: "UPDATE_INCOME", payload: { income: updatedIncome } });
    setAddValue(0);
  };

  const handleRemoveBalance = () => {
    handleAddTitle(Number(removeValue), "expense");
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
      <div
        id="form"
        className="flex justify-center flex-col items-center mt-20"
      >
        <div className="w-96 mb-20">
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
              History
            </p>
            <div>
              {state.history.map((item, i) => (
                <div
                  key={i}
                  className={`flex justify-between border border-r-8 p-2 drop-shadow-lg items-center mb-2 ${
                    item.type === "income"
                      ? "border-green-500"
                      : "border-red-500"
                  }`}
                >
                  <p className="flex-1">{item.text}</p>
                  <p
                    className={`flex-1 text-right ${
                      item.type === "income" ? "text-green-500" : "text-red-600"
                    }`}
                  >
                    {item.type === "income"
                      ? `+${item.amount}`
                      : `-${item.amount}`}
                  </p>
                  <button
                    onClick={() => handleRemoveTitle(i)}
                    className="text-lg hover:text-red-700 ml-2"
                  >
                    <MdDeleteForever />
                  </button>
                </div>
              ))}
            </div>
            <p className="font-semibold text-xl border-b border-black my-3">
              Add New Transaction
            </p>
            <p className="font-medium">Transaction Title</p>
            <input
              type="text"
              value={titleText}
              onChange={handleTitleInput}
              placeholder="Enter Here"
              className="w-full hover:shadow hover:border-slate-800 border mb-4"
            />
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
              className={`w-full border mb-2  hover:shadow hover:border-slate-800 ${
                addBalanceVisible ? "" : "hidden"
              }`}
            />
            <input
              type="number"
              value={removeValue}
              onChange={(e) => setRemoveValue(e.target.value)}
              placeholder="Add Expense"
              className={`w-full border hover:border-slate-800 mb-2 ${
                addExpenseVisible ? "" : "hidden"
              }`}
            />

            <button
              onClick={
                addBalanceVisible ? handleAddBalance : handleRemoveBalance
              }
              disabled={
                (addBalanceVisible &&
                  (!titleText.trim() || !addValue || Number(addValue) <= 0)) ||
                (addExpenseVisible &&
                  (!titleText.trim() ||
                    !removeValue ||
                    Number(removeValue) <= 0))
              }
              className={`bg-purple-500 hover:text-xl hover:bg-purple-600 transition-all duration-350 w-full text-lg text-white font-semibold ${
                (addBalanceVisible &&
                  (!titleText.trim() || !addValue || Number(addValue) <= 0)) ||
                (addExpenseVisible &&
                  (!titleText.trim() ||
                    !removeValue ||
                    Number(removeValue) <= 0))
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Add Transaction
            </button>

            <button
              onClick={handleReset}
              className="bg-yellow-500 hover:text-xl hover:bg-yellow-600 transition-all duration-350 w-full text-lg text-white font-semibold mt-1"
            >
              Reset
            </button>
            {state.loggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:text-xl hover:bg-red-600 transition-all duration-350 w-full text-lg text-white font-semibold mt-1"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => setModalOpen(true)}
                className="bg-cyan-500 hover:bg-cyan-600 hover:text-xl transition-all duration-350  w-full text-lg text-white font-semibold mt-1"
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
