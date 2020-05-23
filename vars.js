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
  'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder',
  'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder',
  'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder',
  'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder',
  'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder',
  'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder',
  'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder',
  'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder',
  'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder', 'PlaceHolder'
];
upgradeCost = [
  30, 50, 300, 1e3, 1e3, 5.5e3, 12e3, 25e3, 42e3, 80.8e3,
  1e300, 1e300, 1e300, 1e300, 1e300, 1e300, 1e300, 1e300, 1e300, 1e300,
  1e300, 1e300, 1e300, 1e300, 1e300, 1e300, 1e300, 1e300, 1e300, 1e300,
  1e300, 1e300, 1e300, 1e300, 1e300, 1e300, 1e300, 1e300, 1e300, 1e300,
  1e300, 1e300, 1e300, 1e300, 1e300, 1e300, 1e300, 1e300, 1e300, 1e300,
  1e300, 1e300, 1e300, 1e300, 1e300, 1e300, 1e300, 1e300, 1e300, 1e300,
  1e300, 1e300, 1e300, 1e300, 1e300, 1e300, 1e300, 1e300, 1e300, 1e300,
  1e300, 1e300, 1e300, 1e300, 1e300, 1e300, 1e300, 1e300, 1e300, 1e300,
  1e300, 1e300, 1e300, 1e300, 1e300, 1e300, 1e300, 1e300, 1e300, 1e300,
  1e300, 1e300, 1e300, 1e300, 1e300, 1e300, 1e300, 1e300, 1e300, 1e300
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
  50, 2.5e6, 7e9, 50e12, 1.234e15, 1e3, 10
];
blockUnlocked = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];
varData = [
  'block', 'lastTick', 'upgradeHave', 'blockUnlocked'
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
  ]
};
