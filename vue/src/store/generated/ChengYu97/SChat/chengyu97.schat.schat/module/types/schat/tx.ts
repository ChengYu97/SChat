/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";

export const protobufPackage = "chengyu97.schat.schat";

export interface MsgAuthEncrptyKey {
  creator: string;
  key: string;
}

export interface MsgAuthEncrptyKeyResponse {
  success: boolean;
  keyTotal: number;
}

const baseMsgAuthEncrptyKey: object = { creator: "", key: "" };

export const MsgAuthEncrptyKey = {
  encode(message: MsgAuthEncrptyKey, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.key !== "") {
      writer.uint32(18).string(message.key);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgAuthEncrptyKey {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgAuthEncrptyKey } as MsgAuthEncrptyKey;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.key = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAuthEncrptyKey {
    const message = { ...baseMsgAuthEncrptyKey } as MsgAuthEncrptyKey;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    return message;
  },

  toJSON(message: MsgAuthEncrptyKey): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.key !== undefined && (obj.key = message.key);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgAuthEncrptyKey>): MsgAuthEncrptyKey {
    const message = { ...baseMsgAuthEncrptyKey } as MsgAuthEncrptyKey;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    return message;
  },
};

const baseMsgAuthEncrptyKeyResponse: object = { success: false, keyTotal: 0 };

export const MsgAuthEncrptyKeyResponse = {
  encode(
    message: MsgAuthEncrptyKeyResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.keyTotal !== 0) {
      writer.uint32(16).uint64(message.keyTotal);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgAuthEncrptyKeyResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgAuthEncrptyKeyResponse,
    } as MsgAuthEncrptyKeyResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 2:
          message.keyTotal = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAuthEncrptyKeyResponse {
    const message = {
      ...baseMsgAuthEncrptyKeyResponse,
    } as MsgAuthEncrptyKeyResponse;
    if (object.success !== undefined && object.success !== null) {
      message.success = Boolean(object.success);
    } else {
      message.success = false;
    }
    if (object.keyTotal !== undefined && object.keyTotal !== null) {
      message.keyTotal = Number(object.keyTotal);
    } else {
      message.keyTotal = 0;
    }
    return message;
  },

  toJSON(message: MsgAuthEncrptyKeyResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.keyTotal !== undefined && (obj.keyTotal = message.keyTotal);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgAuthEncrptyKeyResponse>
  ): MsgAuthEncrptyKeyResponse {
    const message = {
      ...baseMsgAuthEncrptyKeyResponse,
    } as MsgAuthEncrptyKeyResponse;
    if (object.success !== undefined && object.success !== null) {
      message.success = object.success;
    } else {
      message.success = false;
    }
    if (object.keyTotal !== undefined && object.keyTotal !== null) {
      message.keyTotal = object.keyTotal;
    } else {
      message.keyTotal = 0;
    }
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /** this line is used by starport scaffolding # proto/tx/rpc */
  AuthEncrptyKey(
    request: MsgAuthEncrptyKey
  ): Promise<MsgAuthEncrptyKeyResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  AuthEncrptyKey(
    request: MsgAuthEncrptyKey
  ): Promise<MsgAuthEncrptyKeyResponse> {
    const data = MsgAuthEncrptyKey.encode(request).finish();
    const promise = this.rpc.request(
      "chengyu97.schat.schat.Msg",
      "AuthEncrptyKey",
      data
    );
    return promise.then((data) =>
      MsgAuthEncrptyKeyResponse.decode(new Reader(data))
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

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

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

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
