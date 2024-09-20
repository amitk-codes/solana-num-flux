"use client";
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';

export default function Homepage() {
  const [value, setValue] = useState(0);

  const handleRetrieve = () => {
    setValue(10);
  };

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        gap: '24px',
      }}
    >
      {/* Retrieve Button */}
      <Button
        variant="contained"
        sx={{ backgroundColor: 'green', color: 'white' }}
        onClick={handleRetrieve}
      >
        Retrieve
      </Button>

      {/* Value Display with increment/decrement */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <IconButton
          color="secondary"
          onClick={() => setValue((prev) => prev - 1)}
        >
          <RemoveIcon />
        </IconButton>
        <Typography variant="h4" sx={{ textAlign: 'center', color: 'black' }}>
          {value}
        </Typography>
        <IconButton
          color="primary"
          onClick={() => setValue((prev) => prev + 1)}
        >
          <AddIcon />
        </IconButton>
      </div>
    </main>
  );
}