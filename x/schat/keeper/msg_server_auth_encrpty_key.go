package keeper

import (
	"context"

	"github.com/ChengYu97/SChat/x/schat/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func (k msgServer) AuthEncrptyKey(goCtx context.Context, msg *types.MsgAuthEncrptyKey) (*types.MsgAuthEncrptyKeyResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	encryptKey, found := k.Keeper.GetEncryptKey(ctx, msg.Creator)
	if found {
		return nil, sdkerrors.Wrapf(types.ErrAddressHasBeenCertified, "creator: %s, encrpty key: %s", msg.Creator, encryptKey.Key)
	}

	newEncryptKey := types.EncryptKey{
		Address: msg.Creator,
		Key:     msg.Key,
	}
	k.Keeper.SetEncryptKey(ctx, newEncryptKey)
	total := len(k.Keeper.GetAllEncryptKey(ctx))

	return &types.MsgAuthEncrptyKeyResponse{Success: true, KeyTotal: uint64(total)}, nil
}
