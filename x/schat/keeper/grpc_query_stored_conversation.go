package keeper

import (
	"context"

	"github.com/ChengYu97/SChat/x/schat/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) StoredConversationAll(c context.Context, req *types.QueryAllStoredConversationRequest) (*types.QueryAllStoredConversationResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var storedConversations []types.StoredConversation
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	storedConversationStore := prefix.NewStore(store, types.KeyPrefix(types.StoredConversationKeyPrefix))

	pageRes, err := query.Paginate(storedConversationStore, req.Pagination, func(key []byte, value []byte) error {
		var storedConversation types.StoredConversation
		if err := k.cdc.Unmarshal(value, &storedConversation); err != nil {
			return err
		}

		storedConversations = append(storedConversations, storedConversation)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllStoredConversationResponse{StoredConversation: storedConversations, Pagination: pageRes}, nil
}

func (k Keeper) StoredConversation(c context.Context, req *types.QueryGetStoredConversationRequest) (*types.QueryGetStoredConversationResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	val, found := k.GetStoredConversation(
		ctx,
		req.HashParticipant,
	)
	if !found {
		return nil, status.Error(codes.NotFound, "not found")
	}

	return &types.QueryGetStoredConversationResponse{StoredConversation: val}, nil
}
