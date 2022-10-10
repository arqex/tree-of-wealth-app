import { ethers } from "ethers";
import { getContract } from "../contract/contract.actions";
import { invalidateAvailableToWithdraw } from "../contract/contract.loaders";
import { setBuyResult, setIsBuying, setIsWithdrawing, setWithdrawResult } from "./transactions.reducers";
import { isBuying, isWithdrawing } from "./transactions.selectors";

export async function buy( price: ethers.BigNumber ){
  const contract = getContract();
  if( !contract ) throw new Error('No contract to buy The Tree');

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
  if( !contract ) throw new Error('No contract to buy The Tree');

  if( isWithdrawing() ) return;

  setIsWithdrawing(true);
  try {
    let tx = await contract.functions.withdraw();
    await tx.wait();
    setWithdrawResult({ result: 'ok' });
    invalidateAvailableToWithdraw();
  }
  catch( err ){
    setWithdrawResult({
      result: 'error',
      // @ts-ignore
      error: err?.data || (err.code && err) || guessError(err)
    })
  }
}


function guessError( err: Error ){
  if( err?.message.includes('rejected')){
    return {code: 4001, message: 'User rejected the transaction'};
  }
  return {code: -1, message: 'Unknown error'};
}