/* eslint-disable */
import { Params } from "../schat/params";
import { SystemInfo } from "../schat/system_info";
import { EncryptKey } from "../schat/encrypt_key";
import { StoredConversation } from "../schat/stored_conversation";
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "chengyu97.schat.schat";

/** GenesisState defines the schat module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  systemInfo: SystemInfo | undefined;
  encryptKeyList: EncryptKey[];
  /** this line is used by starport scaffolding # genesis/proto/state */
  storedConversationList: StoredConversation[];
}

const baseGenesisState: object = {};

export const GenesisState = {
  encode(message: GenesisState, writer: Writer = Writer.create()): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    if (message.systemInfo !== undefined) {
      SystemInfo.encode(message.systemInfo, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.encryptKeyList) {
      EncryptKey.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.storedConversationList) {
      StoredConversation.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGenesisState } as GenesisState;
    message.encryptKeyList = [];
    message.storedConversationList = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.systemInfo = SystemInfo.decode(reader, reader.uint32());
          break;
        case 3:
          message.encryptKeyList.push(
            EncryptKey.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.storedConversationList.push(
            StoredConversation.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.encryptKeyList = [];
    message.storedConversationList = [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    if (object.systemInfo !== undefined && object.systemInfo !== null) {
      message.systemInfo = SystemInfo.fromJSON(object.systemInfo);
    } else {
      message.systemInfo = undefined;
    }
    if (object.encryptKeyList !== undefined && object.encryptKeyList !== null) {
      for (const e of object.encryptKeyList) {
        message.encryptKeyList.push(EncryptKey.fromJSON(e));
      }
    }
    if (
      object.storedConversationList !== undefined &&
      object.storedConversationList !== null
    ) {
      for (const e of object.storedConversationList) {
        message.storedConversationList.push(StoredConversation.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    message.systemInfo !== undefined &&
      (obj.systemInfo = message.systemInfo
        ? SystemInfo.toJSON(message.systemInfo)
        : undefined);
    if (message.encryptKeyList) {
      obj.encryptKeyList = message.encryptKeyList.map((e) =>
        e ? EncryptKey.toJSON(e) : undefined
      );
    } else {
      obj.encryptKeyList = [];
    }
    if (message.storedConversationList) {
      obj.storedConversationList = message.storedConversationList.map((e) =>
        e ? StoredConversation.toJSON(e) : undefined
      );
    } else {
      obj.storedConversationList = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.encryptKeyList = [];
    message.storedConversationList = [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    if (object.systemInfo !== undefined && object.systemInfo !== null) {
      message.systemInfo = SystemInfo.fromPartial(object.systemInfo);
    } else {
      message.systemInfo = undefined;
    }
    if (object.encryptKeyList !== undefined && object.encryptKeyList !== null) {
      for (const e of object.encryptKeyList) {
        message.encryptKeyList.push(EncryptKey.fromPartial(e));
      }
    }
    if (
      object.storedConversationList !== undefined &&
      object.storedConversationList !== null
    ) {
      for (const e of object.storedConversationList) {
        message.storedConversationList.push(StoredConversation.fromPartial(e));
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
