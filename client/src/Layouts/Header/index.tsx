// Layouts/Header

import React from 'react';
import Button from '@mui/material/Button';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import "@solana/wallet-adapter-react-ui/styles.css"
import dynamic from 'next/dynamic';

// dynamic import for Solana Wallet Button
const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

export const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 1 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        {/* Logo */}
        <div className='text-xl font-bold bg-gradient-to-r from-teal-400 via-purple-500 to-pink-500 bg-clip-text text-transparent select-none'>
          Solana NumFlux
        </div>


        <div className='flex gap-4'>
          {/* Initialize Button */}
          <button className='border border-theme-default rounded text-theme-default font-bold px-6 shadow-[0_0_10px_0px_#512da8] active:shadow-none transition-all duration-300 min-h-[40px]'>
            Initialize Profile
          </button>

          {/* Wallet Connect Button */}
          <WalletMultiButtonDynamic style={{ maxHeight: '40px' }} />
        </div>
      </Toolbar>
    </AppBar>
  );
};
