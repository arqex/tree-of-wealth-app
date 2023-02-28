export interface NetworkDefinition {
  name: string,
  chainId: number,
  type: 'test' | 'production',
  contractAddress: string,
  rpc: string,
  symbol?: string,
  blockExplorer: string,
  openSeaURL?: string,
  tokenBaseURL: string
}

const networks: {[id: number]: NetworkDefinition} = {
  /*
  137: {
    name: 'Ethereum',
    chainId: 137,
    type: 'production',
    contractAddress: ""
  },
  */
  1: {
    name: 'Ethereum',
    chainId: 1,
    type: 'production',
    contractAddress: '0x27E1F5CcC4F184A2Ca55B12353c06dA9e1803621',
    rpc: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    symbol: 'ETH',
    blockExplorer: 'https://etherscan.io/',
    openSeaURL: 'https://opensea.io/collection/treeofwealth',
    tokenBaseURL: 'https://opensea.io/assets/ethereum/0x27E1F5CcC4F184A2Ca55B12353c06dA9e1803621'
  },

  5: {
    name: 'Ethereum Goerli',
    chainId: 5,
    type: 'test',
    contractAddress: "0xB3a4f64cAba75067DE96De506Ada8E22b83507f5",
    rpc: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    symbol: 'ETH',
    blockExplorer: 'https://goerli.etherscan.io/',
    openSeaURL: 'https://testnets.opensea.io/collection/the-tree-of-wealth-ddqdrpsfix',
    tokenBaseURL: 'https://testnets.opensea.io/assets/goerli/0xB3a4f64cAba75067DE96De506Ada8E22b83507f5'
  },
  80001: {
    name: 'Polygon Mumbai',
    chainId: 80001,
    type: 'test',
    contractAddress: "0x3bc0525543bF003f6cC33A42a09DE730ae09b56b",
    rpc: 'https://rpc-mumbai.maticvigil.com',
    symbol: 'ETH',
    blockExplorer: 'https://mumbai.polygonscan.com/',
    openSeaURL: 'https://testnets.opensea.io/collection/the-tree-of-wealth-v2',
    tokenBaseURL: 'https://testnets.opensea.io/assets/mumbai/0x0ae8daf0d0bcc03d630ca46f579a48137f1e1eae'
  },

  11155111: {
    name: "Sepolia Testnet",
    chainId: 11155111,
    type: 'test',
    contractAddress: '0xFd9D2ef4235F70a7890ab39c92B504184e45643f',
    rpc: 'https://rpc.sepolia.dev',
    symbol: 'ETH',
    blockExplorer: 'https://sepolia.etherscan.io/',
    openSeaURL: 'https://testnets.opensea.io/collection/the-tree-of-wealth-ddqdrpsfix',
    tokenBaseURL: 'https://testnets.opensea.io/assets/goerli/0xB3a4f64cAba75067DE96De506Ada8E22b83507f5'
  }
}

export function isValidNetwork( chainId: number ): boolean {
  return chainId === getValidChainId();
}

export function isTestNetwork( chainId: number): boolean {
  return networks[chainId]?.type === 'test';
}

export function getNetworkName( chainId: number): string {
  return networks[chainId]?.name || '';
}

export function getContractAddress( chainId: number): string {
  return networks[chainId]?.contractAddress || '';
}

export function getMainNetworkDetails(){
  return networks[getValidChainId()];
}

export function getOpenSeaURL() {
  return getMainNetworkDetails()?.openSeaURL || '';
}

export function getTheTreeOpenSeaURL() {
  return `${getMainNetworkDetails().tokenBaseURL}/0`
}

export function getValidChainId(){

  if( window.location.host.includes('localhost') ){
    return 11155111;
  }
  return 1;
}

export function getContractURL() {
  const { blockExplorer, contractAddress } = getMainNetworkDetails();
  return `${blockExplorer}address/${contractAddress}#code`;
}