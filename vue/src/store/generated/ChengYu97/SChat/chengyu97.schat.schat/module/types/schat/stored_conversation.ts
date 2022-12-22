/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "chengyu97.schat.schat";

export interface StoredConversation {
  hashParticipant: string;
  encryptKey: string;
  message: string[];
  participant: { [key: string]: boolean };
  decryptKey: { [key: string]: string };
}

export interface StoredConversation_ParticipantEntry {
  key: string;
  value: boolean;
}

export interface StoredConversation_DecryptKeyEntry {
  key: string;
  value: string;
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
    Object.entries(message.participant).forEach(([key, value]) => {
      StoredConversation_ParticipantEntry.encode(
        { key: key as any, value },
        writer.uint32(34).fork()
      ).ldelim();
    });
    Object.entries(message.decryptKey).forEach(([key, value]) => {
      StoredConversation_DecryptKeyEntry.encode(
        { key: key as any, value },
        writer.uint32(42).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): StoredConversation {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStoredConversation } as StoredConversation;
    message.message = [];
    message.participant = {};
    message.decryptKey = {};
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
        case 4:
          const entry4 = StoredConversation_ParticipantEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry4.value !== undefined) {
            message.participant[entry4.key] = entry4.value;
          }
          break;
        case 5:
          const entry5 = StoredConversation_DecryptKeyEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry5.value !== undefined) {
            message.decryptKey[entry5.key] = entry5.value;
          }
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
    message.participant = {};
    message.decryptKey = {};
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
    if (object.participant !== undefined && object.participant !== null) {
      Object.entries(object.participant).forEach(([key, value]) => {
        message.participant[key] = Boolean(value);
      });
    }
    if (object.decryptKey !== undefined && object.decryptKey !== null) {
      Object.entries(object.decryptKey).forEach(([key, value]) => {
        message.decryptKey[key] = String(value);
      });
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
    obj.participant = {};
    if (message.participant) {
      Object.entries(message.participant).forEach(([k, v]) => {
        obj.participant[k] = v;
      });
    }
    obj.decryptKey = {};
    if (message.decryptKey) {
      Object.entries(message.decryptKey).forEach(([k, v]) => {
        obj.decryptKey[k] = v;
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<StoredConversation>): StoredConversation {
    const message = { ...baseStoredConversation } as StoredConversation;
    message.message = [];
    message.participant = {};
    message.decryptKey = {};
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
    if (object.participant !== undefined && object.participant !== null) {
      Object.entries(object.participant).forEach(([key, value]) => {
        if (value !== undefined) {
          message.participant[key] = Boolean(value);
        }
      });
    }
    if (object.decryptKey !== undefined && object.decryptKey !== null) {
      Object.entries(object.decryptKey).forEach(([key, value]) => {
        if (value !== undefined) {
          message.decryptKey[key] = String(value);
        }
      });
    }
    return message;
  },
};

const baseStoredConversation_ParticipantEntry: object = {
  key: "",
  value: false,
};

export const StoredConversation_ParticipantEntry = {
  encode(
    message: StoredConversation_ParticipantEntry,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value === true) {
      writer.uint32(16).bool(message.value);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): StoredConversation_ParticipantEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseStoredConversation_ParticipantEntry,
    } as StoredConversation_ParticipantEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StoredConversation_ParticipantEntry {
    const message = {
      ...baseStoredConversation_ParticipantEntry,
    } as StoredConversation_ParticipantEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Boolean(object.value);
    } else {
      message.value = false;
    }
    return message;
  },

  toJSON(message: StoredConversation_ParticipantEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(
    object: DeepPartial<StoredConversation_ParticipantEntry>
  ): StoredConversation_ParticipantEntry {
    const message = {
      ...baseStoredConversation_ParticipantEntry,
    } as StoredConversation_ParticipantEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = false;
    }
    return message;
  },
};

const baseStoredConversation_DecryptKeyEntry: object = { key: "", value: "" };

export const StoredConversation_DecryptKeyEntry = {
  encode(
    message: StoredConversation_DecryptKeyEntry,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): StoredConversation_DecryptKeyEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseStoredConversation_DecryptKeyEntry,
    } as StoredConversation_DecryptKeyEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StoredConversation_DecryptKeyEntry {
    const message = {
      ...baseStoredConversation_DecryptKeyEntry,
    } as StoredConversation_DecryptKeyEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    } else {
      message.value = "";
    }
    return message;
  },

  toJSON(message: StoredConversation_DecryptKeyEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(
    object: DeepPartial<StoredConversation_DecryptKeyEntry>
  ): StoredConversation_DecryptKeyEntry {
    const message = {
      ...baseStoredConversation_DecryptKeyEntry,
    } as StoredConversation_DecryptKeyEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = "";
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
