import { Component } from "react";
import Link from "../../components/Link/Link";
import { Text } from "../../components/Text/Text";
import { getPriceRaise } from "../../state/transactions/transactions.selectors";
import { scrollToAnchor } from "../../utils/scrollToAnchor";


interface TreeIntroductionProps {
  
}
 
interface TreeIntroductionState {
  
}
 
export default class TreeIntroduction extends Component<TreeIntroductionProps, TreeIntroductionState> {
  render() { 
    const priceRaise = getPriceRaise();

    return (
      <div>
        <div style={{textAlign: 'center'}}>
          <Text type="h1" margin="l">
            What is The Tree of Wealth
          </Text>
        </div>
        <div>
          <Text block>
            The Tree of Wealth is a very special NFT that anyone can hold in their wallet by paying {priceRaise} MATIC more than the previous holder.
          </Text>
          <Text block>
            Like any NFT, you can use it in your <a>social networks</a> and find it in <a>Open Sea</a>. But, unlike any other NFT, when you hold it you can't freely sell it or transfer it, and anyone paying {priceRaise} more MATIC than what you paid will take The Tree from your wallet.
          </Text>
          <Text block>
            And here's The Tree's magic: When anyone pays for holding The Tree, the paid coins are distributed among all the previous holders. So every time the host of The Tree changes, every former holder get {priceRaise} MATIC!
          </Text>
          <Text margin="l">
            When The Tree changes hands, you, as a holder, get wealthier. The more hosts The Tree has, the wealthier you get. The sooner you host The Tree, the smaller invest you need to profit from it.
          </Text>
        </div>
        <div>
          <Text>
            After reading all of this, you might want to <a href="#main" onClick={scrollToAnchor}>host The Tree</a> now. But you'll probably have more questions, have a look at the <Link href="/faq">frequent asked questions about The Tree of Wealth</Link>.
          </Text>
        </div>
      </div>
    );
  }
}