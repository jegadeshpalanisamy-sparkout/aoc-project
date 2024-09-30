import { bsc } from "viem/chains";

export const environment = {
    production: false,
    API_BASE_URL:'https://walletscriptbackend.alphaomegacoin.com',
    TITLE:'Aoc-FRONTEND',
    NETWORK:'HOLESKEY Testnet',
    TYPE:'TESTNET',  
    SUPPORTED_CHAINS: [bsc],
    WALLET_CONNECT_PROJECT_ID: '0d83fb3155b748a28da2b5a016a32e43',
    CHAIN_ID:17000,
    APP_URL: 'http://localhost:4200/',
    TOTOKENNAME:'',
    APP_DESCRIPTION: 'Aoc description',
    ADMIN_URL:'/api/v1/admin',
  };