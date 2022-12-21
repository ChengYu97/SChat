package types_test

import (
	"testing"

	"github.com/ChengYu97/SChat/x/schat/types"
	"github.com/stretchr/testify/require"
)

func TestGenesisState_Validate(t *testing.T) {
	for _, tc := range []struct {
		desc     string
		genState *types.GenesisState
		valid    bool
	}{
		{
			desc:     "default is valid",
			genState: types.DefaultGenesis(),
			valid:    true,
		},
		{
			desc: "valid genesis state",
			genState: &types.GenesisState{

				SystemInfo: &types.SystemInfo{
					ConversationCount: 27,
				},
				EncryptKeyList: []types.EncryptKey{
					{
						Address: "0",
					},
					{
						Address: "1",
					},
				},
				StoredConversationList: []types.StoredConversation{
					{
						HashParticipant: "0",
					},
					{
						HashParticipant: "1",
					},
				},
				// this line is used by starport scaffolding # types/genesis/validField
			},
			valid: true,
		},
		{
			desc: "duplicated encryptKey",
			genState: &types.GenesisState{
				EncryptKeyList: []types.EncryptKey{
					{
						Address: "0",
					},
					{
						Address: "0",
					},
				},
			},
			valid: false,
		},
		{
			desc: "duplicated storedConversation",
			genState: &types.GenesisState{
				StoredConversationList: []types.StoredConversation{
					{
						HashParticipant: "0",
					},
					{
						HashParticipant: "0",
					},
				},
			},
			valid: false,
		},
		// this line is used by starport scaffolding # types/genesis/testcase
	} {
		t.Run(tc.desc, func(t *testing.T) {
			err := tc.genState.Validate()
			if tc.valid {
				require.NoError(t, err)
			} else {
				require.Error(t, err)
			}
		})
	}
}
