"use client";
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import CustomShiftButton from '@/app/components/CustomShiftButton';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletNotConnect } from '@/app/components/WalletNotConnect';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { STORED_NUM_TAG } from '@/app/constants';
import { useSolanaAppContext } from '@/app/Providers/SolanaAppProvider';

export default function Homepage() {
  const [value, setValue] = useState<number | null>(null);
  const { isWalletConnected, program, userProfilePDA } = useSolanaAppContext() || {}
  const { publicKey } = useWallet()

  const handleRetrieve = async () => {
    if (!publicKey || !program || !userProfilePDA) return;
    let storedNumPDA;

    try {
      const [pda] = PublicKey.findProgramAddressSync(
        [Buffer.from(STORED_NUM_TAG), publicKey.toBuffer()],
        program.programId
      );
      storedNumPDA = pda

      const fetchStoredNumAccount = await program.account.storedNumAccount.fetch(storedNumPDA);
      setValue(fetchStoredNumAccount.storedNum?.toNumber());
    } catch (err: any) {
      // Check if the error is because the account does not exist
      if (err.message.includes('Account does not exist')) {
        try {
          const initializeStoredNumAccounts = {
            authority: publicKey,
            userProfile: userProfilePDA,
            storedNumAccount: storedNumPDA,
            systemProgram: SystemProgram.programId,
          };

          console.log({ initializeStoredNumAccounts });

          await program.methods
            .initializeStoredNum()
            .accounts(initializeStoredNumAccounts)
            .rpc();

          setValue(0);
        } catch (initErr) {
          console.error('Error initializing stored num account', initErr);
        }
      } else {
        console.error('Error while retrieving stored num', err);
      }
    }
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
