import { OrphanValueLoader } from "../../../state/contract/contract.loaders";
import { formatPrice } from "../../../utils/format";

export function OrphanValue(){
  const {data: value} = OrphanValueLoader();

  return (
    <div>Orphan value: {value ? formatPrice(value) : ''}</div>
  );
}