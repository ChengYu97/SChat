package types

import (
	"encoding/binary"

	"github.com/ChengYu97/SChat/x/schat/util/conv"
)

var _ binary.ByteOrder

const (
	// StoredConversationKeyPrefix is the prefix to retrieve all StoredConversation
	StoredConversationKeyPrefix = "StoredConversation/value/"
)

// StoredConversationKey returns the store key to retrieve a StoredConversation from the index fields
func StoredConversationKey(
	hashParticipant []uint32,
) []byte {
	var key []byte

	hashParticipantBytes := conv.ArrayUint2Byte(hashParticipant)
	key = append(key, hashParticipantBytes...)
	key = append(key, []byte("/")...)

	return key
}
