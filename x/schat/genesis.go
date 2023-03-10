package schat

import (
	"github.com/ChengYu97/SChat/x/schat/keeper"
	"github.com/ChengYu97/SChat/x/schat/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// InitGenesis initializes the capability module's state from a provided genesis
// state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	// Set if defined
	k.SetSystemInfo(ctx, genState.SystemInfo)
	// Set all the encryptKey
	for _, elem := range genState.EncryptKeyList {
		k.SetEncryptKey(ctx, elem)
	}
	// Set all the storedConversation
	for _, elem := range genState.StoredConversationList {
		k.SetStoredConversation(ctx, elem)
	}
	// this line is used by starport scaffolding # genesis/module/init
	k.SetParams(ctx, genState.Params)
}

// ExportGenesis returns the capability module's exported genesis.
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()
	genesis.Params = k.GetParams(ctx)

	// Get all systemInfo
	systemInfo, found := k.GetSystemInfo(ctx)
	if found {
		genesis.SystemInfo = systemInfo
	}
	genesis.EncryptKeyList = k.GetAllEncryptKey(ctx)
	genesis.StoredConversationList = k.GetAllStoredConversation(ctx)
	// this line is used by starport scaffolding # genesis/module/export

	return genesis
}
