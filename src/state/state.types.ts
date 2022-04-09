
import { ethers } from 'ethers';

export interface Owner {
  address: string,
  hasEverBeenOwner: boolean | undefined,
  availableToWithdraw: ethers.BigNumber | undefined
}

export interface NftAttribute {
  key: string
  value: string
}

export interface NftDetails {
  id: number,
  mintedAt: string,
  meta: {
    name: string
    description: string
    attributes: NftAttribute[]
  }
}

export interface NftActivity {
  hash: string
  date: string
  tokenId: number
  from: string
  to: string
}
