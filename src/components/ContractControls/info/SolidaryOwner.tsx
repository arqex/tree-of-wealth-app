import { SolidaryOwnerLoader } from "../../../state/contract/contract.loaders";
import { formatAddress } from "../../../utils/format";

export function SolidaryOwner(){
  const {data: owner} = SolidaryOwnerLoader();
  const formattedOwner = owner ? formatAddress(owner) : '';

  return (
    <div>Repeating owner: {formattedOwner}</div>
  );
}