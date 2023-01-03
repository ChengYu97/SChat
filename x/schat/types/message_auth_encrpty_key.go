package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgAuthEncrptyKey = "auth_encrpty_key"

var _ sdk.Msg = &MsgAuthEncrptyKey{}

func NewMsgAuthEncrptyKey(creator string, key string) *MsgAuthEncrptyKey {
	return &MsgAuthEncrptyKey{
		Creator: creator,
		Key:     key,
	}
}

func (msg *MsgAuthEncrptyKey) Route() string {
	return RouterKey
}

func (msg *MsgAuthEncrptyKey) Type() string {
	return TypeMsgAuthEncrptyKey
}

func (msg *MsgAuthEncrptyKey) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgAuthEncrptyKey) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgAuthEncrptyKey) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
