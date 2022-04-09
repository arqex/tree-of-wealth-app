import {Component} from 'react';
import { NftActivity, NftDetails } from '../../../state/state.types';

interface NftLayoutProps {
  type: string
  details: NftDetails,
  activity: NftActivity[] | undefined,
  activityLoading: boolean
}
 
interface NftLayoutState {
  
}
 
export default class NftLayout extends Component<NftLayoutProps> {
  state: NftLayoutState = {}
  render() { 
    return (
      <div>This is the layotu</div>
    );
  }
}