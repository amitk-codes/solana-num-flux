import { Drawer } from "@mui/material";
import dynamic from "next/dynamic";
import { useState } from "react";
import { CgMenuRightAlt } from "react-icons/cg";
import InitializeButton from "../InitializeButton";

// dynamic import for Solana Wallet Button
const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

export function MobileDrawer() {
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
          <InitializeButton />

          {/* Wallet Connect Button */}
          <WalletMultiButtonDynamic style={{ maxHeight: '40px' }} />
        </div>
      </Drawer>
    </div>
  );
}
