import { AvailableToWithdrawLoader } from "../../../state/contract/contract.loaders";
import { getConnectedAddress } from "../../../state/wallet/wallet.selectors";
import { formatPrice } from "../../../utils/format";

export function AvailableToWithdraw(){
  const address = getConnectedAddress();
  const {data: amount} = AvailableToWithdrawLoader(address);

  return (
    <div>Available to withdraw: {amount === undefined ? '' : formatPrice(amount)}</div>
  );
}