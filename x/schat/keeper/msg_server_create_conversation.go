package keeper

import (
	"context"

	"crypto/sha256"

	"github.com/ChengYu97/SChat/x/schat/types"
	"github.com/ChengYu97/SChat/x/schat/util/conv"
	rsa2048 "github.com/ChengYu97/SChat/x/schat/util/pubkey_encrypt/rsa_2048"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func (k msgServer) CreateConversation(goCtx context.Context, msg *types.MsgCreateConversation) (*types.MsgCreateConversationResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	creatorKey, found := k.Keeper.GetEncryptKey(ctx, msg.Creator)
	if !found {
		return nil, sdkerrors.Wrapf(types.ErrConversationParticipantNotCertified, "%s", msg.Creator)
	}

	// cacl hash participant
	participants := make(map[string]string)
	participants[msg.Creator] = creatorKey.Key
	hasher := sha256.New()
	_, err := hasher.Write(conv.UnsafeStrToBytes(msg.Creator))
	sdkerrors.AssertNil(err)
	for i := 0; i < len(msg.Participant); i++ {
		participant := msg.GetParticipant()[i]
		_, err = hasher.Write(conv.UnsafeStrToBytes(participant))
		sdkerrors.AssertNil(err)

		// get participant's encrypt key
		encryptKey, found := k.Keeper.GetEncryptKey(ctx, participant)
		if !found {
			return nil, sdkerrors.Wrapf(types.ErrConversationParticipantNotCertified, "%s", msg.Creator)
		}
		participants[participant] = encryptKey.Key
	}
	hashParticipant := conv.ArrayByte2Uint(hasher.Sum(nil))

	// check if conversation exist
	_, found = k.Keeper.GetStoredConversation(ctx, hashParticipant)
	if found {
		return &types.MsgCreateConversationResponse{
			HashParticipant: hashParticipant,
		}, nil
	}

	// generate rsa key
	priKey, err := rsa2048.GenPriKey()
	sdkerrors.AssertNil(err)
	pubKey := priKey.PubKey()

	// Save pubkey as encrpty key, and private key encrypted by participant's encrypt key
	conversation := &types.StoredConversation{
		HashParticipant: hashParticipant,
		EncryptKey:      conv.UnsafeBytesToStr(pubKey.Marshal()),
		DecryptKey:      make(map[string]string),
	}
	for address, key := range participants {
		if key == "" {
			continue
		}
		partiPubkey := &rsa2048.RSA2048PubKey{}
		err := partiPubkey.Unmarshal(conv.UnsafeStrToBytes(key))
		if err != nil {
			continue
		}

		cipherPriKey, err := partiPubkey.EncryptLongMessage(priKey.Marshal())
		if err != nil {
			continue
		}
		conversation.DecryptKey[address] = conv.UnsafeBytesToStr(cipherPriKey)
	}
	k.Keeper.SetStoredConversation(ctx, *conversation)

	return &types.MsgCreateConversationResponse{
		HashParticipant: hashParticipant,
	}, nil
}
