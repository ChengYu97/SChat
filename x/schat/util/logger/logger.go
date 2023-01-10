package logger

import (
	"fmt"
	"os"
	"time"
)

func Log(content string) {
	var f *os.File
	var err error
	logFile := "/tmp/log.txt"
	fmt.Println("log in")
	if _, err = os.Stat(logFile); os.IsNotExist(err) {
		f, _ = os.Create(logFile)
	} else {
		f, err = os.OpenFile(logFile, os.O_APPEND|os.O_WRONLY, 0644)
	}
	if err != nil {
		fmt.Println("attach file failed: " + err.Error())
		return
	}
	defer f.Close()
	f.WriteString(time.Now().String() + "   " + content + "\n")
	f.Sync()
}
