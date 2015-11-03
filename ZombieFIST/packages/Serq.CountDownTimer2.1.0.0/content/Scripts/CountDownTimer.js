
function CountDownTimer(tick, finish, countDownFrom) {
    this._tick = tick;
    this._finish = finish;
    this._countDownFrom = countDownFrom;
    this.Interval = null;
    this.timerStarted = false;
    this.Start = function (callBack) {
        if (!this.timerStarted) {
            if (callBack != null)
            {
                callBack();
            }
            this.timerStarted = true;
            var currentNumber = this._countDownFrom;
            var $this = this;
            this.Interval = setInterval(function () {
                if (currentNumber > -1) {
                    if ($this._tick != null) {
                        $this._tick(currentNumber);
                    }
                    currentNumber--;
                }
                else {
                    $this.Stop();
                    if ($this._finish != null) {
                        $this._finish();
                    }
                }

            }, 1000);

        }
    };

    this.Stop = function () {
        this.timerStarted = false;
        if (this.Interval != null) {
            clearInterval(this.Interval);
        }
    };
}