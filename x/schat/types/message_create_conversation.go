package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgCreateConversation = "create_conversation"

var _ sdk.Msg = &MsgCreateConversation{}

func NewMsgCreateConversation(creator string, participant []string) *MsgCreateConversation {
	return &MsgCreateConversation{
		Creator:     creator,
		Participant: participant,
	}
}

func (msg *MsgCreateConversation) Route() string {
	return RouterKey
}

func (msg *MsgCreateConversation) Type() string {
	return TypeMsgCreateConversation
}

func (msg *MsgCreateConversation) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCreateConversation) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateConversation) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
