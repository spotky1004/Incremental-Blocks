$(function (){
  savePoint = 'IncrementalBlocks';
  notationForm = 0;

  block = 0;
  blockPS = 0;
  blockPC = 1;
  totalBlock = 0;
  clickCount = 0;
  playtime = 0;
  middleMenu = 0;
  buildings = 0;
  buildingNow = 0;
  buildingMult = 1;
  bupcM = 1;
  mBlock = 0;
  pointerThisBlock = 0;
  blockUsedInBuilding = 0;
  bToken = 0;
  bTokenTotal = 0;
  bTokenUsed = 0;
  bTokenCh = 0;
  bCool = 180;
  bActive = [-1, -1, -1, -1, -1];
  bTotal = 0;
  tickGain = 0;
  lastTick = new Date().getTime();
  timeNow = new Date().getTime();
  screenWidthBef = 0;
  screenHeightBef = 0;
  runeTimeOut = 0;
  runeTimeOut2 = 0;
  screenWidthNow = $(window).width();
  screenHeightNow = $(window).height();
  resetTimer = 100;
  power = 0;
  pActive = 0;
  ppsCap = 1;
  powerProgress = 0;
  powerBulkLevel = 0;
  blockUsageM = 1e40;

  function copyToClipboard(val) {
    var t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = val;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
  }
  function toRadians(deg) {
		return deg*(Math.PI / 180);
	}

  function notation(num, dim) {
    if (num < 1e30) {
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
  function romanize (num) {
    if (num == 0) {
      return '0';
    }
    if (isNaN(num))
      return NaN;
    var digits = String(+num).split(""),
      key = [
        "","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
        "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
        "","I","II","III","IV","V","VI","VII","VIII","IX"
      ],
      roman = "",
      i = 3;
    while (i--)
      roman = (key[+digits.pop() + (i * 10)] || "") + roman;
      return (Array(+digits.join("") + 1).join("M") + roman).toLowerCase();
  }
  function timeNotation(timeNum, hourShow, minShow, secShow, degShow) {
    return ((hourShow == 1) ? Math.floor(timeNum/3600) + ((minShow == 1) ? ':' : '') : '') + ((minShow == 1) ? ((Math.floor(timeNum%3600)/60 <= 9 && hourShow == 1) ? '0' : '') + Math.floor((timeNum%3600)/60) + ((Math.floor(timeNum%3600)/60 == 0 && hourShow == 1) ? '0' : '') + ((secShow == 1) ? ':' : '') : '') + ((secShow == 1) ? ((Math.floor(timeNum%60) <= 9 && minShow == 1) ? '0' : '') + Math.floor(timeNum%60) + ((degShow == 1) ? '.' : '') : '') + ((degShow == 1) ? ((Math.floor((timeNum%1)*100) <= 9 && secShow == 1) ? '0' : '') + Math.floor((timeNum%1)*100) : '');
  }
  function drawRuneLine(selector1, selector2, colorThis, widthThis) {
    pos1 = $(selector1);
    pos2 = $(selector2);
    $('<line>').attr({x1: (Math.abs(pos1.position().left)+pos1.width()/2), y1: (Math.abs(pos1.position().top)+pos1.height()/2), x2: (Math.abs(pos2.position().left)+pos2.width()/2), y2: (Math.abs(pos2.position().top)+pos2.height()/2)}).css({stroke: 'rgba(' + colorThis + ')', strokeWidth: widthThis}).appendTo('#runeLine');
    $('#runeLine').html(function (index,html) {
      reg = /><\/line>/gi;
      strReg = html;
      return String(strReg.replace(reg, '/>'));
    });
  }
  function gameSave() {
    saveFile = [];
    for (var i = 0; i < varData.length; i++) {
      saveFile[i] = eval(varData[i]);
    }
    localStorage[savePoint] = JSON.stringify(saveFile);
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
    displayBuild();
    displayBoost();
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
    if (upgradeHave[99] == 1) {
      $('#middleContentNav > span:eq(1)').removeClass('lockedNav').addClass('openedNav');
      $('#middleContentNav > span:eq(1)').html(function (index,html) {
        return 'rune';
      });
    } else {
      $('#middleContentNav > span:eq(1)').addClass('lockedNav').removeClass('openedNav');
      $('#middleContentNav > span:eq(1)').html(function (index,html) {
        return 'locked';
      });
    }
  }
  function displayBlock() {
    bpsP = ((upgradeHave[1] == 1) ? 1 : 0)+((upgradeHave[3] == 1) ? 5 : 0)+((upgradeHave[5] == 1) ? 20 : 0)+((upgradeHave[7] == 1) ? 60 : 0)+((upgradeHave[9] == 1) ? 175 : 0)+((upgradeHave[11] == 1) ? 721 : 0)+((upgradeHave[12] == 1) ? 4.4e3 : 0)+((upgradeHave[14] == 1) ? 21.74e3 : 0)+((upgradeHave[15] == 1) ? 104.8e3 : 0)+((upgradeHave[19] == 1) ? 600e3 : 0)+((upgradeHave[23] == 1) ? 2.222e6 : 0)+((upgradeHave[24] == 1) ? 14e6 : 0)+((upgradeHave[33] == 1) ? 32e6 : 0)+((upgradeHave[41] == 1) ? 100e6 : 0)+((upgradeHave[66] == 1) ? 333.3e6 : 0)+((upgradeHave[81] == 1) ? 2.109e9 : 0);
    bpsM = 1*(4**buildings)*((upgradeHave[17] == 1) ? 2 : 1)*((upgradeHave[30] == 1) ? 3 : 1)*((upgradeHave[31] == 1) ? 2 : 1)*((upgradeHave[32] == 1) ? 1.5 : 1)*((upgradeHave[42] == 1) ? 1.8 : 1)*((upgradeHave[43] == 1) ? 1.7 : 1)*((upgradeHave[49] == 1) ? 2 : 1)*((upgradeHave[55] == 1) ? 2.5 : 1)*((upgradeHave[57] == 1) ? 5 : 1)*((bActive[0] == 1) ? bActive[1] : 1)*((upgradeHave[63] == 1) ? 4 : 1)*((upgradeHave[64] == 1) ? 3 : 1)*((upgradeHave[72] == 1) ? 3.5 : 1)*((upgradeHave[77] == 1) ? 15 : 1)*((upgradeHave[82] == 1) ? 3 : 1)*((upgradeHave[89] == 1) ? 3 : 1)*((upgradeHave[90] == 1) ? 2 : 1)*((upgradeHave[91] == 1) ? 3 : 1)*((upgradeHave[92] == 1) ? 5 : 1)*((upgradeHave[93] == 1) ? 7: 1)*((upgradeHave[94] == 1) ? 11 : 1)*((upgradeHave[95] == 1) ? 13 : 1)*((upgradeHave[96] == 1) ? 17 : 1)*((upgradeHave[97] == 1) ? 19 : 1)*((upgradeHave[98] == 1) ? 23 : 1)*runeBuffCalc(0, runeLevels[0]);
    blockPS = bpsP*bpsM;
    bpcP = 1+((upgradeHave[0] == 1) ? 1 : 0)+((upgradeHave[2] == 1) ? 2 : 0)+((upgradeHave[4] == 1) ? 4 : 0)+((upgradeHave[6] == 1) ? 24 : 0)+((upgradeHave[8] == 1) ? 96 : 0)+((upgradeHave[10] == 1) ? 384 : 0)+((upgradeHave[18] == 1) ? 100e3 : 0);
    bpcM = 1*(4**buildings)*((upgradeHave[16] == 1) ? 1.5 : 1)*((upgradeHave[45] == 1) ? 7500 : 1)*((upgradeHave[48] == 1) ? 9 : 1)*((bActive[0] == 0) ? bActive[1] : 1)*runeBuffCalc(0, runeLevels[0]);
    blockPC = bpcP*bpcM+((((upgradeHave[13] == 1) ? 0.05 : 0)+((upgradeHave[29] == 1) ? 0.1 : 0)+((upgradeHave[37] == 1) ? 0.15 : 0)+((upgradeHave[78] == 1) ? 0.2 : 0)+((upgradeHave[79] == 1) ? 0.25 : 0))*blockPS)*((bActive[0] == 0) ? bActive[1] : 1)/((bActive[0] == 1) ? bActive[1] : 1);
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
    if (upgradeHave[97] == 1 && upgradeHave[98] == 1) {
      $('.upgradeContent:eq(0)').addClass('mystUpgrade');
    }
    if (middleMenu == 0) {
      $('#upgradeOrign').show();
      $('#mystUpgrade').hide();
    } else if (middleMenu == 1) {
      $('#upgradeOrign').hide();
      $('#mystUpgrade').show();
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
    (blockUnlocked[1] == 1) ? $('.statEra:eq(1)').show() : $('.statEra:eq(1)').hide();
    (blockUnlocked[2] == 1) ? $('.statEra:eq(2)').show() : $('.statEra:eq(2)').hide();
    statVars = [];
    statVars[0] = notation(totalBlock);
    statVars[1] = clickCount;
    statVars[2] = (playtime/3600).toFixed(3);
    statVars[3] = notation(bpcP);
    statVars[4] = notation(bpsP);
    statVars[5] = notation(bpcM);
    statVars[6] = notation(bpsM);
    statVars[7] = buildings;
    statVars[8] = notation(buildingMult);
    statVars[9] = notation(bupcM);
    statVars[10] = notation(blockUsedInBuilding);
    statVars[11] = notation(bTokenTotal);
    statVars[12] = bTokenCh.toFixed(1);
    statVars[13] = bTotal;
    $('.statline > span').html(function (index,html) {
      return statVars[index];
    });
  }
  function displayBuild() {
    calculateBuild();
    $('#buildPerClick').html(function (index,html) {
      return notation(bupc);
    });
    for (var i = 0; i < 36; i++) {
      colorStr = '';
      extraDeco = '';
      if (buildingShape[buildingNow][i] != 0) {
        thisBlockValue = baseBuilding*10**buildingShape[buildingNow][i];
      } else {
        thisBlockValue = 0;
      }
      if (buildingShape[buildingNow][i] == 0) {
        colorStr = '0, 0, 0, 0';
      } else if (buildProgress[buildingNow][i] > 100 && buildingShape[buildingNow][pointerThisBlock] != 0 && i != pointerThisBlock) {
        for (var j = 0; j < 3; j++) {
          colorStr += blockColors[buildingShape[buildingNow][i]-1][j] + ', ';
        }
        colorStr += '1';
        extraDeco = ' box-shadow: 7px 7px 0 #777;';
      } else {
        colorRawPoint = Math.log10((buildProgress[buildingNow][i]-1)/(3**buildingNow*1e6*((buildingNow >= 12) ? 10**(buildingNow-11) : 1 )))+1;
        colorPointer = Math.max(Math.floor(colorRawPoint), 0);
        colorBland = colorRawPoint - colorPointer;
        if (!isFinite(colorRawPoint)) {
          colorStr = '0, 0, 0, 0';
        } else if (colorPointer != 0) {
          for (var j = 0; j < 3; j++) {
            colorStr += (blockColors[colorPointer-1][j]*(1-colorBland)+blockColors[colorPointer][j]*(colorBland))/2 + ', ';
          }
          colorStr += '1';
        } else {
          for (var j = 0; j < 3; j++) {
            colorStr += '0, ';
          }
          colorStr += colorBland;
        }
      }
      $('.buildBlock:eq(' + i + ')').attr({
        'style' : 'background-color: rgba(' + colorStr + ');' + extraDeco
      });
    }
    $('#buildingNum').html(function (index,html) {
      return 'building ' + (buildingNow+1);
    });
    $('#buildMult > span:eq(0)').html(function (index,html) {
      return notation(buildingMult);
    });
    $('#buildMult > span:eq(1)').html(function (index,html) {
      return notation(runeBuffCalc(1, runeLevels[1]), 1);
    });
  }
  function displayBoost() {
    bTokenCh = (((upgradeHave[34] == 1) ? 0.5 : 0)+((upgradeHave[35] == 1) ? 0.5 : 0)+((upgradeHave[36] == 1) ? 0.5 : 0)+((upgradeHave[40] == 1) ? 1 : 0)+((upgradeHave[46] == 1) ? 1 : 0)+((upgradeHave[58] == 1) ? 2 : 0)+((upgradeHave[62] == 1) ? 2 : 0)+((upgradeHave[74] == 1) ? 3 : 0)+((upgradeHave[75] == 1) ? 3 : 0)+((upgradeHave[84] == 1) ? 4 : 0))*((bActive[0] == 4) ? bActive[1] : 1);
    bTokenMult = ((bActive[0] == 5) ? bActive[1] : 1)*((upgradeHave[60] == 1) ? 2 : 1)*((upgradeHave[61] == 1) ? 3 : 1)*((upgradeHave[81] == 1) ? 2 : 1);
    $('#tokenNum').html(function (index,html) {
      return bToken;
    });
    $('.boostType').html(function (index,html) {
      return boostShortName[boostSelData[index][0]];
    });
    $('.boostBuff').html(function (index,html) {
      return 'x' + notation(boostSelData[index][1]);
    });
    $('.boostTime').html(function (index,html) {
      return timeNotation(boostSelData[index][2], 0, 1, 1, 0);
    });
    $('.boostCost').html(function (index,html) {
      return notation(boostSelData[index][3]) + ' tokens';
    });
    if (bActive[2] <= 0) {
      if (bCool >= 0) {
        $('#boostSelect').attr({
          'class' : 'contentBlock'
        });
        bCool -= tickGain;
        bActive = [-1, -1, -1, -1, -1];
        $('#boostCoolTimeNum').html(function (index,html) {
          return timeNotation(bCool, 0, 1, 1, 1);
        });
        $('#boostSelect > div:nth-child(1) > div:not(:first-child)').hide();
        $('#boostSelect > div:nth-child(1) > div:eq(3)').show();
        if (bCool <= 0) {
          $('#boostSelect > div:nth-child(1) > div:not(:first-child)').hide();
          $('#boostSelect > div:nth-child(1) > div:eq(1)').show();
          rollBoost();
          displayBoost();
        }
      }
    } else {
      bActive[2] -= tickGain;
      $('#boostSelect').attr({
        'class' : 'contentBlock boostActive'
      });
      $('#activeBoostTimeLeft').attr({
        'value' : bActive[2]/bActive[4]
      });
      $('#activeBoostName').html(function (index,html) {
        return boostLongName[bActive[0]];
      });
      $('#activeBoostNum').html(function (index,html) {
        return notation(bActive[1]);
      });
      $('#activeBoostTimeNum').html(function (index,html) {
        return timeNotation(bActive[2], 0, 1, 1, 1);
      });
    }
  }
  function displyRune() {
    for (var i = 0; i < 10; i++) {
      if (i == 0 || runeLevels[i-1] >= 1 || runeLevels[9] >= 1) {
        $('.rune:eq(' + i + ')').show();
      } else {
        $('.rune:eq(' + i + ')').hide();
      }
    }
    if (screenWidthBef != screenWidthNow || screenHeightBef != screenHeightNow) {
      $('#runeRotation').css({width: screenHeightNow*0.508, height: screenHeightNow*0.508, 'margin-left': (screenWidthNow*0.59-screenHeightNow*0.508)/2});
      $('#runeRortationOffset').css({width: screenHeightNow*0.508, height: screenHeightNow*0.508});
      $('#runeLine').css({width: screenHeightNow*0.508, height: screenHeightNow*0.508});
      $('#runes').css({width: screenHeightNow*0.508, height: screenHeightNow*0.508});
      clearTimeout(runeTimeOut);
      clearTimeout(runeTimeOut2);
      runePositionSet();
      runeTimeOut2 = setTimeout( function (){
        drawAllRuneLine();
      }, 75);
    }
  }
  function displayPower() {
    $('#powerBulkNum').html(function (index,html) {
      return 'speed /' + notation(Math.pow(2, powerBulkLevel), 5);
    });
    if (pActive) {
      powerBulkM = 1;
      blockUsageM = 1e40;
      ppsCap = 1;
      thisBulk = Math.min(powerBulkM*tickGain, Math.min(block/blockUsageM, ppsCap*tickGain*Math.pow(2, powerBulkLevel)));
      block -= thisBulk*blockUsageM;
      if (block < 0) {
        block = 0;
      }
      power += Math.floor(thisBulk+powerProgress);
      powerProgress += thisBulk-Math.floor(thisBulk+powerProgress);
      $('#togglePower').css('background', 'linear-gradient(90deg, rgba(71, 237, 126, 0.3) ' + powerProgress*100 + '% ' + powerProgress*100 + '%, #404040 ' + powerProgress*100 + '%)');
    } else {
      $('#togglePower').css('background', 'linear-gradient(90deg, rgba(237, 179, 71, 0.3) ' + powerProgress*100 + '% ' + powerProgress*100 + '%, #404040 ' + powerProgress*100 + '%)');
    }
    $('#togglePowerBlockNum').html(function (index,html) {
      return notation(blockUsageM*Math.pow(2, powerBulkLevel));
    });
    $('#togglePowerPowerNum').html(function (index,html) {
      return notation(ppsCap*Math.pow(2, powerBulkLevel), 2);
    });
    $('#powerNum').html(function (index,html) {
      return notation(power);
    });
  }

  function calculateBuild() {
    baseBuilding = 1e6*3**buildingNow*((buildingNow >= 12) ? 10**(buildingNow-11) : 1 );
    for (var i = 0; i < 36; i++) {
      pointerThisBlock = (35-Math.floor(i/6)*6)-(5-(i%6));
      if (buildingShape[buildingNow][pointerThisBlock] != 0) {
        thisBlockValue = baseBuilding*10**(buildingShape[buildingNow][pointerThisBlock]-1);
      } else {
        thisBlockValue = 0;
      }
      if (buildProgress[buildingNow][pointerThisBlock] > thisBlockValue) {
        buildProgress[buildingNow][pointerThisBlock] = thisBlockValue;
      }
    }
    for (var i = 0; i < 36; i++) {
      pointerThisBlock = (2*(i%6)+30-i);
      thisBlockValue = baseBuilding*10**(buildingShape[buildingNow][pointerThisBlock]-1);
      if (buildProgress[buildingNow][pointerThisBlock] < thisBlockValue && buildingShape[buildingNow][pointerThisBlock] != 0) {
        break;
      }
      if (buildings <= buildingNow && i == 35) {
        buildings++;
      }
      pointerThisBlock = -1;
    }
    bupcM = ((upgradeHave[20] == 1) ? 5 : 1)*((upgradeHave[21] == 1) ? 8 : 1)*((upgradeHave[22] == 1) ? 12 : 1)*((upgradeHave[25] == 1) ? 5 : 1)*((upgradeHave[26] == 1) ? 5 : 1)*((upgradeHave[27] == 1) ? 5 : 1)*((upgradeHave[28] == 1) ? 10 : 1)*((upgradeHave[50] == 1) ? 5 : 1)*((upgradeHave[51] == 1) ? 4 : 1)*((upgradeHave[52] == 1) ? 3 : 1)*((upgradeHave[53] == 1) ? 2 : 1)*((upgradeHave[54] == 1) ? 1 : 1)*((upgradeHave[56] == 1) ? 10 : 1)*((upgradeHave[68] == 1) ? 7 : 1)*((upgradeHave[70] == 1) ? 4 : 1)*((upgradeHave[71] == 1) ? 5 : 1)*((upgradeHave[85] == 1) ? 6 : 1)*((upgradeHave[88] == 1) ? 10 : 1)*((bActive[0] == 2) ? bActive[1] : 1);
    bupc = 100e3*2.7**buildingNow*bupcM;
    (bupc > block) ? bupc = block : 0;
    (bupc > thisBlockValue) ? bupc = thisBlockValue : 0;
    (buildings == buildingNow) ? 0 : bupc = 0;
    buildingMult = runeBuffCalc(1, runeLevels[1])**buildings;
  }
  function rollBoost() {
    for (var i = 0; i < 3; i++) {
      boostSelData[i][0] = Math.floor(Math.random()*6);
      boostSelData[i][1] = (Math.floor(Math.random()*(boostRange[boostSelData[i][0]][1]-boostRange[boostSelData[i][0]][0]))+boostRange[boostSelData[i][0]][0])**(i+1);
      boostSelData[i][2] = Math.floor(Math.random()*(20*(i+1))+(i+1)*10);
      boostSelData[i][3] = Math.floor((Math.random()*4+8)**(i+1))
    }
  }
  function drawAllRuneLine() {
    /*
    $('#runeRotation').css('animation', 'none');
    $('.rune').css('animation', 'none'); */
    $('#runeLine').html(function (index,html) {
      return '';
    });
    runeTimeOut = setTimeout( function (){
      for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
          if ((((3*(i%3)+j) == 0 || runeLevels[(3*(i%3)+j)-1] >= 1) && ((3*((i+1)%3)+j) == 0 || runeLevels[(3*((i+1)%3)+j)-1] >= 1)) || (runeLevels[9] == 1)) {
            drawRuneLine('.rune:eq(' + (3*(i%3)+j) + ')', '.rune:eq(' + (3*((i+1)%3)+j) + ')', + ((i == 3) ? 200 : 0) +  ','  + ((i == 2) ? 200 : 0) + ','  + ((i == 1) ? 200 : 0) + ', 1', Math.sqrt(runeLevels[(3*(i%3)+j)]));
          }
        }
      }
      if (runeLevels[9] >= 1) {
        for (var i = 0; i < 9; i++) {
          drawRuneLine('.rune:eq(9)', '.rune:eq(' + i + ')', '255, 255, 255 , 1', Math.sqrt(runeLevels[9]));
        }
      }
      /* $('#runeRotation').css('animation', 'runesRotation 60s linear infinite');
      $('.rune').css('animation', 'runeBackgroundRotation linear 60s infinite'); */
    }, 50);
  }
  function runePositionSet() {
    radius = screenHeightNow*0.204;
    runeDeg = 40;
    for (var i = 0; i < 9; i++) {
      $('.rune:eq(' + i + ')').css({left: Math.floor(radius*(Math.cos(toRadians(i*runeDeg))+1)), top: Math.floor(radius*(Math.sin(toRadians(i*runeDeg))+1)) });
    }
    $('.rune:eq(9)').css({left: radius, top: radius});
  }
  function runeBuffCalc(r, l) {
    switch (r) {
      case 0:
        return Math.floor(((l*(l+1))/2+1)*(1+l*0.03));
        break;
      case 1:
        return (4+0.2*l).toFixed(1);
        break;
      default:
        return 1;
    }
  }
  function runeCostCalc(r, l) {
    switch (r) {
      case 0:
        return Math.floor((1+l/50)**(l/1.2));
        break;
      case 1:
        return (l**2+6*l+5)**2;
        break;
      default:
        return 1e300;
    }
  }
  function hoverRuneDisplay() {
    $('#runeNameTxt').html(function (index,html) {
      return runeName[runeOn];
    });
    $('#selRuneLevel').html(function (index,html) {
      return 'level ' + romanize(runeLevels[runeOn]);
    });
    $('#selRuneBoostName').html(function (index,html) {
      return runeInfoStr[runeOn];
    });
    $('#selRuneBoostInfoNum').html(function (index,html) {
      switch (Math.floor(runeOn/3)) {
        case 0:
          markUpThis = 'Red'
          break;
        case 1:
          markUpThis = 'Blue'
          break;
        case 2:
          markUpThis = 'Green'
          break;
        case 3:
          markUpThis = 'White'
          break;
      }
      return '<span class=rune' + markUpThis + 'Markup>x' + notation(runeBuffCalc(runeOn, runeLevels[runeOn]), 2) + ' -> ' + 'x' + notation(runeBuffCalc(runeOn, (runeLevels[runeOn]+1)), 2);
    });
    $('#selRuneCostNum').html(function (index,html) {
      return notation(runeCostCalc(runeOn, runeLevels[runeOn]));
    });
  }

  $(document).on('click','#blockClick',function() {
    block += blockPC;
    totalBlock += blockPC;
    clickCount++;
    if (bTokenCh/100 > Math.random()) {
      bToken += 1*bTokenMult;
      bTokenTotal += 1*bTokenMult;
    }
    displayBlock();
  });
  $(document).on('click','.lockedBlock',function() {
    indexThis = $('.lockedBlock').index(this);
    if (blockCost[indexThis] <= block && !blockUnlocked[indexThis]) {
      block -= blockCost[indexThis];
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
      case 3:
        resetTimer--;
        $('.optionBlock:eq(3)').html(function (index,html) {
          return resetTimer;
        });
        if (resetTimer == 0) {
          gameReset();
        }
        break;
    }
  });
  $(document).on('click','#buildClick',function() {
    calculateBuild();
    buildProgress[buildingNow][pointerThisBlock] += bupc*((bActive[0] == 3) ? bActive[1] : 1)*((upgradeHave[67] == 1) ? 3 : 1)*((upgradeHave[69] == 1) ? 3 : 1)*((upgradeHave[87] == 1) ? 3 : 1);
    block -= bupc;
    blockUsedInBuilding += bupc;
    clickCount++;
    displayBuild();
  });
  $(document).on('click','#buildingNav > span',function() {
    switch ($('#buildingNav > span').index(this)) {
      case 0:
        if (buildingNow != 0) {
          buildingNow--;
        }
        break;
      case 1:
        if (buildingNow < buildings && buildingNow < 19) {
          buildingNow++;
        }
        break;
    }
    displayBuild();
  });
  $(document).on('click','.boostCell',function() {
    indexThis = $('.boostCell').index(this);
    if (bToken >= boostSelData[indexThis][3]) {
      bActive = boostSelData[indexThis];
      bActive[4] = boostSelData[indexThis][2];
      bToken -= boostSelData[indexThis][3];
      bTokenUsed += boostSelData[indexThis][3];
      bCool = 240-((upgradeHave[39] == 1) ? 20 : 0)-((upgradeHave[44] == 1) ? 30 : 0)-((upgradeHave[47] == 1) ? 30 : 0)-((upgradeHave[59] == 1) ? 30 : 0)-((upgradeHave[65] == 1) ? 20 : 0)-((upgradeHave[73] == 1) ? 15 : 0)-((upgradeHave[76] == 1) ? 10 : 0)-((upgradeHave[65] == 1) ? 20 : 0)-((upgradeHave[83] == 1) ? 20 : 0)-((upgradeHave[86] == 1) ? 10 : 0);
      bTotal++;
      $('#boostSelect > div:nth-child(1) > div:not(:first-child)').hide();
      $('#boostSelect > div:nth-child(1) > div:eq(2)').show();
      displayBoost();
      gameSave();
    }
  });
  $(document).on('click','#middleContentNav > span.openedNav',function() {
    indexThis = $('#middleContentNav > span').index(this);
    if (indexThis != middleMenu) {
      $('#middleContentWarp > div').hide();
      $('#middleContentWarp > div:eq(' + indexThis + ')').show();
      switch (indexThis) {
        case 0:
          $('#middleContent').css('background-image', 'url(Resource/buildBackground.jpg)');
          break;
        case 1:
          $('#middleContent').css('background-image', 'url(Resource/Rune/runeBackground.jpg)');
          drawAllRuneLine();
          break;
      }
      middleMenu = indexThis;
      displayUpgrade();
    }
  });
  $(document).on('mouseover','.rune',function(e) {
    thisIndex = $(".rune").index(this);
    runeOn = thisIndex;
    hoverRuneDisplay();
  });
  $(document).on('mouseout','.rune',function(e) {
    runeOn = 0;
    $('#runeNameTxt').html(function (index,html) {
      return 'hover on<br>rune';
    });
    $('#selRuneLevel').html(function (index,html) {
      return '';
    });
    $('#selRuneBoostName').html(function (index,html) {
      return '';
    });
    $('#selRuneBoostInfoNum').html(function (index,html) {
      return '';
    });
    $('#selRuneCostNum').html(function (index,html) {
      return '0';
    });
  });
  $(document).on('click','.rune',function() {
    if (power >= runeCostCalc(runeOn, runeLevels[runeOn])) {
      power -= runeCostCalc(runeOn, runeLevels[runeOn]);
      runeLevels[runeOn]++;
      hoverRuneDisplay();
      drawAllRuneLine();
    }
  });
  $(document).on('click','#togglePower',function() {
    if (pActive == 1) {
      pActive--;
    } else {
      pActive++;
    }
  });
  $(document).on('click','.powerBulkButton',function() {
    thisIndex = $(".powerBulkButton").index(this);
    if (thisIndex == 0 && powerBulkLevel < 0) {
      powerBulkLevel++;
    } else if (thisIndex == 1 && powerBulkLevel >= -10){
      powerBulkLevel--;
    }
  });

  setInterval( function (){
    timeNow = new Date().getTime();
    screenWidthNow = $(window).width();
    screenHeightNow = $(window).height();
    tickGain = (timeNow-lastTick)/1000;
    block += blockPS*tickGain;
    totalBlock += blockPS*tickGain;
    playtime += tickGain;
    displayBlock();
    displayUnlock();
    displayStat();
    displayBoost();
    displyRune();
    displayPower();
    screenWidthBef = screenWidthNow;
    screenHeightBef = screenHeightNow;
    lastTick = timeNow;
  }, 50);
  setInterval( function (){
    displayUpgrade();
    displayBuild();
    gameSave();
    if (resetTimer < 100) {
      resetTimer++;
      $('.optionBlock:eq(3)').html(function (index,html) {
        return resetTimer;
      });
    } else if (resetTimer == 100) {
      $('.optionBlock:eq(3)').html(function (index,html) {
        return 'reset';
      });
    }
  }, 500);

  gameLoad();
  displayAll();
  blockUnlocked[4] = 0;
  $('#boostSelect > div:nth-child(1) > div:not(:first-child)').hide();
  $('#boostSelect > div:nth-child(1) > div:eq(1)').show();
  $('#middleContentWarp > div').hide();
  $('#middleContentWarp > div:eq(0)').show();
});

function gameReset() {
  for (var i = 0; i < varData.length; i++) {
    this[varData[i]] = resetData[i];
  }
  saveFile = [];
  for (var i = 0; i < varData.length; i++) {
    saveFile[i] = eval(varData[i]);
  }
  localStorage[savePoint] = JSON.stringify(saveFile);
  location.reload();
}
