import React from 'react'
import axiosInstance from '../axiosInstance'
import LogDateFilter from './LogDateFilter';
import AllLoglist from './AllLoglist';
import { useState } from 'react';

function AllPage() {
    const [logs, setLogs] = useState([])
    const fetchLogs = async (from, to) => {
        console.log("fetchLogs called", from, to);
        try {
            const res = await axiosInstance.get("/logs/range", {
                params: { fromDate: from, toDate: to }
            });
            setLogs(res.data.logs);
        } catch (err) {
            console.error("Fetch logs error :", err)
        }
    };
    return (
        <div>
            <div className="content">
                <LogDateFilter onApply={fetchLogs}></LogDateFilter>
                <AllLoglist logs={logs}></AllLoglist>
            </div>
        </div>
    )
}

export default AllPage