import React, { useEffect, useState } from 'react'

function LandingPage() {
const [balance ,setBalance] = useState(0)
const [income , setIncome] = useState(0)
const [expense , setExpense] = useState(0)
const [history , setHistory] = useState("hi")
const [addBalanceVisible, setAddBalanceVisible] = useState(true); 
const [addExpenseVisible, setAddExpenseVisible] = useState(false);
const [activeButton, setActiveButton] = useState("balance"); 
const [addValue, setAddValue] = useState(); 
const [removeValue, setRemoveValue] = useState();
const handleAddBalanceClick = () => {
    setAddBalanceVisible(true);
    setAddExpenseVisible(false);
    setActiveButton("balance");
    setRemoveValue(0)
  };

  const handleAddExpenseClick = () => {
    setAddBalanceVisible(false);
    setAddExpenseVisible(true);
    setActiveButton("expense");
    setAddValue(0)
  };

  const handleAddbalance = () => {
    setBalance(balance+Number(addValue))
    setIncome(income+Number(addValue))
    setAddValue(0)
  }
  const handleRemovebalance = () => {
    setBalance(balance-Number(removeValue))
    setExpense(expense+Number(removeValue))
    setRemoveValue(0)
  }
  return (
    <>
   <div id="form" className="flex justify-center flex-col items-center mt-20">
        <div className="w-96">
          <p className="text-center font-semibold mb-10 text-3xl">
            Expense Tracker
          </p>
          <div>
            <p className="font-medium">YOUR BALANCE</p>
            <p className="font-semibold text-3xl">₹{balance}.00</p>
            <div
              id="expenseTab"
              className="flex my-5 text-center border py-5 drop-shadow bg-slate-50 justify-around"
            >
              <div>
                <p className="font-medium">INCOME</p>
                <p className="text-2xl font-medium text-green-500">
                  ₹{income}.00
                </p>
              </div>
              <div>
                <p className="font-medium">EXPENSE</p>
                <p className="text-2xl font-medium text-red-600">
                  ₹{expense}.00
                </p>
              </div>
            </div>
            <p className="font-semibold text-xl border-b border-black my-6">
              History
            </p>
            <p>{history}</p>
            <p className="font-semibold text-xl border-b border-black my-6">
              Add New Transaction
            </p>
            <p className="font-medium">Transaction Title</p>
            <input
              type="text"
              placeholder="Enter Here"
              className="w-full border mb-2"
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
            <button onClick={addBalanceVisible ?handleAddbalance:handleRemovebalance} className="bg-purple-500 w-full text-lg text-white font-semibold">
              Add Transaction
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default LandingPage