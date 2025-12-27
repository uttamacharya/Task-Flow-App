import React from 'react'
import './logCard.css'

function LogCard({ log }) {
    return (
        <>
            <div className="cardContainer">
                <div className="log-card">
                    <div className="cardPart1">
                        <h4>Title: {log.taskId?.title}</h4>
                        <p>Duration:{log.duration} hrs</p>
                        <p>Rating:{log.rating}</p>
                    </div>

                    {log.comments && (
                        <p>{log.comments}</p>
                    )}
                    <div className="cardPart2">
                        <small>
                            {new Date(log.date).toLocaleDateString()}
                        </small>
                        <div className={`status ${log.taskId?.status.toLowerCase()}`}>
                            {log.taskId?.status}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default LogCard