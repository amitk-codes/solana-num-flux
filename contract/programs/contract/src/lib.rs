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
