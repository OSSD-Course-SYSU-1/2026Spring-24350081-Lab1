import type common from "@ohos:app.ability.common";
import advertising from "@ohos:advertising";
import { AppStorageV2 } from "@ohos:arkui.StateManagement";
import hilog from "@ohos:hilog";
import { AdType } from "@bundle:com.huawei.ads.clientdemo/entry/ets/constant/AdType";
import { InterstitialAdStatusHandler } from "@bundle:com.huawei.ads.clientdemo/entry/ets/event/InterstitialAdStatusHandler";
import { RewardAdStatusHandler } from "@bundle:com.huawei.ads.clientdemo/entry/ets/event/RewardAdStatusHandler";
import { TimeOutHandler } from "@bundle:com.huawei.ads.clientdemo/entry/ets/event/TimeOutHandler";
const TAG: string = 'Ads Demo-AdsViewModel';
@ObservedV2
export class AdsViewModel {
    @Trace
    ads: advertising.Advertisement[] = [];
    // Ad configuration.
    adOptions: advertising.AdOptions = {};
    // Ad display parameters.
    adDisplayOptions: advertising.AdDisplayOptions = {
        // Whether to mute the ad.
        mute: true,
        // Interval for displaying an ad in carousel mode, in ms.
        refreshTime: 30000
    };
    navPathStack: NavPathStack;
    private context: common.UIAbilityContext;
    constructor(uiContext: UIContext) {
        this.context = uiContext.getHostContext() as common.UIAbilityContext;
        this.navPathStack = AppStorageV2.connect(NavPathStack)!;
    }
    getParamsFromNav(adType: AdType): advertising.AdRequestParams {
        return this.navPathStack.getParamByName(AdType[adType])[0] as advertising.AdRequestParams;
    }
    async loadAd(adRequestParams: advertising.AdRequestParams): Promise<void> {
        const adType = adRequestParams.adType;
        let timeOutHandler: TimeOutHandler;
        if (adType === AdType.SPLASH) {
            timeOutHandler = new TimeOutHandler(() => this.routeToHome());
        }
        // Ad request callback listener.
        const adLoadListener: advertising.AdLoadListener = {
            onAdLoadFailure: (errorCode: number, errorMsg: string) => {
                hilog.error(0x0000, TAG, `Failed to load ad. Code is ${errorCode}, message is ${errorMsg}`);
            },
            onAdLoadSuccess: (ads: Array<advertising.Advertisement>) => {
                hilog.info(0x0000, TAG, 'Succeeded in loading ad');
                if (adType === AdType.SPLASH) {
                    timeOutHandler?.clear();
                    if (timeOutHandler?.isTimeOut) {
                        return;
                    }
                }
                if (adType === AdType.REWARD) {
                    // Register a status listener for rewarded ads to monitor their playback status.
                    new RewardAdStatusHandler().registerPPSReceiver();
                    try {
                        // Call the API for displaying ads.
                        advertising.showAd(ads[0], this.adDisplayOptions, this.context);
                    }
                    catch (e) {
                        hilog.error(0x0000, 'testTag', `Failed to show ad. Code is ${e.code}, message is ${e.message}`);
                    }
                    return;
                }
                if (adType === AdType.INTERSTITIAL) {
                    // Register a status listener for interstitial ads to monitor their playback status.
                    new InterstitialAdStatusHandler().registerPPSReceiver();
                    try {
                        // Call the API for displaying ads.
                        advertising.showAd(ads[0], this.adDisplayOptions, this.context);
                    }
                    catch (e) {
                        hilog.error(0x0000, 'testTag', `Failed to show ad. Code is ${e.code}, message is ${e.message}`);
                    }
                    return;
                }
                this.ads = ads;
            }
        };
        // Create an AdLoader ad object.
        const adLoader: advertising.AdLoader = new advertising.AdLoader(this.context);
        try {
            // Call the API for requesting ads.
            adLoader.loadAd(adRequestParams, this.adOptions, adLoadListener);
        }
        catch (e) {
            hilog.error(0x0000, 'testTag', `Failed to load ad. Code is ${e.code}, message is ${e.message}`);
        }
    }
    async loadAdWithMultiSlots(adRequestParamsArray: advertising.AdRequestParams[]): Promise<void> {
        // Ad request callback listener.
        const multiSlotsAdLoaderListener: advertising.MultiSlotsAdLoadListener = {
            onAdLoadFailure: (errorCode: number, errorMsg: string) => {
                hilog.error(0x0000, TAG, `Failed to load multiSlots ad. Code is ${errorCode}, message is ${errorMsg}`);
            },
            onAdLoadSuccess: (ads: Map<string, Array<advertising.Advertisement>>) => {
                hilog.info(0x0000, TAG, 'Succeeded in loading multiSlots ad');
                const returnAds: Array<advertising.Advertisement> = [];
                ads.forEach((adsArray) => returnAds.push(...adsArray));
                this.ads = returnAds;
            }
        };
        // Create an AdLoader ad object.
        const adLoader: advertising.AdLoader = new advertising.AdLoader(this.context);
        try {
            // Call the API for requesting ads.
            adLoader.loadAdWithMultiSlots(adRequestParamsArray, this.adOptions, multiSlotsAdLoaderListener);
        }
        catch (e) {
            hilog.error(0x0000, 'testTag', `Failed to load multiSlots ad. Code is ${e.code}, message is ${e.message}`);
        }
    }
    async routeToHome(): Promise<void> {
        try {
            hilog.info(0x0000, TAG, 'Start to route to home');
            // You can change the target page for redirection based on the actual situation.
            this.navPathStack.clear();
        }
        catch (e) {
            hilog.error(0x0000, TAG, `Failed to route to home. Code is ${e.code}, message is ${e.message}`);
        }
    }
}
