import React from 'react'
import LogCard from './LogCard';

function AllLoglist({ logs = [] }) {
    // No logs
    if (!logs || logs.length === 0){
        return (
            <><div className="no_logs">
                <p>No logs found for selected Date</p>
            </div>
            </>
            );
    };
        
    return (
        <div>
            <div className="container">
                <div className="log-list">
                    {logs.map((log)=>{
                        // console.log(log);
                        return<LogCard key={log._id} log={log}></LogCard>
                    })}
                </div>
            </div>
        </div>
    )
}

export default AllLoglist