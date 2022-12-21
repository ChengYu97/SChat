/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";
import { Params } from "../schat/params";
import { SystemInfo } from "../schat/system_info";
import { EncryptKey } from "../schat/encrypt_key";
import {
  PageRequest,
  PageResponse,
} from "../cosmos/base/query/v1beta1/pagination";
import { StoredConversation } from "../schat/stored_conversation";

export const protobufPackage = "chengyu97.schat.schat";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

export interface QueryGetSystemInfoRequest {}

export interface QueryGetSystemInfoResponse {
  SystemInfo: SystemInfo | undefined;
}

export interface QueryGetEncryptKeyRequest {
  address: string;
}

export interface QueryGetEncryptKeyResponse {
  encryptKey: EncryptKey | undefined;
}

export interface QueryAllEncryptKeyRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllEncryptKeyResponse {
  encryptKey: EncryptKey[];
  pagination: PageResponse | undefined;
}

export interface QueryGetStoredConversationRequest {
  hashParticipant: string;
}

export interface QueryGetStoredConversationResponse {
  storedConversation: StoredConversation | undefined;
}

export interface QueryAllStoredConversationRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllStoredConversationResponse {
  storedConversation: StoredConversation[];
  pagination: PageResponse | undefined;
}

const baseQueryParamsRequest: object = {};

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },
};

const baseQueryParamsResponse: object = {};

export const QueryParamsResponse = {
  encode(
    message: QueryParamsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },
};

const baseQueryGetSystemInfoRequest: object = {};

export const QueryGetSystemInfoRequest = {
  encode(
    _: QueryGetSystemInfoRequest,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetSystemInfoRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetSystemInfoRequest,
    } as QueryGetSystemInfoRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): QueryGetSystemInfoRequest {
    const message = {
      ...baseQueryGetSystemInfoRequest,
    } as QueryGetSystemInfoRequest;
    return message;
  },

  toJSON(_: QueryGetSystemInfoRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<QueryGetSystemInfoRequest>
  ): QueryGetSystemInfoRequest {
    const message = {
      ...baseQueryGetSystemInfoRequest,
    } as QueryGetSystemInfoRequest;
    return message;
  },
};

const baseQueryGetSystemInfoResponse: object = {};

export const QueryGetSystemInfoResponse = {
  encode(
    message: QueryGetSystemInfoResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.SystemInfo !== undefined) {
      SystemInfo.encode(message.SystemInfo, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetSystemInfoResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetSystemInfoResponse,
    } as QueryGetSystemInfoResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.SystemInfo = SystemInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetSystemInfoResponse {
    const message = {
      ...baseQueryGetSystemInfoResponse,
    } as QueryGetSystemInfoResponse;
    if (object.SystemInfo !== undefined && object.SystemInfo !== null) {
      message.SystemInfo = SystemInfo.fromJSON(object.SystemInfo);
    } else {
      message.SystemInfo = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetSystemInfoResponse): unknown {
    const obj: any = {};
    message.SystemInfo !== undefined &&
      (obj.SystemInfo = message.SystemInfo
        ? SystemInfo.toJSON(message.SystemInfo)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetSystemInfoResponse>
  ): QueryGetSystemInfoResponse {
    const message = {
      ...baseQueryGetSystemInfoResponse,
    } as QueryGetSystemInfoResponse;
    if (object.SystemInfo !== undefined && object.SystemInfo !== null) {
      message.SystemInfo = SystemInfo.fromPartial(object.SystemInfo);
    } else {
      message.SystemInfo = undefined;
    }
    return message;
  },
};

const baseQueryGetEncryptKeyRequest: object = { address: "" };

export const QueryGetEncryptKeyRequest = {
  encode(
    message: QueryGetEncryptKeyRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetEncryptKeyRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetEncryptKeyRequest,
    } as QueryGetEncryptKeyRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetEncryptKeyRequest {
    const message = {
      ...baseQueryGetEncryptKeyRequest,
    } as QueryGetEncryptKeyRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    return message;
  },

  toJSON(message: QueryGetEncryptKeyRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetEncryptKeyRequest>
  ): QueryGetEncryptKeyRequest {
    const message = {
      ...baseQueryGetEncryptKeyRequest,
    } as QueryGetEncryptKeyRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    return message;
  },
};

const baseQueryGetEncryptKeyResponse: object = {};

export const QueryGetEncryptKeyResponse = {
  encode(
    message: QueryGetEncryptKeyResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.encryptKey !== undefined) {
      EncryptKey.encode(message.encryptKey, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetEncryptKeyResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetEncryptKeyResponse,
    } as QueryGetEncryptKeyResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.encryptKey = EncryptKey.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetEncryptKeyResponse {
    const message = {
      ...baseQueryGetEncryptKeyResponse,
    } as QueryGetEncryptKeyResponse;
    if (object.encryptKey !== undefined && object.encryptKey !== null) {
      message.encryptKey = EncryptKey.fromJSON(object.encryptKey);
    } else {
      message.encryptKey = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetEncryptKeyResponse): unknown {
    const obj: any = {};
    message.encryptKey !== undefined &&
      (obj.encryptKey = message.encryptKey
        ? EncryptKey.toJSON(message.encryptKey)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetEncryptKeyResponse>
  ): QueryGetEncryptKeyResponse {
    const message = {
      ...baseQueryGetEncryptKeyResponse,
    } as QueryGetEncryptKeyResponse;
    if (object.encryptKey !== undefined && object.encryptKey !== null) {
      message.encryptKey = EncryptKey.fromPartial(object.encryptKey);
    } else {
      message.encryptKey = undefined;
    }
    return message;
  },
};

const baseQueryAllEncryptKeyRequest: object = {};

export const QueryAllEncryptKeyRequest = {
  encode(
    message: QueryAllEncryptKeyRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllEncryptKeyRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllEncryptKeyRequest,
    } as QueryAllEncryptKeyRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllEncryptKeyRequest {
    const message = {
      ...baseQueryAllEncryptKeyRequest,
    } as QueryAllEncryptKeyRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllEncryptKeyRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllEncryptKeyRequest>
  ): QueryAllEncryptKeyRequest {
    const message = {
      ...baseQueryAllEncryptKeyRequest,
    } as QueryAllEncryptKeyRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllEncryptKeyResponse: object = {};

export const QueryAllEncryptKeyResponse = {
  encode(
    message: QueryAllEncryptKeyResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.encryptKey) {
      EncryptKey.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllEncryptKeyResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllEncryptKeyResponse,
    } as QueryAllEncryptKeyResponse;
    message.encryptKey = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.encryptKey.push(EncryptKey.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllEncryptKeyResponse {
    const message = {
      ...baseQueryAllEncryptKeyResponse,
    } as QueryAllEncryptKeyResponse;
    message.encryptKey = [];
    if (object.encryptKey !== undefined && object.encryptKey !== null) {
      for (const e of object.encryptKey) {
        message.encryptKey.push(EncryptKey.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllEncryptKeyResponse): unknown {
    const obj: any = {};
    if (message.encryptKey) {
      obj.encryptKey = message.encryptKey.map((e) =>
        e ? EncryptKey.toJSON(e) : undefined
      );
    } else {
      obj.encryptKey = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllEncryptKeyResponse>
  ): QueryAllEncryptKeyResponse {
    const message = {
      ...baseQueryAllEncryptKeyResponse,
    } as QueryAllEncryptKeyResponse;
    message.encryptKey = [];
    if (object.encryptKey !== undefined && object.encryptKey !== null) {
      for (const e of object.encryptKey) {
        message.encryptKey.push(EncryptKey.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryGetStoredConversationRequest: object = { hashParticipant: "" };

export const QueryGetStoredConversationRequest = {
  encode(
    message: QueryGetStoredConversationRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.hashParticipant !== "") {
      writer.uint32(10).string(message.hashParticipant);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetStoredConversationRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetStoredConversationRequest,
    } as QueryGetStoredConversationRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hashParticipant = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetStoredConversationRequest {
    const message = {
      ...baseQueryGetStoredConversationRequest,
    } as QueryGetStoredConversationRequest;
    if (
      object.hashParticipant !== undefined &&
      object.hashParticipant !== null
    ) {
      message.hashParticipant = String(object.hashParticipant);
    } else {
      message.hashParticipant = "";
    }
    return message;
  },

  toJSON(message: QueryGetStoredConversationRequest): unknown {
    const obj: any = {};
    message.hashParticipant !== undefined &&
      (obj.hashParticipant = message.hashParticipant);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetStoredConversationRequest>
  ): QueryGetStoredConversationRequest {
    const message = {
      ...baseQueryGetStoredConversationRequest,
    } as QueryGetStoredConversationRequest;
    if (
      object.hashParticipant !== undefined &&
      object.hashParticipant !== null
    ) {
      message.hashParticipant = object.hashParticipant;
    } else {
      message.hashParticipant = "";
    }
    return message;
  },
};

const baseQueryGetStoredConversationResponse: object = {};

export const QueryGetStoredConversationResponse = {
  encode(
    message: QueryGetStoredConversationResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.storedConversation !== undefined) {
      StoredConversation.encode(
        message.storedConversation,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetStoredConversationResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetStoredConversationResponse,
    } as QueryGetStoredConversationResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.storedConversation = StoredConversation.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetStoredConversationResponse {
    const message = {
      ...baseQueryGetStoredConversationResponse,
    } as QueryGetStoredConversationResponse;
    if (
      object.storedConversation !== undefined &&
      object.storedConversation !== null
    ) {
      message.storedConversation = StoredConversation.fromJSON(
        object.storedConversation
      );
    } else {
      message.storedConversation = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetStoredConversationResponse): unknown {
    const obj: any = {};
    message.storedConversation !== undefined &&
      (obj.storedConversation = message.storedConversation
        ? StoredConversation.toJSON(message.storedConversation)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetStoredConversationResponse>
  ): QueryGetStoredConversationResponse {
    const message = {
      ...baseQueryGetStoredConversationResponse,
    } as QueryGetStoredConversationResponse;
    if (
      object.storedConversation !== undefined &&
      object.storedConversation !== null
    ) {
      message.storedConversation = StoredConversation.fromPartial(
        object.storedConversation
      );
    } else {
      message.storedConversation = undefined;
    }
    return message;
  },
};

const baseQueryAllStoredConversationRequest: object = {};

export const QueryAllStoredConversationRequest = {
  encode(
    message: QueryAllStoredConversationRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllStoredConversationRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllStoredConversationRequest,
    } as QueryAllStoredConversationRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllStoredConversationRequest {
    const message = {
      ...baseQueryAllStoredConversationRequest,
    } as QueryAllStoredConversationRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllStoredConversationRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllStoredConversationRequest>
  ): QueryAllStoredConversationRequest {
    const message = {
      ...baseQueryAllStoredConversationRequest,
    } as QueryAllStoredConversationRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllStoredConversationResponse: object = {};

export const QueryAllStoredConversationResponse = {
  encode(
    message: QueryAllStoredConversationResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.storedConversation) {
      StoredConversation.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllStoredConversationResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllStoredConversationResponse,
    } as QueryAllStoredConversationResponse;
    message.storedConversation = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.storedConversation.push(
            StoredConversation.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllStoredConversationResponse {
    const message = {
      ...baseQueryAllStoredConversationResponse,
    } as QueryAllStoredConversationResponse;
    message.storedConversation = [];
    if (
      object.storedConversation !== undefined &&
      object.storedConversation !== null
    ) {
      for (const e of object.storedConversation) {
        message.storedConversation.push(StoredConversation.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllStoredConversationResponse): unknown {
    const obj: any = {};
    if (message.storedConversation) {
      obj.storedConversation = message.storedConversation.map((e) =>
        e ? StoredConversation.toJSON(e) : undefined
      );
    } else {
      obj.storedConversation = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllStoredConversationResponse>
  ): QueryAllStoredConversationResponse {
    const message = {
      ...baseQueryAllStoredConversationResponse,
    } as QueryAllStoredConversationResponse;
    message.storedConversation = [];
    if (
      object.storedConversation !== undefined &&
      object.storedConversation !== null
    ) {
      for (const e of object.storedConversation) {
        message.storedConversation.push(StoredConversation.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a SystemInfo by index. */
  SystemInfo(
    request: QueryGetSystemInfoRequest
  ): Promise<QueryGetSystemInfoResponse>;
  /** Queries a EncryptKey by index. */
  EncryptKey(
    request: QueryGetEncryptKeyRequest
  ): Promise<QueryGetEncryptKeyResponse>;
  /** Queries a list of EncryptKey items. */
  EncryptKeyAll(
    request: QueryAllEncryptKeyRequest
  ): Promise<QueryAllEncryptKeyResponse>;
  /** Queries a StoredConversation by index. */
  StoredConversation(
    request: QueryGetStoredConversationRequest
  ): Promise<QueryGetStoredConversationResponse>;
  /** Queries a list of StoredConversation items. */
  StoredConversationAll(
    request: QueryAllStoredConversationRequest
  ): Promise<QueryAllStoredConversationResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "chengyu97.schat.schat.Query",
      "Params",
      data
    );
    return promise.then((data) => QueryParamsResponse.decode(new Reader(data)));
  }

  SystemInfo(
    request: QueryGetSystemInfoRequest
  ): Promise<QueryGetSystemInfoResponse> {
    const data = QueryGetSystemInfoRequest.encode(request).finish();
    const promise = this.rpc.request(
      "chengyu97.schat.schat.Query",
      "SystemInfo",
      data
    );
    return promise.then((data) =>
      QueryGetSystemInfoResponse.decode(new Reader(data))
    );
  }

  EncryptKey(
    request: QueryGetEncryptKeyRequest
  ): Promise<QueryGetEncryptKeyResponse> {
    const data = QueryGetEncryptKeyRequest.encode(request).finish();
    const promise = this.rpc.request(
      "chengyu97.schat.schat.Query",
      "EncryptKey",
      data
    );
    return promise.then((data) =>
      QueryGetEncryptKeyResponse.decode(new Reader(data))
    );
  }

  EncryptKeyAll(
    request: QueryAllEncryptKeyRequest
  ): Promise<QueryAllEncryptKeyResponse> {
    const data = QueryAllEncryptKeyRequest.encode(request).finish();
    const promise = this.rpc.request(
      "chengyu97.schat.schat.Query",
      "EncryptKeyAll",
      data
    );
    return promise.then((data) =>
      QueryAllEncryptKeyResponse.decode(new Reader(data))
    );
  }

  StoredConversation(
    request: QueryGetStoredConversationRequest
  ): Promise<QueryGetStoredConversationResponse> {
    const data = QueryGetStoredConversationRequest.encode(request).finish();
    const promise = this.rpc.request(
      "chengyu97.schat.schat.Query",
      "StoredConversation",
      data
    );
    return promise.then((data) =>
      QueryGetStoredConversationResponse.decode(new Reader(data))
    );
  }

  StoredConversationAll(
    request: QueryAllStoredConversationRequest
  ): Promise<QueryAllStoredConversationResponse> {
    const data = QueryAllStoredConversationRequest.encode(request).finish();
    const promise = this.rpc.request(
      "chengyu97.schat.schat.Query",
      "StoredConversationAll",
      data
    );
    return promise.then((data) =>
      QueryAllStoredConversationResponse.decode(new Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
