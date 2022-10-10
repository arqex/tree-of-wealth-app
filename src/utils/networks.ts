export interface NetworkDefinition {
  name: string,
  chainId: number,
  type: 'test' | 'production',
  contractAddress: string,
  rpc: string,
  symbol?: string,
  blockExplorer?: string,
  openSeaURL?: string
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

  5: {
    name: 'Ethereum Goerli',
    chainId: 5,
    type: 'test',
    contractAddress: "0x2fecA53F5660a4CF78972Fa880257d9B03600989",
    rpc: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    symbol: 'ETH',
    blockExplorer: 'https://goerli.etherscan.io/',
    openSeaURL: 'https://testnets.opensea.io/es/collection/the-tree-of-wealth-r4y4fqlbic'
  },
  80001: {
    name: 'Polygon Mumbai',
    chainId: 80001,
    type: 'test',
    contractAddress: "0x0ae8daf0d0bcc03d630ca46f579a48137f1e1eae",
    rpc: 'https://rpc-mumbai.maticvigil.com',
    symbol: 'ETH',
    blockExplorer: 'https://mumbai.polygonscan.com/',
    openSeaURL: 'https://testnets.opensea.io/collection/the-tree-of-wealth-v2'
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
  return networks[80001];
}

export function getOpenSeaURL() {
  return getMainNetworkDetails()?.openSeaURL || '';
}

export function getTheTreeOpenSeaURL() {
  return 'https://testnets.opensea.io/assets/mumbai/0x0ae8daf0d0bcc03d630ca46f579a48137f1e1eae/1';
}