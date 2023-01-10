package keeper

import (
	"github.com/ChengYu97/SChat/x/schat/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// SetStoredConversation set a specific storedConversation in the store from its index
func (k Keeper) SetStoredConversation(ctx sdk.Context, storedConversation types.StoredConversation) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.StoredConversationKeyPrefix))
	b := k.cdc.MustMarshal(&storedConversation)
	store.Set(types.StoredConversationKey(
		storedConversation.HashParticipant,
	), b)
}

// GetStoredConversation returns a storedConversation from its index
func (k Keeper) GetStoredConversation(
	ctx sdk.Context,
	hashParticipant []uint32,

) (val types.StoredConversation, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.StoredConversationKeyPrefix))

	b := store.Get(types.StoredConversationKey(
		hashParticipant,
	))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveStoredConversation removes a storedConversation from the store
func (k Keeper) RemoveStoredConversation(
	ctx sdk.Context,
	hashParticipant []uint32,

) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.StoredConversationKeyPrefix))
	store.Delete(types.StoredConversationKey(
		hashParticipant,
	))
}

// GetAllStoredConversation returns all storedConversation
func (k Keeper) GetAllStoredConversation(ctx sdk.Context) (list []types.StoredConversation) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.StoredConversationKeyPrefix))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.StoredConversation
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}
