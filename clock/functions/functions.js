const counter = (min, sec) => {
    let minLeft = min;
    let secLeft = sec;
    if (minLeft < 0 ||  secLeft < 0) {
        return console.log("Error - negative time")
    }
    if (minLeft <= 60 && secLeft < 60) {
        if (secLeft > 0) {
            return [minLeft, (secLeft - 1)];
        } else if (minLeft > 0 && secLeft == 0) {
            return [(minLeft - 1), 59];
        } else if (minLeft == 0 && secLeft == 0) {
            return [-1, -1];
        }
    } else {
        return console.log("Error - invalid time to count")
    }
};

export { counter }
