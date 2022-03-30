import Link from "../../components/Link/Link"
import { Text } from "../../components/Text/Text";
import { getPriceRaise } from "../../state/transactions/transactions.selectors";
import { getOpenSeaURL } from "../../utils/networks";

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
          <li>You need to have enough MATIC to become The Tree host. You can buy those coin from exchanges like <Link href="https://www.binance.com/">Binance</Link> or <Link href="https://www.kraken.com/">Kraken</Link>.</li>
          <li>Once you have MATIC tokens, transfer them to your browser's wallet.</li>
          <li>Connect your wallet into the <Link href="/">Tree of Wealth website</Link> and you are ready to host the tree.</li>
        </ul>
      </div>
    )
  },
  {
    id: 'how-can-i-be-sure',
    question: `How can I be sure I'll get paid when someone else host The Tree?`,
    answer: (
      <div>
        <Text block>
          The Tree of Wealth works thanks to a smart contract. That means that it's programmed to always distribute the purchase gains through the previous owners of The Tree, and that behavior can't be changed, censured nor taken down.
        </Text>
        <Text block>
          The contract is open-sourced and <a href="#1">available here</a>. Anybody can have a look and audit how it works.
        </Text>
      </div>
    )
  },
  {
    id: 'can-i-buy-twice',
    question: `Can I pay for The Tree twice?`,
    answer: (
      <div>
        <Text block>
          Yes, it's possible to become The Tree host more than once, but you won't earn more by doing so. You will get a special host NFT instead, only for repeating hosts.
        </Text>
        <Text block>
          Remember that the spirit of The Tree is to distribute the wealth, so the coins generated will be donated to a solidary cause. Right now that cause is [name and link here].
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
          To know the price of The Tree of Wealth you need to connect your wallet and go to the <Link href="/">main page</Link>.
        </Text>
        <Text block>
          The price for hosting the Tree increases by {getPriceRaise()} MATIC every time it changes host. So the sooner you buy the cheaper it will be.
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
          No. When you host The Tree, you will see it in your wallet as any other NFT, but if you try to sell it using NFT marketplaces like <Link href={getOpenSeaURL()}>OpenSea</Link> you will get an error.
        </Text>
        <Text block>
          The only way of transfering The Tree is by the recipient wallet to pay {getPriceRaise()} MATIC more than what you paid.
        </Text>
        <Text block>
          When somebody takes The Tree from your wallet, you won't get the coins that were paid. Instead, the amount will be distributed among all the previous hosts, and you only will get your part.
        </Text>
      </div>
    ),
  },
  {
    id: 'other-tokens-in-collection',
    question: 'What are the other NFTs from The Tree of Wealth collection',
    answer: (
      <div>
        <Text block>
          Those NFTs are called the host NFTs
        </Text>
        <Text block>
          When somebody pays the price for hosting The Tree, they will receive The Tree NFT and also a new host NFT will be minted and transferred to their account.
        </Text>
        <Text block>
          Every host NFT has a unique number that identifies what is the host position in the line of hosts. 
        </Text >
        <Text block>
          There are 2 types of host NFTs:
          <ul>
            <li>The first time an address host The Tree, it will receive a common host NFT.</li>
            <li>If the same address host The Tree again, will collaborate with a solidary cause, and it will receive a rare repeating host NFT.</li>
          </ul>
        </Text>
        <Text block>
          Host NFTs might have some utility in the future.
        </Text>
      </div>
    )
  }
]

export default items;