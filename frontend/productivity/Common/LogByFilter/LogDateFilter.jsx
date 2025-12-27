import React from 'react'
import { useState } from 'react'

function LogDateFilter({onApply}) {
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] =useState("");
    
  return (
    <div>
        <div className="logFilterContainer">
            <div className="logFilter">
                <input
                 type="Date"
                //  placeholder=''
                 value={fromDate}
                 onChange={(e)=>setFromDate(e.target.value)} />

                <input
                 type="Date"
                //  placeholder='DD/MM/YYYY'
                 value={toDate}
                 onChange={(e)=>setToDate(e.target.value)}
                />
                <button onClick={()=>{
                    console.log("Apply clicked ", fromDate, toDate)
                    onApply(fromDate, toDate)}}>Apply</button>
            </div>
        </div>
    </div>
  )
}

export default LogDateFilter