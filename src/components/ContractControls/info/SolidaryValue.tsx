import { SolidaryValueLoader } from "../../../state/contract/contract.loaders";
import { formatPrice } from "../../../utils/format";

export function SolidaryValue(){
  const {data: value} = SolidaryValueLoader();

  return (
    <div>Orphan value: {value ? formatPrice(value) : ''}</div>
  );
}