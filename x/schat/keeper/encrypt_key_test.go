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

func createNEncryptKey(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.EncryptKey {
	items := make([]types.EncryptKey, n)
	for i := range items {
		items[i].Address = strconv.Itoa(i)

		keeper.SetEncryptKey(ctx, items[i])
	}
	return items
}

func TestEncryptKeyGet(t *testing.T) {
	keeper, ctx := keepertest.SchatKeeper(t)
	items := createNEncryptKey(keeper, ctx, 10)
	for _, item := range items {
		rst, found := keeper.GetEncryptKey(ctx,
			item.Address,
		)
		require.True(t, found)
		require.Equal(t,
			nullify.Fill(&item),
			nullify.Fill(&rst),
		)
	}
}
func TestEncryptKeyRemove(t *testing.T) {
	keeper, ctx := keepertest.SchatKeeper(t)
	items := createNEncryptKey(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveEncryptKey(ctx,
			item.Address,
		)
		_, found := keeper.GetEncryptKey(ctx,
			item.Address,
		)
		require.False(t, found)
	}
}

func TestEncryptKeyGetAll(t *testing.T) {
	keeper, ctx := keepertest.SchatKeeper(t)
	items := createNEncryptKey(keeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keeper.GetAllEncryptKey(ctx)),
	)
}
