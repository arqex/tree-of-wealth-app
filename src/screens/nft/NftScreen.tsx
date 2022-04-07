import { Component } from "react";
import { getRouter } from "../../router/router";
import { NftDetailsLoader } from "../../state/nft/nft.loaders";

interface NftScreenProps {
  
}
 
interface NftScreenState {
  
}

interface NftDefinition {
  id: string
  type: 'tow' | 'host' | 'repeatingHost' | 'unknown',
  number: number
}
 
class NftScreen extends Component<NftScreenProps, NftScreenState> {
  render() {
    let {isLoading, data: details} = NftDetailsLoader( this.getId() );
    if( isLoading ) return 'Loading...';

    return (
      <div>{ JSON.stringify(details) }</div>
    );
  }

  getId() {
    return getRouter().location.params.id;
  }
}


 
export default NftScreen;