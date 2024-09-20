// Layouts/Header

import React from 'react';
import Button from '@mui/material/Button';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

export const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 1 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        {/* Logo */}
        <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold' }}>
          Solana NumFlux
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {/* Initialize Button */}

          <Button variant="outlined" sx={{ borderColor: 'blue', color: 'blue' }}>
            Initialize
          </Button>

          {/* Wallet Connect Button */}
          <Button variant="contained" sx={{ backgroundColor: 'blue', color: 'white' }}>
            Connect
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
