import { ethers } from "ethers";

export function formatAddress( address: string ){
  return `${address.slice(0,5)}...${address.slice(-3)}`;
}

export function formatPrice( price: ethers.BigNumber | undefined ){
  if( !price) return '';
  return `${ethers.utils.formatEther(price)} ETH`;
}