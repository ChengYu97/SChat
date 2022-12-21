package keeper_test

import (
	"testing"

	testkeeper "github.com/ChengYu97/SChat/testutil/keeper"
	"github.com/ChengYu97/SChat/x/schat/types"
	"github.com/stretchr/testify/require"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.SchatKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
