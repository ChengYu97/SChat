package keeper

import (
	"github.com/ChengYu97/SChat/x/schat/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// SetEncryptKey set a specific encryptKey in the store from its index
func (k Keeper) SetEncryptKey(ctx sdk.Context, encryptKey types.EncryptKey) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.EncryptKeyKeyPrefix))
	b := k.cdc.MustMarshal(&encryptKey)
	store.Set(types.EncryptKeyKey(
		encryptKey.Address,
	), b)
}

// GetEncryptKey returns a encryptKey from its index
func (k Keeper) GetEncryptKey(
	ctx sdk.Context,
	address string,

) (val types.EncryptKey, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.EncryptKeyKeyPrefix))

	b := store.Get(types.EncryptKeyKey(
		address,
	))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveEncryptKey removes a encryptKey from the store
func (k Keeper) RemoveEncryptKey(
	ctx sdk.Context,
	address string,

) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.EncryptKeyKeyPrefix))
	store.Delete(types.EncryptKeyKey(
		address,
	))
}

// GetAllEncryptKey returns all encryptKey
func (k Keeper) GetAllEncryptKey(ctx sdk.Context) (list []types.EncryptKey) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.EncryptKeyKeyPrefix))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.EncryptKey
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}
