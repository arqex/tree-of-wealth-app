import { HasBeenHostLoader } from "../../../state/contract/contract.loaders";
import { getConnectedAddress } from "../../../state/wallet/wallet.selectors";

export function HasBeenHost(){
  const address = getConnectedAddress();
  const {data} = HasBeenHostLoader(address);
  const hasBeenHost = data === undefined ? '' : data.toString();

  return (
    <div>Has been owner?: {hasBeenHost}</div>
  );
}
