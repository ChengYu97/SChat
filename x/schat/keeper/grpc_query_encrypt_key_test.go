package keeper_test

import (
	"strconv"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	keepertest "github.com/ChengYu97/SChat/testutil/keeper"
	"github.com/ChengYu97/SChat/testutil/nullify"
	"github.com/ChengYu97/SChat/x/schat/types"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func TestEncryptKeyQuerySingle(t *testing.T) {
	keeper, ctx := keepertest.SchatKeeper(t)
	wctx := sdk.WrapSDKContext(ctx)
	msgs := createNEncryptKey(keeper, ctx, 2)
	for _, tc := range []struct {
		desc     string
		request  *types.QueryGetEncryptKeyRequest
		response *types.QueryGetEncryptKeyResponse
		err      error
	}{
		{
			desc: "First",
			request: &types.QueryGetEncryptKeyRequest{
				Address: msgs[0].Address,
			},
			response: &types.QueryGetEncryptKeyResponse{EncryptKey: msgs[0]},
		},
		{
			desc: "Second",
			request: &types.QueryGetEncryptKeyRequest{
				Address: msgs[1].Address,
			},
			response: &types.QueryGetEncryptKeyResponse{EncryptKey: msgs[1]},
		},
		{
			desc: "KeyNotFound",
			request: &types.QueryGetEncryptKeyRequest{
				Address: strconv.Itoa(100000),
			},
			err: status.Error(codes.NotFound, "not found"),
		},
		{
			desc: "InvalidRequest",
			err:  status.Error(codes.InvalidArgument, "invalid request"),
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			response, err := keeper.EncryptKey(wctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
				require.Equal(t,
					nullify.Fill(tc.response),
					nullify.Fill(response),
				)
			}
		})
	}
}

func TestEncryptKeyQueryPaginated(t *testing.T) {
	keeper, ctx := keepertest.SchatKeeper(t)
	wctx := sdk.WrapSDKContext(ctx)
	msgs := createNEncryptKey(keeper, ctx, 5)

	request := func(next []byte, offset, limit uint64, total bool) *types.QueryAllEncryptKeyRequest {
		return &types.QueryAllEncryptKeyRequest{
			Pagination: &query.PageRequest{
				Key:        next,
				Offset:     offset,
				Limit:      limit,
				CountTotal: total,
			},
		}
	}
	t.Run("ByOffset", func(t *testing.T) {
		step := 2
		for i := 0; i < len(msgs); i += step {
			resp, err := keeper.EncryptKeyAll(wctx, request(nil, uint64(i), uint64(step), false))
			require.NoError(t, err)
			require.LessOrEqual(t, len(resp.EncryptKey), step)
			require.Subset(t,
				nullify.Fill(msgs),
				nullify.Fill(resp.EncryptKey),
			)
		}
	})
	t.Run("ByKey", func(t *testing.T) {
		step := 2
		var next []byte
		for i := 0; i < len(msgs); i += step {
			resp, err := keeper.EncryptKeyAll(wctx, request(next, 0, uint64(step), false))
			require.NoError(t, err)
			require.LessOrEqual(t, len(resp.EncryptKey), step)
			require.Subset(t,
				nullify.Fill(msgs),
				nullify.Fill(resp.EncryptKey),
			)
			next = resp.Pagination.NextKey
		}
	})
	t.Run("Total", func(t *testing.T) {
		resp, err := keeper.EncryptKeyAll(wctx, request(nil, 0, 0, true))
		require.NoError(t, err)
		require.Equal(t, len(msgs), int(resp.Pagination.Total))
		require.ElementsMatch(t,
			nullify.Fill(msgs),
			nullify.Fill(resp.EncryptKey),
		)
	})
	t.Run("InvalidRequest", func(t *testing.T) {
		_, err := keeper.EncryptKeyAll(wctx, nil)
		require.ErrorIs(t, err, status.Error(codes.InvalidArgument, "invalid request"))
	})
}
