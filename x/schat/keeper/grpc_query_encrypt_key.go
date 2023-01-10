package keeper

import (
	"context"

	"github.com/ChengYu97/SChat/x/schat/types"
	"github.com/ChengYu97/SChat/x/schat/util/conv"
	rsa2048 "github.com/ChengYu97/SChat/x/schat/util/pubkey_encrypt/rsa_2048"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) EncryptKeyAll(c context.Context, req *types.QueryAllEncryptKeyRequest) (*types.QueryAllEncryptKeyResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var encryptKeys []types.EncryptKey
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	encryptKeyStore := prefix.NewStore(store, types.KeyPrefix(types.EncryptKeyKeyPrefix))

	pageRes, err := query.Paginate(encryptKeyStore, req.Pagination, func(key []byte, value []byte) error {
		var encryptKey types.EncryptKey
		if err := k.cdc.Unmarshal(value, &encryptKey); err != nil {
			return err
		}

		encryptKeys = append(encryptKeys, encryptKey)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllEncryptKeyResponse{EncryptKey: encryptKeys, Pagination: pageRes}, nil
}

func (k Keeper) EncryptKey(c context.Context, req *types.QueryGetEncryptKeyRequest) (*types.QueryGetEncryptKeyResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	val, found := k.GetEncryptKey(
		ctx,
		req.Address,
	)
	if !found {
		return nil, status.Error(codes.NotFound, "not found")
	}

	return &types.QueryGetEncryptKeyResponse{EncryptKey: val}, nil
}

func (k Keeper) GenRsaCryptKey(c context.Context, req *types.QueryGenRsaCryptKeyRequest) (*types.QueryGenRsaCryptKeyResponse, error) {
	priKey, err := rsa2048.GenPriKey()
	if err != nil {
		return nil, err
	}
	pubKey := priKey.PubKey()

	priKeyString := conv.UnsafeBytesToStr(priKey.Marshal())
	pubKeyString := conv.UnsafeBytesToStr(pubKey.Marshal())

	return &types.QueryGenRsaCryptKeyResponse{
		PubKey: pubKeyString,
		PriKey: priKeyString,
	}, nil
}
