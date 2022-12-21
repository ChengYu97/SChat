package types

import (
	"fmt"
)

// DefaultIndex is the default capability global index
const DefaultIndex uint64 = 1

// DefaultGenesis returns the default Capability genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		SystemInfo: SystemInfo{
			ConversationCount: 0,
		},
		EncryptKeyList:         []EncryptKey{},
		StoredConversationList: []StoredConversation{},
		// this line is used by starport scaffolding # genesis/types/default
		Params: DefaultParams(),
	}
}

// Validate performs basic genesis state validation returning an error upon any
// failure.
func (gs GenesisState) Validate() error {
	// Check for duplicated index in encryptKey
	encryptKeyIndexMap := make(map[string]struct{})

	for _, elem := range gs.EncryptKeyList {
		index := string(EncryptKeyKey(elem.Address))
		if _, ok := encryptKeyIndexMap[index]; ok {
			return fmt.Errorf("duplicated index for encryptKey")
		}
		encryptKeyIndexMap[index] = struct{}{}
	}
	// Check for duplicated index in storedConversation
	storedConversationIndexMap := make(map[string]struct{})

	for _, elem := range gs.StoredConversationList {
		index := string(StoredConversationKey(elem.HashParticipant))
		if _, ok := storedConversationIndexMap[index]; ok {
			return fmt.Errorf("duplicated index for storedConversation")
		}
		storedConversationIndexMap[index] = struct{}{}
	}
	// this line is used by starport scaffolding # genesis/types/validate

	return gs.Params.Validate()
}
