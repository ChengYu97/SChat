package keeper

import (
	"context"

	"github.com/ChengYu97/SChat/x/schat/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) AuthEncrptyKey(goCtx context.Context, msg *types.MsgAuthEncrptyKey) (*types.MsgAuthEncrptyKeyResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgAuthEncrptyKeyResponse{}, nil
}
