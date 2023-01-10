package conv_test

import (
	"testing"

	"github.com/ChengYu97/SChat/x/schat/util/conv"
	"github.com/stretchr/testify/require"
)

func TestByte2UintConv(t *testing.T) {
	byteArray := []byte{244, 243, 242, 241, 2, 3, 4, 5}
	uintArray := conv.ArrayByte2Uint(byteArray)
	byteArray2 := conv.ArrayUint2Byte(uintArray)
	require.Equal(t, byteArray, byteArray2)
}
