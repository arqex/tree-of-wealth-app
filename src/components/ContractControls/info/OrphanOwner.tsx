import { OrphanOwnerLoader } from "../../../state/contract/contract.loaders";
import { formatAddress } from "../../../utils/format";

export function OrphanOwner(){
  const {data: owner} = OrphanOwnerLoader();
  const formattedOwner = owner ? formatAddress(owner) : '';

  return (
    <div>Orphan owner: {formattedOwner}</div>
  );
}