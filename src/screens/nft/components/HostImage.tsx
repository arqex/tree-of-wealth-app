import * as React from 'react';

interface HostImageProps {
  type: 'host' | 'repeating'
  number: number
}

interface HostImageState {
  
}
 
class HostImage extends React.Component<HostImageProps, HostImageState> {
  render() { 
    const isRepeating = this.props.type !== 'host';
    const name = isRepeating ? 'Repeating host' : 'Host';
    const color1 = isRepeating ? '993' : '369';
    const color2 = isRepeating ? 'cc8' : '8ac';
    
    return (
      <svg width="100%" height="100%" viewBox='0 0 300 300'>
        <defs>
          <path d='M23.3 152.7c0-67.5 55-129.5 122.5-129.5s132.5 45 132.5 129.5' id='tc'/>
          <path d='M22.5 148c0 67.5 55 129.5 122.5 129.5s132.5-45 132.5-129.5' id='bc'/>
        </defs>
        <path d='M0 0h300v300H0z' className='color1' />
        <circle className='color2' cx='150' cy='150' r='127' />
        <text fontFamily='Arial' fontSize='30' fontWeight='bold' fill='#fff'>
          <textPath textAnchor='middle' href='#tc' startOffset='50%'>
            <tspan alignment-baseline='hanging'>{ name }</tspan>
          </textPath>
        </text>
        <text fontFamily='Arial' fontSize='30' fontWeight='bold' fill='#fff'>
          <textPath textAnchor='middle' href='#bc' startOffset='50%'>
            <tspan># {this.props.number}</tspan>
          </textPath>
        </text>
        <defs>
          <style>{`
            .color1 {fill: #${color1}}
            .color2 {fill: #${color2}}
          `}
          </style>
        </defs>
      </svg>
    );
  }
}

export default HostImage;