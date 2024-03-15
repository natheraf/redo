import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done'; 
import { useAuth } from "./AuthContext";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

export default function NestedGrid() {
    const [reminders, setReminders] = useState(JSON.parse(localStorage.getItem("reminders")) || []);
    const [discarded, setDiscarded] = useState(JSON.parse(localStorage.getItem("discarded")) || []);
    const [newReminder, setNewReminder] = useState(""); 
    const [editIndex, setEditIndex] = useState(-1); // New state to track edit mode
    const [editText, setEditText] = useState(""); // New state for the text being edited
    const { logout } = useAuth();

    useEffect(() => {
        localStorage.setItem("reminders", JSON.stringify(reminders));
        localStorage.setItem("discarded", JSON.stringify(discarded));
    }, [reminders, discarded]);

    const handleAddReminder = () => {
        if (newReminder.trim() !== "") {
            setReminders([...reminders, { text: newReminder, isEditing: false }]);
            setNewReminder(""); // Clear the input field after adding a reminder
        }
    };

    const handleDiscardReminder = (index) => {
        const newReminders = reminders.filter((_, i) => i !== index);
        setReminders(newReminders);
        setDiscarded([...discarded, reminders[index].text]); // Ensure to use .text to discard the correct reminder format
    };

    const handleRemovePermanently = (index) => {
        const newDiscarded = discarded.filter((_, i) => i !== index);
        setDiscarded(newDiscarded);
    };

    const handleStartEditing = (index) => {
        setEditIndex(index);
        setEditText(reminders[index].text);
    };

    const handleEditChange = (event) => {
        setEditText(event.target.value); // Update editText as the user types
    };

    const handleSaveEdit = (index) => {
        const updatedReminders = reminders.map((reminder, i) =>
            i === index ? { ...reminder, text: editText } : reminder // Save the edited text
        );
        setReminders(updatedReminders);
        setEditIndex(-1); // Exit edit mode
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {/* New reminders element */}
                <Grid xs={12} md={5} lg={4}>
                    <Item>
                        <TextField
                            fullWidth
                            label="New Reminder"
                            value={newReminder}
                            onChange={(e) => setNewReminder(e.target.value)} // Update newReminder as the user types
                            variant="outlined"
                            margin="normal"
                        />
                        <Button variant="contained" onClick={handleAddReminder}>
                            Add Reminder
                        </Button>
                    </Item>
                </Grid>
                {/* Reminders list and Discarded reminders side by side */}
                <Grid container xs={12} md={7} lg={8} spacing={2}>
                    <Grid xs={12} md={6}>
                        <Item>
                            <Box
                                id="box1"
                                sx={{ fontSize: "12px", textTransform: "uppercase" }}
                            >
                                Reminders
                            </Box>
                            <Box component="ul" aria-labelledby="box1" sx={{ pl: 2, listStyle: 'none', padding: 0 }}>
                                {reminders.map((reminder, index) => (
                                    <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                        {editIndex === index ? (
                                            <React.Fragment>
                                                <TextField
                                                    fullWidth
                                                    variant="standard"
                                                    value={editText}
                                                    onChange={handleEditChange}
                                                    onBlur={() => handleSaveEdit(index)}
                                                />
                                                <Tooltip title="Done">
                                                    <IconButton onClick={() => handleSaveEdit(index)}>
                                                        <DoneIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment>
                                                <FormControlLabel
                                                    control={<Checkbox onChange={() => handleDiscardReminder(index)} />}
                                                    label={reminder.text}
                                                    sx={{ flexGrow: 1 }}
                                                />
                                                <Tooltip title="Edit">
                                                    <IconButton onClick={() => handleStartEditing(index)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </React.Fragment>
                                        )}
                                    </li>
                                ))}
                            </Box>
                        </Item>
                    </Grid>
                    {/* Discarded reminders */}
                    <Grid xs={12} md={6}>
                        <Item>
                            <Box
                                id="box2"
                                sx={{ fontSize: "12px", textTransform: "uppercase" }}
                            >
                                Discarded/Done Reminders
                            </Box>
                            <Box component="ul" aria-labelledby="box2" sx={{ pl: 2, listStyle: 'none' }}>
                                {discarded.map((reminder, index) => (
                                    <li key={index}>
                                        <Tooltip title="Permanently Remove" placement="top"> {/* Tooltip adjusted */}
                                            <FormControlLabel
                                                control={<Checkbox onChange={() => handleRemovePermanently(index)} />}
                                                label={reminder}
                                            />
                                        </Tooltip>
                                    </li>
                                ))}
                            </Box>
                        </Item>
                    </Grid>
                </Grid>
                <Grid
                    xs={12}
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    flexDirection={{ xs: "column", sm: "row" }}
                    sx={{ fontSize: "12px" }}
                >
                    <Button variant="contained" onClick={logout}>
                        Log out
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
