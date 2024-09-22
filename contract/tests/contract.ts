import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SolanaNumFlux } from "../target/types/solana_num_flux";
import { Keypair, LAMPORTS_PER_SOL, SystemProgram, PublicKey } from "@solana/web3.js"
import { assert } from "chai";

describe("solana_num_flux", () => {
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider);

  const { connection } = provider;

  const program = anchor.workspace.SolanaNumFlux as Program<SolanaNumFlux>;

  let user: Keypair
  let userProfilePDA: PublicKey;

  async function createUserProfileAndReturnUserProfilePDA() {
    await requestAirdrop(user.publicKey);

    const [userProfilePDA, bump] = PublicKey.findProgramAddressSync(
      [Buffer.from("USER_STATE"), user.publicKey.toBuffer()],
      program.programId
    )

    const initializeUserAccounts = {
      authority: user.publicKey,
      userProfile: userProfilePDA,
      systemProgram: SystemProgram.programId
    }

    await program.methods
      .initializeUser()
      .accounts(initializeUserAccounts)
      .signers([user])
      .rpc();

    return userProfilePDA
  }

  async function requestAirdrop(accountPubkey: PublicKey) {
    // Requesting the airdrop so that it can pay the tx fees and cover the rent-exemption
    const airdropTxSignature = await connection.requestAirdrop(accountPubkey, 2 * LAMPORTS_PER_SOL);

    // We have requested the airdrop but we have to wait till this is confirmed
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature: airdropTxSignature });
  }

  // This will run before the whole test is initialized
  before(async () => {
    user = Keypair.generate();
    userProfilePDA = await createUserProfileAndReturnUserProfilePDA()
  })

  // This will run before each test is started to run
  beforeEach(async () => {
    await requestAirdrop(user.publicKey)
  })

  // Technically, we have to check whether user has the authority of the fetched account 
  it("fetches the user profile after it is successfully initialized", async () => {
    const fetchedUserProfile = await program.account.userProfile.fetch(userProfilePDA);
    assert.ok(fetchedUserProfile.authority.equals(user.publicKey))
  });

  // Technically, we have to check whether user has the authority of the fetch stored num account and stored num value is 0
  it("initializes the stored number account", async () => {

    const [storedNumPDA, bump] = PublicKey.findProgramAddressSync(
      [Buffer.from("STORED_NUM_STATE"), user.publicKey.toBuffer()],
      program.programId
    );

    const initializeStoredNumAccounts = {
      authority: user.publicKey,
      userProfile: userProfilePDA,
      storedNumAccount: storedNumPDA,
      systemProgram: SystemProgram.programId
    };

    await program.methods
      .initializeStoredNum()
      .accounts(initializeStoredNumAccounts)
      .signers([user])
      .rpc();

    const fetchedStoredNumAccount = await program.account.storedNumAccount.fetch(storedNumPDA);

    assert.ok(fetchedStoredNumAccount.authority.equals(user.publicKey));
    assert.strictEqual(fetchedStoredNumAccount.storedNum.toString(), '0');
  });


});
