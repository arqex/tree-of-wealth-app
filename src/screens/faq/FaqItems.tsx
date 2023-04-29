import Link from "../../components/Link/Link"
import { Text } from "../../components/Text/Text";
import { getPriceRaise } from "../../state/transactions/transactions.selectors";
import { getContractAddress, getValidChainId, getOpenSeaURL, getContractURL } from "../../utils/networks";

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
          <li>You need a wallet with enough ETH to host The Tree.</li>
          <li>If you don't have a wallet, a popular one is <Link href="https://metamask.io/">Metamask</Link>.</li>
          <li>Connect your wallet into the <Link href="/">Tree of Wealth website</Link> and you will see the button to host The Tree.</li>
          <li>If you don't have any ETH, you can buy those ETH from exchanges like <Link href="https://www.binance.com/">Binance</Link> or <Link href="https://www.coinbase.com/">Coinbase</Link>. Or you might <Link href="https://metamask.zendesk.com/hc/en-us/articles/360058239311-Directly-buying-tokens-with-on-ramps-in-MetaMask">buy them within metamask</Link>.</li>
          <li>If you bought ETH through an exchange, you need to transfer them to your wallet: <Link href="https://decrypt.co/resources/coins-keys-wallet">Not your keys, not your coins. Check with your exchange how the transfers work.</Link></li>
          <li>Once you have your wallet with ETH connected to the <Link href="/">Tree of Wealth website</Link>, you are ready to click the host button.</li>
        </ul>
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
            <li>On top of that, you will get a <Link href="/faq#whats-host-token">host NFT</Link>, that is transferible.</li>
            <li>From that point, the smart contract will store for you {getPriceRaise()} ETH for every new wallet that become the host after you.</li>
          </ul>
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
          The only way to transfer The Tree is by the recipient wallet to pay {getPriceRaise()} ETH more than what you paid.
        </Text>
        <Text block>
          When somebody takes The Tree from your wallet, you won't get the coins transferred. Instead, the transferred amount will be distributed among all the previous hosts, and you only will get your part.
        </Text>
      </div>
    ),
  },
  {
    id: 'how-do-i-withdraw',
    question: 'How can I withdraw my ETH from The Tree?',
    answer: (
      <div>
        <Text block>
          Once you have hosted The Tree, you will get { getPriceRaise() } ETH for every new account that become host.
        </Text>
        <Text block>
          To get those coins from the smart contract, you need to connect your wallet to the <Link href="/">Tree of Wealth website</Link> and the amount available to withdraw will appear.
        </Text>
        <Text block>
          By clicking on the Withdraw button, the process to transfer the funds to your address will start. Follow the instructions in your wallet to complete the withdraw transaction.
        </Text>
        <Text block>
          Keep in mind that you need to pay the gas needed for the withdraw the transaction. That fee is usually bigger than { getPriceRaise() } ETH, so maybe it's wise not to withdraw very often, but it's up to you.
        </Text>
        <Text block>
          Once the funds have been withdrawn, your counter is set to 0 and you need to wait for new hosts to withdraw again.
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
          When you become The Tree host, you also receive a host token. A host token is a NFT that includes customized colors and your unique host number.
        </Text>
        <Text block>
          Anyone can become the host of The Tree, taking it from you, but the host token remains in your wallet. Hosts tokens follow the ERC-721 standard and, unlike The Tree token, they can be freely transferred.
        </Text>
        <Text block>Check out all the tokens that have been generated in <Link href={ getOpenSeaURL() }>OpenSea</Link>.</Text>
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
    id: 'responsibility',
    question: 'Is any responsible of the Tree of Wealth?',
    answer: (
      <div>
        <Text block>
          This is a non-commercial project that has been created as an experiment and published on the Ethereum network. The Tree functionality should be availabile as long as the Ethereum network is available, but the author has no responsibility over keeping that functionality up and running.
        </Text>
        <Text block>
          The smart contract is what defines the exact behavior of The Tree and it might differ from what is described here or in any other media. The smart contract is open-source and anyone can audit exactly how it works.
        </Text>
        <Text block>
          Hosting The Tree implies that you understand what the smart contract does, and you accept any transaction or lack of transaction made by it.
        </Text>
        <Text block>
           <Link href={ getContractURL() }>The source code of the smart contract is available here</Link>.
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
          This site is just an interface to make simpler the usage of the smart contract of The Tree of Wealth. The main mirror for this app is <Link href="https://treeofwealth.deno.dev/">https://treeofwealth.deno.dev/</Link>, but there are more mirrors listed in the <Link href="https://github.com/arqex/tree-of-wealth-contract#frontend">contract repository</Link>.
        </Text>
        <Text block>
          This interface is also open-source. You can run it yourself in case none of the domains above are available. The source code is available in <Link href="https://github.com/arqex/tree-of-wealth-app">this repository</Link>.
        </Text>
        <Text block>
          It's also possible to connect directly to the smart contract. The smart contract address in the Ethereum network is <Link href={getContractURL()}>{getContractAddress(getValidChainId())}</Link>.
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
    id: 'use-images',
    question: 'Can I use the images of The Tree?',
    answer: (
      <div>
        <Text block>
          Sure, the images of The Tree are free to use for any purpose, just please don't be evil with them.
        </Text>
        <Text>The original images of The Tree and the host tokens are generated on-chain, so they live in the Ethereum blockchain. <a href="/static/media/tree.524812c3.svg" target="_blank" rel="noopener noreferrer">But you can find a copy of The Tree image here</a>.</Text>
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
          The contract is open-sourced and <Link href={getContractURL()}>available here</Link>. Anybody can have a look and audit how it works exactly.
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
          To know the price of The Tree of Wealth you need to connect your wallet in the <Link href="/">main page of The Tree of Wealth website</Link>.
        </Text>
        <Text block>
          The price for hosting the Tree increases by {getPriceRaise()} ETH every time it changes host. So the sooner you host the cheaper it will be.
        </Text>
      </div>
    )
  },
  {
    id: 'motivation',
    question: 'What is the motivation behind The Tree of Wealth?',
    answer: (
      <div>
        <Text block>
          Contrary to other NTF collections that put the focus on the art, The Tree of Wealth wants to highlight the importance of the programmability of this kind of tokens.
        </Text>
        <Text block>
          Usual NFTs are backed by a standard smart contract that allows to trade the tokens in a predictable way. That standard contract is what makes NFTs collections compatible with marketplaces, so they can be listed and transferred there. Marketplaces and art are just a way of getting introduced to NFTs, but the concept is much wider.
        </Text>
        <Text block>
          The key feature of NFTs is that they represent digital property. The rules to transfer that property are settled in a contract, including any financial interchange needed between the parts.
        </Text>
        <Text block>
          Those contracts are called smart contracts, and they are not a pile of papers signed by the parties. They are computer programs that run in a distributed and secure network called blockchain. If somebody wants to transfer the property, there is no need to sign anything: they just need to call the contract, following the rules, and the property will be transferred. No chance of fraud, no need of a third party, no need of a lawyer.
        </Text>
        <Text block>
          The Tree of Wealth is just an example on how flexible those contracts can be. <Link href={getContractURL()}>Its source code is open to anyone to review</Link>. Maybe not everybody can read and understand its code, but can everybody understand the lawyer slang used in traditional contracts?
        </Text>
        <Text block>
          I truly believe in the potential of smart contracts to change our society for the better, and I hope this project can help to spread the idea.
        </Text>
      </div>
    )
  }
]

export default items;