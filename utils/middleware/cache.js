import LRU from 'lru-cache';

const mainCache = new LRU({
  maxAge: 24 * 60 * 60 * 1000,
});

const cryptoCache = new LRU({
  maxAge: 15 * 60 * 1000,
});

const cache = (handler) => (req, res) => {
  req.cache = mainCache;

  return handler(req, res);
};

const withCryptoCache = (handler) => (req, res) => {
  req.cache = cryptoCache;

  return handler(req, res);
};

export { withCryptoCache };
export default cache;
