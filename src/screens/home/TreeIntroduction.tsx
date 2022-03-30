import { Component } from "react";
import Link from "../../components/Link/Link";
import { Text } from "../../components/Text/Text";
import { getPriceRaise } from "../../state/transactions/transactions.selectors";
import { getOpenSeaURL, getTheTreeOpenSeaURL } from "../../utils/networks";
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
            What is The Tree of Wealth?
          </Text>
        </div>
        <div>
          <Text block>
            The Tree of Wealth is just a <b>NFT collection</b>, you can check how it looks in <Link href={getOpenSeaURL()}>OpenSea</Link>.
          </Text>
          <Text block>
            But in this collection there is <b>one very special NFT</b> like no other. It's called <Link href={getTheTreeOpenSeaURL()}>The Tree</Link>.
          </Text>
          <Text block>
            The wallet holding The Tree is called <b>the host</b>. Unlike any other NFT, <b>hosts cannot sell nor transfer The Tree</b> as they please.
          </Text>
          <Text block>
            Instead, anyone can become the new host of The Tree <b>by paying {priceRaise} MATIC more</b> than the current host.
          </Text>
          <Text block>
            Everytime a new host pays for The Tree, <b>the coins are distributed among all the previous hosts</b>. Everyone get {priceRaise} MATIC.
          </Text>
          <Text>So, from the point of view of the hosts...</Text>
          <Text>
            <ul>
              <li>The sooner you host The Tree, the cheaper it will be for you.</li>
              <li>When The Tree changes hands, as a previous host, you get wealthier.</li>
              <li>The more wallets host The Tree, the wealthier you get.</li>
            </ul>
          </Text>
        </div>
        <div>
          <Text>
            After reading all of this, you might want to <a href="#main" onClick={scrollToAnchor}>host The Tree now</a>. Or probably you still need to know more: have a look at the <Link href="/faq">frequent asked questions about The Tree of Wealth</Link>.
          </Text>
        </div>
      </div>
    );
  }
}