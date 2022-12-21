package types

import "encoding/binary"

var _ binary.ByteOrder

const (
	// EncryptKeyKeyPrefix is the prefix to retrieve all EncryptKey
	EncryptKeyKeyPrefix = "EncryptKey/value/"
)

// EncryptKeyKey returns the store key to retrieve a EncryptKey from the index fields
func EncryptKeyKey(
	address string,
) []byte {
	var key []byte

	addressBytes := []byte(address)
	key = append(key, addressBytes...)
	key = append(key, []byte("/")...)

	return key
}
