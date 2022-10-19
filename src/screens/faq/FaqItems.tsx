import Link from "../../components/Link/Link"
import { Text } from "../../components/Text/Text";
import { getPriceRaise } from "../../state/transactions/transactions.selectors";
import { getContractAddress, getCurrentChainId, getOpenSeaURL } from "../../utils/networks";

export interface FaqItem {
  id: string,
  question: string,
  answer: any
};

const items = [
  {
    id: 'what-do-i-need',
    question: 'What do I need to host The Tree?',
    answer: (
      <div>
        <Text>The Tree Of Wealth is a NFT that lives in the Ethereum blockchain, so you need to connect to that blockchain if you want to host it. To do so:</Text>
        <ul>
          <li>Install a browser wallet compatible with Ethereum blockchains like <Link href="https://metamask.io/">Metamask</Link>.</li>
          <li>Configure your wallet to <Link>connect to the Ethereum blockchain</Link>.</li>
          <li>You need to have enough ETH to become The Tree host. You can buy those ETH from exchanges like <Link href="https://www.binance.com/">Binance</Link> or <Link href="https://www.kraken.com/">Kraken</Link>.</li>
          <li>Once you have ETH tokens, transfer them to your browser's wallet.</li>
          <li>Connect your wallet into the <Link href="/">Tree of Wealth website</Link> and you are ready to host the tree.</li>
        </ul>
      </div>
    )
  },
  {
    id: 'how-do-i-withdraw',
    question: 'How can I withdraw the money from The Tree?',
    answer: (
      <div>
        <Text block>
          Once you have hosted The Tree, you will get { getPriceRaise() } ETH for every new account that become the host.
        </Text>
        <Text block>
          To get those coins from the smart contract, you need to connect your wallet to the <Link href="/">Tree of Wealth website</Link> and you will see how much is available to withdraw.
        </Text>
        <Text block>
          By clicking on the Withdraw button, the process to transfer the fund to your address will start. Follow the instructions in your wallet to complete the withdraw transaction.
        </Text>
        <Text block>
          Keep in mind that you need to pay the gas needed for the withdraw the transaction, and usually that fee is bigger than { getPriceRaise() } ETH, so maybe it's wise not to withdraw very often.
        </Text>
        <Text block>
          Once the funds have been withdrawn, your counter is set to 0 and you need to wait for new hosts to withdraw again.
        </Text>
      </div>
    )
  },
  {
    id: 'responsibility',
    question: 'Is any responsible of the Tree of Wealth?',
    answer: (
      <div>
        <Text block>
          This is a non-commercial project that has been created as an experiment and published on the Ethereum network. The smart contract is the only one that is taking care of keeping The Tree working as it is once it's been published.
        </Text>
        <Text block>
          The smart contract is open-source and anyone can audit exactly how it works. Hosting The Tree implies that you understand what the smart contract does, and you accept any transaction or lack of transaction made by it.
        </Text>
      </div>
    )
  },
  {
    id: 'site-down',
    question: 'What if this site is down?',
    answer: (
      <div>
        <Text block>
          This site is just an interface to make simpler the usage of the smart contract of The Tree of Wealth. This interface is available in the following URLs:
          <ul>
            <li>https://treeofwealth.nft</li>
          </ul>
        </Text>
        <Text block>
          This interface is also open-source. You can run it yourself in case none of the domains above are available.
        </Text>
        <Text block>
          It's also possible to connect directly to the smart contract. The smart contract address in the Ethereum network is {getContractAddress(getCurrentChainId())} and here's a link to his ABI.
        </Text>
      </div>
    )
  },
  {
    id: 'rights',
    question: 'What are my rights as a host?',
    answer: (
      <div>
        <Text block>
          As the host of The Tree, your account address own the NFT and can use it as any other NFT that follow the <Link href="https://erc721.org/">ERC-721 standard</Link> with 2 exceptions:
          <ul>
            <li>You can't transfer The Tree token to other wallet.</li>
            <li>You can't approve other accounts to transfer The Tree on your behalf.</li>
          </ul>
        </Text>
        <Text block>
          Anyone is allowed to use or modify The Tree image and art for commercial or non-commercial purposes. By hosting The Tree you don't have any special right over The Tree image and art.
        </Text>
      </div>
    )
  },
  {
    id: 'what-host-get',
    question: 'What do I get when I host the tree?',
    answer: (
      <div>
        <Text block>
          When you become the host of The Tree:
          <ul>
            <li>Your wallet address will be the owner The Tree NFT.</li>
            <li>On top of that, you will get a Host NFT, that is transferible.</li>
            <li>From that point, the smart contract will store for you {getPriceRaise()} ETH for every new wallet that become the host after you.</li>
          </ul>
        </Text>
      </div>
    )
  },
  {
    id: 'how-can-i-be-sure',
    question: `How can I be sure I'll get paid when someone else host The Tree?`,
    answer: (
      <div>
        <Text block>
          The Tree of Wealth works thanks to an immutable smart contract. That means that it's programmed to always distribute new host's coins among the previous hosts. That behavior is automatic, can't be changed, censured nor taken down.
        </Text>
        <Text block>
          The contract is open-sourced and <a href="#1">available here</a>. Anybody can have a look and audit how it works exactly.
        </Text>
      </div>
    )
  },
  {
    id: 'whats-host-token',
    question: "What is a host token?",
    answer: (
      <div>
        <Text block>
          When you become The Tree host, you also receive a host token. A host token is a NFT that includes customized colors and your host number.
        </Text>
        <Text block>
          Anyone can take The Tree token from you, but your host token remains in your wallet. Hosts tokens follow the ERC-721 standard and can be freely transferred, unlike The Tree token.
        </Text>
        <Text block>Check out all the tokens that have been generated in <Link href={ getOpenSeaURL() }>OpenSea</Link></Text>
      </div>
    )
  },
  {
    id: 'can-i-host-twice',
    question: `Can I host The Tree twice?`,
    answer: (
      <div>
        <Text block>
          No, the same wallet can't host The Tree twice. If you try to pay again to be the host, the smart contract will just reject your transaction.
        </Text>
        <Text block>
          This is because the spirit of The Tree is to distribute the wealth among the bigger number of hosts possible.
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
          The price for hosting the Tree increases by {getPriceRaise()} ETH every time it changes host. So the sooner you host the cheaper it will be.
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
          The only way of transfering The Tree is by the recipient wallet to pay {getPriceRaise()} ETH more than what you paid.
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