import { RepeatingValueLoader } from "../../../state/contract/contract.loaders";
import { formatPrice } from "../../../utils/format";

export function RepeatingValue(){
  const {data: value} = RepeatingValueLoader();

  return (
    <div>Orphan value: {value ? formatPrice(value) : ''}</div>
  );
}