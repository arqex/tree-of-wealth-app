import { useState } from "react";
import { AvailableToWithdrawLoader } from "../../../state/contract/contract.loaders";
import { getConnectedAddress } from "../../../state/wallet/wallet.selectors";

export function WithdrawButton(){
  const {data: amount} = AvailableToWithdrawLoader( getConnectedAddress() );

  const [isWithdrawing, setIsWithdrawing] = useState(false);

  function startWithdrawing(){
    setIsWithdrawing(true);
    alert('Withdraw started...');
    setIsWithdrawing(false);
  }

  return (
    <div>
      <button
        disabled={amount?.toNumber() === 0}
        onClick={ startWithdrawing }>
          { isWithdrawing ? 'Withdrawing...' : 'Withdraw'}
        </button>
    </div>
  );
}