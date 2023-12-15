import { useEffect, useState } from "react";

import {query,collection,where, orderBy, onSnapshot} from "firebase/firestore"

import {db} from "../config/firebase-config";
import {useGetUserInfo} from "./useGetUserInfo"


export const useGetTransactions=()=>{
    const [transactions,setTransactions]=useState([]);
    const [transactionTotals, setTransactionTotals]=useState({balance: 0.0, income: 0.0,expense :0.0 });



    const {userId}=useGetUserInfo();

    const transactionCollectionRef=collection(db,"transactions");

    const getTransactions=async () =>{
        let unsubscribe;
        try{

           const queryTransactions=query(transactionCollectionRef, where("userId","==",userId),orderBy("createdAt"));

          unsubscribe= onSnapshot(queryTransactions,(snapshot)=>{

            let docs=[];

            let totalIncome=0;
            let totalExpense=0;
            let balance=0;

            snapshot.forEach((doc)=>{

                const data=doc.data();
                const id=doc.id;
                docs.push({...data,id});

                if(data.transactionType==="expense")
                {
                    totalExpense+=Number(data.transactionAmount);
                }
                else{
                    totalIncome+=Number(data.transactionAmount);
                }

            });
            balance=totalIncome-totalExpense;
            
            setTransactions(docs);
            setTransactionTotals({balance,income:totalIncome,expense:totalExpense});


           });

        } catch(err){
            console.log(err);
        }
        return ()=>unsubscribe();
    };

    useEffect(()=>{
      getTransactions();
    },[])

    return {transactions,transactionTotals};
}