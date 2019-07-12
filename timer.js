class Timer {

    static addDate(newDate) {
        Timer.date.push(new Date(newDate).getTime());
    }

    static init() {
        let time = Timer.parseTime(Math.min(...Timer.date));
        if (time.hours) {
            document.getElementById("timer").innerHTML = time.hours + "h "
            + time.minutes + "m " + time.seconds + "s ";
        } else {
            document.getElementById("timer").innerHTML = 0 + "h "
            + 0 + "m " + 0 + "s ";
        }
    }

    static calculateDistance(prevTime, nextTime) {
        return nextTime - prevTime;
    }

    static parseTime(distance) {
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        let parsedTime = {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        }

        return parsedTime;
    }

    static getDeltas(pickLog) {
        let distance;

        let prevTime;
        let nextTime;

        let deltas = [];
        let times = pickLog.map(log => new Date(log["completed"]).getTime());
        for (let i = 0; i < times.length-1; i++) {
            distance = Timer.calculateDistance(times[i], times[i+1]);
            deltas.push(distance);
        }
        return deltas;
    }

    static updateTimer() {
        if(Settings.timescale == 0) {
            Timer.running = false;
        } else {
            setTimeout(() => {
                let date;
                if (Timer.currentTime == 0) {
                    date = Math.min(...Timer.date);
                } else {
                    date = Timer.currentTime;
                }

                if (Settings.timescale < 0) {
                    date -= 1000;
                } else {
                    date += 1000;
                }
                let time = Timer.parseTime(date);
                document.getElementById("timer").innerHTML = time.hours + "h "
                + time.minutes + "m " + time.seconds + "s ";

                if (date < Math.max(...Timer.date) && date > Math.min(...Timer.date)) {
                    Timer.currentTime = date;
                    this.updateTimer();
                } else {
                    Timer.running = false;
                }

            }, 1000 / abs(Settings.timescale));
        }
    }
}

Timer.currentTime = 0;
Timer.running = false;
Timer.index = 0;
Timer.date = [];
