// Comprehensive list of MT5 brokers and their server names
// Includes regional variations and both Demo and Live servers
const MT5_BROKERS = [
  {
    name: 'HF Markets (HFM)',
    servers: [
      'HFMarketsGlobal-Demo',
      'HFMarketsGlobal-Live',
      'HFMarketsGlobal-Live1',
      'HFMarketsKE-Demo',
      'HFMarketsKE-Live',
      'HFMarketsEurope-Demo',
      'HFMarketsEurope-Live',
      'HFMarketsUK-Demo',
      'HFMarketsUK-Live',
      'HFMarketsZA-Demo',
      'HFMarketsZA-Live',
      'HFMarketsAU-Demo',
      'HFMarketsAU-Live',
      'HFMarketsCY-Demo',
      'HFMarketsCY-Live',
      'HFMarketsSC-Demo',
      'HFMarketsSC-Live'
    ],
    website: 'https://www.hfm.com'
  },
  {
    name: 'IC Markets',
    servers: [
      'ICMarkets-Demo',
      'ICMarkets-Demo02',
      'ICMarkets-Demo03',
      'ICMarkets-Live',
      'ICMarkets-Live02',
      'ICMarkets-Live03',
      'ICMarkets-Live04',
      'ICMarkets-Live05',
      'ICMarkets-Live06',
      'ICMarkets-Live07',
      'ICMarkets-Live08',
      'ICMarkets-Live09',
      'ICMarkets-Live10',
      'ICMarkets-Live11',
      'ICMarkets-Live12',
      'ICMarkets-Live13',
      'ICMarkets-Live14',
      'ICMarkets-Live15',
      'ICMarkets-Live16',
      'ICMarkets-Live17',
      'ICMarkets-Live18',
      'ICMarkets-Live19',
      'ICMarkets-Live20',
      'ICMarkets-Live21',
      'ICMarkets-Live22',
      'ICMarkets-Live23',
      'ICMarkets-Live24'
    ],
    website: 'https://www.icmarkets.com'
  },
  {
    name: 'XM Group',
    servers: [
      'XMGlobal-Demo',
      'XMGlobal-Demo2',
      'XMGlobal-Demo3',
      'XMGlobal-Demo4',
      'XMGlobal-Demo5',
      'XMGlobal-Live',
      'XMGlobal-Live2',
      'XMGlobal-Live3',
      'XMGlobal-Live4',
      'XMGlobal-Live5',
      'XMUK-Demo',
      'XMUK-Live',
      'XMEU-Demo',
      'XMEU-Live',
      'XMZA-Demo',
      'XMZA-Live',
      'XM.COM-Real1',
      'XM.COM-Real2',
      'XM.COM-Real3',
      'XM.COM-Real5',
      'XM.COM-Real6',
      'XM.COM-Real8',
      'XM.COM-Real9',
      'XM.COM-Real10',
      'XM.COM-Real13',
      'XM.COM-Real14',
      'XM.COM-Real15',
      'XM.COM-Real16',
      'XM.COM-Real17',
      'XM.COM-Real18',
      'XM.COM-Real19',
      'XM.COM-Real20',
      'XM.COM-Real23',
      'XM.COM-Real30'
    ],
    website: 'https://www.xm.com'
  },
  {
    name: 'FXTM (ForexTime)',
    servers: [
      'FXTM-Demo',
      'FXTM-Demo2',
      'FXTM-Demo3',
      'FXTM-Demo4',
      'FXTM-Demo5',
      'FXTM-Live',
      'FXTM-Live2',
      'FXTM-Live3',
      'FXTM-Live4',
      'FXTM-Live5',
      'FXTM-Server1',
      'FXTM-Server2',
      'FXTM-Server3',
      'FXTM-Server4',
      'FXTM-Server5'
    ],
    website: 'https://www.forextime.com'
  },
  {
    name: 'Exness',
    servers: [
      'Exness-Demo',
      'Exness-Demo2',
      'Exness-Demo3',
      'Exness-Demo4',
      'Exness-Live',
      'Exness-Live2',
      'Exness-Live3',
      'Exness-Live4',
      'Exness-Live5',
      'Exness-Live6',
      'Exness-Live7',
      'Exness-Live8',
      'Exness-Live9',
      'Exness-Live10'
    ],
    website: 'https://www.exness.com'
  },
  {
    name: 'Pepperstone',
    servers: [
      'Pepperstone-Demo',
      'Pepperstone-Demo2',
      'Pepperstone-Demo3',
      'Pepperstone-Live',
      'Pepperstone-Live2',
      'Pepperstone-Live3',
      'Pepperstone-Edge01',
      'Pepperstone-Edge02',
      'Pepperstone-Edge03',
      'Pepperstone-Edge04',
      'Pepperstone-Edge05',
      'Pepperstone-Razor01',
      'Pepperstone-Razor02',
      'Pepperstone-Razor03'
    ],
    website: 'https://www.pepperstone.com'
  },
  {
    name: 'FXCM',
    servers: [
      'FXCM-Demo',
      'FXCM-Demo2',
      'FXCM-Demo3',
      'FXCM-Live',
      'FXCM-Live2',
      'FXCM-Live3',
      'FXCM-Server1',
      'FXCM-Server2',
      'FXCM-Server3'
    ],
    website: 'https://www.fxcm.com'
  },
  {
    name: 'OANDA',
    servers: [
      'OANDA-Demo',
      'OANDA-Demo2',
      'OANDA-Live',
      'OANDA-Live2',
      'OANDA-Europe-Demo',
      'OANDA-Europe-Live',
      'OANDA-Asia-Demo',
      'OANDA-Asia-Live'
    ],
    website: 'https://www.oanda.com'
  },
  {
    name: 'Admiral Markets',
    servers: [
      'AdmiralMarkets-Demo',
      'AdmiralMarkets-Demo2',
      'AdmiralMarkets-Demo3',
      'AdmiralMarkets-Live',
      'AdmiralMarkets-Live2',
      'AdmiralMarkets-Live3',
      'AdmiralMarkets-Live4',
      'AdmiralMarkets-Live5',
      'AdmiralMarkets-UK-Demo',
      'AdmiralMarkets-UK-Live',
      'AdmiralMarkets-EU-Demo',
      'AdmiralMarkets-EU-Live'
    ],
    website: 'https://www.admiralmarkets.com'
  },
  {
    name: 'AvaTrade',
    servers: [
      'AvaTrade-Demo',
      'AvaTrade-Demo2',
      'AvaTrade-Demo3',
      'AvaTrade-Live',
      'AvaTrade-Live2',
      'AvaTrade-Live3',
      'AvaTrade-Live4',
      'AvaTrade-Live5',
      'AvaTrade-UK-Demo',
      'AvaTrade-UK-Live',
      'AvaTrade-EU-Demo',
      'AvaTrade-EU-Live',
      'AvaTrade-AU-Demo',
      'AvaTrade-AU-Live'
    ],
    website: 'https://www.avatrade.com'
  },
  {
    name: 'FXOpen',
    servers: [
      'FXOpen-Demo',
      'FXOpen-Demo2',
      'FXOpen-Demo3',
      'FXOpen-Live',
      'FXOpen-Live2',
      'FXOpen-Live3',
      'FXOpen-Live4',
      'FXOpen-Live5',
      'FXOpen-UK-Demo',
      'FXOpen-UK-Live',
      'FXOpen-AU-Demo',
      'FXOpen-AU-Live'
    ],
    website: 'https://www.fxopen.com'
  },
  {
    name: 'RoboForex',
    servers: [
      'RoboForex-Demo',
      'RoboForex-Demo2',
      'RoboForex-Demo3',
      'RoboForex-Demo4',
      'RoboForex-Live',
      'RoboForex-Live2',
      'RoboForex-Live3',
      'RoboForex-Live4',
      'RoboForex-Live5',
      'RoboForex-Live6',
      'RoboForex-Live7',
      'RoboForex-Live8'
    ],
    website: 'https://www.roboforex.com'
  },
  {
    name: 'InstaForex',
    servers: [
      'InstaForex-Demo',
      'InstaForex-Demo2',
      'InstaForex-Demo3',
      'InstaForex-Demo4',
      'InstaForex-Live',
      'InstaForex-Live2',
      'InstaForex-Live3',
      'InstaForex-Live4',
      'InstaForex-Live5',
      'InstaForex-Live6',
      'InstaForex-Live7',
      'InstaForex-Live8'
    ],
    website: 'https://www.instaforex.com'
  },
  {
    name: 'Alpari',
    servers: [
      'Alpari-Demo',
      'Alpari-Demo2',
      'Alpari-Demo3',
      'Alpari-Live',
      'Alpari-Live2',
      'Alpari-Live3',
      'Alpari-Live4',
      'Alpari-Live5',
      'Alpari-UK-Demo',
      'Alpari-UK-Live',
      'Alpari-RU-Demo',
      'Alpari-RU-Live'
    ],
    website: 'https://www.alpari.com'
  },
  {
    name: 'FXDD',
    servers: [
      'FXDD-Demo',
      'FXDD-Demo2',
      'FXDD-Demo3',
      'FXDD-Live',
      'FXDD-Live2',
      'FXDD-Live3',
      'FXDD-Live4',
      'FXDD-Live5',
      'FXDD-Malta-Demo',
      'FXDD-Malta-Live'
    ],
    website: 'https://www.fxdd.com'
  },
  {
    name: 'HotForex',
    servers: [
      'HotForex-Demo',
      'HotForex-Demo2',
      'HotForex-Demo3',
      'HotForex-Live',
      'HotForex-Live2',
      'HotForex-Live3',
      'HotForex-Live4',
      'HotForex-Live5',
      'HotForex-Live6',
      'HotForex-Live7',
      'HotForex-Live8'
    ],
    website: 'https://www.hotforex.com'
  },
  {
    name: 'Tickmill',
    servers: [
      'Tickmill-Demo',
      'Tickmill-Demo2',
      'Tickmill-Demo3',
      'Tickmill-Live',
      'Tickmill-Live2',
      'Tickmill-Live3',
      'Tickmill-Live4',
      'Tickmill-Live5',
      'Tickmill-UK-Demo',
      'Tickmill-UK-Live',
      'Tickmill-EU-Demo',
      'Tickmill-EU-Live'
    ],
    website: 'https://www.tickmill.com'
  },
  {
    name: 'Vantage Markets',
    servers: [
      'Vantage-Demo',
      'Vantage-Demo2',
      'Vantage-Demo3',
      'Vantage-Live',
      'Vantage-Live2',
      'Vantage-Live3',
      'Vantage-Live4',
      'Vantage-Live5',
      'Vantage-UK-Demo',
      'Vantage-UK-Live',
      'Vantage-AU-Demo',
      'Vantage-AU-Live'
    ],
    website: 'https://www.vantagemarkets.com'
  },
  {
    name: 'FP Markets',
    servers: [
      'FPMarkets-Demo',
      'FPMarkets-Demo2',
      'FPMarkets-Demo3',
      'FPMarkets-Live',
      'FPMarkets-Live2',
      'FPMarkets-Live3',
      'FPMarkets-Live4',
      'FPMarkets-Live5',
      'FPMarkets-Live6',
      'FPMarkets-Live7',
      'FPMarkets-Live8'
    ],
    website: 'https://www.fpmarkets.com'
  },
  {
    name: 'OctaFX',
    servers: [
      'OctaFX-Demo',
      'OctaFX-Demo2',
      'OctaFX-Demo3',
      'OctaFX-Live',
      'OctaFX-Live2',
      'OctaFX-Live3',
      'OctaFX-Live4',
      'OctaFX-Live5',
      'OctaFX-Live6',
      'OctaFX-Live7',
      'OctaFX-Live8'
    ],
    website: 'https://www.octafx.com'
  },
  {
    name: 'FXPro',
    servers: [
      'FXPro-Demo',
      'FXPro-Demo2',
      'FXPro-Demo3',
      'FXPro-Live',
      'FXPro-Live2',
      'FXPro-Live3',
      'FXPro-Live4',
      'FXPro-Live5',
      'FXPro-UK-Demo',
      'FXPro-UK-Live',
      'FXPro-EU-Demo',
      'FXPro-EU-Live'
    ],
    website: 'https://www.fxpro.com'
  },
  {
    name: 'LiteForex',
    servers: [
      'LiteForex-Demo',
      'LiteForex-Demo2',
      'LiteForex-Demo3',
      'LiteForex-Live',
      'LiteForex-Live2',
      'LiteForex-Live3',
      'LiteForex-Live4',
      'LiteForex-Live5',
      'LiteForex-Live6',
      'LiteForex-Live7',
      'LiteForex-Live8'
    ],
    website: 'https://www.liteforex.com'
  },
  {
    name: 'JustForex',
    servers: [
      'JustForex-Demo',
      'JustForex-Demo2',
      'JustForex-Demo3',
      'JustForex-Live',
      'JustForex-Live2',
      'JustForex-Live3',
      'JustForex-Live4',
      'JustForex-Live5',
      'JustForex-Live6',
      'JustForex-Live7',
      'JustForex-Live8'
    ],
    website: 'https://www.justforex.com'
  },
  {
    name: 'FBS',
    servers: [
      'FBS-Demo',
      'FBS-Demo2',
      'FBS-Demo3',
      'FBS-Live',
      'FBS-Live2',
      'FBS-Live3',
      'FBS-Live4',
      'FBS-Live5',
      'FBS-Live6',
      'FBS-Live7',
      'FBS-Live8',
      'FBS-Live9',
      'FBS-Live10'
    ],
    website: 'https://www.fbs.com'
  },
  {
    name: 'Trading212',
    servers: [
      'Trading212-Demo',
      'Trading212-Demo2',
      'Trading212-Live',
      'Trading212-Live2',
      'Trading212-Live3'
    ],
    website: 'https://www.trading212.com'
  },
  {
    name: 'XM Global',
    servers: [
      'XMGlobal-Demo',
      'XMGlobal-Demo2',
      'XMGlobal-Demo3',
      'XMGlobal-Live',
      'XMGlobal-Live2',
      'XMGlobal-Live3',
      'XMGlobal-Live4',
      'XMGlobal-Live5'
    ],
    website: 'https://www.xm.com'
  },
  {
    name: 'FXTM',
    servers: [
      'FXTM-Demo',
      'FXTM-Demo2',
      'FXTM-Demo3',
      'FXTM-Live',
      'FXTM-Live2',
      'FXTM-Live3',
      'FXTM-Live4',
      'FXTM-Live5'
    ],
    website: 'https://www.forextime.com'
  },
  {
    name: 'ThinkMarkets',
    servers: [
      'ThinkMarkets-Demo',
      'ThinkMarkets-Demo2',
      'ThinkMarkets-Live',
      'ThinkMarkets-Live2',
      'ThinkMarkets-Live3',
      'ThinkMarkets-Live4',
      'ThinkMarkets-UK-Demo',
      'ThinkMarkets-UK-Live',
      'ThinkMarkets-AU-Demo',
      'ThinkMarkets-AU-Live'
    ],
    website: 'https://www.thinkmarkets.com'
  },
  {
    name: 'Axi',
    servers: [
      'Axi-Demo',
      'Axi-Demo2',
      'Axi-Live',
      'Axi-Live2',
      'Axi-Live3',
      'Axi-Live4',
      'Axi-Live5',
      'Axi-AU-Demo',
      'Axi-AU-Live',
      'Axi-UK-Demo',
      'Axi-UK-Live'
    ],
    website: 'https://www.axi.com'
  },
  {
    name: 'DooPrime',
    servers: [
      'DooPrime-Demo',
      'DooPrime-Demo2',
      'DooPrime-Live',
      'DooPrime-Live2',
      'DooPrime-Live3',
      'DooPrime-Live4'
    ],
    website: 'https://www.dooprime.com'
  },
  {
    name: 'ACY Securities',
    servers: [
      'ACY-Demo',
      'ACY-Demo2',
      'ACY-Live',
      'ACY-Live2',
      'ACY-Live3',
      'ACY-Live4',
      'ACY-Live5'
    ],
    website: 'https://www.acy.com'
  },
  {
    name: 'BlackBull Markets',
    servers: [
      'BlackBull-Demo',
      'BlackBull-Demo2',
      'BlackBull-Live',
      'BlackBull-Live2',
      'BlackBull-Live3',
      'BlackBull-Live4'
    ],
    website: 'https://www.blackbullmarkets.com'
  },
  {
    name: 'EightCap',
    servers: [
      'EightCap-Demo',
      'EightCap-Demo2',
      'EightCap-Live',
      'EightCap-Live2',
      'EightCap-Live3',
      'EightCap-Live4'
    ],
    website: 'https://www.eightcap.com'
  },
  {
    name: 'GO Markets',
    servers: [
      'GOMarkets-Demo',
      'GOMarkets-Demo2',
      'GOMarkets-Live',
      'GOMarkets-Live2',
      'GOMarkets-Live3',
      'GOMarkets-Live4',
      'GOMarkets-AU-Demo',
      'GOMarkets-AU-Live'
    ],
    website: 'https://www.gomarkets.com'
  },
  {
    name: 'HYCM',
    servers: [
      'HYCM-Demo',
      'HYCM-Demo2',
      'HYCM-Live',
      'HYCM-Live2',
      'HYCM-Live3',
      'HYCM-Live4',
      'HYCM-UK-Demo',
      'HYCM-UK-Live',
      'HYCM-EU-Demo',
      'HYCM-EU-Live'
    ],
    website: 'https://www.hycm.com'
  },
  {
    name: 'IronFX',
    servers: [
      'IronFX-Demo',
      'IronFX-Demo2',
      'IronFX-Live',
      'IronFX-Live2',
      'IronFX-Live3',
      'IronFX-Live4',
      'IronFX-Live5'
    ],
    website: 'https://www.ironfx.com'
  },
  {
    name: 'LiteFinance',
    servers: [
      'LiteFinance-Demo',
      'LiteFinance-Demo2',
      'LiteFinance-Live',
      'LiteFinance-Live2',
      'LiteFinance-Live3',
      'LiteFinance-Live4'
    ],
    website: 'https://www.litefinance.com'
  },
  {
    name: 'MultiBank',
    servers: [
      'MultiBank-Demo',
      'MultiBank-Demo2',
      'MultiBank-Live',
      'MultiBank-Live2',
      'MultiBank-Live3',
      'MultiBank-Live4'
    ],
    website: 'https://www.multibank.com'
  },
  {
    name: 'NordFX',
    servers: [
      'NordFX-Demo',
      'NordFX-Demo2',
      'NordFX-Live',
      'NordFX-Live2',
      'NordFX-Live3',
      'NordFX-Live4',
      'NordFX-Live5'
    ],
    website: 'https://www.nordfx.com'
  },
  {
    name: 'Plus500',
    servers: [
      'Plus500-Demo',
      'Plus500-Live',
      'Plus500-Live2'
    ],
    website: 'https://www.plus500.com'
  },
  {
    name: 'Saxo Bank',
    servers: [
      'SaxoBank-Demo',
      'SaxoBank-Live',
      'SaxoBank-Live2'
    ],
    website: 'https://www.saxobank.com'
  },
  {
    name: 'Swissquote',
    servers: [
      'Swissquote-Demo',
      'Swissquote-Live',
      'Swissquote-Live2',
      'Swissquote-Live3'
    ],
    website: 'https://www.swissquote.com'
  },
  {
    name: 'Trade.com',
    servers: [
      'Trade-Demo',
      'Trade-Demo2',
      'Trade-Live',
      'Trade-Live2',
      'Trade-Live3',
      'Trade-Live4'
    ],
    website: 'https://www.trade.com'
  },
  {
    name: 'Tradeview Markets',
    servers: [
      'Tradeview-Demo',
      'Tradeview-Demo2',
      'Tradeview-Live',
      'Tradeview-Live2',
      'Tradeview-Live3'
    ],
    website: 'https://www.tradeview.com'
  },
  {
    name: 'Vantage FX',
    servers: [
      'VantageFX-Demo',
      'VantageFX-Demo2',
      'VantageFX-Live',
      'VantageFX-Live2',
      'VantageFX-Live3',
      'VantageFX-Live4'
    ],
    website: 'https://www.vantagefx.com'
  },
  {
    name: 'VT Markets',
    servers: [
      'VTMarkets-Demo',
      'VTMarkets-Demo2',
      'VTMarkets-Live',
      'VTMarkets-Live2',
      'VTMarkets-Live3',
      'VTMarkets-Live4'
    ],
    website: 'https://www.vtmarkets.com'
  },
  {
    name: 'XM Trading',
    servers: [
      'XMTrading-Demo',
      'XMTrading-Demo2',
      'XMTrading-Live',
      'XMTrading-Live2',
      'XMTrading-Live3',
      'XMTrading-Live4'
    ],
    website: 'https://www.xmtrading.com'
  },
  {
    name: 'ZFX',
    servers: [
      'ZFX-Demo',
      'ZFX-Demo2',
      'ZFX-Live',
      'ZFX-Live2',
      'ZFX-Live3',
      'ZFX-Live4'
    ],
    website: 'https://www.zfx.com'
  },
  {
    name: 'Other/Custom',
    servers: [],
    website: '',
    isCustom: true
  }
];

// Flatten all servers into a single searchable list
const getAllServers = () => {
  const serverList = [];
  MT5_BROKERS.forEach(broker => {
    if (broker.servers && broker.servers.length > 0) {
      broker.servers.forEach(server => {
        serverList.push({
          server: server,
          broker: broker.name,
          website: broker.website,
          isDemo: server.toLowerCase().includes('demo')
        });
      });
    }
  });
  return serverList.sort((a, b) => a.broker.localeCompare(b.broker));
};

// Get brokers list
const getBrokers = () => {
  return MT5_BROKERS.filter(b => !b.isCustom);
};

module.exports = {
  MT5_BROKERS,
  getAllServers,
  getBrokers
};
