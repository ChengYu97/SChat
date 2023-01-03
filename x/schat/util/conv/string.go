package conv

import (
	"reflect"
	"unsafe"
)

func UnsafeStrToBytes(s string) []byte {
	var buf []byte
	bufHdr := (*reflect.SliceHeader)(unsafe.Pointer(&buf))

	sHdr := (*reflect.StringHeader)(unsafe.Pointer(&s))
	bufHdr.Data = sHdr.Data
	bufHdr.Cap = sHdr.Len
	bufHdr.Len = sHdr.Len
	return buf
}

func UnsafeBytesToStr(b []byte) string {
	return *(*string)(unsafe.Pointer(&b))
}
