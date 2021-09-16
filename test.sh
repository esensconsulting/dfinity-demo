dfx canister call twitchdemo greet '("all")'
dfx canister call twitchdemo insert '("Anthony", record { desc="test"; phone="123456789"; })'
dfx canister call twitchdemo lookup '("Anthony")'