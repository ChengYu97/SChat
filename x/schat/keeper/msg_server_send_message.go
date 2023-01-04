package keeper

import (
	"context"

	"github.com/ChengYu97/SChat/x/schat/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func (k msgServer) SendMessage(goCtx context.Context, msg *types.MsgSendMessage) (*types.MsgSendMessageResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	conversation, found := k.Keeper.GetStoredConversation(ctx, msg.HashParticipant)
	if !found {
		return nil, sdkerrors.Wrapf(types.ErrConversationNotFound, "%s", msg.HashParticipant)
	}
	if _, found := conversation.Participant[msg.Creator]; !found {
		return nil, sdkerrors.Wrapf(types.ErrNoConversationAccess, "%s", msg.Creator)
	}

	conversation.Message = append(conversation.Message, "address:"+msg.Creator+":"+msg.Message)
	k.Keeper.SetStoredConversation(ctx, conversation)

	return &types.MsgSendMessageResponse{}, nil
}
