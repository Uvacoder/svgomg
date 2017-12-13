import WorkerMessenger from './worker-messenger';

export class Ungzip extends WorkerMessenger {
  constructor() {
    super('js/inflate-worker.js');
  }

  decompress(data) {
    return this._requestResponse({ data });
  }
}
