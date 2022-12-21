package types

import "encoding/binary"

var _ binary.ByteOrder

const (
	// StoredConversationKeyPrefix is the prefix to retrieve all StoredConversation
	StoredConversationKeyPrefix = "StoredConversation/value/"
)

// StoredConversationKey returns the store key to retrieve a StoredConversation from the index fields
func StoredConversationKey(
	hashParticipant string,
) []byte {
	var key []byte

	hashParticipantBytes := []byte(hashParticipant)
	key = append(key, hashParticipantBytes...)
	key = append(key, []byte("/")...)

	return key
}
