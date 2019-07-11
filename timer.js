class Timer {

    static addDate(newDate) {
        Timer.date.push(newDate.getTime());
    }

    static init() { 
        let time = Timer.parseTime(Math.min(...Timer.date));
        document.getElementById("timer").innerHTML = time.hours + "h "
        + time.minutes + "m " + time.seconds + "s ";
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

    static calculateDeltas(pickerDate) {
        let distance;

        let prevTime;
        let nextTime;

        for(let i = 0; i < Timer.date.length; i++) {
            
            nextTime = pickerDate[i];
            
            if(i == 0) {
                prevTime = nextTime;
            } else {
                prevTime = pickerDate[i - 1];
            }
            distance = Timer.calculateDistance(prevTime, nextTime);

            Timer.deltas.push(distance);
        }
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
                    date -= 1;
                } else {
                    date += 1;
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

            }, 1 / abs(Settings.timescale));
        }
    }
}

Timer.currentTime = 0;
Timer.running = false;
Timer.index = 0;
Timer.date = [];
Timer.deltas = [];
