import {Component} from 'react';
import LoadingText from '../../../components/LoadingText/LoadingText';
import Spinner from '../../../components/Spinner/Spinner';
import { NftDetails } from '../../../state/state.types';
import HostImage from './HostImage';
import styles from './NftLayout.module.css';
import TowImage from './TowImage';

interface NftLayoutProps {
  details?: NftDetails,
  isLoading: boolean,
  error?: any
}
 
interface NftLayoutState {
  
}
 
export default class NftLayout extends Component<NftLayoutProps> {
  state: NftLayoutState = {}
  render() { 
    return (
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          { this.renderImage() }
        </div>
        { this.renderTitle() }
      </div>
    );
  }

  renderImage() {
    const {error, isLoading, details} = this.props;
    if( error ){
      return <>x</>;
    }

    if( isLoading ){
      return <Spinner />
    }

    if( error || !details ){
      return <>x</>;
    }

    let {name} = details.meta;
    let type = getNftType( name );

    if( type === 'tow' ){
      return <TowImage />;
    }
    
    return <HostImage type={type} number={ getNftNumber(name) } />;
  }

  renderTitle() {
    if( this.props.isLoading ){
      <LoadingText>Host NFT</LoadingText>
    }
    
    return <>{ this.props.details?.meta.name } </>;
  }
}


function getNftType( name: string ): 'repeating' | 'host' | 'tow' {
  if( name.startsWith('Repeating') ){
    return 'repeating';
  }
  else if( name.startsWith('Host') ){
    return 'host';
  }
  return 'tow';
}


function getNftNumber( name: string ){
  return parseInt( name.split('#')[1] );
}