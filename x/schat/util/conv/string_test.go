package conv_test

import (
	"testing"

	"github.com/ChengYu97/SChat/x/schat/util/conv"

	"github.com/stretchr/testify/require"
)

func TestStr2Byte(t *testing.T) {
	testStr1 := "i'm a test"
	testByte1 := conv.UnsafeStrToBytes(testStr1)
	require.Equal(t, 10, len(testByte1))
	require.Equal(t, 10, cap(testByte1))

	testByte2 := conv.UnsafeStrToBytes(testStr1[5:])
	require.Equal(t, 5, len(testByte2))
	require.Equal(t, 5, cap(testByte2))
}

func TestStrByte(t *testing.T) {
	testStr1 := "i'm a test"
	testByte := conv.UnsafeStrToBytes(testStr1)
	testStrConved := conv.UnsafeBytesToStr(testByte)
	require.Equal(t, "i'm a test", testStrConved)
}
