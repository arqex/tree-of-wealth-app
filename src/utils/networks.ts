export interface NetworkDefinition {
  name: string,
  chainId: number,
  type: 'test' | 'production',
  contractAddress: string,
  rpc: string,
  symbol?: string,
  blockExplorer?: string,
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
    contractAddress: '',
    rpc: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    symbol: 'ETH',
    blockExplorer: 'https://goerli.etherscan.io/',
    openSeaURL: 'https://testnets.opensea.io/es/collection/the-tree-of-wealth-r4y4fqlbic',
    tokenBaseURL: 'https://testnets.opensea.io/assets/goerli/0x2feca53f5660a4cf78972fa880257d9b03600989'
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
}

export function isValidNetwork( chainId: number ): boolean{
  return !!networks[chainId];
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
  return networks[getCurrentChainId()];
}

export function getOpenSeaURL() {
  return getMainNetworkDetails()?.openSeaURL || '';
}

export function getTheTreeOpenSeaURL() {
  return `${getMainNetworkDetails().tokenBaseURL}/0`
}

export function getCurrentChainId(){
  if( window.location.host.includes('localhost') ){
    return 5;
  }
  return 1;
}