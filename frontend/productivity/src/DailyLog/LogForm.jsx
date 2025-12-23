import React, { useState } from "react";
import "./LogForm.css";

function LogForm({onCreate}) {
    // console.log("LogForm received onCreate:", onCreate);
    const [duration, setDuration] = useState("");
    const [rating, setRating] = useState(3);
    const [comments, setComments] = useState("");
    const [open, setOpen] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        if (!comments.trim()) return;

        onCreate({
            duration,
            rating,
            comments
        });

        setDuration("");
        setRating(3);
        setComments("");
        setOpen(false);
    };

    return (
        <div className="logFormPage">
            <div className="logFormIcon" onClick={() => setOpen(true)}>
                + Write Work Log
            </div>

            {open && (
                <div className="logFormWrapper">
                    <form className="logForm" onSubmit={submitHandler}>
                        <span className="close" onClick={() => setOpen(false)}>✖</span>

                        <h3>Write about Task</h3>

                        <input
                            type="number"
                            placeholder="Duration (hours)"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        />

                        <div className="ratingGroup">
                            {[1, 2, 3, 4, 5].map((num) => (
                                <label key={num}>
                                    <input
                                        type="radio"
                                        value={num}
                                        checked={rating === num}
                                        onChange={() => setRating(num)}
                                    />
                                    {num}
                                </label>
                            ))}
                        </div>

                        <textarea
                            placeholder="What did you do?"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                        />

                        <button type="submit">Create Log</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default LogForm;
