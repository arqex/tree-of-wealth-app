import { Component } from "react";
import Link from "../../components/Link/Link";
import { Text } from "../../components/Text/Text";
import { getPriceRaise } from "../../state/transactions/transactions.selectors";
import { getContractURL, getOpenSeaURL, getTheTreeOpenSeaURL } from "../../utils/networks";
import { scrollToAnchor } from "../../utils/scrollToAnchor";
import styles from './Home.module.css';


interface TreeIntroductionProps {
  
}
 
interface TreeIntroductionState {
  
}
 
export default class TreeIntroduction extends Component<TreeIntroductionProps, TreeIntroductionState> {
  render() { 
    const priceRaise = getPriceRaise();

    return (
      <div className={ styles.introContent }>
        <div style={{textAlign: 'center'}}>
          <Text type="h1" margin="l">
            What is The Tree of Wealth?
          </Text>
        </div>
        <div>
          <Text block>
            The Tree of Wealth is a <b><Link href={getOpenSeaURL()}>NFT collection</Link></b> that contains <b>one very special NFT</b> like no other. It's called <b><Link href={getTheTreeOpenSeaURL()}>The Tree</Link></b>.
          </Text>
          <Text block>
            The wallet holding The Tree is called <b>the host</b>. Unlike any other NFT, <b>hosts cannot sell nor transfer The Tree</b> as they please.
          </Text>
          <Text block>
            Instead, anyone can become the new host of The Tree <b>by paying {priceRaise} ETH more</b> than the current host.
          </Text>
          <Text block>
            Everytime a new host pays for The Tree, <b>the coins are distributed among all the previous hosts</b>. Everyone get {priceRaise} ETH.
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
          <Text block>
            This process happens automatically, in a decentralized way, thanks to an <Link href={getContractURL()}>open-source smart contract running on the Ethereum network</Link>.
          </Text>
          <Text>
            After reading all of this, you might want to <a href="#main" onClick={scrollToAnchor}>host The Tree now</a>. Or maybe you want to know more by visiting the <Link href="/faq">frequent asked questions about The Tree of Wealth</Link>.
          </Text>
        </div>
      </div>
    );
  }
}