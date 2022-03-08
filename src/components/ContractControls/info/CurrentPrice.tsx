import { PriceLoader } from "../../../state/contract/contract.loaders";
import { formatPrice } from "../../../utils/format";

export function CurrentPrice(){
  const {data: price} = PriceLoader();
  const formattedPrice = price ? formatPrice(price) : '';

  return (
    <div>Current price: {formattedPrice}</div>
  );
}