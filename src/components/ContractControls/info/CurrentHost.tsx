import { HostLoader } from "../../../state/contract/contract.loaders";
import { formatAddress } from "../../../utils/format";

export function CurrentHost(){
  const {data: host} = HostLoader();
  const formattedHost = host ? formatAddress(host) : '';

  return (
    <div>Current host: {formattedHost}</div>
  );
}