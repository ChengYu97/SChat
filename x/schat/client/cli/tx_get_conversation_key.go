package cli

import (
	"strconv"

	"strings"

	"github.com/ChengYu97/SChat/x/schat/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cast"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdGetConversationKey() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "get-conversation-key [hash-participant]",
		Short: "Broadcast message getConversationKey",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argCastHashParticipant := strings.Split(args[0], listSeparator)
			argHashParticipant := make([]uint32, len(argCastHashParticipant))
			for i, arg := range argCastHashParticipant {
				value, err := cast.ToUint32E(arg)
				if err != nil {
					return err
				}
				argHashParticipant[i] = value
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgGetConversationKey(
				clientCtx.GetFromAddress().String(),
				argHashParticipant,
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
