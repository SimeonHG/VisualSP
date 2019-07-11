class Timer {

    static addDate(newDate) {
        Timer.date.push(new Date(newDate).getTime());
    }

    static init() { 
        document.getElementById("timer").innerHTML = hours + "h "
        + minutes + "m " + seconds + "s ";
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

    //to do: call calculateTime on every step of animation
    static calculateTime() {
        let distance;

        let prevTime;
        let nextTime;

        for(let i = 0; i < Timer.date.length; i++) {
            
            nextTime = Timer.date[i];
            
            if(i == 0) {
                prevTime = nextTime;
            } else {
                prevTime = Timer.date[i - 1];
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
                    console.log("evi si maikkata")
                    date = Timer.date[0];
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

                if (date < Timer.date[Timer.date.length - 1] && date > Timer.date[0]) {
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
Timer.deltas = [];