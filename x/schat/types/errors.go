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
	// auth address key
	ErrAddressHasBeenCertified = sdkerrors.Register(ModuleName, 1201, "Current address has been certified")

	// create conversation
	ErrConversationExist               = sdkerrors.Register(ModuleName, 1211, "Current address has been certified")
	ErrConversationCreatorNotCertified = sdkerrors.Register(ModuleName, 1212, "The key of the conversation creator must be certified")

	// util
	// public encrypt
	ErrRsaGenPriKey = sdkerrors.Register(ModuleName, 1311, "Failed to gen rsa private key")
)
