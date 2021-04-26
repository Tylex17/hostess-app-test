import {configure} from 'mobx';
import QuoteStore from './quotes.store';
import {create, persist} from 'mobx-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

configure({
  enforceActions: 'never',
});
const hydrate = create({
  storage: AsyncStorage,
  jsonify: true,
});
class Store {
  constructor() {
    this.quoteStore = new QuoteStore(this);
    hydrate('QuoteStore', this.quoteStore);
  }
}

export default new Store();
