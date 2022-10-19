import { ethers } from "ethers";
import { getContract } from "../contract/contract.actions";
import { invalidateAvailableToWithdraw } from "../contract/contract.loaders";
import { setHostResult, setBecomingHost, setIsWithdrawing, setWithdrawResult } from "./transactions.reducers";
import { isBecomingHost, isWithdrawing } from "./transactions.selectors";

export async function host( price: ethers.BigNumber ){
  const contract = getContract();
  if( !contract ) throw new Error('No contract to host The Tree');

  if( isBecomingHost() ) return;

  setBecomingHost(true);
  try {
    let tx = await contract.functions.host({value: price});
    await tx.wait();
    setHostResult({ result: 'ok' });
  }
  catch( err ){
    console.error( err );
    setHostResult({
      result: 'error',
      // @ts-ignore
      error: err?.data || (err.code && err) || {code: -1, message: 'Unknown error'}
    })
  }
}

export async function withdraw(){
  const contract = getContract();
  if( !contract ) throw new Error('No contract to withdra');

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