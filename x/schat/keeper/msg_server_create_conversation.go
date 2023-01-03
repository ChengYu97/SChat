package keeper

import (
	"context"

	"github.com/ChengYu97/SChat/x/schat/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) CreateConversation(goCtx context.Context, msg *types.MsgCreateConversation) (*types.MsgCreateConversationResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgCreateConversationResponse{}, nil
}
