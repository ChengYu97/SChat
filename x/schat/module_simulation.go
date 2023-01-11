package schat

import (
	"math/rand"

	"github.com/ChengYu97/SChat/testutil/sample"
	schatsimulation "github.com/ChengYu97/SChat/x/schat/simulation"
	"github.com/ChengYu97/SChat/x/schat/types"
	"github.com/cosmos/cosmos-sdk/baseapp"
	simappparams "github.com/cosmos/cosmos-sdk/simapp/params"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/cosmos/cosmos-sdk/x/simulation"
)

// avoid unused import issue
var (
	_ = sample.AccAddress
	_ = schatsimulation.FindAccount
	_ = simappparams.StakePerAccount
	_ = simulation.MsgEntryKind
	_ = baseapp.Paramspace
)

const (
	opWeightMsgAuthEncrptyKey = "op_weight_msg_auth_encrpty_key"
	// TODO: Determine the simulation weight value
	defaultWeightMsgAuthEncrptyKey int = 100

	opWeightMsgCreateConversation = "op_weight_msg_create_conversation"
	// TODO: Determine the simulation weight value
	defaultWeightMsgCreateConversation int = 100

	opWeightMsgSendMessage = "op_weight_msg_send_message"
	// TODO: Determine the simulation weight value
	defaultWeightMsgSendMessage int = 100

	opWeightMsgGetConversationKey = "op_weight_msg_get_conversation_key"
	// TODO: Determine the simulation weight value
	defaultWeightMsgGetConversationKey int = 100

	// this line is used by starport scaffolding # simapp/module/const
)

// GenerateGenesisState creates a randomized GenState of the module
func (AppModule) GenerateGenesisState(simState *module.SimulationState) {
	accs := make([]string, len(simState.Accounts))
	for i, acc := range simState.Accounts {
		accs[i] = acc.Address.String()
	}
	schatGenesis := types.GenesisState{
		Params: types.DefaultParams(),
		// this line is used by starport scaffolding # simapp/module/genesisState
	}
	simState.GenState[types.ModuleName] = simState.Cdc.MustMarshalJSON(&schatGenesis)
}

// ProposalContents doesn't return any content functions for governance proposals
func (AppModule) ProposalContents(_ module.SimulationState) []simtypes.WeightedProposalContent {
	return nil
}

// RandomizedParams creates randomized  param changes for the simulator
func (am AppModule) RandomizedParams(_ *rand.Rand) []simtypes.ParamChange {

	return []simtypes.ParamChange{}
}

// RegisterStoreDecoder registers a decoder
func (am AppModule) RegisterStoreDecoder(_ sdk.StoreDecoderRegistry) {}

// WeightedOperations returns the all the gov module operations with their respective weights.
func (am AppModule) WeightedOperations(simState module.SimulationState) []simtypes.WeightedOperation {
	operations := make([]simtypes.WeightedOperation, 0)

	var weightMsgAuthEncrptyKey int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgAuthEncrptyKey, &weightMsgAuthEncrptyKey, nil,
		func(_ *rand.Rand) {
			weightMsgAuthEncrptyKey = defaultWeightMsgAuthEncrptyKey
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgAuthEncrptyKey,
		schatsimulation.SimulateMsgAuthEncrptyKey(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgCreateConversation int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgCreateConversation, &weightMsgCreateConversation, nil,
		func(_ *rand.Rand) {
			weightMsgCreateConversation = defaultWeightMsgCreateConversation
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgCreateConversation,
		schatsimulation.SimulateMsgCreateConversation(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgSendMessage int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgSendMessage, &weightMsgSendMessage, nil,
		func(_ *rand.Rand) {
			weightMsgSendMessage = defaultWeightMsgSendMessage
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgSendMessage,
		schatsimulation.SimulateMsgSendMessage(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgGetConversationKey int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgGetConversationKey, &weightMsgGetConversationKey, nil,
		func(_ *rand.Rand) {
			weightMsgGetConversationKey = defaultWeightMsgGetConversationKey
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgGetConversationKey,
		schatsimulation.SimulateMsgGetConversationKey(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	// this line is used by starport scaffolding # simapp/module/operation

	return operations
}
