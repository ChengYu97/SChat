package cli

import (
	"context"

	"github.com/ChengYu97/SChat/x/schat/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/spf13/cobra"
)

func CmdListStoredConversation() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "list-stored-conversation",
		Short: "list all storedConversation",
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryAllStoredConversationRequest{
				Pagination: pageReq,
			}

			res, err := queryClient.StoredConversationAll(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddPaginationFlagsToCmd(cmd, cmd.Use)
	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}

func CmdShowStoredConversation() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "show-stored-conversation [hash-participant]",
		Short: "shows a storedConversation",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx := client.GetClientContextFromCmd(cmd)

			queryClient := types.NewQueryClient(clientCtx)

			argHashParticipant := args[0]

			params := &types.QueryGetStoredConversationRequest{
				HashParticipant: argHashParticipant,
			}

			res, err := queryClient.StoredConversation(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
