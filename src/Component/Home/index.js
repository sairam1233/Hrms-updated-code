import React, { useState, useEffect } from 'react';
import './index.css';

const Home = () => {
    const [currentDateTime, setCurrentDateTime] = useState("");

    // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const currentDayIndex = new Date().getDay(); 

    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

    const totalDuration = 9; // Total duration in hours
    const passedDuration = 8; // Passed duration in hours (example: 4.5 hours out of 9 hours)

    // Calculate the progress as a percentage
    const progressPercentage = (passedDuration / totalDuration) * 100;

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();

            // Format the date
            const day = now.getDate();
            const month = now.toLocaleString("default", { month: "long" }); // Full month name (e.g., "July")
            const year = now.getFullYear();
            const weekday = now.toLocaleString("default", { weekday: "long" }); // Full weekday name (e.g., "Wednesday")

            // Format the time
            const time = now.toLocaleString("default", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true, // 12-hour format
            });

            // Combine date and time
            const formattedDateTime = `${day}/${month}/${year}, ${weekday}, Time: ${time}`;
            setCurrentDateTime(formattedDateTime);
        };

        // Update the date and time once
        updateDateTime();

        // Optional: Update every minute if needed
        const intervalId = setInterval(updateDateTime, 60000);

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="home-con">
            <p className="home-container-p">
                <span className="span-p">Date:</span>{currentDateTime}
            </p>

            <div className="con">
                <div className="box">
                    <h5 className="tl">Payroll</h5>
                    <p className="ds">23 Calendar days</p>
                </div>
                <hr className='hr11'/>
                <div className="box">
                    <h5 className="tl">Total Leaves</h5>
                    <p className="ds">1</p>
                </div>
                <hr className='hr11'/>
                <div className="box">
                    <h5 className="tl">Working Days</h5>
                    <p className="ds">22</p>
                </div>
                <hr className='hr11'/>
                <div className="box">
                    <h5 className="tl">Payroll Processed</h5>
                    <p className="ds">23 days</p>
                </div>
            </div>
            <div className='con1'>
                 {/* Timing Details Section */}
            <div className="timing-details">
                <div className="timing-details-header">
                    <h6 className='tl'>Timing Details</h6>
                    <div className="spp">
                        {daysOfWeek.map((day, index) => (
                            <span
                                key={index}
                                className={`day ${index === currentDayIndex ? 'highlighted' : ''}`}
                            >
                                {day}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="timing-details-body">
                    Yesterday (9:00 AM - 6:00 PM)
                </div>

                {/* Progress Bar */}
                <div className="timing-details-divider">
                    <div className="progress-bar-container">
                        <div
                            className="progress-bar"
                            style={{ width: `${progressPercentage}%` }}
                        >
                        </div>
                    </div>
                </div>

                <div className="timing-details-body">Duration: {totalDuration} HRS</div>
                
            </div>

            <div className="container">
                <h3 className="tl">Attendance Details</h3>
                <div className="section">
                    <div className="row">
                    <span className="label">👤 Me:</span>
                    <span className='sp1'>8:00 hrs (AVG HRS/DAY)</span>
                    </div>
                    <div className="row">
                    <span></span>
                    <span className='sp1'>8:00 hrs (ON TIME ARRIVAL)</span>
                    </div>
                </div>
                <hr className="divider" />
                <div className="section">
                    <div className="row">
                    <span className="label">👥 My Team:</span>
                    <span className='sp1'>8:00 hrs (AVG HRS/DAY)</span>
                    </div>
                    <div className="row">
                    <span></span>
                    <span className='sp1'>8:00 hrs (ON TIME ARRIVAL)</span>
                    </div>
                </div>
                </div>
            </div>
           
        </div>
    );
};

export default Home;
