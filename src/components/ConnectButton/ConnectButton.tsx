import { requestAddressConnection } from "../../state/wallet/wallet.actions";
import { AccountLoader } from "../../state/wallet/wallet.loaders";
import { isWalletAvailable } from "../../state/wallet/wallet.selectors";
import { formatAddress } from "../../utils/format";

export default function ConnectButton() {
  if( !isWalletAvailable() ){
    return <>Please install a wallet</>;
  }

  const {data: connectedAddress, isLoading} = AccountLoader();

  if( isLoading ){
    return <>Loading...</>;
  }
  
  if( !connectedAddress ){
    return (
      <button onClick={ requestAddressConnection }>Connect wallet</button>
    );
  }

  return (
    <div>Welcome {formatAddress(connectedAddress)}! <button>Disconnect</button></div>
  )
}