import { Text } from "../../../../components/Text/Text";
import FacebookLink from "../../../../components/Social/FacebookLink";
import TwitterLink from "../../../../components/Social/TwitterLink";

export default function WithdrawSocialLinks(){
  return (
    <Text block>
      <TwitterLink message="I've just earned some ETH thanks to The Tree of Wealth! 💥🌳 https://thetreeofwealth.nft #treeofwealth #nft #ethereum" /> -{' '}
      <FacebookLink /> -{' '}
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a> -{' '}
      <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">TikTok</a>
    </Text>
  )
}