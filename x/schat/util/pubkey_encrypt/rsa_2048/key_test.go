package rsa2048_test

import (
	"testing"

	pubkeyencrypt "github.com/ChengYu97/SChat/x/schat/util/pubkey_encrypt"
	rsa2048 "github.com/ChengYu97/SChat/x/schat/util/pubkey_encrypt/rsa_2048"

	"github.com/ChengYu97/SChat/x/schat/util/conv"

	"github.com/stretchr/testify/require"
)

var priKey pubkeyencrypt.PriKey
var pubKey pubkeyencrypt.PubKey

func TestGenRsa(t *testing.T) {
	priKey, err := rsa2048.GenPriKey()
	require.Nil(t, err)

	priKeyByte := priKey.Marshal()
	priKeyString := conv.UnsafeBytesToStr(priKeyByte)
	priKeyByteFromString := conv.UnsafeStrToBytes(priKeyString)

	var priKeyUnmarshal rsa2048.RSA2048PriKey
	err = priKeyUnmarshal.Unmarshal(priKeyByteFromString)
	require.Nil(t, err)
	require.Equal(t, &priKeyUnmarshal, priKey)
}

func TestEnDecrypt(t *testing.T) {
	priKey, _ = rsa2048.GenPriKey()
	pubKey = priKey.PubKey()
	srcMsg := "I'm not a cipher text"
	srcMsgByte := conv.UnsafeStrToBytes(srcMsg)
	cipherText, err := pubKey.Encrypt(srcMsgByte)
	require.Nil(t, err)

	decryptMsgByte, err := priKey.Decrypt(cipherText)
	require.Nil(t, err)
	require.Equal(t, srcMsgByte, decryptMsgByte)
	decryptMsg := conv.UnsafeBytesToStr(decryptMsgByte)
	require.Equal(t, srcMsg, decryptMsg)
}

func TestEncryptRand(t *testing.T) {
	srcMsg := "I'm not a cipher text"
	srcMsgByte := conv.UnsafeStrToBytes(srcMsg)
	cipherText1, err := pubKey.Encrypt(srcMsgByte)
	require.Nil(t, err)
	cipherText2, err := pubKey.Encrypt(srcMsgByte)
	require.Nil(t, err)
	require.NotEqual(t, cipherText1, cipherText2)
}
