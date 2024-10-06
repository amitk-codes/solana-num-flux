import { HISTORY_TAG, STORED_NUM_TAG } from "@/app/constants";
import { useSolanaAppContext } from "@/app/Providers/SolanaAppProvider";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { FiMinus } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";

export default function CustomShiftButton({ type }: { type: 'increment' | 'decrement' }) {
  const { program, userProfilePDA } = useSolanaAppContext() || {}
  const { publicKey } = useWallet()
  const handleShift = async () => {
    if (!publicKey || !program || !userProfilePDA) return
    try {
      const [storedNumPDA] = PublicKey.findProgramAddressSync([Buffer.from(STORED_NUM_TAG), publicKey.toBuffer()], program.programId)
      const [historyPDA, _] = PublicKey.findProgramAddressSync([Buffer.from(HISTORY_TAG), publicKey.toBuffer()], program.programId);
      const shiftStoredNumAccounts = {
        authority: publicKey,
        userProfile: userProfilePDA,
        storedNumAccount: storedNumPDA,
        historyAccount: historyPDA,
        systemProgram: SystemProgram.programId,
      }
      await program.methods.shiftStoredNum({ [type]: {} })
        .accounts(shiftStoredNumAccounts)
        .rpc();

    } catch (err) {
      console.error("Error while shifting the stored num")
    }
  }

  return (
    <button onClick={handleShift} className={`${type === 'increment' ? 'increment-btn' : 'decrement-btn'}`}>
      <span className="back" />
      <span className="front">{type === 'increment' ? <IoMdAdd /> : <FiMinus />}</span>
    </button>
  )
}