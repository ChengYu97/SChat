package pubkeyencrypt

type PubKey interface {
	Encrypt(msg []byte) ([]byte, error)
	Marshal() []byte
	Unmarshal(pubKey []byte) error
	Type() string
}

type PriKey interface {
	Decrypt(encryptMsg []byte) ([]byte, error)
	PubKey() PubKey
	Marshal() []byte
	Unmarshal(priKey []byte) error
	Type() string
}
