import { ContractOwnerLoader } from "../../../state/contract/contract.loaders";
import { formatAddress } from "../../../utils/format";

export function ContractOwner(){
  const {data: owner} = ContractOwnerLoader();
  const formattedOwner = owner ? formatAddress(owner) : '';

  return (
    <div>Contract owner: {formattedOwner}</div>
  );
}