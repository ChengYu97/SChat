package rsa2048

import (
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"encoding/pem"
)

type RSA2048PubKey struct {
	key *rsa.PublicKey
}

func (pubKey *RSA2048PubKey) Type() string {
	return "rsa2048pub"
}

func (pubKey *RSA2048PubKey) Marshal() []byte {
	derStream := x509.MarshalPKCS1PublicKey(pubKey.key)
	block := &pem.Block{
		Type:  "RSA PUBLIC KEY",
		Bytes: derStream,
	}
	return pem.EncodeToMemory(block)
}

func (pubKey *RSA2048PubKey) Unmarshal(b []byte) error {
	block, _ := pem.Decode(b)
	key, err := x509.ParsePKCS1PublicKey(block.Bytes)
	if err != nil {
		return err
	}
	pubKey.key = key
	return nil
}

func (pubKey *RSA2048PubKey) Encrypt(msg []byte) ([]byte, error) {
	return rsa.EncryptPKCS1v15(rand.Reader, pubKey.key, msg)
}
