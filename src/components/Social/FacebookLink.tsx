import { FunctionComponent } from "react";

interface FacebookLinkProps {
}
 
const FacebookLink: FunctionComponent<FacebookLinkProps> = () => {
  return (
    <a
      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://thetreeofwealth.nft')}`}
      target="_blank"
      rel="noopener noreferrer">Facebook</a>
  );
}
 
export default FacebookLink;