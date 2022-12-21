/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "chengyu97.schat.schat";

export interface StoredConversation {
  hashParticipant: string;
  encryptKey: string;
  message: string[];
}

const baseStoredConversation: object = {
  hashParticipant: "",
  encryptKey: "",
  message: "",
};

export const StoredConversation = {
  encode(
    message: StoredConversation,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.hashParticipant !== "") {
      writer.uint32(10).string(message.hashParticipant);
    }
    if (message.encryptKey !== "") {
      writer.uint32(18).string(message.encryptKey);
    }
    for (const v of message.message) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): StoredConversation {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStoredConversation } as StoredConversation;
    message.message = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hashParticipant = reader.string();
          break;
        case 2:
          message.encryptKey = reader.string();
          break;
        case 3:
          message.message.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StoredConversation {
    const message = { ...baseStoredConversation } as StoredConversation;
    message.message = [];
    if (
      object.hashParticipant !== undefined &&
      object.hashParticipant !== null
    ) {
      message.hashParticipant = String(object.hashParticipant);
    } else {
      message.hashParticipant = "";
    }
    if (object.encryptKey !== undefined && object.encryptKey !== null) {
      message.encryptKey = String(object.encryptKey);
    } else {
      message.encryptKey = "";
    }
    if (object.message !== undefined && object.message !== null) {
      for (const e of object.message) {
        message.message.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: StoredConversation): unknown {
    const obj: any = {};
    message.hashParticipant !== undefined &&
      (obj.hashParticipant = message.hashParticipant);
    message.encryptKey !== undefined && (obj.encryptKey = message.encryptKey);
    if (message.message) {
      obj.message = message.message.map((e) => e);
    } else {
      obj.message = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<StoredConversation>): StoredConversation {
    const message = { ...baseStoredConversation } as StoredConversation;
    message.message = [];
    if (
      object.hashParticipant !== undefined &&
      object.hashParticipant !== null
    ) {
      message.hashParticipant = object.hashParticipant;
    } else {
      message.hashParticipant = "";
    }
    if (object.encryptKey !== undefined && object.encryptKey !== null) {
      message.encryptKey = object.encryptKey;
    } else {
      message.encryptKey = "";
    }
    if (object.message !== undefined && object.message !== null) {
      for (const e of object.message) {
        message.message.push(e);
      }
    }
    return message;
  },
};

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
