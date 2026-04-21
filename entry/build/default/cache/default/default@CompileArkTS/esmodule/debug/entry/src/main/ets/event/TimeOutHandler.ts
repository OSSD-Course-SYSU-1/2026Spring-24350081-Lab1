import hilog from "@ohos:hilog";
const TAG: string = 'Ads Demo-TimeOutHandler';
// Timeout interval, in milliseconds. You can change the value based on the actual situation.
const TIME_OUT_DELAY: number = 1000;
export class TimeOutHandler {
    isTimeOut: boolean;
    private timeOutIndex: number;
    constructor(handler: () => void) {
        hilog.info(0x0000, TAG, 'Create timeout handler');
        this.isTimeOut = false;
        this.timeOutIndex = setTimeout(() => {
            hilog.info(0x0000, TAG, 'Timeout');
            this.isTimeOut = true;
            handler();
        }, TIME_OUT_DELAY);
    }
    clear(): void {
        clearTimeout(this.timeOutIndex);
    }
}
