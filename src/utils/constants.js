export const ALLOWLIST_CONTRACT = "0x7dfE584536C439DaE59198Ac13691Eabf06B35fd"; // POLYGON-MAINNET

export const INFURA_MAINNET_URL = `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`;
export const INFURA_ROPSTEN_URL = `https://ropsten.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`;
export const INFURA_RINKEBY_URL = `https://rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`;
export const INFURA_GOERLI_URL = `https://ropsten.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`;
export const ALCHEMY_POLYGON_MAINNET_URL = `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_POLYGON_MAINNET_KEY}`;

export const ALCHEMY_POLYGON_MUMBAI_URL = `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_POLYGON_MUMBAI_KEY}`;

export const REDIS_URL = process.env.NEXT_PUBLIC_REDIS_URL;
export const REDIS_CACHE_TTL = process.env.NEXT_PUBLIC_REDIS_CACHE_TTL;
