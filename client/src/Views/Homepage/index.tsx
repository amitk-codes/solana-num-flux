"use client";
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import CustomShiftButton from '@/components/CustomShiftButton';

export default function Homepage() {
  const [value, setValue] = useState(0);

  const handleRetrieve = () => {
    setValue(10);
  };

  return (
    <main
      className='flex flex-col items-center justify-center p-4 gap-6 absolute-center'
    >
      {/* Retrieve Button */}
      <button className='retrieve-button' onClick={handleRetrieve}>
        <span> Retrieve
        </span>
      </button>

      {/* Decrement Button */}
      <div className='flex items-center gap-5'>
        <CustomShiftButton type='decrement' />

        {/* Value Display */}
        <Typography variant="h4" sx={{ textAlign: 'center', color: 'black', minWidth: '100px' }}>
          {value}
        </Typography>

        {/* Increment Button */}
        <CustomShiftButton type='increment' />
      </div>
    </main>
  );
}