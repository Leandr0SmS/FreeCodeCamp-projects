function ConvertHandler() {

  const unitsRel = [
    ['gal', 'L'],
    ['lbs', 'kg'],
    ['mi', 'km']
  ]
  
  this.getNum = function(input) {
    let result;
    const regExp = new RegExp(/\d/);
    const num = input.match(regExp);
    result = parseFloat(num);
    if (result) {
      return result;
    } else {
      return 'invalid number';
    }
  };
  
  this.getUnit = function(input) {
    const inputLower = input.toLowerCase();
    const regExp = new RegExp(/\D/, 'g');
    const inputUnit = inputLower.match(regExp)
      .map(e => e === 'l' ? 'L' : e)
      .join('');
    const find = unitsRel.filter(relations => relations.includes(inputUnit));
    if (find.length == 0) {
      return 'invalid unit'
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
    let result;
    switch (unit) {
      case 'L':
        result = 'liters'
        break;
      case 'gal':
        result = 'gallons'
        break;
      case 'km':
        result = 'kilometers'
        break;
      case 'mi':
        result = 'miles'
        break;
      case 'lbs':
        result = 'pounds'
        break;
      case 'kg':
        result = 'kilograms'
        break;
      default:
        break;
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    

    return { 
      initNum: 3.1, 
      initUnit: 'mi', 
      returnNum: 4.98895, 
      returnUnit: 'km', 
      string: '3.1 miles converts to 4.98895 kilometers' 
    }

  };
  
}

//test
const c = new ConvertHandler();


console.log(c.spellOutUnit('L'))

module.exports = ConvertHandler;
