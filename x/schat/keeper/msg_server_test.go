package keeper_test

import (
	"context"
	"testing"

	keepertest "github.com/ChengYu97/SChat/testutil/keeper"
	"github.com/ChengYu97/SChat/x/schat/keeper"
	"github.com/ChengYu97/SChat/x/schat/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.SchatKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
