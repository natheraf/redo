import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAuth } from './AuthContext'; 


//TODO - make it so after you can discard the reminder and it will be removed from the list and put into a discarded list
//which itself can be discarded or restored to the main list or deleted after x time
//TODO - make it so you can edit the reminder
//TODO - make it so you can set a time/date for the reminder
//TODO - make it so you can make the reminder repeat

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function NestedGrid() {
    const [reminders, setReminders] = useState([]);
    const [newReminder, setNewReminder] = useState('');
    const { logout } = useAuth();

  const handleAddReminder = () => {
    if (newReminder.trim() !== '') {
      setReminders([...reminders, newReminder]);
      setNewReminder('');
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
        
      <Grid container spacing={2}>
        {/*New reminders element*/}
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
        {/*Reminders list*/}
        <Grid container xs={12} md={7} lg={8} spacing={4}>
          <Grid xs={6} lg={3}>
            <Item>
              <Box
                id="box1"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              >
                Reminderssssss
              </Box>
              <Box component="ul" aria-labelledby="box1" sx={{ pl: 2 }}>
                {reminders.map((reminder, index) => (
                  <li key={index}>{reminder}</li>
                ))}
              </Box>
            </Item>
          </Grid>
          {/* Placeholder Box B, C, D with "Test" */}
          <Grid xs={6} lg={3}><Item>Test</Item></Grid>
          <Grid xs={6} lg={3}><Item>Test</Item></Grid>
          <Grid xs={6} lg={3}><Item>Test</Item></Grid>
        </Grid>
        <Grid
          xs={12}
          container
          justifyContent="space-between"
          alignItems="center"
          flexDirection={{ xs: 'column', sm: 'row' }}
          sx={{ fontSize: '12px' }}
        >
          <Grid sx={{ order: { xs: 2, sm: 1 } }}>
            <Item>Test page</Item>
          </Grid>
          <Grid container columnSpacing={1} sx={{ order: { xs: 1, sm: 2 } }}>
            <Button variant='contained' onClick={logout}>
                Log out
            </Button>
            {/* Removed Link B and C */}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
