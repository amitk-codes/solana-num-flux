import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import "@solana/wallet-adapter-react-ui/styles.css"
import dynamic from 'next/dynamic';
import { MobileDrawer } from './MobileDrawer';
import InitializeButton from './InitializeButton';

// dynamic import for Solana Wallet Button
const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

export const Header = () => {

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 1 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: "99" }}>

        {/* Logo */}
        <div className='text-xl font-bold bg-gradient-to-r from-teal-400 via-purple-500 to-pink-500 bg-clip-text text-transparent select-none'>
          Solana NumFlux
        </div>

        <div className='hidden lg:flex gap-4'>
          {/* Initialize Button */}
          <InitializeButton />

          {/* Wallet Connect Button */}
          <WalletMultiButtonDynamic style={{ maxHeight: '40px' }} />
        </div>

        <div className='flex lg:hidden'>
          <MobileDrawer />
        </div>
      </Toolbar>
    </AppBar>
  );
};
