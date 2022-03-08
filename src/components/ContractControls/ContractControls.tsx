import * as React from 'react';
import { AccountLoader, NetworkLoader } from '../../state/wallet/wallet.loaders';
import { isWalletAvailable } from '../../state/wallet/wallet.selectors';
import { isValidNetwork } from '../../utils/networks';
import { HostButton } from './controls/HostButton';
import { WithdrawButton } from './controls/WithdrawButton';
import { AvailableToWithdraw } from './info/AvailableToWithdraw';
import { CurrentHost } from './info/CurrentHost';
import { CurrentPrice } from './info/CurrentPrice';
import { HasBeenHost } from './info/HasBeenHost';
import { OrphanOwner } from './info/OrphanOwner';
import { OrphanValue } from './info/OrphanValue';
import { HostsCount } from './info/HostsCount';
import { ContractOwner } from './info/ContractOwner';
import { SetOrphanOwnerButton } from './controls/SetOrphanOwnerButton';

interface ContractControlsProps {
  
}
 
interface ContractControlsState {
  
}
 
class ContractControls extends React.Component<ContractControlsProps, ContractControlsState> {
  render() { 
    if( !isWalletAvailable() ) return null;

    const {data: network, isLoading: isNetworkLoading} = NetworkLoader();
    const {data: account, isLoading: isAccountLoading} = AccountLoader();

    if( isNetworkLoading || isAccountLoading ) return <>Loading...</>;
    if( !network || !account ) return null;

    if( !isValidNetwork( network.chainId ) ) {
      return (
        <div>The {network.name} network with id {network.chainId} is not supported.</div>
      );
    }

    return (
      <div>
        <ContractOwner />
        <CurrentPrice />
        <CurrentHost />
        <OrphanOwner />
        <OrphanValue />
        <HostsCount />
        <div>----</div>
        <HasBeenHost />
        <AvailableToWithdraw />
        <HostButton />
        <WithdrawButton />
        <SetOrphanOwnerButton />
      </div>
    );
  }
}
 
export default ContractControls;