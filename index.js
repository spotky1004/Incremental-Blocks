$(function (){
  savePoint = 'IncrementalBlocks';
  notationForm = 0;
  cheatEnabled = 0;

  block = 0;
  blockPS = 0;
  blockPC = 1;
  overallBlockM = 1;
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
  bTokenGain = 1;
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
  powerTot = 0;
  pActive = 0;
  ppsCap = 1;
  totMystUp = 0;
  upgradeResThis = 0;
  upgradeCostThis = 0;
  powerProgress = 0;
  powerBulkLevel = 0;
  powerBulkM = 1;
  blockUsageM = 1e40;
  totRuneLevel = 0;
  activeRolledBoost = [1, 1, 1, 1, 1, 1];
  totalRebuild = 0;
  unlockReached = 0;
  statVars = [];
  statVars[100] = 0;
  overScore = 0;
  toggleAutoBuild = false;
  brokeBlock = false;
  beyondReq = 1e308;
  unlockProgressNow = 0;
  powerPregessDisp = 0;
  beyondCount = 0;
  treeRotateState = 0;
  totalBP = 0;
  bp = 0;
  extraRuneLevel = 0;
  timeSpeed = 1;

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
  function simulateClick() {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
    var cb = document.getElementById("checkbox");
    var canceled = !cb.dispatchEvent(evt);
    if(canceled) {
      alert("canceled");
    } else {
      alert("not canceled");
    }
  }

  function notation(num, dim) {
    if (!isFinite(num)) {
      return 'error!';
    } else if (num < 1e30) {
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
  function fillBlank (str, leng) {
    if (str.length < leng) {
      for (var i = 0; i < (leng-str.length+1); i++) {
        str += ' ';
      }
    }
    return str;
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
  function cheatPrompt() {
    var inputedCommand = prompt('to use:\nskip (sec)\nblock (num), build (num/all), token (num), power (num)\nrune (num) (level)', '');
    inputArr = inputedCommand.split(' ');
    switch (inputArr[0]) {
      case 'skip':
        if (!isNaN(Number(inputArr[1]))) {
          lastTick -= inputArr[1]*1000;
        }
        break;
      default:

    }
  }

  function displayAll() {
    displayBlock();
    displayUnlock();
    displayUpgrade();
    displayBuild();
    displayBoost();
    displayMystUpgrade();
    displayProgress();
    displayBeyond();
    displayRotaionTree();
    rotationTreeImgSet();
    bugFix();
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
    if (upgradeHave[99] == 1 || prestigeLevelCheck(1)) {
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
    if (mystLevels[8] >= 1) {
      $('#toggleAutoBuild').show();
    } else {
      $('#toggleAutoBuild').hide();
    }
    if (unlockReached == 8) {
      $('#middleContentNav > span:eq(2)').removeClass('lockedNav').addClass('openedNav');
      $('#middleContentNav > span:eq(2)').html(function (index,html) {
        return 'beyond';
      });
    } else {
      $('#middleContentNav > span:eq(2)').addClass('lockedNav').removeClass('openedNav');
      $('#middleContentNav > span:eq(2)').html(function (index,html) {
        return 'locked';
      });
    }
    if (totalBlock > 1e100) {
      $('#bpContainer').show();
      $('#timeSpeed > span').show();
    }
  }
  function displayBlock() {
    overallBlockM = 1.2**mystLevels[5]*((rotationTreeHave[4] == 1) ? 4 :1)*((rotationTreeHave[9] == 1) ? 3 :1);
    bpsP = ((upgradeHave[1] == 1) ? 1 : 0)+((upgradeHave[3] == 1) ? 5 : 0)+((upgradeHave[5] == 1) ? 20 : 0)+((upgradeHave[7] == 1) ? 60 : 0)+((upgradeHave[9] == 1) ? 175 : 0)+((upgradeHave[11] == 1) ? 721 : 0)+((upgradeHave[12] == 1) ? 4.4e3 : 0)+((upgradeHave[14] == 1) ? 21.74e3 : 0)+((upgradeHave[15] == 1) ? 104.8e3 : 0)+((upgradeHave[19] == 1) ? 600e3 : 0)+((upgradeHave[23] == 1) ? 2.222e6 : 0)+((upgradeHave[24] == 1) ? 14e6 : 0)+((upgradeHave[33] == 1) ? 32e6 : 0)+((upgradeHave[41] == 1) ? 100e6 : 0)+((upgradeHave[66] == 1) ? 333.3e6 : 0)+((upgradeHave[81] == 1) ? 2.109e9 : 0);
    bpsM = overallBlockM*(buildingMult)*((upgradeHave[17] == 1) ? 2 : 1)*((upgradeHave[30] == 1) ? 3 : 1)*((upgradeHave[31] == 1) ? 2 : 1)*((upgradeHave[32] == 1) ? 1.5 : 1)*((upgradeHave[42] == 1) ? 1.8 : 1)*((upgradeHave[43] == 1) ? 1.7 : 1)*((upgradeHave[49] == 1) ? 2 : 1)*((upgradeHave[55] == 1) ? 2.5 : 1)*((upgradeHave[57] == 1) ? 5 : 1)*((bActive[0] == 1) ? bActive[1] : 1)*((upgradeHave[63] == 1) ? 4 : 1)*((upgradeHave[64] == 1) ? 3 : 1)*((upgradeHave[72] == 1) ? 3.5 : 1)*((upgradeHave[77] == 1) ? 15 : 1)*((upgradeHave[82] == 1) ? 3 : 1)*((upgradeHave[89] == 1) ? 3 : 1)*((upgradeHave[90] == 1) ? 2 : 1)*((upgradeHave[91] == 1) ? 3 : 1)*((upgradeHave[92] == 1) ? 5 : 1)*((upgradeHave[93] == 1) ? 7: 1)*((upgradeHave[94] == 1) ? 11 : 1)*((upgradeHave[95] == 1) ? 13 : 1)*((upgradeHave[96] == 1) ? 17 : 1)*((upgradeHave[97] == 1) ? 19 : 1)*((upgradeHave[98] == 1) ? 23 : 1)*runeBuffCalc(0, runeLevels[0])*activeRolledBoost[1];
    blockPS = bpsP*bpsM;
    bpcP = 1+((upgradeHave[0] == 1) ? 1 : 0)+((upgradeHave[2] == 1) ? 2 : 0)+((upgradeHave[4] == 1) ? 4 : 0)+((upgradeHave[6] == 1) ? 24 : 0)+((upgradeHave[8] == 1) ? 96 : 0)+((upgradeHave[10] == 1) ? 384 : 0)+((upgradeHave[18] == 1) ? 100e3 : 0);
    bpcM = overallBlockM*(buildingMult)*((upgradeHave[16] == 1) ? 1.5 : 1)*((upgradeHave[45] == 1) ? 7500 : 1)*((upgradeHave[48] == 1) ? 9 : 1)*((bActive[0] == 0) ? bActive[1] : 1)*runeBuffCalc(0, runeLevels[0])*activeRolledBoost[1];
    blockPC = bpcP*bpcM+((((upgradeHave[13] == 1) ? 0.05 : 0)+((upgradeHave[29] == 1) ? 0.1 : 0)+((upgradeHave[37] == 1) ? 0.15 : 0)+((upgradeHave[78] == 1) ? 0.2 : 0)+((upgradeHave[79] == 1) ? 0.25 : 0))*blockPS)*((bActive[0] == 0) ? bActive[1] : 1)/((bActive[0] == 1) ? bActive[1] : 1)/activeRolledBoost[1];
    normalBlock();
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
      if (!upgradeHave[i] && upgradeCost[i]/10 <= totalBlock && shiftIndex <= 5) {
        upgradeNumShift[shiftIndex] = i;
        upgradeCostShift[shiftIndex] = upgradeCost[i];
        shiftIndex++;
      } else if (upgradeHave[i]) {
        upgradeHaveCount++;
      }
    }
    if (upgradeHave[97] == 1 && upgradeHave[98] == 1) {
      $('.upgradeContent:eq(0)').addClass('mystUpgrade');
    } else {
      $('.upgradeContent:eq(0)').removeClass('mystUpgrade');
    }
    if (middleMenu == 0) {
      $('#upgradeOrign').show();
      $('#mystUpgrade').hide();
      $('#hypeUpgrade').hide();
    } else if (middleMenu == 1) {
      $('#upgradeOrign').hide();
      $('#mystUpgrade').show();
      $('#hypeUpgrade').hide();
    } else if (middleMenu == 2) {
      $('#upgradeOrign').hide();
      $('#mystUpgrade').hide();
      $('#hypeUpgrade').show();
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
    (upgradeHave[99] == 1 || prestigeLevelCheck(1)) ? $('.statEra:eq(3)').show() : $('.statEra:eq(3)').hide();
    (runeLevels[6] >= 1 || prestigeLevelCheck(1)) ? $('.statline:eq(19)').show() : $('.statline:eq(19)').hide();
    statVars = [];
    statVars[0] = notation(totalBlock);
    statVars[1] = notation(clickCount);
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
    statVars[13] = notation(bTokenGain);
    statVars[14] = bTotal;
    statVars[15] = totMystUp;
    statVars[16] = notation(powerTot);
    statVars[17] = totRuneLevel;
    statVars[18] = notation(powerBulkM);
    statVars[19] = totalRebuild;
    statVars[20] = beyondCount;
    overScore = Math.log10(totalBlock+1)**1.2+upgradeHaveCount/5+Math.sqrt(Math.sqrt(bTotal))+Math.sqrt(playtime/3600)+Math.log10(clickCount+1)**2+Math.sqrt(Math.max(buildings-20, 0))+Math.log10(bTokenTotal+1)**1.5+Math.log10(powerTot+1)**2+Math.sqrt(totRuneLevel)+totMystUp/2+totalRebuild**1.5+Math.sqrt(beyondCount)*1000;
    $('.statline > span').html(function (index,html) {
      return statVars[index];
    });
    $('.statline:eq(21) > span').html(function (index,html) {
      return notation(overScore, 4);
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
      if (buildings < 20 || runeLevels[6] == 0) {
        $('#rebuildNum').hide();
        $('#rebuildMult').hide();
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
      } else {
        $('#rebuildNum').show();
        $('#rebuildMult').show();
        colorStr = '';
        thisBlockValue = baseBuilding*10**(buildingShape[buildingNow][i]-1);
        if (buildingShape[buildingNow][i] != 0) {
          for (var j = 0; j < 3; j++) {
            colorStr += blockColors[buildingShape[buildingNow][i]-1][j] + ', ';
          }
          if (rebuildProgress[buildingNow][i] == 0) {
            colorStr += '0.4';
          } else if (rebuildProgress[buildingNow][i] < 1) {
            colorStr += 0.4+rebuildProgress[buildingNow][i]*0.7;
          } else {
            colorStr += '1';
            extraDeco = ' box-shadow: 7px 7px 0 #777;';
          }
        } else {
          colorStr = '0, 0, 0, 0'
        }
        $('.buildBlock:eq(' + i + ')').attr({
          'style' : 'background-color: rgba(' + colorStr + ');' + extraDeco
        });
      }
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
    $('#baseBlockVauleMinNum').html(function (index,html) {
      return fillBlank(notation(baseBuilding), 8);
    });
    $('#baseBlockVauleMaxNum').html(function (index,html) {
      return fillBlank(notation(baseBuilding*10**Math.min(buildingNow, ((buildingNow != 9) ? 10 : 9 ))), 8);
    });
    $('#rebuildNum').html(function (index,html) {
      return 'rebuild ' + (reBuild[buildingNow]+1);
    });
    $('#rebuildMult > span:eq(0)').html(function (index,html) {
      return notation(reBuildMult, 4);
    });
    $('#rebuildMult > span:eq(1)').html(function (index,html) {
      return notation(runeBuffCalc(1, runeLevels[1])**runeBuffCalc(6, runeLevels[6]), 4);
    });
    $('#toggleAutoBuild').css('background-color', (toggleAutoBuild) ? 'rgba(207, 207, 207, 0.8)' : 'rgba(219, 177, 86, 0.8)');
  }
  function displayBoost() {
    bTokenCh = (((upgradeHave[34] == 1) ? 1 : 0)+((upgradeHave[35] == 1) ? 1 : 0)+((upgradeHave[36] == 1) ? 1 : 0)+((upgradeHave[40] == 1) ? 2 : 0)+((upgradeHave[46] == 1) ? 2 : 0)+((upgradeHave[58] == 1) ? 4 : 0)+((upgradeHave[62] == 1) ? 4 : 0)+((upgradeHave[74] == 1) ? 6 : 0)+((upgradeHave[75] == 1) ? 6 : 0)+((upgradeHave[84] == 1) ? 8 : 0))*((bActive[0] == 4) ? bActive[1] : 1)*activeRolledBoost[4];
    bTokenMult = Math.floor(((bActive[0] == 5) ? bActive[1] : 1)*((upgradeHave[60] == 1) ? 3 : 1)*((upgradeHave[61] == 1) ? 3 : 1)*((upgradeHave[81] == 1) ? 3 : 1)*activeRolledBoost[5]);
    bTokenGain = bTokenMult*runeBuffCalc(2, runeLevels[2]);
    $('#tokenNum').html(function (index,html) {
      if (bToken < 1e9) {
        return Math.floor(bToken);
      } else {
        return notation(bToken);
      }
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
          activeRolledBoost = [1, 1, 1, 1, 1, 1];
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
    if (runeLevels[4]) {
      for (var i = 0; i < 3; i++) {
        activeRolledBoost[boostSelData[i][0]] = Math.max(activeRolledBoost[boostSelData[i][0]], boostSelData[i][1]**runeBuffCalc(4, runeLevels[4]), 1);
      }
    }
  }
  function displyRune() {
    extraRuneLevel = ((rotationTreeHave[15] == 1) ? 2 :0)
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
    totRuneLevel = 0;
    for (var i = 0; i < 10; i++) {
      totRuneLevel += runeLevels[i];
    }
  }
  function displayPower() {
    $('#powerBulkNum').html(function (index,html) {
      return 'speed /' + notation(Math.pow(2, powerBulkLevel*-1), 5);
    });
    powerBulkM = 2**(mystLevels[0]+mystLevels[1]+mystLevels[2]);
    ppsCap = powerBulkM*Math.pow(2, powerBulkLevel);
    blockUsageM = 1e40*1.5**Math.log(Math.max(ppsCap, 1))*0.9**mystLevels[9];
    if (pActive) {
      thisBulk = Math.min(ppsCap*tickGain, block/blockUsageM);
      block -= thisBulk*blockUsageM;
      if (block < 0) {
        block = 0;
      }
      power += Math.floor(thisBulk+powerProgress);
      powerTot += Math.floor(thisBulk+powerProgress);
      powerProgress += thisBulk-Math.floor(thisBulk+powerProgress);
      if (thisBulk > 1e10) {
        powerPregessDisp = Math.random()*0.2+0.6;
      } else {
        powerPregessDisp = powerProgress;
      }
      if (blockPS > thisBulk*blockUsageM*(1/tickGain)) {
        $('#togglePower').css('background', 'linear-gradient(90deg, rgba(71, 237, 126, 0.3) ' + powerPregessDisp*100 + '% ' + powerPregessDisp*100 + '%, #3f4d44 ' + powerPregessDisp*100 + '%)');
      } else {
        if (block > thisBulk*blockUsageM) {
          $('#togglePower').css('background', 'linear-gradient(90deg, rgba(160, 237, 71, 0.3) ' + powerPregessDisp*100 + '% ' + powerPregessDisp*100 + '%, #444d3b ' + powerPregessDisp*100 + '%)');
        } else {
          $('#togglePower').css('background', 'linear-gradient(90deg, rgba(237, 71, 71, 0.3) ' + powerPregessDisp*100 + '% ' + powerPregessDisp*100 + '%, #664e4e ' + powerPregessDisp*100 + '%)');
        }
      }
    } else {
      $('#togglePower').css('background', 'linear-gradient(90deg, rgba(237, 179, 71, 0.3) ' + powerPregessDisp*100 + '% ' + powerPregessDisp*100 + '%, #595141 ' + powerPregessDisp*100 + '%)');
    }
    $('#togglePowerBlockNum').html(function (index,html) {
      return notation(powerBulkM*blockUsageM*Math.pow(2, powerBulkLevel));
    });
    $('#togglePowerPowerNum').html(function (index,html) {
      return notation(powerBulkM*Math.pow(2, powerBulkLevel), 2);
    });
    $('#powerNum').html(function (index,html) {
      return notation(power);
    });
    $('#blockCount').html(function (index,html) {
      reg = /0/gi;
      strReg1 = notation(block);
      return strReg1.replace(reg, '<span class="num0">$&</span>');
    });
  }
  function displayMystUpgrade() {
    totMystUp = 0;
    for (var i = 0; i < 100; i++) {
      totMystUp += mystLevels[i];
    }
    for (var i = 0; i < 12; i++) {
      if (mystUnlock[i] < totalBlock) {
        $('.mystUpgradeContent:eq(' + i + ')').show();
        upgradeResThis = eval(mystRes[i][0]);
        upgradeCostThis = eval(mystUpgradeCost(i, mystLevels[i]));
        if (upgradeResThis >= upgradeCostThis) {
          $('.mystUpgradeContent:eq(' + i + ')').removeClass('upN').addClass('upY');
        } else {
          $('.mystUpgradeContent:eq(' + i + ')').removeClass('upY').addClass('upN');
        }
        $('.mystUpgradeContent:eq(' + i + ') > div:eq(1) > span').html(function (index,html) {
          return notation((i != 3) ? upgradeCostThis : upgradeCostThis/3600);
        });
        $('.mystUpgradeContent:eq(' + i + ') > div:eq(0) > span').html(function (index,html) {
          return mystLevels[i];
        });
      } else {
        $('.mystUpgradeContent:eq(' + i + ')').hide();
      }
    }
  }
  function displayProgress() {
    if (unlockReached == 9) {
      unlockReachee = 8;
    }
    unlockProgressNow = Math.log10(totalBlock/unlockProgress[unlockReached][0])/Math.log10(unlockProgress[unlockReached][1]/unlockProgress[unlockReached][0]);
    if (unlockProgressNow < 1 && (unlockReached != 7 && unlockReached != 8)) {
      $('#unlockProgress').css('background', 'linear-gradient(90deg, rgba(151, 213, 219, 1) ' + unlockProgressNow*100 + '% ' + unlockProgressNow*100 + '%, #b3b3b3 ' + unlockProgressNow*100 + '%)');
      $('#unlockProgress > .unlockedBlock > span').css('color', 'black');
    } else {
      $('#unlockProgress').css('background', 'linear-gradient(90deg, rgba(0, 0, 0, 1) ' + unlockProgressNow*100 + '% ' + unlockProgressNow*100 + '%, #fff ' + unlockProgressNow*100 + '%)');
      $('#unlockProgress > .unlockedBlock > span').css('color', 'white');
    }
    $('#unlockName').html(function (index,html) {
      return unlockProgress[unlockReached][2];
    });
    $('#unlockReq').html(function (index,html) {
      return notation(unlockProgress[unlockReached][1]);
    });
    if (unlockProgressNow >= 1) {
      if (unlockReached != 7 && unlockReached != 8) {
        unlockReached++;
      } else {
        $('#unlockProgress').css('cursor', 'pointer');
      }
    }
  }
  function displayBeyond() {
    beyondReq = 1e100*1e5**beyondCount;
    $('#beyondNeedNum').html(function (index,html) {
      return beyondReq.toExponential(0).replace('+', '');
    });
    if (block > beyondReq) {
      $('#beyondButton').removeClass('beyNo').addClass('beyYes');
    } else {
      $('#beyondButton').removeClass('beyYes').addClass('beyNo');
    }
    $('#bpCounter').html(function (index,html) {
      return notation(bp);
    });
    $('#timeSpeedNum').html(function (index,html) {
      return notation(timeSpeed, 2);
    });
  }
  function displayRotaionTree() {
    displayBeyond();
    if (treeRotateState == 0) {
      rotationTreeIndex = [
        1, 2, 3, 4, 5,
        6, 7, 8, 9, 10,
        11, 12, 13, 14, 15,
        16, 17, 18, 19, 20,
        21, 22, 23, 24, 25
      ];
    } else if (treeRotateState == 1) {
      rotationTreeIndex = [
        21, 16, 11, 6, 1,
        22, 17, 12, 7, 2,
        23, 18, 13, 8, 3,
        24, 19, 14, 9, 4,
        25, 20, 15, 10, 5
      ];
    } else if (treeRotateState == 2) {
      rotationTreeIndex = [
        25, 24, 23, 22, 21,
        20, 19, 18, 17, 16,
        15, 14, 13, 12, 11,
        10, 9, 8, 7, 6,
        5, 4, 3, 2, 1
      ];
    } else if (treeRotateState == 3) {
      rotationTreeIndex = [
        5, 10, 15, 20, 25,
        4, 9, 14, 19, 24,
        3, 8, 13, 18, 23,
        2, 7, 12, 17, 22,
        1, 6, 11, 16, 21
      ];
    }
    for (var i = 0; i < 25; i++) {
      if (rotationTreeHave[rotationTreeIndex[i]-1] == 1) {
        classToAdd = 'buyY';
      } else if ((20 <= i || rotationTreeHave[rotationTreeIndex[i+5]-1] == 1) && rotationTreeCost[rotationTreeIndex[i]-1] <= bp) {
        classToAdd = 'buyM';
      } else {
        classToAdd = 'buyN';
      }
      $('.rTreeBlock:eq(' + i + ')').removeClass('buyY').removeClass('buyM').removeClass('buyN').addClass(classToAdd);
    }
  }

  function bugFix() {
    if (middleMenu != 0) {
      $('#buildMenu').hide();
    }
    if (middleMenu != 1) {
      $('#runeMenu').hide();
    }
    if (buildingNow >= 20) {
      buildingNow = 19;
    }
    if (block < 0) {
      block = 0;
    }
    if (power < 0) {
      power = 0;
    }
    if (powerProgress < 0) {
      powerProgress = 0;
    }
    if (powerTot < 0) {
      powerTot = power;
    }
    if (!isFinite(bToken)) {
      bToken = 0;
      bTokenTotal = 0;
    }
    if (!isFinite(power)) {
      power = 0;
      powerTot = 0;
    }
    if (!isFinite(block)) {
      block = 1e300;
      totalBlock = 1e300;
    }
    if (mystLevels[4] > 40) {
      mystLevels[4] = 40;
    }
  }
  function normalBlock() {
    if (block > beyondReq) {
      block = beyondReq*1.00001;
    }
  }
  function calculateBuild() {
    if (buildings < 20 || runeLevels[6] == 0) {
      baseBuilding = 1e6*3**buildingNow*((buildingNow%20 >= 12) ? 10**(buildingNow-11) : 1 )/runeBuffCalc(7, runeLevels[7]);
    } else {
      baseBuilding = 1e6*3**buildingNow*((buildingNow%20 >= 12) ? 10**(buildingNow-11) : 1 )*3.486e27**(reBuild[buildingNow]+1)/runeBuffCalc(7, runeLevels[7])*(10+Math.max(reBuild[buildingNow]*20+buildingNow-59, 0)*0.05)**Math.max(reBuild[buildingNow]*20+buildingNow-59, 0);
    }
    bupcM = ((upgradeHave[20] == 1) ? 5 : 1)*((upgradeHave[21] == 1) ? 8 : 1)*((upgradeHave[22] == 1) ? 12 : 1)*((upgradeHave[25] == 1) ? 5 : 1)*((upgradeHave[26] == 1) ? 5 : 1)*((upgradeHave[27] == 1) ? 5 : 1)*((upgradeHave[28] == 1) ? 10 : 1)*((upgradeHave[50] == 1) ? 5 : 1)*((upgradeHave[51] == 1) ? 4 : 1)*((upgradeHave[52] == 1) ? 3 : 1)*((upgradeHave[53] == 1) ? 2 : 1)*((upgradeHave[54] == 1) ? 1 : 1)*((upgradeHave[56] == 1) ? 10 : 1)*((upgradeHave[68] == 1) ? 14 : 1)*((upgradeHave[70] == 1) ? 15 : 1)*((upgradeHave[71] == 1) ? 20 : 1)*((upgradeHave[85] == 1) ? 6 : 1)*((upgradeHave[88] == 1) ? 10 : 1)*((bActive[0] == 2) ? bActive[1] : 1)*activeRolledBoost[2];
    bupc = 100e3*2.7**buildingNow*bupcM+block*mystLevels[3]/1e5*((bActive[0] == 2) ? bActive[1] : 1)*activeRolledBoost[2];
    if (buildings < 20 || runeLevels[6] == 0) {
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
          buildingNow++;
          if (buildingNow == 20) {
            buildingNow = 0;
          }
        }
        pointerThisBlock = -1;
      }
      (bupc > block) ? bupc = block : 0;
      (bupc > thisBlockValue) ? bupc = thisBlockValue : 0;
      (buildings == buildingNow) ? 0 : bupc = 0;
    } else {
      for (var i = 0; i < 36; i++) {
        pointerThisBlock = (2*(i%6)+30-i);
        thisBlockValue = baseBuilding*10**(buildingShape[buildingNow][pointerThisBlock]-1);
        if (rebuildProgress[buildingNow][pointerThisBlock] < 1 && buildingShape[buildingNow][pointerThisBlock] != 0) {
          break;
        }
        if (i == 35) {
          reBuild[buildingNow]++;
          for (var i = 0; i < 36; i++) {
            rebuildProgress[buildingNow][i] = 0;
          }
          buildingNow++;
          if (buildingNow == 20) {
            buildingNow = 0;
          }
        }
        pointerThisBlock = -1;
      }
      (bupc > block) ? bupc = block : 0;
      (bupc > thisBlockValue) ? bupc = thisBlockValue : 0;
    }
    totalRebuild = 0;
    for (var i = 0; i < 20; i++) {
      totalRebuild += reBuild[i];
      buildingNow++;
      if (buildingNow == 20) {
        buildingNow = 0;
      }
    }
    reBuildMult = (runeBuffCalc(1, runeLevels[1])**runeBuffCalc(6, runeLevels[6]))**totalRebuild;
    buildingMult = runeBuffCalc(1, runeLevels[1])**buildings*reBuildMult;
  }
  function rollBoost() {
    for (var i = 0; i < 3; i++) {
      boostSelData[i][0] = Math.floor(Math.random()*6);
      boostSelData[i][1] = Math.floor((Math.random()*(boostRange[boostSelData[i][0]][1]-boostRange[boostSelData[i][0]][0]))+boostRange[boostSelData[i][0]][0]**(i+1)*(1/runeBuffCalc(3, runeLevels[3]))*runeBuffCalc(5, runeLevels[5]));
      boostSelData[i][2] = Math.floor((Math.random()*(20*(i+1))+(i+1)*10)*runeBuffCalc(3, runeLevels[3])*runeBuffCalc(5, runeLevels[5]));
      boostSelData[i][3] = Math.floor((Math.random()*2+4)**(i+1)*(runeBuffCalc(5, runeLevels[5])**3))
    }
  }
  function drawAllRuneLine() {
    /*
    $('#runeRotation').css('animation', 'none');
    $('.rune').css('animation', 'none'); */
    $('#runeLine').html(function (index,html) {
      return '';
    });
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
    runeTimeOut = setTimeout( function (){

      /* $('#runeRotation').css('animation', 'runesRotation 60s linear infinite');
      $('.rune').css('animation', 'runeBackgroundRotation linear 60s infinite'); */
    }, 0);
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
    l += extraRuneLevel;
    switch (r) {
      case 0:
        return (!rotationTreeHave[3]) ? Math.floor(((l*(l+1))/2+1)*(1+l*0.13+(1.05**l)/100)) : Math.floor(((l*(l+1))/2+1)*(1+l*0.25+(1.11**l)/100));
        break;
      case 1:
        return (4+0.2*Math.min(l, 80)+0.05*Math.max(l-80, 0)).toFixed(2);
        break;
      case 2:
        return (!rotationTreeHave[24]) ? l*(2+Math.floor(l/Math.max((5-l*0.1), 0.1)))+1 : (l*(2+Math.floor(l/Math.max((5-l*0.1), 0.1)))+1)*(1+l/20).toFixed(0);
        break;
      case 3:
        return 1/((l/10)+1);
        break;
      case 4:
        return -1*2**(-1*l/10)+1;
        break;
      case 5:
        return 1+l/(2/(l/100+1));
        break;
      case 6:
        return 0.05*Math.sqrt(l*8);
        break;
      case 7:
        return (!rotationTreeHave[10]) ? l*(1.02**l+l*(1+l/3))+1 : (l*(1.02**l+l*(1+l/3))+1)*(1.06**l);
        break;
      case 8:
        return (!rotationTreeHave[18]) ? 2**l : 2.2**l+(10+l**2)*l;
        break;
      case 9:
        return Math.min((l**2+l)/2, 10)+Math.max((l-4)*2, 0);
        break;
      default:
        return 1;
    }
  }
  function runeCostCalc(r, l) {
    l += extraRuneLevel;
    switch (r) {
      case 0:
        return Math.floor((1+l/50)**(l/1.2));
        break;
      case 1:
        return (l**2+6*l+5)**(2+l/10)*((l > 80) ? 54.32**(l-80) : 1);
        break;
      case 2:
        return Math.floor((10*(l+1))**(l/3+1));
        break;
      case 3:
        return Math.floor(500*(l**2+(1+l)))**((l/10)+1);
        break;
      case 4:
        return Math.floor(2e3*(l**4+1))**((l/5)+1);
        break;
      case 5:
        return Math.floor(12e3*((8+l/10)**l));
        break;
      case 6:
        return 40e3**(l+1);
        break;
      case 7:
        return 80e3*((1.01+l/100)**l+l)*((l > 15) ? ((l-10)**1.1)**(l-15) : 1);
        break;
      case 8:
        return 200e3*(10**l);
        break;
      case 9:
        return 3e12**(l+1)/50e3**l;
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
      return 'level ' + romanize(runeLevels[runeOn]+extraRuneLevel);
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
      if (runeOn != 9) {
        return '<span class=rune' + markUpThis + 'Markup>x' + notation(runeBuffCalc(runeOn, runeLevels[runeOn]), 3) + ' -> ' + 'x' + notation(runeBuffCalc(runeOn, (runeLevels[runeOn]+1)), 3);
      } else {
        return '<span class=rune' + markUpThis + 'Markup>+' + notation(runeBuffCalc(runeOn, runeLevels[runeOn]), 3) + ' -> ' + '+' + notation(runeBuffCalc(runeOn, (runeLevels[runeOn]+1)), 3);
      }
    });
    $('#selRuneCostNum').html(function (index,html) {
      if (runeOn != 9) {
        return notation(runeCostCalc(runeOn, runeLevels[runeOn]-runeBuffCalc(9, runeLevels[9]))*0.9**mystLevels[4]);
      } else {
        return notation(runeCostCalc(runeOn, runeLevels[runeOn])*0.9**mystLevels[4]);
      }
    });
  }
  function mystUpgradeCost(u, l) {
    switch (u) {
      case 0:
        return 1e45*10**(l*(0.6+l/10));
        break;
      case 1:
        return Math.floor(1e3*((l+1)**(l/7+0.7)))*2;
        break;
      case 2:
        return 200*5**l/(1+2*l);
        break;
      case 3:
        return (l+2)*Math.max(l/2, 1)*3600-3600;
        break;
      case 4:
        return (l < 40) ? 1e3*((l**2+l)/2+1) : 1e309;
        break;
      case 5:
        return l+1;
        break;
      case 6:
        return 20+5*l;
        break;
      case 7:
        return 1e65*(1e5**(l**1.8));
        break;
      case 8:
        return 50*(l+1);
        break;
      case 9:
        return 2e3+(100*(1+l))*l;
        break;
      default:
        return 1e300;
    }
  }
  function rotationTreeImgSet() {
    displayRotaionTree();
    for (var i = 0; i < 25; i++) {
      $('.rTreeBlock:eq(' + i + ')').attr({
        'style' : 'background-image: url(Resource/Beyond/' + rotationTreeType[rotationTreeIndex[i]-1] + '.png);'
      });
    }
  }
  function hoverRotationTreeDisplay(num) {
    indexNum = rotationTreeIndex[num];
    $('#rtNum').html(function (index,html) {
      return (indexNum < 10) ? '0' + indexNum.toString() : indexNum;
    });
    $('#rtName').html(function (index,html) {
      return rotationTreeName[indexNum-1];
    });
    $('#rtAdvencedDesc').html(function (index,html) {
      return rotationTreeDesc[indexNum-1] + '<br>cost: ' + rotationTreeCost[indexNum-1] + ' bp';
    });
  }
  function beyondAuto() {
    if (rotationTreeHave[6]) {
      for (var i = 9; i >= 0; i--) {
        if (power >= ((i != 9) ? runeCostCalc(i, runeLevels[i]-runeBuffCalc(9, runeLevels[9]))*0.9**mystLevels[4] : runeCostCalc(i, runeLevels[i])*0.9**mystLevels[4])) {
          power -= ((i != 9) ? runeCostCalc(i, runeLevels[i]-runeBuffCalc(9, runeLevels[9]))*0.9**mystLevels[4] : runeCostCalc(i, runeLevels[i])*0.9**mystLevels[4]);
          runeLevels[i]++;
          if (i == 9) {
            runeLevelPrestige();
          }
        }
      }
    }
    if (rotationTreeHave[14]) {
      powerBulkM = 2**(mystLevels[0]+mystLevels[1]+mystLevels[2]);
      ppsCap = powerBulkM*Math.pow(2, powerBulkLevel);
      blockUsageM = 1e40*1.5**Math.log(Math.max(ppsCap, 1))*0.9**mystLevels[9];
      thisBulk = Math.min(ppsCap*tickGain, block/blockUsageM);
      if (blockPS < thisBulk*blockUsageM*(1/tickGain)) {
        powerBulkLevel--;
        if (powerBulkLevel <= -50) {
          powerBulkLevel = -50;
        }
      } else {
        powerBulkLevel++;
        powerBulkM = 2**(mystLevels[0]+mystLevels[1]+mystLevels[2]);
        ppsCap = powerBulkM*Math.pow(2, powerBulkLevel);
        blockUsageM = 1e40*1.5**Math.log(Math.max(ppsCap, 1))*0.9**mystLevels[9];
        thisBulk = Math.min(ppsCap*tickGain, block/blockUsageM);
        if (blockPS < thisBulk*blockUsageM*(1/tickGain)) {
          powerBulkLevel--;
        }
      }
      if (powerBulkLevel > 0) {
        powerBulkLevel = 0;
      }
    }
    if (rotationTreeHave[22]) {
      for (var i = 0; i < 10; i++) {
        upgradeResThis = eval(mystRes[i][0]);
        upgradeCostThis = eval(mystUpgradeCost(i, mystLevels[i]));
        if (upgradeResThis >= upgradeCostThis) {
          if (mystRes[i][1] == 1) {
            window[mystRes[i][0]] -= upgradeCostThis;
          }
          mystLevels[i]++;
          displayMystUpgrade();
        }
      }
    }
  }

  function prestigeLevelCheck(num) {
    if (runeLevels[9] >= 1 && num == 1) {
      return true;
    } else {
      return false;
    }
  }
  function makeBlockZero() {
    buildingMult = 1;
    bpcM = 0;
    blockPC = 0;
    blockPS = 0;
    bps = 0;
    block = 0;
  }
  function runeLevelPrestige() {
    runeLevels = [runeBuffCalc(9, runeLevels[9]), runeBuffCalc(9, runeLevels[9]), runeBuffCalc(9, runeLevels[9]), runeBuffCalc(9, runeLevels[9]), runeBuffCalc(9, runeLevels[9]), runeBuffCalc(9, runeLevels[9]), runeBuffCalc(9, runeLevels[9]), runeBuffCalc(9, runeLevels[9]), runeBuffCalc(9, runeLevels[9]), runeLevels[9]];
    if (!rotationTreeHave[13]) {
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
        0, 0, 0, 0, 0, 0, 0, 0, 0, 1
      ];
    }
    bActive = [-1, -1, -1, -1, -1];
    if (!rotationTreeHave[17]) {
      buildings = 0;
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
    }
    buildingNow = 0;
    bCool = 0;
    power = 0;
    pActive = false;
    powerProgress = 0;
    powerBulkLevel = 0;
    rebuildLevel = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ];
    if (!rotationTreeHave[11]) {
      for (var i = 0; i < mystLevels.length; i++) {
        if (mystRes[i][1] != 0) {
          mystLevels[i] = 0;
        }
      }
    }
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
    if (!rotationTreeHave[7]) {
      bToken = 0;
      rollBoost();
    }
    bps = 0;
    bpc = 0;
    pps = 0;
    blockPC = 0;
    block = 0;
    bpcM = 0;
    makeBlockZero();
  }
  function beyondLevelPrestige() {
    runeLevelPrestige();
    runeLevels = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    setTimeout( function () {
      bToken = 0;
    }, 100);
    for (var i = 0; i < mystLevels.length; i++) {
      mystLevels[i] = 0;
    }
  }

  function respecRotationTree() {
    rotationTreeHave = [
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0
    ];
    bp = beyondCount;
    displayRotaionTree();
  }

  function clickBlock(num) {
    num = (Math.random() < mystLevels[6]/10) ? num*2 : num;
    block += blockPC*num;
    totalBlock += blockPC*num;
    clickCount += num;
    if (bTokenCh/100*num > Math.random()) {
      bExtraMult = Math.max(1, bTokenCh/100)*num;
      bToken += bTokenGain*bExtraMult;
      bTokenTotal += bTokenGain*bExtraMult;
    }
    displayBlock();
    bugFix();
  }
  function clickBuild(num) {
    num = (Math.random() < mystLevels[7]/10) ? num*2 : num;
    calculateBuild();
    buEff = ((bActive[0] == 3) ? bActive[1] : 1)*((upgradeHave[67] == 1) ? 6 : 1)*((upgradeHave[69] == 1) ? 4 : 1)*((upgradeHave[87] == 1) ? 2 : 1)*activeRolledBoost[3]*runeBuffCalc(8, runeLevels[8])*((rotationTreeHave[2] == 1) ? 9 :1)*((rotationTreeHave[5] == 1) ? 6 :1)*((rotationTreeHave[16] == 1) ? 4 :1)*((rotationTreeHave[19] == 1) ? 7 :1)*((rotationTreeHave[20] == 1) ? 8 :1)*((rotationTreeHave[23] == 1) ? 5 :1);
    if (buildings < 20 || runeLevels[6] == 0) {
      buildProgress[buildingNow][pointerThisBlock] += bupc*buEff*num;
    } else {
      rebuildProgress[buildingNow][pointerThisBlock] += bupc/thisBlockValue*num;
    }
    if (bupc*num > block) {
      bupc = block/num;
    }
    block -= bupc*num;
    blockUsedInBuilding += bupc*num;
    clickCount += num;
    if (bTokenCh/100*num > Math.random()) {
      bExtraMult = Math.min(1, bTokenCh/100)*num;
      bToken += bTokenGain*bExtraMult;
      bTokenTotal += bTokenGain*bExtraMult;
    }
    displayBuild();
  }

  $(document).on('click','#blockClick',function() {
    clickBlock(1);
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
        cheatPrompt();
        break;
      case 2:
        gameExport();
        break;
      case 3:
        gameImport();
        break;
      case 4:
        resetTimer--;
        $('.optionBlock:eq(4)').html(function (index,html) {
          return resetTimer;
        });
        if (resetTimer == 0) {
          gameReset();
        }
        break;
    }
  });
  $(document).on('click','#buildClick',function() {
    clickBuild(1);
    (Math.random() < mystLevels[6]/10) ? clickBlock(1) : 0;
  });
  $(document).on('click','#buildingNav > span',function() {
    switch ($('#buildingNav > span').index(this)) {
      case 0:
        if (buildingNow != 0) {
          buildingNow--;
        } else {
          buildingNow = buildings;
          if (buildings == 20) {
            buildingNow = 19;
          }
        }
        break;
      case 1:
        if (buildingNow < buildings && buildingNow < 19) {
          buildingNow++;
        } else {
          buildingNow = 0;
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
      bCool = (240-((upgradeHave[39] == 1) ? 20 : 0)-((upgradeHave[44] == 1) ? 30 : 0)-((upgradeHave[47] == 1) ? 30 : 0)-((upgradeHave[59] == 1) ? 30 : 0)-((upgradeHave[65] == 1) ? 20 : 0)-((upgradeHave[73] == 1) ? 15 : 0)-((upgradeHave[76] == 1) ? 10 : 0)-((upgradeHave[65] == 1) ? 20 : 0)-((upgradeHave[83] == 1) ? 20 : 0)-((upgradeHave[86] == 1) ? 10 : 0))*runeBuffCalc(3, runeLevels[3]);
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
        case 2:
          $('#middleContent').css('background-image', 'url(Resource/breakBackground.jpg)');
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
    if (power >= ((runeOn != 9) ? runeCostCalc(runeOn, runeLevels[runeOn]-runeBuffCalc(9, runeLevels[9]))*0.9**mystLevels[4] : runeCostCalc(runeOn, runeLevels[runeOn])*0.9**mystLevels[4])) {
      power -= ((runeOn != 9) ? runeCostCalc(runeOn, runeLevels[runeOn]-runeBuffCalc(9, runeLevels[9]))*0.9**mystLevels[4] : runeCostCalc(runeOn, runeLevels[runeOn])*0.9**mystLevels[4]);
      runeLevels[runeOn]++;
      hoverRuneDisplay();
      drawAllRuneLine();
      if (runeOn == 9) {
        runeLevelPrestige();
      }
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
    } else if (thisIndex == 1 && powerBulkLevel >= -50){
      powerBulkLevel--;
    }
  });
  $(document).on('click','.mystUpgradeContent.upY',function() {
    thisIndex = $(".mystUpgradeContent").index(this);
    upgradeResThis = eval(mystRes[thisIndex][0]);
    upgradeCostThis = eval(mystUpgradeCost(thisIndex, mystLevels[thisIndex]));
    if (upgradeResThis >= upgradeCostThis) {
      if (mystRes[thisIndex][1] == 1) {
        window[mystRes[thisIndex][0]] -= upgradeCostThis;
      }
      mystLevels[thisIndex]++;
      displayMystUpgrade();
    }
  });
  $(document).on('click','#toggleAutoBuild',function() {
    if (toggleAutoBuild == 0) {
      toggleAutoBuild = 1;
    } else {
      toggleAutoBuild = 0;
    }
    displayBuild();
  });
  $(document).on('click','#unlockProgress',function() {
    if (unlockProgressNow >= 1 && unlockReached == 7) {
      unlockReached++;
    }
  });
  $(document).on('click','#beyondButton.beyYes',function() {
    bp++;
    totalBP++;
    beyondCount++;
    beyondLevelPrestige();
    displayBeyond();
    displayRotaionTree();
  });
  $(document).on('click','#rotationL',function() {
    treeRotateState--;
    if (treeRotateState == -1) {
      treeRotateState = 3;
    }
    rotationTreeImgSet();
    respecRotationTree();
  });
  $(document).on('click','#rotationR',function() {
    treeRotateState++;
    if (treeRotateState == 4) {
      treeRotateState = 0;
    }
    rotationTreeImgSet();
    respecRotationTree();
  });
  $(document).on('mouseover','.rTreeBlock',function(e) {
    thisIndex = $(".rTreeBlock").index(this);
    hoverRotationTreeDisplay(thisIndex);
  });
  $(document).on('mouseout','.rTreeBlock',function(e) {
    $('#rtNum').html(function (index,html) {
      return '00';
    });
    $('#rtName').html(function (index,html) {
      return 'hover on tree';
    });
    $('#rtAdvencedDesc').html(function (index,html) {
      return '';
    });
  });
  $(document).on('click','.rTreeBlock.buyM',function(e) {
    thisIndex = $(".rTreeBlock").index(this);
    indexNum = rotationTreeIndex[thisIndex]-1;
    rotationTreeHave[indexNum] = 1;
    bp -= rotationTreeCost[indexNum];
    if (indexNum == 12) {
      bp += 13;
    }
    displayRotaionTree();
  });

  setInterval( function (){
    timeNow = new Date().getTime();
    screenWidthNow = $(window).width();
    screenHeightNow = $(window).height();
    timeSpeed = ((rotationTreeHave[0] == 1) ? 1.7 : 1 )*((rotationTreeHave[1] == 1) ? 1.5 : 1 )*((rotationTreeHave[8] == 1) ? 1.6 :1)*((rotationTreeHave[21] == 1) ? 1.4 :1);
    tickGain = (timeNow-lastTick)/1000*timeSpeed;
    block += blockPS*tickGain;
    totalBlock += blockPS*tickGain;
    clickBlock(tickGain*mystLevels[7]);
    normalBlock();
    if (toggleAutoBuild == 0) {
      clickBuild(tickGain*mystLevels[8]);
    }
    playtime += tickGain/timeSpeed;
    normalBlock();
    displayBlock();
    displayUnlock();
    displayStat();
    displayBoost();
    displyRune();
    displayPower();
    displayProgress();
    bugFix();
    displayMystUpgrade();
    screenWidthBef = screenWidthNow;
    screenHeightBef = screenHeightNow;
    lastTick = timeNow;
  }, 50);
  setInterval( function (){
    displayUpgrade();
    displayBuild();
    gameSave();
    displayBeyond();
    if (resetTimer < 100) {
      resetTimer++;
      $('.optionBlock:eq(4)').html(function (index,html) {
        return resetTimer;
      });
    } else if (resetTimer == 100) {
      $('.optionBlock:eq(4)').html(function (index,html) {
        return 'reset';
      });
    }
  }, 500);
  setInterval( function (){
    beyondAuto();
  }, 200);

  gameLoad();
  displayAll();
  $('#boostSelect > div:nth-child(1) > div:not(:first-child)').hide();
  $('#boostSelect > div:nth-child(1) > div:eq(1)').show();
  $('#middleContentWarp > div').hide();
  $('#middleContentWarp > div:eq(0)').show();
  if (cheatEnabled) {
    $('.optionBlock:eq(1)').show();
  }
});

function gameReset() {
  setInterval( function (){
    block = 0;
  }, 0);
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
function enableCheat() {
  cheatEnabled = 1;
  $('.optionBlock:eq(1)').show();
}


/*
  $('#basicBlock > div:eq(2)').html(function (index,html) {
    reg = /div id="blockClickTxtWarp"/gi;
    strReg = html;
    strReg = String(strReg.replace(reg, 'button id="blockClickTxtWarp" style="background: rgba(0, 0, 0, 0); border: none; text-align: left;"'));
    reg = /\/div/gi;
    return String(strReg.replace(reg, '/button'));
  });  */
