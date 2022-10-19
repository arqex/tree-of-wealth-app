import { FunctionComponent } from "react";

interface TwitterLinkProps {
  message: string
}
 
const TwitterLink: FunctionComponent<TwitterLinkProps> = ({message}) => {
  return (
    <a
      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer">Twitter</a>
  );
}
 
export default TwitterLink;