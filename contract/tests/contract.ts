import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SolanaNumFlux } from "../target/types/solana_num_flux";
import { Keypair, LAMPORTS_PER_SOL, SystemProgram, PublicKey } from "@solana/web3.js"
import { assert } from "chai";

describe("solana_num_flux", () => {
  // Configure the client to use the local cluster.

  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider);

  const { connection } = provider;

  const program = anchor.workspace.SolanaNumFlux as Program<SolanaNumFlux>;

  // Technically, we have to check whether user has the authority of the fetched account 
  it("initializes the user profile", async () => {
    const user = Keypair.generate();
    const { publicKey: userPubkey } = user

    // Requesting the airdrop so that it can pay the tx fees and cover the rent-exemption
    const airdropTxSignature = await connection.requestAirdrop(userPubkey, 2 * LAMPORTS_PER_SOL);

    // We have requested the airdrop but we have to wait till this is confirmed
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()
    await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature: airdropTxSignature }, 'confirmed');


    const [userProfilePDA, bump] = PublicKey.findProgramAddressSync(
      [Buffer.from("USER_STATE"), user.publicKey.toBuffer()],
      program.programId
    )

    const initilizeAccounts = {
      authority: userPubkey,
      userProfile: userProfilePDA,
      systemProgram: SystemProgram.programId
    }
    await program.methods
      .initializeUser()
      .accounts(initilizeAccounts)
      .signers([user])
      .rpc();

    const fetchedUserProfile = await program.account.userProfile.fetch(userProfilePDA);

    assert.ok(fetchedUserProfile.authority.equals(userPubkey));

  });
});
