use anchor_lang::prelude::*;

pub mod constant;
pub mod states;
use crate::{constant::*, states::*};

declare_id!("FFa222U5TqycjB4EBYF26NXMyrZHBoLNPMH842oLjHrV");

#[program]
pub mod solana_num_flux {
    use super::*;

    pub fn initialize_user(ctx: Context<InitializeUser>) -> Result<()> {
        // Grabbing the user_profile as a mutable reference
        let user_profile = &mut ctx.accounts.user_profile;

        // updating the authority property of our fetched user_profile
        user_profile.authority = ctx.accounts.authority.key();

        Ok(())
    }

    pub fn initialize_stored_num(ctx: Context<InitializeStoredNum>) -> Result<()> {
        let stored_num_account = &mut ctx.accounts.stored_num_account;
        let history_account = &mut ctx.accounts.history_account;

        stored_num_account.authority = ctx.accounts.authority.key();
        history_account.authority = ctx.accounts.authority.key();

        // the initial value of stored_num should be 0
        stored_num_account.stored_num = 0;

        // the history account should be empty in starting
        history_account.records = Vec::new();
        Ok(())
    }

    pub fn shift_stored_num(ctx: Context<ShiftStoredNum>, direction: ShiftDirection) -> Result<()> {
        let stored_num_account = &mut ctx.accounts.stored_num_account;
        let history_account = &mut ctx.accounts.history_account;

        match direction {
            ShiftDirection::Increment => {
                stored_num_account.stored_num =
                    stored_num_account.stored_num.checked_add(1).unwrap()
            }
            ShiftDirection::Decrement => {
                stored_num_account.stored_num =
                    stored_num_account.stored_num.checked_sub(1).unwrap()
            }
        };

        let clock = Clock::get().unwrap(); // fetching current timestamp
        let record = OperationsRecord {
            timestamp: clock.unix_timestamp,
            shift_direction: direction,
            final_value: stored_num_account.stored_num,
        };

        history_account.records.push(record);

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction()]
pub struct InitializeUser<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
    init,
    seeds = [USER_TAG, authority.key().as_ref()],
    bump,
    payer = authority,
    space = std::mem::size_of::<UserProfile>() + 8,
  )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction()]
pub struct InitializeStoredNum<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        seeds = [USER_TAG, authority.key().as_ref()],
        bump,
        has_one = authority
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    #[account(
        init,
        seeds = [STORED_NUM_TAG, authority.key().as_ref()],
        bump,
        payer = authority,
        space = std::mem::size_of::<StoredNumAccount>() + 8,
    )]
    pub stored_num_account: Box<Account<'info, StoredNumAccount>>,

    #[account(
        init,
        seeds = [HISTORY_TAG, authority.key().as_ref()],
        bump,
        payer = authority,
        space = 8 + (10 * (std::mem::size_of::<HistoryAccount>()))
    )]
    pub history_account: Box<Account<'info, HistoryAccount>>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(direction: ShiftDirection)]
pub struct ShiftStoredNum<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        seeds = [USER_TAG, authority.key().as_ref()],
        bump,
        has_one = authority
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    #[account(
        mut,
        seeds = [STORED_NUM_TAG, authority.key().as_ref()],
        bump,
        has_one = authority
    )]
    pub stored_num_account: Box<Account<'info, StoredNumAccount>>,

    #[account(
        mut,
        seeds = [HISTORY_TAG, authority.key().as_ref()],
        bump,
        has_one = authority
    )]
    pub history_account: Box<Account<'info, HistoryAccount>>,

    pub system_program: Program<'info, System>,
}
