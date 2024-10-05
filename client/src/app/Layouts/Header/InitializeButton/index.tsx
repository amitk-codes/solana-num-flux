import CustomLoading from "@/app/components/CustomLoading";
import { useSolanaAppContext } from "@/app/Providers/SolanaAppProvider";
import { useWallet } from "@solana/wallet-adapter-react";
import { SystemProgram } from "@solana/web3.js";

export default function InitializeButton() {
  const { publicKey } = useWallet()
  const { isInitialized, setIsInitialized, isWalletConnected, program, userProfilePDA, isLoading } = useSolanaAppContext() || {}

  const initializeProfile = async () => {
    if (!program || !userProfilePDA || !setIsInitialized || !publicKey) return;
    try {
      const initializeUserAccounts = {
        authority: publicKey,
        userProfile: userProfilePDA,
        systemProgram: SystemProgram.programId,
      }
      await program.methods.initializeUser()
        .accounts(initializeUserAccounts)
        .rpc();

      setIsInitialized(true);
    } catch (err) {
      setIsInitialized(false);
    }
  }


  return (
    <button
      disabled={isInitialized || !isWalletConnected || isLoading}
      className={`border flex-center rounded font-bold px-6 shadow-[0_0_10px_0px_#512da8] active:shadow-none transition-all duration-300 min-w-[167px] min-h-[40px] 
              ${isInitialized || !isWalletConnected || isLoading
          ? 'border-gray-400 text-gray-400 cursor-not-allowed shadow-none'
          : 'border-theme-default text-theme-default'}`}

      onClick={initializeProfile}
    >
      {isLoading ? <CustomLoading size={22} /> : isInitialized ? 'Initialized' : 'Initialize Profile'}
    </button>
  )
}