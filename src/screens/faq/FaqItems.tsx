import Link from "../../components/Link/Link"
import { Text } from "../../components/Text/Text";
import { getPriceRaise } from "../../state/transactions/transactions.selectors";

export interface FaqItem {
  id: string,
  question: string,
  answer: any
};

const items = [
  {
    id: 'what-do-i-need',
    question: 'What do I need to buy The Tree?',
    answer: (
      <div>
        <Text>The Tree Of Wealth is a NFT that lives in the Polygon blockchain, so you need to connect to that blockchain if you want to host it. To do so:</Text>
        <ul>
          <li>Install a browser wallet compatible with Ethereum blockchains like <Link href="https://metamask.io/">Metamask</Link>.</li>
          <li>Configure your wallet to <Link>connect to the Polygon blockchain</Link>.</li>
          <li>You need to have enough MATIC tokens to buy The Tree. You can buy those tokens from exchanges like <Link href="https://www.binance.com/">Binance</Link> or <Link href="https://www.kraken.com/">Kraken</Link>.</li>
          <li>Once you have MATIC tokens, transfer them to your browser's wallet.</li>
          <li>Connect your wallet into the <Link href="/">Tree of Wealth website</Link> and you are ready to host the tree.</li>
        </ul>
      </div>
    )
  },
  {
    id: 'how-can-i-be-sure',
    question: `How can I be sure I'll get paid when someone else buys The Tree?`,
    answer: (
      <div>
        <Text block>
          The Tree of Wealth works thanks to a smart contract. That means that it's programmed to always distribute the purchase gains through the previous owners of The Tree, and that behavior can't be changed, censured nor taken down.
        </Text>
        <Text block>
          The contract is open-sourced and <a>available here</a>. Anybody can have a look and audit how it works.
        </Text>
      </div>
    )
  },
  {
    id: 'can-i-buy-twice',
    question: `Can I buy The Tree twice?`,
    answer: (
      <div>
        <Text block>
          Yes, it's possible to buy The Tree of Wealth more than once, but the gains produced for that second purchase won't be withdrawable.
        </Text>
        <Text block>
          Remember that the spirit of The Tree is to distribute the wealth, so instead, the coins generated will be donated to a solidary cause. Right now that cause is [name and link here].
        </Text>
      </div>
    )
  },
  {
    id: 'whats-the-price',
    question: `What's the price for hosting The Tree?`,
    answer: (
      <div>
        <Text block>
          To know the tree you need to connect your wallet and go to the <Link href="/">main page</Link>.
        </Text>
        <Text block>
          The price for hosting the Tree increases by {getPriceRaise()} MATIC every time it's bought. So the sooner you bought it the better.
        </Text>
      </div>
    )
  },
  {
    id: 'can-i-sell',
    question: 'Can I sell or transfer The Tree?',
    answer: (
      <div>
        <Text block>
          No. When you buy The Tree, you will see it in your wallet as any other NFT,b ut if you try to sell it using NFT platforms like <Link href="">OpenSea</Link> you will get an error.
        </Text>
        <Text block>
          The Tree of Wealth will be transfered to any wallet that pays {getPriceRaise()} MATIC more than you, and that amount will be distributed among all the previous owners.
        </Text>
      </div>
    )
  },

]

export default items;