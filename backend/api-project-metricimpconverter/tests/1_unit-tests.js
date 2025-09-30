const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('read a whole number input', (done) => {
        const input = '345L'
        const initNum = convertHandler.getNum(input);
        assert.equal(initNum, 345);
        done();
    });
    test('read a decimal number input', (done) => {
        const input = '3.14km'
        const initNum = convertHandler.getNum(input);
        assert.equal(initNum, 3.14);
        done();
    });
    test('Read a fractional input', (done) => {
        const input = '4/2mi'
        const initNum = convertHandler.getNum(input);
        assert.equal(initNum, 4/2);
        done();
    });
    test('Read a fractional input with a decimal', (done) => {
        const input = '8.4/2.2km';
        const initNum = convertHandler.getNum(input);
        assert.equal(initNum, 8.4/2.2);
        done();
    });
    test('Return an error on a double-fraction (i.e. 3/2/3)', (done) => {
        const input = '3/2/3kg'
        const initNum = convertHandler.getNum(input);
        assert.isNotTrue(initNum);
        done();
    });
    test('Default to a numerical input of 1', (done) => {
        const input = 'km'
        const initNum = convertHandler.getNum(input);
        assert.equal(initNum, 1);
        done();
    });
    test('Read each valid input unit', (done) => {
        const units = {
            'Gal': 'gal',
            'MI': 'mi',
            'Lbs': 'lbs',
            'KM': 'km',
            'l': 'L',
            'L': 'L',
            'KG': 'kg'
        };
        for (const [key, value] of Object.entries(units)) {
            assert.equal(convertHandler.getUnit(key), value);
        };
        done();
    });
    test('Return an error for an invalid input unit', (done) => {
        const inputs = ['lsls', 'Gals', 'Lit', 'Miles'];
        for (i of inputs) {
            assert.isNotTrue(convertHandler.getUnit(i));
        };
        done();
    });
    test('Correct return unit for each valid input unit', (done) => {
        const units = {
            'gal': 'L',
            'km': 'mi',
            'lbs': 'kg',
        };
        for (const [key, value] of Object.entries(units)) {
            assert.equal(convertHandler.getReturnUnit(key), value);
            assert.equal(convertHandler.getReturnUnit(value), key);
        };
        done();
    });
    test('Return the spelled-out string unit for each valid input unit', (done) => {
        const spellOut = {
            'L': 'liters',
            'gal': 'gallons',
            'mi': 'miles',
            'km': 'kilometers',
            'lbs': 'pounds',
            'kg': 'kilograms'
        };
        for (const [key, value] of Object.entries(spellOut)) {
            assert.equal(convertHandler.spellOutUnit(key), value);
        };
        done();
    });
    test('Convert gal to L', (done) => {
        const [initNum, initUnit] = [10, 'gal'];
        const result = 37.85410;
        assert.approximately(
            convertHandler.convert(initNum, initUnit),
            result,
            0.0001
        );
        done();
    });
    test('Convert L to gal', (done) => {
        const [initNum, initUnit] = [10, 'L'];
        const result = 2.64172;
        assert.approximately(
            convertHandler.convert(initNum, initUnit),
            result,
            0.0001
        );
        done();
    });
    test('Convert mi to km', (done) => {
        const [initNum, initUnit] = [10, 'mi'];
        const result = 16.09340;
        assert.approximately(
            convertHandler.convert(initNum, initUnit),
            result,
            0.0001
        );
        done();
    });
    test('Convert km to mi', (done) => {
        const [initNum, initUnit] = [10, 'km'];
        const result = 6.21373;
        assert.approximately(
            convertHandler.convert(initNum, initUnit),
            result,
            0.0001
        );
        done();
    });
    test('Convert lbs to kg', (done) => {
        const [initNum, initUnit] = [10, 'lbs'];
        const result = 4.53592;
        assert.approximately(
            convertHandler.convert(initNum, initUnit),
            result,
            0.0001
        );
        done();
    });
    test('Convert kg to lbs', (done) => {
        const [initNum, initUnit] = [10, 'kg'];
        const result = 22.04624;
        assert.approximately(
            convertHandler.convert(initNum, initUnit),
            result,
            0.0001
        );
        done();
    });
});