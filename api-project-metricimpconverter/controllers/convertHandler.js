function ConvertHandler() {

  const unitsRel = [
    ['gal', 'L'],
    ['lbs', 'kg'],
    ['mi', 'km']
  ]
  
  this.getNum = function(input) {
    let number;
    const trimmedinput = input.replace(/\s/g, "");
    const regExp = new RegExp(/(\d*\.?\d*)(\/?)(\d+\.?\d*)(\/?)/);
    const numMatch = trimmedinput.match(regExp);

    if (!numMatch || /\/$/.test(numMatch[0])) {
      console.log('invalid number')
    } else {
      const splitNum = numMatch[0].split('/');
      if (splitNum.length > 1) {
        number = parseFloat(splitNum[0] / splitNum[1]);
        console.log(number)
        return number
      } else {
        number = parseFloat(splitNum.join());
        console.log(number)
        return number
      }
    };
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
