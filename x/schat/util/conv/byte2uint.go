package conv

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/ChengYu97/SChat/x/schat/util/logger"
)

func ArrayByte2Uint(b []byte) (result []uint32) {
	for _, singleByte := range b {
		result = append(result, uint32(singleByte))
	}
	return
}

func ArrayUint2Byte(u []uint32) (result []byte) {
	for _, singleUint := range u {
		result = append(result, byte(singleUint))
	}
	return
}

func String2Uint(s string) ([]uint32, error) {
	fmt.Println("test1")
	logger.Log(s)
	var result []uint32
	ss := strings.Trim(s, "{")
	ss = strings.Trim(ss, "}")
	ss = strings.Trim(ss, "\"")
	sliceUintStr := strings.Split(ss, ",")
	for _, uintStr := range sliceUintStr {
		u, err := strconv.ParseUint(uintStr, 10, 32)
		if err != nil {
			return nil, err
		}
		result = append(result, uint32(u))
	}
	return result, nil
}
