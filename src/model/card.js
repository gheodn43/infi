class Card {
    constructor(
        card_id,
        deck_id,
        front,
        back,
        difficulty = 0, // 1 to 5
        delay_value = null,
        step = 0,
        avg_comp_time = [0, 0], // tổng thời gian học thẻ này, số lần đã học
        status = 'NEW_CARD', //LEARNING_CARD, REVIEW_CARD, COOLING_CARD
        again = '1m',
        hard = '5m',
        good = '10m',
        easy = '1d',
        overdue_at = null,
        created_at = this.getCurrentTimestamp()
    ) {
        this.card_id = card_id;
        this.deck_id = deck_id;
        this.front = front;
        this.back = back;
        this.difficulty = difficulty;
        this.delay_value = delay_value;
        this.step = step;
        this.avg_comp_time = avg_comp_time;
        this.status = status;
        this.again = again;
        this.hard = hard;
        this.good = good;
        this.easy = easy;
        this.overdue_at = overdue_at;
        this.created_at = created_at;
    }

    getCurrentTimestamp() {
        return new Date().toISOString();
    }

    SetEstOverDue(delay) {
        const now = new Date();
        const timeValue = parseInt(delay.slice(0, -1));
        const timeUnit = delay.slice(-1);
        switch (timeUnit) {
            case 'm':
                now.setMinutes(now.getMinutes() + timeValue);
                break;
            case 'h':
                now.setHours(now.getHours() + timeValue);
                break;
            case 'd':
                now.setDate(now.getDate() + timeValue);
                break;
            case 'w':
                now.setDate(now.getDate() + timeValue * 7);
                break;
            case 'M':
                now.setMonth(now.getMonth() + timeValue);
                break;
            case 'y':
                now.setFullYear(now.getFullYear() + timeValue);
                break;
            default:
                throw new Error('Invalid time unit');
        }
        this.overdue_at = now.toISOString();
        this.status = 'COOLING_CARD'

    }
    changeST1() {
        this.again = '5m';
        this.hard = '10m';
        this.good = '1d';
        this.easy = '3d';
    }
    update_avg_comp_time(timeInSeconds) {
        const timeToAdd = Math.min(timeInSeconds, 15.00);
        this.avg_comp_time[0] += timeToAdd;
        this.avg_comp_time[1] += 1;
    }
    updateDifficulty(newDifficulty) {
        this.difficulty = newDifficulty;
    }
    calculateDifficulty(timeInSeconds) {
        const [totalTimeBefore, attemptsBefore] = this.avg_comp_time;
        let avgTimeBefore = attemptsBefore === 0 ? 0 : totalTimeBefore / attemptsBefore;

        this.update_avg_comp_time(timeInSeconds);

        const [totalTimeAfter, attemptsAfter] = this.avg_comp_time;
        const avgTimeAfter = totalTimeAfter / attemptsAfter;

        let timeChange = avgTimeBefore - avgTimeAfter;

        timeChange = Math.round(timeChange);
        timeChange = Math.max(Math.min(timeChange, 15), -15);

        const difficultyChange = Math.round(timeChange / 3);

        let difficulty = this.difficulty - difficultyChange;
        difficulty = Math.max(1, Math.min(5, difficulty));
        return difficulty;
    }

    estNextDelay(current_delay, jumping_value) {
        const timeValue = parseInt(current_delay.slice(0, -1));
        const timeUnit = current_delay.slice(-1);
        const newTimeValue = timeValue + Math.round((timeValue * jumping_value) / this.difficulty);
        return newTimeValue + timeUnit
    }

    a(type) {
        const JUMPING_GOOD = 2;
        const JUMPING_EASY = 3;
        switch (type) {
            case 'again':
                if (this.step === 2) {
                    this.again = '5m';
                    this.hard = '10m';
                    this.good = '1d';
                    this.easy = '3d';
                    this.status = 'LEARNING_CARD'
                    this.step -= 1;
                    break;
                }
                break;
            case 'hard':
                if (this.step === 2) {
                    this.SetEstOverDue(this.hard)
                    break;
                }
                break;
            case 'good':
                if (this.step === 1) {
                    this.SetEstOverDue(this.good)
                    this.again = '10m'
                    this.hard = this.estNextDelay('1d', JUMPING_GOOD)
                    this.good = this.estNextDelay('3d', JUMPING_GOOD)
                    this.easy = this.estNextDelay('5d', JUMPING_GOOD)
                    this.step += 1;
                    break;
                }
                this.SetEstOverDue(this.good)
                this.hard = this.estNextDelay(this.hard, JUMPING_GOOD)
                this.good = this.estNextDelay(this.good, JUMPING_GOOD)
                this.easy = this.estNextDelay(this.easy, JUMPING_GOOD)
                break;
            case 'easy':
                this.SetEstOverDue(this.easy);
                if (this.step === 0){
                    this.changeST1(); 
                    this.step += 1;
                    break;
                }
                if (this.step === 1) {
                    this.again = '10m'
                    this.hard = this.estNextDelay('1d', JUMPING_EASY)
                    this.good = this.estNextDelay('3d', JUMPING_EASY)
                    this.easy = this.estNextDelay('5d', JUMPING_EASY)
                    this.step += 1;
                    break;
                }
                this.hard = this.estNextDelay(this.hard, JUMPING_EASY)
                this.good = this.estNextDelay(this.good, JUMPING_EASY)
                this.easy = this.estNextDelay(this.easy, JUMPING_EASY)
                break;
            default:
                throw new Error('Invalid type');
        }

    }


    getInfo() {
        return {
            card_id: this.card_id,
            deck_id: this.deck_id,
            front: this.front,
            back: this.back,
            difficulty: this.difficulty,
            delay_value: this.delay_value,
            step: this.step,
            avg_comp_time: this.avg_comp_time,
            status: this.status,
            again: this.again,
            hard: this.hard,
            good: this.good,
            easy: this.easy,
            overdue_at: this.overdue_at,
            created_at: this.created_at
        };
    }

}

export default Card;
