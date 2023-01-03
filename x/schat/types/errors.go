package types

// DONTCOVER

import (
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// x/schat module sentinel errors
var (
	ErrSample = sdkerrors.Register(ModuleName, 1100, "sample error")
)

var (
	ErrAddressHasBeenCertified = sdkerrors.Register(ModuleName, 1201, "Current address has been certified")
)
