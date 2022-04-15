import { Component } from "react";
import { getRouter } from "../../router/router";
import { NftDetailsLoader } from "../../state/nft/nft.loaders";
import NftLayout from "./components/NftLayout";

interface NftScreenProps {
  
}
 
interface NftScreenState {
  
}
 
class NftScreen extends Component<NftScreenProps, NftScreenState> {
  render() {
    let {isLoading, data: details, error} = NftDetailsLoader( this.getId() );

    // @ts-ignore
    if( details?.error ){
      error = details;
      details = undefined;
    }

    return (
      <div>
        <NftLayout
          isLoading={ isLoading }
          error={error}
          // @ts-ignore
          details={ details } />
      </div>
    );
  }

  getId() {
    return getRouter().location.params.id;
  }
}

export default NftScreen;