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

  let user: Keypair;
  let userProfilePDA: PublicKey;
  let storedNumPDA: PublicKey;
  let historyPDA: PublicKey;

  // Function to initialize the user profile and return the userProfilePDA
  async function createUserProfileAndReturnUserProfilePDA() {
    await requestAirdrop(user.publicKey);

    const [userProfilePDA, bump] = PublicKey.findProgramAddressSync(
      [Buffer.from("USER_STATE"), user.publicKey.toBuffer()],
      program.programId
    );

    const initializeUserAccounts = {
      authority: user.publicKey,
      userProfile: userProfilePDA,
      systemProgram: SystemProgram.programId,
    };

    await program.methods
      .initializeUser()
      .accounts(initializeUserAccounts)
      .signers([user])
      .rpc();

    return userProfilePDA;
  }

  // Function to initialize the stored number account and return both storedNumPDA and historyPDA
  async function createStoredNumAccountAndReturnItsPDA() {
    const [storedNumPDA, bump] = PublicKey.findProgramAddressSync(
      [Buffer.from("STORED_NUM_STATE"), user.publicKey.toBuffer()],
      program.programId
    );

    const [historyPDA, _] = PublicKey.findProgramAddressSync(
      [Buffer.from("HISTORY_STATE"), user.publicKey.toBuffer()],
      program.programId
    );

    const initializeStoredNumAccounts = {
      authority: user.publicKey,
      userProfile: userProfilePDA,
      storedNumAccount: storedNumPDA,
      systemProgram: SystemProgram.programId,
    };

    await program.methods
      .initializeStoredNum()
      .accounts(initializeStoredNumAccounts)
      .signers([user])
      .rpc();

    return { storedNumPDA, historyPDA };
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
    userProfilePDA = await createUserProfileAndReturnUserProfilePDA();
    const pdas = await createStoredNumAccountAndReturnItsPDA();
    storedNumPDA = pdas.storedNumPDA;
    historyPDA = pdas.historyPDA;
  });

  // This will run before each test is started to run
  beforeEach(async () => {
    await requestAirdrop(user.publicKey);
  });

  // Technically, we have to check whether user has the authority of the fetched account 
  it("fetches the user profile after it is successfully initialized", async () => {
    const fetchedUserProfile = await program.account.userProfile.fetch(userProfilePDA);
    assert.ok(fetchedUserProfile.authority.equals(user.publicKey));
  });

  // Technically, we have to check whether user has the authority of the fetched stored num account and stored num value is 0
  it("fetches the stored num account after it is successfully initialized", async () => {
    const fetchedStoredNumAccount = await program.account.storedNumAccount.fetch(storedNumPDA);
    assert.ok(fetchedStoredNumAccount.authority.equals(user.publicKey));
    assert.strictEqual(fetchedStoredNumAccount.storedNum.toString(), '0');
  });

  it("increments the stored number and records the operation in history", async () => {
    const shiftStoredNumAccounts = {
      authority: user.publicKey,
      userProfile: userProfilePDA,
      storedNumAccount: storedNumPDA,
      systemProgram: SystemProgram.programId
    };

    await program.methods
      .shiftStoredNum({ increment: {} }) // Incremented to 1
      .accounts(shiftStoredNumAccounts)
      .signers([user])
      .rpc();

    const fetchedStoredNumAccount = await program.account.storedNumAccount.fetch(storedNumPDA);
    assert.strictEqual(fetchedStoredNumAccount.storedNum.toString(), '1');

    // Fetch the history and verify that the operation is recorded
    const fetchedHistoryAccount = await program.account.historyAccount.fetch(historyPDA);
    assert.strictEqual(fetchedHistoryAccount.records.length, 1);

    const record = fetchedHistoryAccount.records[0];
    assert.strictEqual(record.finalValue.toString(), '1');
    assert.deepStrictEqual(record.shiftDirection, { increment: {} });
  });

  // This test performs multiple shift operations and verifies that all operations are correctly recorded in history
  it("increments and decrements the stored number, and verifies the history records", async () => {
    const shiftStoredNumAccounts = {
      authority: user.publicKey,
      userProfile: userProfilePDA,
      storedNumAccount: storedNumPDA,
      systemProgram: SystemProgram.programId
    };

    // Perform multiple shift operations
    await program.methods
      .shiftStoredNum({ increment: {} }) // Incremented to 2 (since it got already incremented to 1)
      .accounts(shiftStoredNumAccounts)
      .signers([user])
      .rpc();

    await program.methods
      .shiftStoredNum({ increment: {} }) // Incremented to 3
      .accounts(shiftStoredNumAccounts)
      .signers([user])
      .rpc();

    await program.methods
      .shiftStoredNum({ decrement: {} }) // Decremented to 2
      .accounts(shiftStoredNumAccounts)
      .signers([user])
      .rpc();

    // Fetch and verify the stored num after the operations
    const fetchedStoredNumAccount = await program.account.storedNumAccount.fetch(storedNumPDA);
    assert.strictEqual(fetchedStoredNumAccount.storedNum.toString(), '2');

    const fetchedHistoryAccount = await program.account.historyAccount.fetch(historyPDA);
    assert.strictEqual(fetchedHistoryAccount.records.length, 4);

    const firstRecord = fetchedHistoryAccount.records[1]; // Increment to 2
    assert.strictEqual(firstRecord.finalValue.toString(), '2');
    assert.deepStrictEqual(firstRecord.shiftDirection, { increment: {} });

    const lastRecord = fetchedHistoryAccount.records[3]; // Decrement to 2
    assert.strictEqual(lastRecord.finalValue.toString(), '2');
    assert.deepStrictEqual(lastRecord.shiftDirection, { decrement: {} });
  });
});
