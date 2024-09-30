import React, { useMemo } from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import "@solana/wallet-adapter-react-ui/styles.css"
import dynamic from 'next/dynamic';
import { MobileDrawer } from './MobileDrawer';
import { useWallet } from '@solana/wallet-adapter-react';

// dynamic import for Solana Wallet Button
const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

export const Header = () => {
  const walletAdapter = useWallet();
  const isInitializeBtnDisabled = useMemo(() => !(walletAdapter && walletAdapter.connected), [walletAdapter])

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 1 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        {/* Logo */}
        <div className='text-xl font-bold bg-gradient-to-r from-teal-400 via-purple-500 to-pink-500 bg-clip-text text-transparent select-none'>
          Solana NumFlux
        </div>

        <div className='hidden lg:flex gap-4'>
          {/* Initialize Button */}
          <button
            disabled={isInitializeBtnDisabled}
            className={`border rounded font-bold px-6 shadow-[0_0_10px_0px_#512da8] active:shadow-none transition-all duration-300 min-h-[40px] 
              ${isInitializeBtnDisabled
                ? 'border-gray-400 text-gray-400 cursor-not-allowed shadow-none'
                : 'border-theme-default text-theme-default'}`}
          >
            Initialize Profile
          </button>

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
