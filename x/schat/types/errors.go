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

	// msg
	// create conversation
	ErrConversationNotExist                = sdkerrors.Register(ModuleName, 1211, "Conversation not exists")
	ErrConversationParticipantNotCertified = sdkerrors.Register(ModuleName, 1212, "The key of the conversation creator must be certified")

	ErrConversationNotFound = sdkerrors.Register(ModuleName, 1221, "Conversation can't be found by current hashParticipant")
	ErrNoConversationAccess = sdkerrors.Register(ModuleName, 1222, "The creator of msg is not one of the conversation's participant")

	// util
	// public encrypt
	ErrRsaGenPriKey = sdkerrors.Register(ModuleName, 1311, "Failed to gen rsa private key")
	ErrRsaDecodePem = sdkerrors.Register(ModuleName, 1312, "Failed to parse pubkey from pem")
)
