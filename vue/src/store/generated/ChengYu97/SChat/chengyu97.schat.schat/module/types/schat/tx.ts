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

export interface MsgCreateConversation {
  creator: string;
  participant: string[];
}

export interface MsgCreateConversationResponse {
  hashParticipant: number[];
}

export interface MsgSendMessage {
  creator: string;
  hashParticipant: number[];
  message: string;
}

export interface MsgSendMessageResponse {}

export interface MsgGetConversationKey {
  creator: string;
  hashParticipant: number[];
}

export interface MsgGetConversationKeyResponse {
  encryptKey: string;
  decrypt: string;
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

const baseMsgCreateConversation: object = { creator: "", participant: "" };

export const MsgCreateConversation = {
  encode(
    message: MsgCreateConversation,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    for (const v of message.participant) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateConversation {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateConversation } as MsgCreateConversation;
    message.participant = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.participant.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateConversation {
    const message = { ...baseMsgCreateConversation } as MsgCreateConversation;
    message.participant = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.participant !== undefined && object.participant !== null) {
      for (const e of object.participant) {
        message.participant.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: MsgCreateConversation): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    if (message.participant) {
      obj.participant = message.participant.map((e) => e);
    } else {
      obj.participant = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCreateConversation>
  ): MsgCreateConversation {
    const message = { ...baseMsgCreateConversation } as MsgCreateConversation;
    message.participant = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.participant !== undefined && object.participant !== null) {
      for (const e of object.participant) {
        message.participant.push(e);
      }
    }
    return message;
  },
};

const baseMsgCreateConversationResponse: object = { hashParticipant: 0 };

export const MsgCreateConversationResponse = {
  encode(
    message: MsgCreateConversationResponse,
    writer: Writer = Writer.create()
  ): Writer {
    writer.uint32(10).fork();
    for (const v of message.hashParticipant) {
      writer.uint32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgCreateConversationResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCreateConversationResponse,
    } as MsgCreateConversationResponse;
    message.hashParticipant = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.hashParticipant.push(reader.uint32());
            }
          } else {
            message.hashParticipant.push(reader.uint32());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateConversationResponse {
    const message = {
      ...baseMsgCreateConversationResponse,
    } as MsgCreateConversationResponse;
    message.hashParticipant = [];
    if (
      object.hashParticipant !== undefined &&
      object.hashParticipant !== null
    ) {
      for (const e of object.hashParticipant) {
        message.hashParticipant.push(Number(e));
      }
    }
    return message;
  },

  toJSON(message: MsgCreateConversationResponse): unknown {
    const obj: any = {};
    if (message.hashParticipant) {
      obj.hashParticipant = message.hashParticipant.map((e) => e);
    } else {
      obj.hashParticipant = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCreateConversationResponse>
  ): MsgCreateConversationResponse {
    const message = {
      ...baseMsgCreateConversationResponse,
    } as MsgCreateConversationResponse;
    message.hashParticipant = [];
    if (
      object.hashParticipant !== undefined &&
      object.hashParticipant !== null
    ) {
      for (const e of object.hashParticipant) {
        message.hashParticipant.push(e);
      }
    }
    return message;
  },
};

const baseMsgSendMessage: object = {
  creator: "",
  hashParticipant: 0,
  message: "",
};

export const MsgSendMessage = {
  encode(message: MsgSendMessage, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    writer.uint32(18).fork();
    for (const v of message.hashParticipant) {
      writer.uint32(v);
    }
    writer.ldelim();
    if (message.message !== "") {
      writer.uint32(26).string(message.message);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSendMessage {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgSendMessage } as MsgSendMessage;
    message.hashParticipant = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.hashParticipant.push(reader.uint32());
            }
          } else {
            message.hashParticipant.push(reader.uint32());
          }
          break;
        case 3:
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSendMessage {
    const message = { ...baseMsgSendMessage } as MsgSendMessage;
    message.hashParticipant = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (
      object.hashParticipant !== undefined &&
      object.hashParticipant !== null
    ) {
      for (const e of object.hashParticipant) {
        message.hashParticipant.push(Number(e));
      }
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = String(object.message);
    } else {
      message.message = "";
    }
    return message;
  },

  toJSON(message: MsgSendMessage): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    if (message.hashParticipant) {
      obj.hashParticipant = message.hashParticipant.map((e) => e);
    } else {
      obj.hashParticipant = [];
    }
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgSendMessage>): MsgSendMessage {
    const message = { ...baseMsgSendMessage } as MsgSendMessage;
    message.hashParticipant = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (
      object.hashParticipant !== undefined &&
      object.hashParticipant !== null
    ) {
      for (const e of object.hashParticipant) {
        message.hashParticipant.push(e);
      }
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = object.message;
    } else {
      message.message = "";
    }
    return message;
  },
};

const baseMsgSendMessageResponse: object = {};

export const MsgSendMessageResponse = {
  encode(_: MsgSendMessageResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSendMessageResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgSendMessageResponse } as MsgSendMessageResponse;
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

  fromJSON(_: any): MsgSendMessageResponse {
    const message = { ...baseMsgSendMessageResponse } as MsgSendMessageResponse;
    return message;
  },

  toJSON(_: MsgSendMessageResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgSendMessageResponse>): MsgSendMessageResponse {
    const message = { ...baseMsgSendMessageResponse } as MsgSendMessageResponse;
    return message;
  },
};

const baseMsgGetConversationKey: object = { creator: "", hashParticipant: 0 };

export const MsgGetConversationKey = {
  encode(
    message: MsgGetConversationKey,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    writer.uint32(18).fork();
    for (const v of message.hashParticipant) {
      writer.uint32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgGetConversationKey {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgGetConversationKey } as MsgGetConversationKey;
    message.hashParticipant = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.hashParticipant.push(reader.uint32());
            }
          } else {
            message.hashParticipant.push(reader.uint32());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgGetConversationKey {
    const message = { ...baseMsgGetConversationKey } as MsgGetConversationKey;
    message.hashParticipant = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (
      object.hashParticipant !== undefined &&
      object.hashParticipant !== null
    ) {
      for (const e of object.hashParticipant) {
        message.hashParticipant.push(Number(e));
      }
    }
    return message;
  },

  toJSON(message: MsgGetConversationKey): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    if (message.hashParticipant) {
      obj.hashParticipant = message.hashParticipant.map((e) => e);
    } else {
      obj.hashParticipant = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgGetConversationKey>
  ): MsgGetConversationKey {
    const message = { ...baseMsgGetConversationKey } as MsgGetConversationKey;
    message.hashParticipant = [];
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (
      object.hashParticipant !== undefined &&
      object.hashParticipant !== null
    ) {
      for (const e of object.hashParticipant) {
        message.hashParticipant.push(e);
      }
    }
    return message;
  },
};

const baseMsgGetConversationKeyResponse: object = {
  encryptKey: "",
  decrypt: "",
};

export const MsgGetConversationKeyResponse = {
  encode(
    message: MsgGetConversationKeyResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.encryptKey !== "") {
      writer.uint32(10).string(message.encryptKey);
    }
    if (message.decrypt !== "") {
      writer.uint32(18).string(message.decrypt);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgGetConversationKeyResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgGetConversationKeyResponse,
    } as MsgGetConversationKeyResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.encryptKey = reader.string();
          break;
        case 2:
          message.decrypt = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgGetConversationKeyResponse {
    const message = {
      ...baseMsgGetConversationKeyResponse,
    } as MsgGetConversationKeyResponse;
    if (object.encryptKey !== undefined && object.encryptKey !== null) {
      message.encryptKey = String(object.encryptKey);
    } else {
      message.encryptKey = "";
    }
    if (object.decrypt !== undefined && object.decrypt !== null) {
      message.decrypt = String(object.decrypt);
    } else {
      message.decrypt = "";
    }
    return message;
  },

  toJSON(message: MsgGetConversationKeyResponse): unknown {
    const obj: any = {};
    message.encryptKey !== undefined && (obj.encryptKey = message.encryptKey);
    message.decrypt !== undefined && (obj.decrypt = message.decrypt);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgGetConversationKeyResponse>
  ): MsgGetConversationKeyResponse {
    const message = {
      ...baseMsgGetConversationKeyResponse,
    } as MsgGetConversationKeyResponse;
    if (object.encryptKey !== undefined && object.encryptKey !== null) {
      message.encryptKey = object.encryptKey;
    } else {
      message.encryptKey = "";
    }
    if (object.decrypt !== undefined && object.decrypt !== null) {
      message.decrypt = object.decrypt;
    } else {
      message.decrypt = "";
    }
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  AuthEncrptyKey(
    request: MsgAuthEncrptyKey
  ): Promise<MsgAuthEncrptyKeyResponse>;
  CreateConversation(
    request: MsgCreateConversation
  ): Promise<MsgCreateConversationResponse>;
  SendMessage(request: MsgSendMessage): Promise<MsgSendMessageResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  GetConversationKey(
    request: MsgGetConversationKey
  ): Promise<MsgGetConversationKeyResponse>;
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

  CreateConversation(
    request: MsgCreateConversation
  ): Promise<MsgCreateConversationResponse> {
    const data = MsgCreateConversation.encode(request).finish();
    const promise = this.rpc.request(
      "chengyu97.schat.schat.Msg",
      "CreateConversation",
      data
    );
    return promise.then((data) =>
      MsgCreateConversationResponse.decode(new Reader(data))
    );
  }

  SendMessage(request: MsgSendMessage): Promise<MsgSendMessageResponse> {
    const data = MsgSendMessage.encode(request).finish();
    const promise = this.rpc.request(
      "chengyu97.schat.schat.Msg",
      "SendMessage",
      data
    );
    return promise.then((data) =>
      MsgSendMessageResponse.decode(new Reader(data))
    );
  }

  GetConversationKey(
    request: MsgGetConversationKey
  ): Promise<MsgGetConversationKeyResponse> {
    const data = MsgGetConversationKey.encode(request).finish();
    const promise = this.rpc.request(
      "chengyu97.schat.schat.Msg",
      "GetConversationKey",
      data
    );
    return promise.then((data) =>
      MsgGetConversationKeyResponse.decode(new Reader(data))
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
