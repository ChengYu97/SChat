package keeper_test

import (
	"strconv"
	"testing"

	keepertest "github.com/ChengYu97/SChat/testutil/keeper"
	"github.com/ChengYu97/SChat/testutil/nullify"
	"github.com/ChengYu97/SChat/x/schat/keeper"
	"github.com/ChengYu97/SChat/x/schat/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func createNStoredConversation(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.StoredConversation {
	items := make([]types.StoredConversation, n)
	for i := range items {
		items[i].HashParticipant = strconv.Itoa(i)

		keeper.SetStoredConversation(ctx, items[i])
	}
	return items
}

func TestStoredConversationGet(t *testing.T) {
	keeper, ctx := keepertest.SchatKeeper(t)
	items := createNStoredConversation(keeper, ctx, 10)
	for _, item := range items {
		rst, found := keeper.GetStoredConversation(ctx,
			item.HashParticipant,
		)
		require.True(t, found)
		require.Equal(t,
			nullify.Fill(&item),
			nullify.Fill(&rst),
		)
	}
}
func TestStoredConversationRemove(t *testing.T) {
	keeper, ctx := keepertest.SchatKeeper(t)
	items := createNStoredConversation(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveStoredConversation(ctx,
			item.HashParticipant,
		)
		_, found := keeper.GetStoredConversation(ctx,
			item.HashParticipant,
		)
		require.False(t, found)
	}
}

func TestStoredConversationGetAll(t *testing.T) {
	keeper, ctx := keepertest.SchatKeeper(t)
	items := createNStoredConversation(keeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keeper.GetAllStoredConversation(ctx)),
	)
}
