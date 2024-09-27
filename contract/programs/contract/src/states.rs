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

#[account]
#[derive(Default)]
pub struct HistoryAccount{
  pub authority: Pubkey,
  pub records: Vec<OperationsRecord>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct OperationsRecord{
  pub timestamp: i64,
  pub final_value: u64,
  pub shift_direction: ShiftDirection,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub enum ShiftDirection {
    Increment,
    Decrement,
}
