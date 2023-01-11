package keeper

import (
	"context"

	"github.com/ChengYu97/SChat/x/schat/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) GetConversationKey(goCtx context.Context, msg *types.MsgGetConversationKey) (*types.MsgGetConversationKeyResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgGetConversationKeyResponse{}, nil
}
