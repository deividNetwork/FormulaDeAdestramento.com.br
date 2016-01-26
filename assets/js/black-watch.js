/* CLASS BLACKWATCH */
function BlackWatch(selector, options) {
    'use-strict';

    this.init(selector, options);
}

/* METHOD INITIAL */
BlackWatch.prototype.init = function (selector, options) {
    this.parentElement = $(String(selector));

    if (typeof this.parentElement === 'object') {
        this.setOptions(options);

        this.createPointers();

        this.countDown(this.diffBetweenDate());
    }
};

/* CHANGE THE CLOCK ELEMENT */
BlackWatch.prototype.changeClock = function (h, m, s) {
    var yours = this.parentElement.find('.yours');
    var minutes = this.parentElement.find('.minutes');
    var seconds = this.parentElement.find('.seconds');

    if (this.separator) {
        yours.after(this.getSeparator());
        minutes.after(this.getSeparator());
    }

    if (this.haveNames) {
        yours.html(this.dateFormat(h) + '<span>Horas</span>');
        minutes.html(this.dateFormat(m) + '<span>Minutos</span>');
        seconds.html(this.dateFormat(s) + '<span>Segundos</span>');
    }
    else {
        yours.text(this.dateFormat(h));
        minutes.text(this.dateFormat(m));
        seconds.text(this.dateFormat(s));
    }
};

/* COUNTDOWN TIMER */
BlackWatch.prototype.countDown = function (sec) {
    var self = this;
    var secondsADay = sec;

    var loop = setInterval(function () {
        secondsADay--;

        if (secondsADay >= 0) {
            var years = Math.floor(secondsADay / (1 * 60 * 60 * 24 * 365));
            var days = Math.floor(secondsADay / (1 * 60 * 60 * 24));
            var hours = Math.floor(secondsADay / (1 * 60 * 60));
            var minutes = Math.floor(secondsADay / (1 * 60));
            var seconds = Math.floor(secondsADay / (1));

            if (days > 365) {
                days = days % 365;
            }

            if (hours > 24) {
                hours = hours % 24;
            }

            if (minutes > 60) {
                minutes = minutes % 60;
            }

            if (seconds > 60) {
                seconds = seconds % 60;
            }

            self.changeClock(hours, minutes, seconds);

            //console.log(secondsADay + "s have: " + years + " years, " + days + " days, " + hours + " hours, " + minutes + " minutes and " + seconds + " seconds.");
        }
        else {
            clearInterval(loop);
        }
    }, 1000);
};

/* SET PLUGIN OPTIONS */
BlackWatch.prototype.setOptions = function (options) {
    if (typeof options === 'object') {
        /* VALUES 'OPTIONS' IF FOUND */
        this.separator = options.separator !== undefined ? options.separator : true;
        this.haveNames = options.haveNames !== undefined ? options.haveNames : true;
    }
    else {
        /* DEFAULT VALUES IF 'OPTIONS' NO FOUND */
        this.separator = true;
        this.haveNames = true;
    }
};

/* DIFFERENCE BETWEEN DATES IN SECONDS */
BlackWatch.prototype.diffBetweenDate = function () {
    var date = new Date();
    var today = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' 24:00:00';
    var now = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    var diff = (Date.parse(today) - Date.parse(now)) / 1000;

    return diff;
};

/* CREATE POINTERS ELEMENTS */
BlackWatch.prototype.createPointers = function () {
    var yours = $('<span>', {class: 'yours', text: '--'});
    var minutes = $('<span>', {class: 'minutes', text: '--'});
    var seconds = $('<span>', {class: 'seconds', text: '--'});

    this.parentElement.append(yours);
    this.parentElement.append(minutes);
    this.parentElement.append(seconds);
};

/* RETURN TWO POINT WHICH LIES BETWEEN THE POINTERS */
BlackWatch.prototype.getSeparator = function () {
    return $('<span>', {class: 'separator', text: ':'});
};

BlackWatch.prototype.dateFormat = function (n) {
    var number = parseInt(n);

    if (number >= 0 && number <= 9) {
        number = '0' + number;
    }

    return number;
};