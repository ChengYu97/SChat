package keeper

import (
	"context"

	"github.com/ChengYu97/SChat/x/schat/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func (k msgServer) GetConversationKey(goCtx context.Context, msg *types.MsgGetConversationKey) (*types.MsgGetConversationKeyResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	conversation, found := k.Keeper.GetStoredConversation(ctx, msg.HashParticipant)
	if !found {
		return nil, sdkerrors.Wrapf(types.ErrConversationNotExist, "%s", msg.HashParticipant)
	}

	decryptKey, ok := conversation.DecryptKey[msg.Creator]
	if !ok {
		return nil, sdkerrors.Wrapf(types.ErrNoConversationAccess, "%s", msg.Creator)
	}

	return &types.MsgGetConversationKeyResponse{
		Decrypt:    decryptKey,
		EncryptKey: conversation.EncryptKey}, nil
}
