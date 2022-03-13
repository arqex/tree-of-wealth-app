import { RepeatingOwnerLoader } from "../../../state/contract/contract.loaders";
import { formatAddress } from "../../../utils/format";

export function RepeatingOwner(){
  const {data: owner} = RepeatingOwnerLoader();
  const formattedOwner = owner ? formatAddress(owner) : '';

  return (
    <div>Repeating owner: {formattedOwner}</div>
  );
}