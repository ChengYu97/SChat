package keeper

import (
	"context"
	"strings"

	"github.com/ChengYu97/SChat/x/schat/types"
	"github.com/ChengYu97/SChat/x/schat/util/conv"
	rsa2048 "github.com/ChengYu97/SChat/x/schat/util/pubkey_encrypt/rsa_2048"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func (k msgServer) AuthEncrptyKey(goCtx context.Context, msg *types.MsgAuthEncrptyKey) (*types.MsgAuthEncrptyKeyResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	encryptKey, found := k.Keeper.GetEncryptKey(ctx, msg.Creator)
	if found {
		return nil, sdkerrors.Wrapf(types.ErrAddressHasBeenCertified, "creator: %s, encrpty key: %s", msg.Creator, encryptKey.Key)
	}

	pemKey := strings.Replace(strings.TrimSpace(msg.Key), "\\n", "\n", -1)
	pubKey := &rsa2048.RSA2048PubKey{}
	if err := pubKey.Unmarshal(conv.UnsafeStrToBytes(pemKey)); err != nil {
		return nil, err
	}

	newEncryptKey := types.EncryptKey{
		Address: msg.Creator,
		Key:     pemKey,
	}
	k.Keeper.SetEncryptKey(ctx, newEncryptKey)
	total := len(k.Keeper.GetAllEncryptKey(ctx))

	return &types.MsgAuthEncrptyKeyResponse{Success: true, KeyTotal: uint64(total)}, nil
}
