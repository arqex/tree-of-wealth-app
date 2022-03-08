import { HostsCountLoader } from "../../../state/contract/contract.loaders";

export function HostsCount(){
  const {data: count} = HostsCountLoader();

  return (
    <div>Hosts count: {count === undefined ? '' : count.toNumber()}</div>
  );
}