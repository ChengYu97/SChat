package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgGetConversationKey = "get_conversation_key"

var _ sdk.Msg = &MsgGetConversationKey{}

func NewMsgGetConversationKey(creator string, hashParticipant []uint32) *MsgGetConversationKey {
	return &MsgGetConversationKey{
		Creator:         creator,
		HashParticipant: hashParticipant,
	}
}

func (msg *MsgGetConversationKey) Route() string {
	return RouterKey
}

func (msg *MsgGetConversationKey) Type() string {
	return TypeMsgGetConversationKey
}

func (msg *MsgGetConversationKey) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgGetConversationKey) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgGetConversationKey) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
