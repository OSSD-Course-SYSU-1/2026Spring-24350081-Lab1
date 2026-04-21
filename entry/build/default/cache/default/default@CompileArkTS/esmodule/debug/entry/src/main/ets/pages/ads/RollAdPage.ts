if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import type common from "@ohos:app.ability.common";
import { AdComponent } from "@ohos:advertising.AdComponent";
import type advertising from "@ohos:advertising";
import window from "@ohos:window";
import hilog from "@ohos:hilog";
import { AdStatus } from "@bundle:com.huawei.ads.clientdemo/entry/ets/constant/AdStatus";
import { AdType } from "@bundle:com.huawei.ads.clientdemo/entry/ets/constant/AdType";
import { AdsViewModel } from "@bundle:com.huawei.ads.clientdemo/entry/ets/viewmodel/AdsViewModel";
const TAG: string = 'Ads Demo-RollAdPage';
export class RollAdPage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.countDownText = '';
        this.rollPlayState = 1;
        this.isPlayVideo = false;
        this.ratio = 16 / 9;
        this.playedAdCnt = 0;
        this.countDownTextPlaceholder = '%d | %s';
        this.viewModel = new AdsViewModel(this.getUIContext());
        this.context = this.getUIContext().getHostContext() as common.UIAbilityContext;
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.countDownText = '';
        this.rollPlayState = 1;
        this.isPlayVideo = false;
        this.ratio = 16 / 9;
    }
    @Local
    private countDownText: string;
    @Local
    private rollPlayState: number;
    @Local
    private isPlayVideo: boolean;
    @Local
    private ratio: number;
    // Number of roll ads that have been played.
    private playedAdCnt: number;
    // Used to render the countdown in the upper right corner.
    private countDownTextPlaceholder: string;
    private viewModel: AdsViewModel;
    private context: common.UIAbilityContext;
    aboutToAppear() {
        try {
            const countDownTextDesc = this.context.resourceManager.getStringSync({ "id": 16777220, "type": 10003, params: [], "bundleName": "com.huawei.ads.clientdemo", "moduleName": "entry" }.id);
            this.countDownTextPlaceholder = this.countDownTextPlaceholder.replace('%s', countDownTextDesc);
        }
        catch (e) {
            hilog.error(0x0000, 'testTag', `Failed to get count down text. Code is ${e.code}, message is ${e.message}`);
        }
        const adRequestParams = this.viewModel.getParamsFromNav(AdType.ROLL) as advertising.AdRequestParams;
        // Set the roll ad display duration.
        this.viewModel.adOptions.totalDuration = 30;
        this.viewModel.loadAd(adRequestParams);
    }
    aboutToDisappear(): void {
        // Set screen orientation to the default value. You can change the value based on the actual situation.
        this.setWindowPreferredOrientation(window.Orientation.UNSPECIFIED);
        // Display the three-button navigation bar, status bar and bottom navigation bar. You can change the value based on the actual situation.
        this.setWindowSystemBar(['status', 'navigation']);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Stack.create({ alignContent: Alignment.TopEnd });
                    Stack.width('100%');
                    Stack.height('100%');
                    Stack.aspectRatio(this.ratio);
                }, Stack);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.viewModel.ads.length !== 0 && !this.isPlayVideo) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                __Common__.create();
                                __Common__.width('100%');
                                __Common__.height('100%');
                            }, __Common__);
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new AdComponent(this, {
                                            ads: [...this.viewModel.ads],
                                            rollPlayState: this.rollPlayState,
                                            displayOptions: this.viewModel.adDisplayOptions,
                                            interactionListener: {
                                                onStatusChanged: (status: string, ad: advertising.Advertisement, data: string) => {
                                                    switch (status) {
                                                        case AdStatus.AD_FAIL:
                                                            hilog.info(0x0000, TAG, 'Status is onAdFail');
                                                            this.isPlayVideo = true;
                                                            break;
                                                        case AdStatus.PORTRAIT:
                                                            hilog.info(0x0000, TAG, 'Status is onPortrait');
                                                            // Set the screen to portrait.
                                                            this.setWindowPreferredOrientation(window.Orientation.PORTRAIT);
                                                            // Display the three-button navigation bar, status bar and bottom navigation bar.
                                                            this.setWindowSystemBar(['status', 'navigation']);
                                                            this.ratio = 16 / 9;
                                                            break;
                                                        case AdStatus.LANDSCAPE:
                                                            hilog.info(0x0000, TAG, 'Status is onLandscape');
                                                            // Set the screen to landscape.
                                                            this.setWindowPreferredOrientation(window.Orientation.LANDSCAPE);
                                                            // Hide the three-button navigation bar, status bar and bottom navigation bar.
                                                            this.setWindowSystemBar([]);
                                                            this.ratio = -1;
                                                            break;
                                                        case AdStatus.MEDIA_PROGRESS:
                                                            hilog.info(0x0000, TAG, 'Status is onMediaProgress');
                                                            break;
                                                        case AdStatus.MEDIA_START:
                                                            hilog.info(0x0000, TAG, 'Status is onMediaStart');
                                                            break;
                                                        case AdStatus.MEDIA_PAUSE:
                                                            hilog.info(0x0000, TAG, 'Status is onMediaPause');
                                                            break;
                                                        case AdStatus.MEDIA_STOP:
                                                            hilog.info(0x0000, TAG, 'Status is onMediaStop');
                                                            break;
                                                        case AdStatus.MEDIA_COMPLETE:
                                                            hilog.info(0x0000, TAG, 'Status is onMediaComplete');
                                                            this.playedAdCnt++;
                                                            if (this.playedAdCnt === this.viewModel.ads.length) {
                                                                // After all ads are complete, the main video starts to be played.
                                                                this.isPlayVideo = true;
                                                            }
                                                            break;
                                                        case AdStatus.MEDIA_ERROR:
                                                            hilog.error(0x0000, TAG, 'Status is onMediaError');
                                                            break;
                                                        case AdStatus.MEDIA_COUNTDOWN:
                                                            hilog.info(0x0000, TAG, 'Status is onMediaCountdown');
                                                            const parseData: Record<string, Object> = this.safeParseData(data);
                                                            this.countDownText = this.countDownTextPlaceholder.replace('%d', String(parseData.countdownTime));
                                                            break;
                                                        case AdStatus.BACK_CLICKED:
                                                            hilog.info(0x0000, TAG, 'Status is onBackClicked');
                                                            this.viewModel.navPathStack.pop();
                                                            break;
                                                    }
                                                }
                                            }
                                        }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ads/RollAdPage.ets", line: 64, col: 11 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                ads: [...this.viewModel.ads],
                                                rollPlayState: this.rollPlayState,
                                                displayOptions: this.viewModel.adDisplayOptions,
                                                interactionListener: {
                                                    onStatusChanged: (status: string, ad: advertising.Advertisement, data: string) => {
                                                        switch (status) {
                                                            case AdStatus.AD_FAIL:
                                                                hilog.info(0x0000, TAG, 'Status is onAdFail');
                                                                this.isPlayVideo = true;
                                                                break;
                                                            case AdStatus.PORTRAIT:
                                                                hilog.info(0x0000, TAG, 'Status is onPortrait');
                                                                // Set the screen to portrait.
                                                                this.setWindowPreferredOrientation(window.Orientation.PORTRAIT);
                                                                // Display the three-button navigation bar, status bar and bottom navigation bar.
                                                                this.setWindowSystemBar(['status', 'navigation']);
                                                                this.ratio = 16 / 9;
                                                                break;
                                                            case AdStatus.LANDSCAPE:
                                                                hilog.info(0x0000, TAG, 'Status is onLandscape');
                                                                // Set the screen to landscape.
                                                                this.setWindowPreferredOrientation(window.Orientation.LANDSCAPE);
                                                                // Hide the three-button navigation bar, status bar and bottom navigation bar.
                                                                this.setWindowSystemBar([]);
                                                                this.ratio = -1;
                                                                break;
                                                            case AdStatus.MEDIA_PROGRESS:
                                                                hilog.info(0x0000, TAG, 'Status is onMediaProgress');
                                                                break;
                                                            case AdStatus.MEDIA_START:
                                                                hilog.info(0x0000, TAG, 'Status is onMediaStart');
                                                                break;
                                                            case AdStatus.MEDIA_PAUSE:
                                                                hilog.info(0x0000, TAG, 'Status is onMediaPause');
                                                                break;
                                                            case AdStatus.MEDIA_STOP:
                                                                hilog.info(0x0000, TAG, 'Status is onMediaStop');
                                                                break;
                                                            case AdStatus.MEDIA_COMPLETE:
                                                                hilog.info(0x0000, TAG, 'Status is onMediaComplete');
                                                                this.playedAdCnt++;
                                                                if (this.playedAdCnt === this.viewModel.ads.length) {
                                                                    // After all ads are complete, the main video starts to be played.
                                                                    this.isPlayVideo = true;
                                                                }
                                                                break;
                                                            case AdStatus.MEDIA_ERROR:
                                                                hilog.error(0x0000, TAG, 'Status is onMediaError');
                                                                break;
                                                            case AdStatus.MEDIA_COUNTDOWN:
                                                                hilog.info(0x0000, TAG, 'Status is onMediaCountdown');
                                                                const parseData: Record<string, Object> = this.safeParseData(data);
                                                                this.countDownText = this.countDownTextPlaceholder.replace('%d', String(parseData.countdownTime));
                                                                break;
                                                            case AdStatus.BACK_CLICKED:
                                                                hilog.info(0x0000, TAG, 'Status is onBackClicked');
                                                                this.viewModel.navPathStack.pop();
                                                                break;
                                                        }
                                                    }
                                                }
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            rollPlayState: this.rollPlayState
                                        });
                                    }
                                }, { name: "AdComponent" });
                            }
                            __Common__.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(this.countDownText);
                                Text.fontSize(12);
                                Text.lineHeight(12);
                                Text.maxLines(1);
                                Text.textAlign(TextAlign.Center);
                                Text.fontColor({ "id": 125830987, "type": 10001, params: [], "bundleName": "com.huawei.ads.clientdemo", "moduleName": "entry" });
                                Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                                Text.backgroundColor({ "id": 16777237, "type": 10001, params: [], "bundleName": "com.huawei.ads.clientdemo", "moduleName": "entry" });
                                Text.border({ radius: 25 });
                                Text.padding(8);
                                Text.margin(16);
                                Text.height(24);
                                Text.onClick(() => {
                                    hilog.info(0x0000, TAG, 'OnVipClicked, do something...');
                                    this.isPlayVideo = true;
                                });
                                Text.visibility(this.countDownText ? Visibility.Visible : Visibility.None);
                            }, Text);
                            Text.pop();
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Video.create({
                        src: { "id": 0, "type": 30000, params: ['videoTest.mp4'], "bundleName": "com.huawei.ads.clientdemo", "moduleName": "entry" },
                        previewUri: { "id": 16777243, "type": 20000, params: [], "bundleName": "com.huawei.ads.clientdemo", "moduleName": "entry" },
                        controller: new VideoController()
                    });
                    Video.visibility(this.isPlayVideo ? Visibility.Visible : Visibility.None);
                    Video.autoPlay(this.isPlayVideo);
                    Video.controls(false);
                    Video.width('100%');
                    Video.height('100%');
                }, Video);
                Stack.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/ads/RollAdPage" });
            NavDestination.hideTitleBar(true);
        }, NavDestination);
        NavDestination.pop();
    }
    private async setWindowPreferredOrientation(orientation: Orientation): Promise<void> {
        try {
            const win: window.Window = await window.getLastWindow(this.context);
            await win.setPreferredOrientation(orientation);
        }
        catch (e) {
            hilog.error(0x0000, 'testTag', `Failed to set preferred orientation. Code is ${e.code}, message is ${e.message}`);
        }
    }
    private async setWindowSystemBar(names: Array<'status' | 'navigation'>): Promise<void> {
        try {
            const win: window.Window = await window.getLastWindow(this.context);
            await win.setWindowSystemBarEnable(names);
        }
        catch (e) {
            hilog.error(0x0000, 'testTag', `Failed to set window system bar. Code is ${e.code}, message is ${e.message}`);
        }
    }
    private safeParseData(data: string): Record<string, Object> {
        try {
            if (typeof data === 'string') {
                return JSON.parse(data);
            }
            return JSON.parse(JSON.stringify(data));
        }
        catch (e) {
            hilog.error(0x0000, 'testTag', `Failed to parse data. Code is ${e.code}, message is ${e.message}`);
        }
        return {};
    }
    rerender() {
        this.updateDirtyElements();
    }
}
