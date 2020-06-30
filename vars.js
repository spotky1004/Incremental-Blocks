standardNotation = [
  '', 'k', 'm', 'b', 't', 'qu', 'qi', 'sx', 'sp', 'o', 'n',
];
standardNotation2 = [
  '', 'u', 'd', 't', 'qa', 'qi', 'sx', 'sp', 'oc', 'no'
];
standardNotation3 = [
  'dc', 'vg', 'tg', 'qag', 'qig', 'sxg', 'spg', 'ocg', 'nog', 'ce'
];
upgradeName = [
  'bpc +1', 'bps +1', 'bpc +2', 'bps +5', 'bpc +4', 'bps +20', 'bpc +24', 'bps +60', 'bpc +96', 'bps +175',
  'bpc +384', 'bps +721', 'bps +4.400k', 'bps 5% -> bpc', 'bps +21.74k', 'bps +104.8k', 'bpc x1.5', 'bps x2', 'bpc +100k', 'bps +600k',
  'bupc x5', 'bupc x8', 'bupc x12', 'bps +2.222m', 'bps +14.000m', 'bupc x5', 'bupc x5', 'bupc x5', 'bupc x10', 'bps 10% -> bpc',
  'bps x3', 'bps x2', 'bps x1.5', 'bps +32.00m', 'token/click 1%p', 'token/click 1%p', 'token/click 1%p', 'bps 15% -> bpc', 'boost effect x1.5', 'boost cool -20s',
  'token/click 2%p', 'bps +100.0m', 'bps x1.8', 'bps x1.7', 'boost cool -30s', 'bpc x7.500k', 'token/click 2%p', 'boost cool -30s', 'bpc x9', 'bps x2',
  'bupc x5', 'bupc x4', 'bupc x3', 'bupc x2', 'bupc x1', 'bps x2.5', 'bupc x10', 'bps x5', 'token/click 4%p', 'boost cool -30s',
  'token x3', 'token x3', 'token/click 4%p', 'bps x4', 'bps x3', 'boost cool -20s', 'bps +333.3m', 'bu eff x6', 'bupc x14', 'bu eff x4',
  'bupc x15', 'bupc x20', 'bps x3.5', 'boost cool -15s', 'token/click 6%', 'token/click 6%', 'boost cool -10s', 'bps x15', 'bps 20% -> bpc', 'bps 25% -> bpc',
  'token x3', 'bps +2.109b', 'bps x3', 'boost cool -20s', 'token/click 8%', 'bupc x6', 'boost cool -10s', 'bu eff x2', 'bupc x10', 'bps x3',
  'bps x2', 'bps x3', 'bps x5', 'bps x7', 'bps x11', 'bps x13', 'bps x17', 'bps x19', 'bps x23', 'go to next stage!'
];
upgradeCost = [
  10, 20, 40, 80, 100, 300, 600, 1e3, 2.5e3, 4e3,
  8e3, 14.4e3, 25.5e3, 60e3, 142e3, 364e3, 634.5e3, 2e6, 4.353e6, 9.432e6,
  20.23e6, 50.4e6, 160e6, 323.2e6, 888.8e6, 3.45e9, 6.23e9, 30e9, 80e9, 160e9,
  1e12, 4.5e12, 15.7e12, 53.2e12, 4e12, 12e12, 36e12, 12.34e12, 12.35e12, 12.36e12,
  96e12, 80e15, 1e15, 3.32e15, 1e15, 2.223e15, 3.612e15, 2e15, 3e15, 5e15,
  6e15, 12e15, 24e15, 48e15, 80e15, 160e15, 300e15, 770e15, 1.24e18, 3e18,
  3.333e18, 6.666e18, 9.999e18, 12e18, 50e18, 155e18, 999.9e18, 3e21, 3e21, 7e21,
  1.515e24, 3e24, 2.345e24, 3.5e24, 5e24, 8.45e24, 17.4e24, 25.1e24, 57e24, 152e24,
  421.5e24, 2e24, 6e27, 12e27, 23e27, 33e27, 35.9e27, 39.6e27, 42.3e27, 100e27,
  2.5e30, 5.5e30, 19.25e30, 105.8e30, 794.1e30, 9.131e33, 123.3e33, 2.157e36, 42.07e36, 10e39
];
upgradeHave = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];
blockCost = [
  50, 2.5e6, 2e12, 2.5e40, 5e42, 1e3, 10
];
blockUnlocked = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];
buildingShape = [
  [
    0, 0, 1, 1, 0, 0,
    0, 1, 1, 1, 1, 0,
    1, 1, 1, 1, 1, 1,
    0, 1, 0, 0, 1, 0,
    0, 1, 0, 0, 1, 0,
    0, 1, 1, 1, 1, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 2, 2, 0, 0,
    0, 2, 1, 1, 2, 0,
    0, 2, 1, 1, 2, 0,
    2, 2, 2, 2, 2, 2
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 1, 0, 0, 1, 0,
    0, 3, 3, 3, 3, 0,
    0, 3, 0, 0, 3, 0,
    0, 3, 3, 3, 3, 0,
    0, 3, 0, 0, 3, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 2, 0,
    0, 0, 0, 4, 4, 0,
    0, 0, 4, 3, 4, 0,
    0, 4, 3, 3, 4, 0
  ],
  [
    0, 3, 3, 3, 3, 0,
    0, 3, 5, 5, 3, 0,
    0, 3, 3, 3, 3, 0,
    0, 3, 5, 5, 3, 0,
    0, 3, 3, 3, 3, 0,
    0, 3, 5, 5, 3, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 6, 6, 0, 0,
    0, 6, 1, 1, 6, 0,
    0, 6, 5, 5, 6, 0,
    0, 6, 5, 5, 6, 0
  ],
  [
    0, 0, 0, 0, 2, 2,
    7, 5, 7, 5, 7, 7,
    0, 5, 6, 5, 0, 0,
    7, 5, 7, 5, 7, 7,
    0, 5, 6, 5, 0, 0,
    7, 5, 7, 5, 7, 7
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 8, 8, 8, 8, 0,
    0, 8, 5, 6, 8, 0,
    0, 8, 8, 8, 8, 0,
    0, 8, 1, 1, 8, 0,
    0, 8, 0, 0, 8, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 9, 9, 0, 0,
    0, 9, 1, 2, 9, 0,
    0, 9, 5, 1, 9, 0,
    0, 0, 9, 9, 0, 0,
    0, 9, 9, 9, 9, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 5, 9, 0, 0,
    0, 0, 9, 9, 0, 0,
    0, 4, 4, 4, 4, 0,
    0, 0, 2, 2, 0, 0,
    2, 2, 2, 2, 2, 2
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 10, 10, 0, 0,
    0, 10, 7, 9, 10, 0,
    0, 10, 6, 5, 10, 0,
    0, 3, 10, 10, 3, 0,
    4, 2, 1, 1, 2, 4
  ],
  [
    0, 0, 0, 10, 10, 10,
    0, 0, 6, 6, 6, 6,
    0, 6, 7, 7, 7, 6,
    6, 6, 6, 6, 6, 6,
    6, 6, 7, 7, 7, 6,
    6, 6, 6, 6, 6, 6
  ],
  [
    10, 10, 10, 10, 10, 0,
    10, 5, 5, 5, 10, 0,
    10, 10, 10, 10, 10, 10,
    10, 10, 10, 5, 6, 10,
    10, 3, 10, 5, 5, 10,
    10, 3, 10, 10, 10, 10
  ],
  [
    0, 0, 3, 3, 0, 0,
    0, 2, 8, 8, 4, 0,
    2, 7, 10, 10, 9, 4,
    1, 7, 10, 10, 9, 5,
    0, 1, 6, 6, 5, 0,
    0, 0, 6, 6, 0, 0
  ],
  [
    0, 0, 0, 6, 0, 0,
    0, 0, 6, 6, 0, 0,
    0, 7, 7, 7, 7, 0,
    0, 0, 6, 6, 0, 0,
    0, 0, 6, 0, 0, 0,
    0, 10, 10, 10, 10, 0
  ],
  [
    0, 3, 3, 3, 3, 0,
    0, 3, 10, 10, 3, 0,
    0, 3, 10, 10, 3, 0,
    0, 3, 10, 10, 3, 0,
    0, 3, 10, 10, 3, 0,
    0, 3, 10, 10, 3, 0
  ],
  [
    0, 10, 2, 2, 10, 0,
    10, 2, 8, 7, 2, 10,
    2, 7, 2, 2, 8, 2,
    2, 8, 2, 2, 7, 2,
    10, 2, 7, 8, 2, 10,
    0, 10, 2, 2, 10, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 5, 5, 0, 0,
    0, 5, 10, 10, 5, 0,
    5, 10, 6, 6, 10, 5,
    10, 6, 6, 6, 6, 10
  ],
  [
    0, 0, 10, 10, 0, 0,
    0, 10, 6, 7, 10, 0,
    0, 10, 6, 6, 10, 0,
    0, 10, 6, 6, 10, 0,
    0, 10, 10, 10, 10, 0,
    0, 10, 10, 10, 10, 0
  ],
  [
    0, 0, 5, 5, 0, 0,
    0, 5, 5, 5, 5, 0,
    0, 5, 5, 5, 5, 0,
    0, 0, 2, 2, 0, 0,
    0, 0, 2, 2, 0, 0,
    10, 10, 2, 2, 10, 10
  ]
];
blockColors = [
  [0, 0, 0], [200, 50, 50], [200, 105, 50], [183, 200, 50], [50, 200, 50], [50, 200, 195], [62, 50, 200], [175, 50, 200], [200, 50, 148], [255, 255, 255]
];
buildProgress = [
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ]
];
rebuildProgress = [
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ]
];
reBuild = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];
boostShortName = [
  'bpc', 'bps', 'bupc', 'bu eff', 'tok p', 'tok m'
];
boostRange = [
  [2, 3], [2, 3], [4, 15], [2, 4], [2, 3], [2, 3]
];
boostLongName = [
  'bpc mult', 'bps mult', 'bupc mult', 'bupc effect', 'token %', 'token mult'
];
boostSelData = [
  [0, 4, 30, 10], [1, 7, 60, 100], [3, 64, 90, 1e3]
];
runeLevels = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];
mystUnlock = [
  0, 0, 0, 1e45, 1e50, 1e55, 1e60, 1e65, 1e70, 1e75
];
mystUpgradeRes = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];
mystRes = [
  ['block', 1], ['bToken', 1], ['power', 1], ['playtime', 0], ['clickCount', 0], ['runeLevels[9]', 0], ['totalRebuild', 0], ['block', 0], ['bTotal', 0], ['overScore', 0],
  ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1],
  ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1],
  ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1],
  ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1],
  ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1],
  ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1],
  ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1],
  ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1],
  ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1], ['block', 1]
];
mystLevels = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];
runeName = [
  '<span class="runeRedMarkup">block<br>product</span>', '<span class="runeRedMarkup">building<br>product</span>', '<span class="runeRedMarkup">token<br>product</span>',
  '<span class="runeBlueMarkup">speed<br>boost</span>', '<span class="runeBlueMarkup">no<br>boost</span>', '<span class="runeBlueMarkup">upgrade<br>boost</span>',
  '<span class="runeGreenMarkup">re<br>build</span>', '<span class="runeGreenMarkup">divide<br>build</span>', '<span class="runeGreenMarkup">master<br>build</span>',
  '<span class="runeWhiteMarkup">omega<br>rune</span>'
];
runeInfoStr = [
  '<span class="runeRedMarkup">boost block production</span>',
  '<span class="runeRedMarkup">boost block production per building</span>',
  '<span class="runeRedMarkup">boost token gain</span>',
  '<span class="runeBlueMarkup">make boost time and cool shorter, but greater boost</span>',
  '<span class="runeBlueMarkup">make part of rolled boost actived (same -> big)</span>',
  '<span class="runeBlueMarkup">boosts effect of boost, time, but increased cost(^3)</span>',
  '<span class="runeGreenMarkup">you can build again, but harder to build and reduced effect</span>',
  '<span class="runeGreenMarkup">divide cost of building</span>',
  '<span class="runeGreenMarkup">boost base bu eff</span>',
  '<span class="runeWhiteMarkup">add all runes level, but loose all progress</span>'
];
rebuildLevel = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];
unlockProgress = [
  [1e40, 1e45, 'myst upgrade 4'], [1e45, 1e50, 'myst upgrade 5'], [1e50, 1e55, 'myst upgrade 6'], [1e55, 1e60, 'myst upgrade 7'], [1e60, 1e65, 'myst upgrade 8'],
  [1e65, 1e70, 'myst upgrade 9'], [1e70, 1e75, 'myst upgrade 10'], [1e75, 1e100, 'go to next stage!'], [1e100, 1e300, 'placeholder..']
];
varData = [
  'block', 'lastTick', 'upgradeHave', 'blockUnlocked', 'totalBlock',
  'clickCount', 'playtime', 'buildings', 'buildingNow', 'buildProgress',
  'blockUsedInBuilding', 'blockUsedInBuilding', 'boostSelData', 'bToken', 'bCool',
  'bTotal', 'bTokenTotal', 'bTokenUsed', 'runeLevels', 'power',
  'pActive', 'powerProgress', 'powerBulkLevel', 'powerTot', 'rebuildLevel',
  'mystLevels', 'cheatEnabled', 'rebuildProgress', 'reBuild', 'unlockReached',
  'toggleAutoBuild', 'brokeBlock'
];
resetData = {
  0: 0,
  1: new Date().getTime(),
  2: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ],
  3: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ],
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: [
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ]
  ],
  10: 0,
  11: 0,
  12: [
    [0, 4, 30, 10], [1, 7, 60, 100], [3, 64, 90, 1e3]
  ],
  13: 0,
  14: 180,
  15: 0,
  16: 0,
  17: 0,
  18: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ],
  19: 0,
  20: 0,
  21: 0,
  22: 0,
  23: 0,
  24: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ],
  25: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  26: 0,
  27: [
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0
    ]
  ],
  28: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ],
  29: 0,
  30: 0,
  31: 0
};
