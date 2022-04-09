import { Component } from "react";
import { getRouter } from "../../router/router";
import { NftActivityLoader, NftDetailsLoader } from "../../state/nft/nft.loaders";
import { NftDetails } from "../../state/state.types";
import NftLayout from "./components/NftLayout";

interface NftScreenProps {
  
}
 
interface NftScreenState {
  
}
 
class NftScreen extends Component<NftScreenProps, NftScreenState> {
  render() {
    let {isLoading, data: details, error} = NftDetailsLoader( this.getId() );
    if( isLoading ) return 'Loading...';

    if( error || !details ){
      return <div>{ JSON.stringify(error) }</div>;
    }

    let {data: activity, isLoading: activityLoading} = NftActivityLoader(this.getId());

    
    let type: string = 'tow';
    if( isHostNft(details) ){
      type = 'host';
    }
    else if( isRepeatingNft(details) ){
      type = 'reapeating';
    }

    return (
      <div>
        { JSON.stringify(details) }
        <NftLayout
          type={type}
          details={details}
          activity={activity}
          activityLoading={activityLoading} />
      </div>
    );
  }

  getId() {
    return getRouter().location.params.id;
  }
}

function isHostNft( details: NftDetails ){
  return details.meta.name.startsWith('Host');
}

function isRepeatingNft( details: NftDetails ){
  return details.meta.name.startsWith('Repeating');
}
 
export default NftScreen;