package conv

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
