package cli

import (
	"strconv"

	"github.com/ChengYu97/SChat/x/schat/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdSendMessage() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "send-message [hash-participant] [message]",
		Short: "Broadcast message sendMessage",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argHashParticipant := args[0]
			argMessage := args[1]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgSendMessage(
				clientCtx.GetFromAddress().String(),
				argHashParticipant,
				argMessage,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
