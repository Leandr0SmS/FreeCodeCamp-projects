'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler([
                            ['gal', 'L'],
                            ['lbs', 'kg'],
                            ['mi', 'km']
                          ]);
  const {
    getNum,
    getUnit,
    getReturnUnit,
    convert,
    getString
  } = convertHandler;

  app.route('/api/convert')
  .get((req, res) => {
    const input = req.query.input;
    const initNum = getNum(input);
    const initUnit = getUnit(input);
    const returnUnit = getReturnUnit(initUnit);
    const returnNum = convert(initNum, initUnit);
    const result = getString(initNum, initUnit, returnNum, returnUnit);

    res.json(result);
  })

};
