function inat(arr, index) {
    if (index < 0) {
        index = arr.length + index;
    }
    return arr[index];
}

function roundTo(x, decimals) {
    const factor = Math.pow(10, decimals);
    return Math.round(x * factor) / factor;
}

function convertTime(secs, unitFlags) {
    let result = [0, 0, 0, 0, 0]
    let carry = secs
    let carryTrunc = 0
    let carryDecim = 0

    if (unitFlags.indexOf(true) == 4) {
        result[4] = carry * 1000;
    }
    else {
        carry = carry;
        if (unitFlags[4] == true) {
            carryTrunc = Math.trunc(carry);
            carryDecim = carry - carryTrunc;
            result[4] = roundTo(carryDecim * 1000, 6);
            carry = carryTrunc;
        }
    }

    if (unitFlags.indexOf(true) == 3) {
        result[3] = carry;
    }
    else {
        carry = carry / 60;
        if (unitFlags[3] == true) {
            carryTrunc = Math.trunc(carry);
            carryDecim = carry - carryTrunc;
            result[3] = roundTo(carryDecim * 60, 6);
            carry = carryTrunc;
        }
    }

    if (unitFlags.indexOf(true) == 2) {
        result[2] = carry;
    }
    else {
        carry = carry / 60;
        if (unitFlags[2] == true) {
            carryTrunc = Math.trunc(carry);
            carryDecim = carry - carryTrunc;
            result[2] = roundTo(carryDecim * 60, 6);
            carry = carryTrunc;
        }
    }

    if (unitFlags.indexOf(true) == 1) {
        result[1] = carry;
    }
    else {
        carry = carry / 24;
        if (unitFlags[1] == true) {
            carryTrunc = Math.trunc(carry);
            carryDecim = carry - carryTrunc;
            result[1] = roundTo(carryDecim * 24, 6);
            carry = carryTrunc;
        }
    }

    if (unitFlags.indexOf(true) == 0) {
        result[0] = carry;
    }

    return result;
}

function convertToTimeString(timeArr) {
    let timeStrArr = [];
    let timeUnits = ['Days', 'Hours', 'Minutes', 'Seconds', 'Milliseconds'];

    for (let i = 0; i < 5; i++) {
        if (timeArr[i]) {
            timeStrArr.push(`${timeArr[i]} ${timeUnits[i]}`);
        }
    }

    return timeStrArr.join(' + ');
}

console.log();


$(document).ready(function () {
    let convOpt1 = $('#conv-opt-1');
    let convOpt2 = $('#conv-opt-2');
    let convOpt3 = $('#conv-opt-3');
    let convOpt4 = $('#conv-opt-4');
    let convOpt5 = $('#conv-opt-5');

    let seconds = $('#seconds');
    let btnConvert = $('#btn-convert');
    let inputValue = $('#input-value');
    let result = $('#result');

    let units = [convOpt1, convOpt2, convOpt3, convOpt4, convOpt5];
    let unitBools = units.map(unit => !!unit.prop('checked'));

    units.forEach(unit => unit.on('change', () => {
        unitBools = units.map(unit => !!unit.prop('checked'));
    }));

    btnConvert.prop('disabled', seconds.val() === '');
    seconds.on('input', () => {
        btnConvert.prop('disabled', seconds.val() === '');
    });

    btnConvert.on('click', () => {
        try {
            let resultStr = convertToTimeString(convertTime(parseFloat(seconds.val()), unitBools));
            inputValue.text(`${seconds.val()} seconds means`);
            result.text(resultStr);
        }
        catch (error){
            console.log(error);
        }
    });

});