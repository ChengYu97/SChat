package simulation

import (
	"math/rand"

	"github.com/ChengYu97/SChat/x/schat/keeper"
	"github.com/ChengYu97/SChat/x/schat/types"
	"github.com/cosmos/cosmos-sdk/baseapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
)

func SimulateMsgGetConversationKey(
	ak types.AccountKeeper,
	bk types.BankKeeper,
	k keeper.Keeper,
) simtypes.Operation {
	return func(r *rand.Rand, app *baseapp.BaseApp, ctx sdk.Context, accs []simtypes.Account, chainID string,
	) (simtypes.OperationMsg, []simtypes.FutureOperation, error) {
		simAccount, _ := simtypes.RandomAcc(r, accs)
		msg := &types.MsgGetConversationKey{
			Creator: simAccount.Address.String(),
		}

		// TODO: Handling the GetConversationKey simulation

		return simtypes.NoOpMsg(types.ModuleName, msg.Type(), "GetConversationKey simulation not implemented"), nil, nil
	}
}
