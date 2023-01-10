package rsa2048

import (
	"bytes"
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"

	pubkeyencrypt "github.com/ChengYu97/SChat/x/schat/util/pubkey_encrypt"

	"encoding/pem"
	"io"
)

type RSA2048PriKey struct {
	key *rsa.PrivateKey
}

func (pubKey *RSA2048PriKey) Type() string {
	return "rsa2048pri"
}

func GenPriKey() (*RSA2048PriKey, error) {
	return genPriKey(rand.Reader)
}

func genPriKey(rand io.Reader) (*RSA2048PriKey, error) {
	priKey, err := rsa.GenerateKey(rand, 2048)
	if err != nil {
		return nil, err
	}
	return &RSA2048PriKey{
		key: priKey,
	}, nil
}

func (priKey *RSA2048PriKey) Marshal() []byte {
	derStream := x509.MarshalPKCS1PrivateKey(priKey.key)
	block := &pem.Block{
		Type:  "RSA PRIVATE KEY",
		Bytes: derStream,
	}
	return pem.EncodeToMemory(block)
}

func (priKey *RSA2048PriKey) Unmarshal(b []byte) error {
	block, _ := pem.Decode(b)
	key, err := x509.ParsePKCS1PrivateKey(block.Bytes)
	if err != nil {
		return err
	}
	priKey.key = key
	return nil
}

func (priKey *RSA2048PriKey) PubKey() pubkeyencrypt.PubKey {
	return &RSA2048PubKey{
		key: &priKey.key.PublicKey,
	}
}

func (priKey *RSA2048PriKey) Decrypt(cipherMsg []byte) ([]byte, error) {
	return rsa.DecryptPKCS1v15(rand.Reader, priKey.key, cipherMsg)
}

func (priKey *RSA2048PriKey) DecryptLongMessage(msg []byte) (result []byte, err error) {
	sliceMsg := bytes.Split(msg, pubkeyencrypt.MsgSplitFlag)

	for _, cipherMsg := range sliceMsg {
		if len(cipherMsg) == 0 {
			continue
		}
		partMsg, err := rsa.DecryptPKCS1v15(rand.Reader, priKey.key, cipherMsg)
		if err != nil {
			return nil, err
		}
		result = append(result, partMsg...)
	}
	return
}
