import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, Avatar, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  primaryTenant: {
    id: string;
    name: string;
    description: string;
  };
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  if (!user) {
    return null;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user.firstName}!
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: 'primary.main',
                  fontSize: '2rem',
                }}
              >
                {user.firstName[0]}{user.lastName[0]}
              </Avatar>
              <Box sx={{ ml: 2 }}>
                <Typography variant="h5">
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {user.email}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: user.status === 'active' ? 'success.main' : 'warning.main',
                    mt: 1,
                  }}
                >
                  Status: {user.status}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Workspace Information
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">
                <strong>Workspace Name:</strong> {user.firstName}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                <strong>Description:</strong> {user.lastName}
              </Typography>
              {/* <Typography variant="body1" sx={{ mt: 1 }}>
                <strong>Workspace ID:</strong> {user.id}
              </Typography> */}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                  onClick={() => navigate('/dashboard')}
                >
                  <Typography variant="h6">Dashboard</Typography>
                  <Typography variant="body2" color="text.secondary">
                    View your dashboard
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                  onClick={() => navigate('/drag-drop')}
                >
                  <Typography variant="h6">Drag & Drop</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Try drag and drop feature
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                  onClick={() => navigate('/infinite-scroll')}
                >
                  <Typography variant="h6">Infinite Scroll</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Explore infinite scroll
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                  onClick={() => navigate('/settings')}
                >
                  <Typography variant="h6">Settings</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Manage your settings
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home; 