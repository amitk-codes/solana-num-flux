use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct UserProfile{
  pub authority: Pubkey,
}

#[account]
#[derive(Default)]
pub struct StoredNumAccount{
  pub authority: Pubkey,
  pub stored_num: u64,
}