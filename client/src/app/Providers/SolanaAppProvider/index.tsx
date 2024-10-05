import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useMemo, useState } from "react"
import { Program, AnchorProvider } from "@coral-xyz/anchor";
import solanaNumFluxIdl from "@/app/constants/solana_num_flux.json"
import { USER_TAG } from "@/app/constants"
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react"
import { PublicKey } from "@solana/web3.js"
import { ISolanaNumFlux } from "@/types/SolanaNumFlux";

interface ISolanaAppContext {
  isTxPending: boolean;
  setIsTxPending: Dispatch<SetStateAction<boolean>>;
  isInitialized: boolean;
  setIsInitialized: Dispatch<SetStateAction<boolean>>;
  isWalletConnected: boolean;
  userProfilePDA: PublicKey | null;
  program: Program<ISolanaNumFlux> | undefined;
  isLoading: boolean;
}

const SolanaAppContext = createContext<ISolanaAppContext | null>(null)

export function SolanaAppProvider({ children }: { children: ReactNode }) {
  const { publicKey, connected } = useWallet()
  const anchorWallet = useAnchorWallet()
  const { connection } = useConnection()

  const [isTxPending, setIsTxPending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [userProfilePDA_state, setUserProfilePDA_state] = useState<PublicKey | null>(null)

  const isWalletConnected = useMemo(() => (connected), [connected])

  const program: Program<ISolanaNumFlux> | undefined = useMemo(() => {
    if (!anchorWallet) return;
    const provider = new AnchorProvider(connection, anchorWallet, AnchorProvider.defaultOptions());
    return new Program<ISolanaNumFlux>(solanaNumFluxIdl as ISolanaNumFlux, provider);
  }, [anchorWallet, connection]);


  useEffect(() => {
    const findUserProfile = async () => {
      try {
        setIsLoading(true);
        if (publicKey && program) {
          const [userProfilePDA, _] = PublicKey.findProgramAddressSync([Buffer.from(USER_TAG), publicKey.toBuffer()], program.programId)
          setUserProfilePDA_state(userProfilePDA)
          const fetchedUserProfile = await program.account.userProfile.fetch(userProfilePDA);
          if (fetchedUserProfile) {
            setIsInitialized(true);
          } else {
            setIsInitialized(false);
          }
        }else{
          setIsInitialized(false);
        }
      } catch (err) {
        setIsInitialized(false);
      } finally {
        setIsLoading(false);
      }
    }

    findUserProfile();
  }, [publicKey, program])

  return (
    <SolanaAppContext.Provider value={{ isInitialized, setIsInitialized, isTxPending, setIsTxPending, program, isWalletConnected, userProfilePDA: userProfilePDA_state, isLoading }}>
      {children}
    </SolanaAppContext.Provider>
  )
}

export const useSolanaAppContext = () => {
  return useContext(SolanaAppContext);
};