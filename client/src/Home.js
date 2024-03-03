import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useAuth } from "./AuthContext";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

export default function NestedGrid() {
    const [reminders, setReminders] = useState(
        JSON.parse(localStorage.getItem("reminders")) || [],
    );
    const [discarded, setDiscarded] = useState(
        JSON.parse(localStorage.getItem("discarded")) || [],
    );
    const [newReminder, setNewReminder] = useState("");
    const { logout } = useAuth();

    useEffect(() => {
        localStorage.setItem("reminders", JSON.stringify(reminders));
        localStorage.setItem("discarded", JSON.stringify(discarded));
    }, [reminders, discarded]);

    const handleAddReminder = () => {
        if (newReminder.trim() !== "") {
            setReminders([...reminders, newReminder]);
            setNewReminder("");
        }
    };

    const handleDiscardReminder = (index) => {
        const newReminders = reminders.filter((_, i) => i !== index);
        setReminders(newReminders);
        setDiscarded([...discarded, reminders[index]]);
    };

    const handleRemovePermanently = (index) => {
        const newDiscarded = discarded.filter((_, i) => i !== index);
        setDiscarded(newDiscarded);
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
                            onChange={(e) => setNewReminder(e.target.value)}
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
                    {/* Active reminders */}
                    <Grid xs={12} md={6}>
                        <Item>
                            <Box
                                id="box1"
                                sx={{ fontSize: "12px", textTransform: "uppercase" }}
                            >
                                Reminders
                            </Box>
                            <Box component="ul" aria-labelledby="box1" sx={{ pl: 2 }}>
                                {reminders.map((reminder, index) => (
                                    <li key={index}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    onChange={() => handleDiscardReminder(index)}
                                                />
                                            }
                                            label={reminder}
                                        />
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
                                Discarded Reminders
                            </Box>
                            <Box component="ul" aria-labelledby="box2" sx={{ pl: 2 }}>
                                {discarded.map((reminder, index) => (
                                    <li key={index}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    onChange={() => handleRemovePermanently(index)}
                                                />
                                            }
                                            label={reminder}
                                        />
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
                    <Grid container columnSpacing={1} sx={{ order: { xs: 1, sm: 2 } }}>
                        <Button variant="contained" onClick={logout}>
                            Log out
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
