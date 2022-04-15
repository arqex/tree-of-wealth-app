import { NftActivity, NftDetails, NftError } from "../state.types";
import { stateManager } from "../stateManager";

const API_URL = 'https://5dbl2elri2.execute-api.us-east-1.amazonaws.com/';

export const NftDetailsLoader = stateManager.loader<string, NftDetails|NftError>({
  selector(store, id) {
    return store.nftDetails[id];
  },

  async load(id) {
    return fetch(`${API_URL}nftdetails/${id}`)
      .then( res => res.json() )
      .then( stateManager.reducer( (store, details: NftDetails|NftError) => {
        return {
          ...store,
          nftDetails: {
            ...store.nftDetails,
            [id]: details
          }
        }
      }))
    ;
  }
});

export const NftActivityLoader = stateManager.loader<string, NftActivity[]>({
  selector(store, id) {
    return store.nftDetails[id];
  },

  async load(id) {
    return fetch(`${API_URL}nftactivity/${id}`)
      .then( res => res.json() )
      // @ts-ignore
      .then( stateManager.reducer( (store, activity: NftActivity[]) => {
        return {
          ...store,
          nftActivity: {
            ...store.nftDetails,
            [id]: activity
          }
        }
      }))
    ;
  }
});