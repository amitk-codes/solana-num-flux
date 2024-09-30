import Image from "next/image";

export function WalletNotConnect() {
  return (
    <div className="wallet-not-connect-card flex flex-col justify-center items-center gap-8">
      <Image src={"/assets/icons/wallet.png"} width={80} height={80} alt="wallet icon" />
      <h6 className="text-red-950 text-xl font-semibold">Connect Wallet To Proceed</h6>
    </div>
  )
}