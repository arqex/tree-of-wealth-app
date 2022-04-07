import FaqScreen from '../screens/faq/FaqScreen';
import Home from '../screens/home/Home'
import NftScreen from '../screens/nft/NftScreen';
import Settings from '../screens/settings/Settings';

export const routes = [
	{ path: "/", cb: Home },
	{ path: "/settings", cb: Settings},
	{ path: "/faq", cb: FaqScreen},
	{ path: "/nft/:id", cb: NftScreen}
];


