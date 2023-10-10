function ConvertHandler() {

  const unitsRel = [
    ['gal', 'L'],
    ['lbs', 'kg'],
    ['mi', 'km']
  ]
  
  this.getNum = function(input) {

    const removedSpace = input.replace(/\s/, '');
    const wordsRegExp = new RegExp(/[a-z]*/, 'gi');
    const removedWords = removedSpace.replace(wordsRegExp, '');
    const slashArray = removedWords.split('/');
    if (slashArray.length > 2) {
      return 0
    } else {
      const numRegExp = new RegExp(/^[+-]?(\d*\.)?\d+$/);
      const checkNum = slashArray.every(n => numRegExp.test(n))
      console.log(checkNum)
      if (checkNum) {
        if (slashArray.length == 1) {
          console.log(parseFloat(slashArray))
          return parseFloat(slashArray);
        } else {
          console.log(parseFloat(slashArray[0]) / parseFloat(slashArray[1]))
          return parseFloat(slashArray[0]) / parseFloat(slashArray[1])
        }
      } else {
        return 0
      }
    }
  };
  
  this.getUnit = function(input) {
    const inputLower = input.toLowerCase();
    const regExp = new RegExp(/[^\d.\s]+/, 'g');
    const inputUnit = inputLower.match(regExp)
      .map(e => e === 'l' ? 'L' : e)
      .join('');
    const find = unitsRel.filter(relations => relations.includes(inputUnit));
    if (find.length == 0) {
      return false;
    } else {
      return inputUnit;
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    const find = unitsRel.filter(relations => relations.includes(initUnit));
    if (find.length == 0) {
      return 'Erro to find unit'
    } else {
      const result = find
        .flat()
        .filter(u => u !== initUnit)
        .join('');
      return result
    }
  };

  this.spellOutUnit = function(unit) {
    switch (unit) {
      case 'L':
        return 'liters'
      case 'gal':
        return 'gallons'
      case 'km':
        return 'kilometers'
      case 'mi':
        return 'miles'
      case 'lbs':
        return 'pounds'
      case 'kg':
        return 'kilograms'
      default:
      return 'Unit Not found to spell'
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result;
    switch (initUnit) {
      case 'L':
        result = initNum / galToL;
        break;
      case 'gal':
        result = initNum * galToL;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      default:
        return 'Unit not found to convert'
    }
    return Number(result.toFixed(5));
  };
  
  this.getString = (initNum, initUnit, returnNum, returnUnit) => {
    
    result = {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    };
    return result;

  };
  
}

module.exports = ConvertHandler;
