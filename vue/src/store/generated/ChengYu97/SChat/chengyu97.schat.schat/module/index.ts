// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry, OfflineSigner, EncodeObject, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgAuthEncrptyKey } from "./types/schat/tx";
import { MsgSendMessage } from "./types/schat/tx";
import { MsgGetConversationKey } from "./types/schat/tx";
import { MsgCreateConversation } from "./types/schat/tx";


const types = [
  ["/chengyu97.schat.schat.MsgAuthEncrptyKey", MsgAuthEncrptyKey],
  ["/chengyu97.schat.schat.MsgSendMessage", MsgSendMessage],
  ["/chengyu97.schat.schat.MsgGetConversationKey", MsgGetConversationKey],
  ["/chengyu97.schat.schat.MsgCreateConversation", MsgCreateConversation],
  
];
export const MissingWalletError = new Error("wallet is required");

export const registry = new Registry(<any>types);

const defaultFee = {
  amount: [],
  gas: "200000",
};

interface TxClientOptions {
  addr: string
}

interface SignAndBroadcastOptions {
  fee: StdFee,
  memo?: string
}

const txClient = async (wallet: OfflineSigner, { addr: addr }: TxClientOptions = { addr: "http://localhost:26657" }) => {
  if (!wallet) throw MissingWalletError;
  let client;
  if (addr) {
    client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
  }else{
    client = await SigningStargateClient.offline( wallet, { registry });
  }
  const { address } = (await wallet.getAccounts())[0];

  return {
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }: SignAndBroadcastOptions = {fee: defaultFee, memo: ""}) => client.signAndBroadcast(address, msgs, fee,memo),
    msgAuthEncrptyKey: (data: MsgAuthEncrptyKey): EncodeObject => ({ typeUrl: "/chengyu97.schat.schat.MsgAuthEncrptyKey", value: MsgAuthEncrptyKey.fromPartial( data ) }),
    msgSendMessage: (data: MsgSendMessage): EncodeObject => ({ typeUrl: "/chengyu97.schat.schat.MsgSendMessage", value: MsgSendMessage.fromPartial( data ) }),
    msgGetConversationKey: (data: MsgGetConversationKey): EncodeObject => ({ typeUrl: "/chengyu97.schat.schat.MsgGetConversationKey", value: MsgGetConversationKey.fromPartial( data ) }),
    msgCreateConversation: (data: MsgCreateConversation): EncodeObject => ({ typeUrl: "/chengyu97.schat.schat.MsgCreateConversation", value: MsgCreateConversation.fromPartial( data ) }),
    
  };
};

interface QueryClientOptions {
  addr: string
}

const queryClient = async ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseUrl: addr });
};

export {
  txClient,
  queryClient,
};
