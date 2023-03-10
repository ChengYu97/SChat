package schat_test

import (
	"testing"

	keepertest "github.com/ChengYu97/SChat/testutil/keeper"
	"github.com/ChengYu97/SChat/testutil/nullify"
	"github.com/ChengYu97/SChat/x/schat"
	"github.com/ChengYu97/SChat/x/schat/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		SystemInfo: types.SystemInfo{
			ConversationCount: 3,
		},
		EncryptKeyList: []types.EncryptKey{
			{
				Address: "0",
			},
			{
				Address: "1",
			},
		},
		StoredConversationList: []types.StoredConversation{
			{
				HashParticipant: "0",
			},
			{
				HashParticipant: "1",
			},
		},
		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.SchatKeeper(t)
	schat.InitGenesis(ctx, *k, genesisState)
	got := schat.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	require.Equal(t, genesisState.SystemInfo, got.SystemInfo)
	require.ElementsMatch(t, genesisState.EncryptKeyList, got.EncryptKeyList)
	require.ElementsMatch(t, genesisState.StoredConversationList, got.StoredConversationList)
	// this line is used by starport scaffolding # genesis/test/assert
}
