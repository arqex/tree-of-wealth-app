import { ethers } from "ethers";
import { getContract } from "../contract/contract.actions";
import { invalidateAvailableToWithdraw } from "../contract/contract.loaders";
import { setBuyResult, setIsBuying, setIsSettingOrphanOwner, setIsWithdrawing, setOrphanOwnerResult, setWithdrawResult } from "./transactions.reducers";
import { isBuying, isSettingOrphanOwner, isWithdrawing } from "./transactions.selectors";

export async function buy( price: ethers.BigNumber ){
  const contract = getContract();
  if( !contract ) throw new Error('No contract to buy the tree');

  if( isBuying() ) return;

  setIsBuying(true);
  try {
    let tx = await contract.functions.host({value: price});
    await tx.wait();
    setBuyResult({ result: 'ok' });
  }
  catch( err ){
    console.error( err );
    setBuyResult({
      result: 'error',
      // @ts-ignore
      error: err?.data || (err.code && err) || {code: -1, message: 'Unknown error'}
    })
  }
}

export async function withdraw(){
  const contract = getContract();
  if( !contract ) throw new Error('No contract to buy the tree');

  if( isWithdrawing() ) return;

  setIsWithdrawing(true);
  try {
    let tx = await contract.functions.withdraw();
    await tx.wait();
    setWithdrawResult({ result: 'ok' });
    invalidateAvailableToWithdraw();
  }
  catch( err ){
    console.error( err );
    setWithdrawResult({
      result: 'error',
      // @ts-ignore
      error: err?.data || (err.code && err) || {code: -1, message: 'Unknown error'}
    })
  }
}

export async function setOrphanOwner( address: string ){
  const contract = getContract();
  if( !contract ) throw new Error('No contract to buy the tree');

  if( isSettingOrphanOwner() ) return;

  setIsSettingOrphanOwner(true);
  try {
    let tx = await contract.functions.setOrphanOwner(address);
    await tx.wait();
    setOrphanOwnerResult({ result: 'ok' });
  }
  catch( err ){
    console.error( err );
    setOrphanOwnerResult({
      result: 'error',
      // @ts-ignore
      error: err?.data || (err.code && err) || {code: -1, message: 'Unknown error'}
    })
  }
}

