use anchor_lang::prelude::*;

declare_id!("FFa222U5TqycjB4EBYF26NXMyrZHBoLNPMH842oLjHrV");

#[program]
pub mod contract {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
