
import WalletConnectProvider from "@walletconnect/web3-provider";
import { setWeb3Provider } from "../state/wallet/wallet.selectors";
import { getMainNetworkDetails } from "./networks";
import Web3Modal from "web3modal";
import { onProviderAvailable } from "../state/wallet/wallet.actions";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";


const metamaskIcon = `data:image/svg+xml;base64,${btoa('<svg height="355" viewBox="0 0 397 355" width="397" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" transform="translate(-1 -1)"><path d="m114.622644 327.195472 52.004717 13.810198v-18.05949l4.245283-4.249292h29.716982v21.246459 14.872523h-31.839624l-39.268868-16.997169z" fill="#cdbdb2"/><path d="m199.528305 327.195472 50.943397 13.810198v-18.05949l4.245283-4.249292h29.716981v21.246459 14.872523h-31.839623l-39.268868-16.997169z" fill="#cdbdb2" transform="matrix(-1 0 0 1 483.96227 0)"/><path d="m170.872644 287.889523-4.245283 35.056657 5.306604-4.249292h55.18868l6.367925 4.249292-4.245284-35.056657-8.490565-5.311615-42.452832 1.062323z" fill="#393939"/><path d="m142.216984 50.9915022 25.471698 59.4900858 11.674528 173.158643h41.391511l12.735849-173.158643 23.349056-59.4900858z" fill="#f89c35"/><path d="m30.7783023 181.657226-29.71698153 86.048161 74.29245393-4.249293h47.7594343v-37.181303l-2.122641-76.487253-10.613208 8.498583z" fill="#f89d35"/><path d="m87.0283032 191.218134 87.0283028 2.124646-9.551886 44.617563-41.391511-10.623229z" fill="#d87c30"/><path d="m87.0283032 192.280457 36.0849058 33.994334v33.994334z" fill="#ea8d3a"/><path d="m123.113209 227.337114 42.452831 10.623229 13.79717 45.679888-9.551886 5.311615-46.698115-27.620398z" fill="#f89d35"/><path d="m123.113209 261.331448-8.490565 65.864024 56.25-39.305949z" fill="#eb8f35"/><path d="m174.056606 193.34278 5.306604 90.297451-15.919812-46.211049z" fill="#ea8e3a"/><path d="m74.2924539 262.393771 48.8207551-1.062323-8.490565 65.864024z" fill="#d87c30"/><path d="m24.4103777 355.878193 90.2122663-28.682721-40.3301901-64.801701-73.23113313 5.311616z" fill="#eb8f35"/><path d="m167.688682 110.481588-45.636793 38.243627-35.0235858 42.492919 87.0283028 3.186969z" fill="#e8821e"/><path d="m114.622644 327.195472 56.25-39.305949-4.245283 33.994334v19.121813l-38.207548-7.43626z" fill="#dfcec3"/><path d="m229.245286 327.195472 55.18868-39.305949-4.245283 33.994334v19.121813l-38.207548-7.43626z" fill="#dfcec3" transform="matrix(-1 0 0 1 513.679252 0)"/><path d="m132.665096 212.464593-11.674528 24.433427 41.39151-10.623229z" fill="#393939" transform="matrix(-1 0 0 1 283.372646 0)"/><path d="m23.349057 1.06232296 144.339625 109.41926504-24.410378-59.4900858z" fill="#e88f35"/><path d="m23.349057 1.06232296-19.10377392 58.42776294 10.61320772 63.7393781-7.42924541 4.249292 10.61320771 9.560906-8.49056617 7.436261 11.67452847 10.623229-7.4292454 6.373938 16.9811323 21.246459 79.5990577-24.433428c38.915096-31.161473 58.018869-47.096318 57.311322-47.804533-.707548-.708215-48.820756-37.1813036-144.339625-109.41926504z" fill="#8e5a30"/><g transform="matrix(-1 0 0 1 399.056611 0)"><path d="m30.7783023 181.657226-29.71698153 86.048161 74.29245393-4.249293h47.7594343v-37.181303l-2.122641-76.487253-10.613208 8.498583z" fill="#f89d35"/><path d="m87.0283032 191.218134 87.0283028 2.124646-9.551886 44.617563-41.391511-10.623229z" fill="#d87c30"/><path d="m87.0283032 192.280457 36.0849058 33.994334v33.994334z" fill="#ea8d3a"/><path d="m123.113209 227.337114 42.452831 10.623229 13.79717 45.679888-9.551886 5.311615-46.698115-27.620398z" fill="#f89d35"/><path d="m123.113209 261.331448-8.490565 65.864024 55.18868-38.243626z" fill="#eb8f35"/><path d="m174.056606 193.34278 5.306604 90.297451-15.919812-46.211049z" fill="#ea8e3a"/><path d="m74.2924539 262.393771 48.8207551-1.062323-8.490565 65.864024z" fill="#d87c30"/><path d="m24.4103777 355.878193 90.2122663-28.682721-40.3301901-64.801701-73.23113313 5.311616z" fill="#eb8f35"/><path d="m167.688682 110.481588-45.636793 38.243627-35.0235858 42.492919 87.0283028 3.186969z" fill="#e8821e"/><path d="m132.665096 212.464593-11.674528 24.433427 41.39151-10.623229z" fill="#393939" transform="matrix(-1 0 0 1 283.372646 0)"/><path d="m23.349057 1.06232296 144.339625 109.41926504-24.410378-59.4900858z" fill="#e88f35"/><path d="m23.349057 1.06232296-19.10377392 58.42776294 10.61320772 63.7393781-7.42924541 4.249292 10.61320771 9.560906-8.49056617 7.436261 11.67452847 10.623229-7.4292454 6.373938 16.9811323 21.246459 79.5990577-24.433428c38.915096-31.161473 58.018869-47.096318 57.311322-47.804533-.707548-.708215-48.820756-37.1813036-144.339625-109.41926504z" fill="#8e5a30"/></g></g></svg>')}`;

const network = getMainNetworkDetails();
const providerOptions = {
  injected: {
    display: {
      name: "Injected",
      description: "Connect with the provider in your Browser"
    },
    package: null
  },
  walletconnect: {
    display: {
      name: "WalletConnect",
      description: "Scan QR code with your mobile wallet"
    },
    package: WalletConnectProvider,
    options: {
      rpc: {
        [network.chainId]: network.rpc
      }
    }
  },
  walletlink: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "The Tree of Wealth",
      rpc: {
        [network.chainId]: network.rpc
      }
    }
  }
}


export async function openConnectModal() {
  const web3Modal = new Web3Modal({
    // @ts-ignore
    providerOptions
  });

  // @ts-ignore
  if( web3Modal.userOptions.length === 2 ){
    // @ts-ignore
    web3Modal.userOptions.push({
      id: 'install',
      logo: metamaskIcon,
      name: `Don't have a wallet?`,
      description: 'Click to know how can you host The Tree',
      onClick: () => window.open('https://metamask.io/download/')
    });
  }

  web3Modal.clearCachedProvider();
  let provider = await web3Modal.connect();
  setWeb3Provider(provider);
  onProviderAvailable(provider);
}


