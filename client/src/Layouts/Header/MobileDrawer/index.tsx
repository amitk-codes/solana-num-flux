import { Drawer } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { CgMenuRightAlt } from "react-icons/cg";

// dynamic import for Solana Wallet Button
const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

export function MobileDrawer() {
  const walletAdapter = useWallet();
  const isInitializeBtnDisabled = useMemo(() => !(walletAdapter && walletAdapter.connected), [walletAdapter])
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <div>
      <button className="bg-theme-default p-1 rounded" onClick={() => setOpen(true)}>
        <CgMenuRightAlt className="text-white text-2xl" />
      </button>

      <Drawer
        open={open}
        onClose={handleClose}
        anchor="right"
        sx={{ zIndex: '900' }}
      >
        <div className='flex flex-col items-center justify-center p-5 gap-4 min-w-[200px]'>
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
      </Drawer>
    </div>
  );
}
