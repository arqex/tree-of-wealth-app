export interface NetworkDefinition {
  name: string,
  chainId: number,
  type: 'test' | 'production',
  contractAddress: string,
  rpc?: string,
  symbol?: string,
  blockExplorer?: string,
  openSeaURL?: string
}

const networks: {[id: number]: NetworkDefinition} = {
  /*
  137: {
    name: 'Polygon',
    chainId: 137,
    type: 'production',
    contractAddress: ""
  },
  */
  80001: {
    name: 'Polygon Mumbai',
    chainId: 80001,
    type: 'test',
    contractAddress: "0x0ae8daf0d0bcc03d630ca46f579a48137f1e1eae",
    rpc: 'https://rpc-mumbai.matic.today',
    symbol: 'MATIC',
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