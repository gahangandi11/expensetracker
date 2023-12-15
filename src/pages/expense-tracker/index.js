import { useAddTransaction } from "../../hooks/useAddTransaction"
import {useState} from "react"
import { signOut } from "firebase/auth";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import {auth} from "../../config/firebase-config"
import "./style.css"

import {useNavigate} from "react-router-dom"

import {useGetUserInfo} from "../../hooks/useGetUserInfo"
import { Card, CardContent } from '@mui/material';

export const ExpenseTracker =()=>{
    const {addTransaction} =useAddTransaction();
    const {transactions,transactionTotals}=useGetTransactions();
    const {name, profilePhoto} = useGetUserInfo();
    const [description,setDescription]=useState("");
    const [transactionAmount,setTransactionAmount]=useState(0);
    const [transactionType,setTransactionType]=useState("expense");
    const navigate=useNavigate();

    const onSubmit=async (e)=>{
          e.preventDefault();
          addTransaction({description,transactionAmount,transactionType});
          setDescription("");
          setTransactionAmount("");
    }
    
    const signUserOut= async()=>{
        try{
        await signOut(auth);
        localStorage.clear();
        navigate("/");
        }
        catch(err)
        {
            console.error(err);
        }

    }
   

    return (
        <>
        <div className="expense-tracker">
            <div className="container">
                <h1>{name}'s Expense Tracker</h1>
                <div className="balance">
                    <h3>Your balance</h3>
                    <h2>${transactionTotals.balance}</h2>
                </div>
                <div className="summary">
                    <div className="income">
                        <h4>Income</h4>
                        <p>${transactionTotals.income}</p>
                    </div>
                    <div className="expense">
                        <h4>Expense</h4>
                        <p>${transactionTotals.expense}</p>
                    </div>

                </div>
                <form className="add-transaction" onSubmit={onSubmit}>
                    <input type="text" placeholder="Description" value={description} required onChange={(e)=>setDescription(e.target.value)}/>
                    <input type="number" placeholder="Amount" value={transactionAmount} required onChange={(e)=>setTransactionAmount(e.target.value)}/>
                    <input type="radio" id="expense" value="expense" onChange={(e)=>setTransactionType(e.target.value)}  checked={transactionType==="expense"}/>
                    <label htmlFor="expense">Expense</label>
                    <input type="radio" id="income" value="income" onChange={(e)=>setTransactionType(e.target.value)} checked={transactionType==="income"}/> 
                    <label htmlFor="income">Income</label>

                    <button type="submit">Add Transaction</button>

                </form>
            </div>
            <button className="sign-out-button" onClick={signUserOut}>
                sign out
            </button>

        </div>
        <div className="transactions">
            <h3>Transactions</h3>
            <ul>
                {transactions.map((transaction)=>{

                    const {description,transactionAmount,transactionType}=transaction
                    return(

                        <li>
                              <h4>{description}</h4>
                              <p>${transactionAmount}.<label style={{color:transactionType==="expense"?"red":"green"}}>{transactionType}</label></p>
                            
                        </li>
                    )
                })}
            </ul>
        </div>
    </>
    )
}