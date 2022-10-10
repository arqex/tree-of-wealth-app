
import { PureComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface IconProps {
  name?: String
}

export default class Icon extends PureComponent<IconProps> {
  render() {
    console.log('Rendering icon!!');
    return <FontAwesomeIcon icon={ faXmark } />;
  }
}