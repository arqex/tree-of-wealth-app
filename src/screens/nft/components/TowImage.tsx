import * as React from 'react';
import tree from '../../home/tree.png'

interface TowImageProps {
  
}
 
interface TowImageState {
  
}
 
class TowImage extends React.Component<TowImageProps, TowImageState> {
  render() { 
    return (
      <img src={tree} alt="The Tree of Wealth" />
    );
  }
}
 
export default TowImage;