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
    test('Correct return unit for each valid input unit');
    test('Return the spelled-out string unit for each valid input unit');
    test('Convert gal to L');
    test('Convert L to gal');
    test('Convert mi to km');
    test('Convert km to mi');
    test('Convert lbs to kg');
    test('Convert kg to lbs');
});