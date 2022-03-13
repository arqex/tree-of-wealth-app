export interface NetworkDefinition {
  name: string,
  chainId: number,
  type: 'test' | 'production',
  contractAddress: string
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
    contractAddress: "0xd6b26AD9bF3570F08eC3683f711c782c25C3f8D3"
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