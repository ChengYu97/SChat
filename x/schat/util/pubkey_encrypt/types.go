package pubkeyencrypt

import "github.com/ChengYu97/SChat/x/schat/util/conv"

var (
	MsgSplitFlag  = conv.UnsafeStrToBytes("MsgSplitFlag")
	EncryptMsgLen = 240
)

type PubKey interface {
	Encrypt(msg []byte) ([]byte, error)
	EncryptLongMessage(msg []byte) ([]byte, error)
	Marshal() []byte
	Unmarshal(pubKey []byte) error
	Type() string
}

type PriKey interface {
	Decrypt(encryptMsg []byte) ([]byte, error)
	DecryptLongMessage(msg []byte) ([]byte, error)
	PubKey() PubKey
	Marshal() []byte
	Unmarshal(priKey []byte) error
	Type() string
}
