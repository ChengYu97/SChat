package rsa2048

import (
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"encoding/pem"
	"math"

	"github.com/ChengYu97/SChat/x/schat/types"
	pubkeyencrypt "github.com/ChengYu97/SChat/x/schat/util/pubkey_encrypt"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
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
	if block == nil {
		return sdkerrors.Wrap(types.ErrRsaDecodePem, "Pubkey marshal parse pem fail")
	}

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

func (pubKey *RSA2048PubKey) EncryptLongMessage(msg []byte) (result []byte, err error) {
	sliceNum := int(math.Ceil(float64(len(msg)) / float64(pubkeyencrypt.EncryptMsgLen)))
	for i := 0; i < sliceNum; i++ {
		endIndex := (i + 1) * pubkeyencrypt.EncryptMsgLen
		if i == sliceNum-1 {
			endIndex = len(msg)
		}
		bResultSlice, err := rsa.EncryptPKCS1v15(rand.Reader, pubKey.key, msg[i*pubkeyencrypt.EncryptMsgLen:endIndex])
		if err != nil {
			return nil, err
		}
		result = append(result, bResultSlice...)
		result = append(result, pubkeyencrypt.MsgSplitFlag...)
	}
	return
}
