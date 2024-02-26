import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const Home = () => {
    const { logout } = useAuth(); // Destructure logout from useAuth
    const [reminders, setReminders] = useState([]);
    const [newReminder, setNewReminder] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const handleNewReminderChange = (event) => {
        setNewReminder(event.target.value);
    };

    const createReminder = () => {
        setShowPopup(true);
    };
    const handleLogout = () => {
        logout(); // This will clear the user token and update isLoggedIn state
    };

    // TODO: store the reminder in localStorage so it persists on page refresh
    const handleReminderCreation = (date, repeat) => {
        const updatedReminders = [...reminders, { content: newReminder, date, repeat }];
        setReminders(updatedReminders);
        setShowPopup(false);
        setNewReminder('');
    };

    const handleDateInput = (value) => {
        // TODO: Handle date input logic here
    };

    const completeReminder = (index) => {
        const updatedReminders = reminders.filter((_, i) => i !== index);
        setReminders(updatedReminders);
    };

    const renderPopup = () => {
        if (!showPopup) return null;

        // For now just a placeholder function is used to handle the date input
        // (does not actually store the date in the state)
        return (
            <div className="popup">
                <input type="datetime-local" onChange={(event) => handleDateInput(event.target.value)} />
                <button onClick={() => handleReminderCreation(new Date(), false)}>Set Timer/Date</button>
                <button onClick={() => handleReminderCreation(null, true)}>Set Repeat</button>
            </div>
        );
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div>Welcome, {"TEST"}!</div>
            <button onClick={handleLogout}>Logout</button>
            <div style={{ marginTop: '2.5%' }}>
                <input
                    type="text"
                    value={newReminder}
                    onChange={handleNewReminderChange}
                    placeholder="Set a reminder here"
                />
                <button onClick={createReminder}>Create</button>
            </div>
            {renderPopup()}
            <div>
                {/* test code */}
                {reminders.map((reminder, index) => (
                    <div key={index}>
                        <input type="checkbox" onChange={() => completeReminder(index)} />
                        <span>{reminder.content}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
