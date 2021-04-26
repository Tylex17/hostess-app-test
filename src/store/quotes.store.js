import {makeAutoObservable, observable} from 'mobx';
import {getQuotes} from '../api/quotes';
import {persist} from 'mobx-persist';

export default class QuoteStore {
  @persist('list') localRequests = [];
  data = {};
  listError = '';
  listLoading = false;
  net = true;
  constructor() {
    makeAutoObservable(this);
  }

  setNet = status => {
    this.net = status;
    console.warn('lala', this.net);
  };
  getData = async () => {
    try {
      const respone = await getQuotes();
      this.data = respone.tasks[0];
    } catch (e) {
      this.listError = e;
    }
  };
  setLocalRequests = requestData => {
    this.localRequests.unshift(requestData);
    console.warn('local', this.localRequests);
  };
  sliceLocalRequests = () => {
    this.localRequests.shift();
    console.warn('slice', this.localRequests);
  };
}
