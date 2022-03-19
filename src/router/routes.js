import FaqScreen from '../screens/faq/FaqScreen';
import Home from '../screens/home/Home'
import Settings from '../screens/settings/Settings';

export const routes = [
	{ path: "/", cb: Home },
	{ path: "/settings", cb: Settings},
	{ path: "/faq", cb: FaqScreen}
];


