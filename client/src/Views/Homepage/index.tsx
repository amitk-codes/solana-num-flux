"use client";
import React, { useMemo, useState } from 'react';
import Typography from '@mui/material/Typography';
import CustomShiftButton from '@/components/CustomShiftButton';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletNotConnect } from '@/components/WalletNotConnect';

export default function Homepage() {
  const [value, setValue] = useState(0);
  const walletAdapter = useWallet();

  // Check if the wallet is connected
  const isWalletConnected = useMemo(() => walletAdapter && walletAdapter.connected, [walletAdapter]);

  const handleRetrieve = () => {
    setValue(10);
  };

  return (
    <main
      className='flex flex-col items-center justify-center p-4 gap-6 absolute-center w-full'
    >
      {!isWalletConnected ? (
        <WalletNotConnect />
      ) : (
        <>
          {/* Retrieve Button */}
          <button className='retrieve-button' onClick={handleRetrieve}>
            <span> Retrieve </span>
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
        </>
      )}
    </main>
  );
}
