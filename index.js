$(function (){
  savePoint = 'IncrementalBlocks';
  notationForm = 0;

  block = 0;
  blockPS = 0;
  blockPC = 1;
  totalBlock = 0;
  clickCount = 0;
  playtime = 0;
  lastTick = new Date().getTime();
  timeNow = new Date().getTime();

  function copyToClipboard(val) {
    var t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = val;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
  }

  function notation(num, dim) {
    if (notationForm == 0) {
      if (num <= 1) {
        return num.toFixed(dim);
      } else {
        notationLevel = Math.floor(Math.log10(num)/3);
        notationSpace = Math.floor(Math.log10(num)%3);
        if (num < 1e3) {
          notationFixed = (num / 1000 ** notationLevel).toFixed(Math.max(dim-notationSpace, 0)) ;
        } else {
          notationFixed = (num / 1000 ** notationLevel).toFixed(3-notationSpace) ;
        }
        if (notationLevel < 11) {
          return notationFixed + standardNotation[notationLevel];
        } else {
          return notationFixed + standardNotation2[(notationLevel-11) % 10] + standardNotation3[Math.floor((notationLevel-11) / 10)];
        }
      }
    } else {
      if (num >= 1e5) {
        return (num/(10**(Math.floor(Math.log10(num))))).toFixed(3) + 'e' + Math.floor(Math.log10(num));
      } else {
        return num.toFixed(2);
      }
    }
  }
  function gameSave() {
    saveFile = [];
    for (var i = 0; i < varData.length; i++) {
      saveFile[i] = eval(varData[i]);
    }
    localStorage[savePoint] = JSON.stringify(saveFile);

    console.log('saved!')
  }
  function gameLoad() {
    savedFile = JSON.parse(localStorage[savePoint]);
    dataCopy = JSON.parse(JSON.stringify(resetData));
    Object.assign(dataCopy, savedFile);
    for (var i = 0; i < varData.length; i++) {
      this[varData[i]] = dataCopy[i];
    }
  }
  function gameExport() {
    saveFile = {};
    for (var i = 0; i < varData.length; i++) {
      saveFile[i] = eval(varData[i]);
    }
    copyToClipboard(btoa(JSON.stringify(saveFile)));
  }
  function gameImport() {
    var inputedSaveN = prompt('Import Save', '');
    var inputedSave = atob(inputedSaveN);
    if (inputedSave != null && inputedSave != '') {
      const savedFile = JSON.parse(inputedSave);
      dataCopy = JSON.parse(JSON.stringify(resetData));
      Object.assign(dataCopy, savedFile);
      setTimeout(function(){
        for (var i = 0; i < varData.length; i++) {
          this[varData[i]] = dataCopy[i];
        }
      }, 0);
    }
  }

  function displayAll() {
    displayBlock();
    displayUnlock();
    displayUpgrade();
    displayStat();
  }
  function displayUnlock() {
    for (var i = 1; i < 8; i++) {
      if (blockUnlocked[i-1]) {
        $('.contentBlock:eq(' + i + ') > div:nth-child(1)').show();
        $('.contentBlock:eq(' + i + ') > div:nth-child(2)').hide();
      } else {
        $('.contentBlock:eq(' + i + ') > div:nth-child(1)').hide();
        $('.contentBlock:eq(' + i + ') > div:nth-child(2)').show();
      }
    }
  }
  function displayBlock() {
    bpsP = ((upgradeHave[1] == 1) ? 1 : 0)+((upgradeHave[3] == 1) ? 5 : 0)+((upgradeHave[5] == 1) ? 20 : 0)+((upgradeHave[7] == 1) ? 60 : 0)+((upgradeHave[9] == 1) ? 175 : 0)+((upgradeHave[11] == 1) ? 721 : 0)+((upgradeHave[12] == 1) ? 4.4e3 : 0)+((upgradeHave[14] == 1) ? 21.74e3 : 0)+((upgradeHave[15] == 1) ? 104.8e3 : 0)+((upgradeHave[19] == 1) ? 600e3 : 0);
    bpsM = 1*((upgradeHave[17] == 1) ? 2 : 1);
    blockPS = bpsP*bpsM;
    bpcP = 1+((upgradeHave[0] == 1) ? 1 : 0)+((upgradeHave[2] == 1) ? 2 : 0)+((upgradeHave[4] == 1) ? 4 : 0)+((upgradeHave[6] == 1) ? 24 : 0)+((upgradeHave[8] == 1) ? 96 : 0)+((upgradeHave[10] == 1) ? 384 : 0)+((upgradeHave[18] == 1) ? 100e3 : 0);
    bpcM = 1*((upgradeHave[16] == 1) ? 1.5 : 1);
    blockPC = bpcP*bpcM+(((upgradeHave[13] == 1) ? 0.05 : 0)*blockPS);
    $('#blockCount').html(function (index,html) {
      reg = /0/gi;
      strReg1 = notation(block);
      return strReg1.replace(reg, '<span class="num0">$&</span>');
    });
    $('#blockPSCount').html(function (index,html) {
      return notation(blockPS);
    });
    $('#blockPerClick').html(function (index,html) {
      return notation(blockPC);
    });
  }
  function displayUpgrade() {
    upgradeNumShift = [-1, -1, -1, -1, -1, -1];
    upgradeCostShift = [0, 0, 0, 0, 0, 0];
    shiftIndex = 0;
    upgradeHaveCount = 0;
    for (var i = 0; i < upgradeHave.length; i++) {
      if (!upgradeHave[i] && upgradeCost[i]/10 <= block && shiftIndex <= 5) {
        upgradeNumShift[shiftIndex] = i;
        upgradeCostShift[shiftIndex] = upgradeCost[i];
        shiftIndex++;
      } else if (upgradeHave[i]) {
        upgradeHaveCount++;
      }
    }
    for (var i = 0; i < upgradeNumShift.length; i++) {
      if (upgradeNumShift[i] != -1) {
        $('.upgradeContent:eq(' + i + ')').show();
        if (upgradeCostShift[i] <= block) {
          $('.upgradeContent:eq(' + i + ')').removeClass('upN');
          $('.upgradeContent:eq(' + i + ')').addClass('upY');
        } else {
          $('.upgradeContent:eq(' + i + ')').removeClass('upY');
          $('.upgradeContent:eq(' + i + ')').addClass('upN');
        }
      } else {
        $('.upgradeContent:eq(' + i + ')').hide();
      }
    }
    $('.upgradeContent > div:nth-child(1)').html(function (index,html) {
      if (upgradeNumShift[index] != -1) {
        return upgradeName[upgradeNumShift[index]];
      }
    });
    $('.upgradeContent > div:nth-child(2)').html(function (index,html) {
      if (upgradeNumShift[index] != -1) {
        return 'cost: '+ notation(upgradeCostShift[index]);
      }
    });
    $('#upgradeBanner > p:nth-child(2)').html(function (index,html) {
      return upgradeHaveCount + '/100';
    });
  }
  function displayStat() {
    statVars = [];
    statVars[0] = notation(totalBlock);
    statVars[1] = clickCount;
    statVars[2] = (playtime/3600).toFixed(3);
    statVars[3] = notation(bpcP);
    statVars[4] = notation(bpsP);
    statVars[5] = notation(bpcM);
    statVars[6] = notation(bpsM);
    $('.statline > span').html(function (index,html) {
      return statVars[index];
    });
  }

  $(document).on('click','#blockClick',function() {
    block += blockPC;
    totalBlock += blockPC;
    clickCount++;
    displayBlock();
  });
  $(document).on('click','.lockedBlock',function() {
    indexThis = $('.lockedBlock').index(this);
    if (blockCost[indexThis] <= block && !blockUnlocked[indexThis]) {
      block -= blockCost[indexThis];
      console.log(indexThis);
      blockUnlocked[indexThis] = 1;
      displayUnlock();
    }
  });
  $(document).on('click','.upgradeContent:not(.upN)',function() {
    indexThis = $('.upgradeContent').index(this);
    upgradeHave[upgradeNumShift[indexThis]] = 1;
    block -= upgradeCostShift[indexThis];
    displayUpgrade();
  });
  $(document).on('click','.optionBlock',function() {
    indexThis = $('.optionBlock').index(this);
    switch (indexThis) {
      case 0:
        gameSave();
        break;
      case 1:
        gameExport();
        break;
      case 2:
        gameImport();
        break;
    }
  });

  setInterval( function (){
    timeNow = new Date().getTime();
    tickGain = (timeNow-lastTick)/1000;
    block += blockPS*tickGain;
    totalBlock += blockPS*tickGain;
    playtime += tickGain;
    displayBlock();
    displayUnlock();
    displayStat();
    lastTick = timeNow;
  }, 50);
  setInterval( function (){
    displayUpgrade();
    gameSave();
  }, 1000);

  gameLoad();
  displayAll();
});
