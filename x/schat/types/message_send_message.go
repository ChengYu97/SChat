package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgSendMessage = "send_message"

var _ sdk.Msg = &MsgSendMessage{}

func NewMsgSendMessage(creator string, hashParticipant string, message string) *MsgSendMessage {
	return &MsgSendMessage{
		Creator:         creator,
		HashParticipant: hashParticipant,
		Message:         message,
	}
}

func (msg *MsgSendMessage) Route() string {
	return RouterKey
}

func (msg *MsgSendMessage) Type() string {
	return TypeMsgSendMessage
}

func (msg *MsgSendMessage) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgSendMessage) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgSendMessage) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
