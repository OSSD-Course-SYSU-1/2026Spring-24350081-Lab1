if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import abilityAccessCtrl from "@ohos:abilityAccessCtrl";
import type common from "@ohos:app.ability.common";
import type { PermissionRequestResult } from "@ohos:abilityAccessCtrl";
import type advertising from "@ohos:advertising";
import identifier from "@ohos:identifier.oaid";
import { AppStorageV2 } from "@ohos:arkui.StateManagement";
import hilog from "@ohos:hilog";
import { AdType } from "@bundle:com.huawei.ads.clientdemo/entry/ets/constant/AdType";
import { AdsViewModel } from "@bundle:com.huawei.ads.clientdemo/entry/ets/viewmodel/AdsViewModel";
import { BannerAdPage } from "@bundle:com.huawei.ads.clientdemo/entry/ets/pages/ads/BannerAdPage";
import { NativeAdPage } from "@bundle:com.huawei.ads.clientdemo/entry/ets/pages/ads/NativeAdPage";
import { RollAdPage } from "@bundle:com.huawei.ads.clientdemo/entry/ets/pages/ads/RollAdPage";
import { SplashAdPage } from "@bundle:com.huawei.ads.clientdemo/entry/ets/pages/ads/SplashAdPage";
const TAG: string = 'Ads Demo-Index';
class Index extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.buttonsOptions = [];
        this.context = this.getUIContext().getHostContext() as common.UIAbilityContext;
        this.navPathStack = AppStorageV2.connect(NavPathStack, () => new NavPathStack())!;
        this.viewModel = new AdsViewModel(this.getUIContext());
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.buttonsOptions = [];
    }
    @Local
    private buttonsOptions: ButtonOptions[];
    private context: common.UIAbilityContext;
    private navPathStack: NavPathStack;
    private viewModel: AdsViewModel;
    async aboutToAppear() {
        const oaid = await requestOAID(this.context);
        // Banner Ad.
        this.buttonsOptions.push({
            text: { "id": 16777225, "type": 10003, params: [], "bundleName": "com.huawei.ads.clientdemo", "moduleName": "entry" },
            adRequestParams: {
                adId: 'testw6vs28auh3',
                adType: AdType.BANNER,
                adWidth: 360,
                adHeight: 57,
                oaid: oaid
            }
        });
        // Native video ad.
        this.buttonsOptions.push({
            text: { "id": 16777231, "type": 10003, params: [], "bundleName": "com.huawei.ads.clientdemo", "moduleName": "entry" },
            adRequestParams: {
                adId: 'testy63txaom86',
                adType: AdType.NATIVE,
                adCount: 1,
                enableDirectReturnVideoAd: true,
                oaid: oaid
            }
        });
        // Native large image ad.
        this.buttonsOptions.push({
            text: { "id": 16777228, "type": 10003, params: [], "bundleName": "com.huawei.ads.clientdemo", "moduleName": "entry" },
            adRequestParams: {
                adId: 'testu7m3hc4gvm',
                adType: AdType.NATIVE,
                adCount: 1,
                enableDirectReturnVideoAd: true,
                oaid: oaid
            }
        });
        // Native small image ad.
        this.buttonsOptions.push({
            text: { "id": 16777229, "type": 10003, params: [], "bundleName": "com.huawei.ads.clientdemo", "moduleName": "entry" },
            adRequestParams: {
                adId: 'testb65czjivt9',
                adType: AdType.NATIVE,
                adCount: 1,
                enableDirectReturnVideoAd: true,
                oaid: oaid
            }
        });
        // Native three-image ad.
        this.buttonsOptions.push({
            text: { "id": 16777230, "type": 10003, params: [], "bundleName": "com.huawei.ads.clientdemo", "moduleName": "entry" },
            adRequestParams: {
                adId: 'testr6w14o0hqz',
                adType: AdType.NATIVE,
                adCount: 1,
                enableDirectReturnVideoAd: true,
                oaid: oaid
            }
        });
        // Rewarded ad.
        this.buttonsOptions.push({
            text: { "id": 16777232, "type": 10003, params: [], "bundleName": "com.huawei.ads.clientdemo", "moduleName": "entry" },
            shouldShowAd: true,
            adRequestParams: {
                adId: 'testx9dtjwj8hp',
                adType: AdType.REWARD,
                oaid: oaid
            }
        });
        // Interstitial video ad.
        this.buttonsOptions.push({
            text: { "id": 16777227, "type": 10003, params: [], "bundleName": "com.huawei.ads.clientdemo", "moduleName": "entry" },
            shouldShowAd: true,
            adRequestParams: {
                adId: 'testb4znbuh3n2',
                adType: AdType.INTERSTITIAL,
                oaid: oaid
            }
        });
        // Interstitial image ad.
        this.buttonsOptions.push({
            text: { "id": 16777226, "type": 10003, params: [], "bundleName": "com.huawei.ads.clientdemo", "moduleName": "entry" },
            shouldShowAd: true,
            adRequestParams: {
                adId: 'teste9ih9j0rc3',
                adType: AdType.INTERSTITIAL,
                oaid: oaid
            }
        });
        // Splash video ad.
        this.buttonsOptions.push({
            text: { "id": 16777235, "type": 10003, params: [], "bundleName": "com.huawei.ads.clientdemo", "moduleName": "entry" },
            adRequestParams: {
                adId: 'testd7c5cewoj6',
                adType: AdType.SPLASH,
                adCount: 1,
                oaid: oaid
            }
        });
        // Splash image ad.
        this.buttonsOptions.push({
            text: { "id": 16777234, "type": 10003, params: [], "bundleName": "com.huawei.ads.clientdemo", "moduleName": "entry" },
            adRequestParams: {
                adId: 'testq6zq98hecj',
                adType: AdType.SPLASH,
                adCount: 1,
                oaid: oaid
            }
        });
        // Roll ad.
        this.buttonsOptions.push({
            text: { "id": 16777233, "type": 10003, params: [], "bundleName": "com.huawei.ads.clientdemo", "moduleName": "entry" },
            adRequestParams: {
                adId: 'testy3cglm3pj0',
                adType: AdType.ROLL,
                isPreload: false,
                oaid: oaid
            }
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(this.navPathStack, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/Index", isUserCreateStack: true });
            Navigation.title({ "id": 16777221, "type": 10003, params: [], "bundleName": "com.huawei.ads.clientdemo", "moduleName": "entry" });
            Navigation.titleMode(NavigationTitleMode.Mini);
            Navigation.mode(NavigationMode.Stack);
            Navigation.hideBackButton(true);
            Navigation.navDestination({ builder: this.pageMap.bind(this) });
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height('100%');
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.height('100%');
            List.width('100%');
            List.alignListItem(ListItemAlign.Center);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Repeat<ButtonOptions>(this.buttonsOptions, this).each((repeatItem: RepeatItem<ButtonOptions>) => {
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(() => { }, false);
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, ListItem);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Button.createWithLabel(repeatItem.item.text);
                            Button.fontSize(20);
                            Button.fontWeight(FontWeight.Normal);
                            Button.width('90%');
                            Button.margin({ top: 10, bottom: 10 });
                            Button.onClick(() => {
                                const options: ButtonOptions = repeatItem.item;
                                if (options.shouldShowAd) {
                                    this.viewModel.loadAd(options.adRequestParams);
                                    return;
                                }
                                if (options.adRequestParams?.adType) {
                                    this.navPathStack.pushPathByName(AdType[options.adRequestParams?.adType], options.adRequestParams);
                                }
                            });
                        }, Button);
                        Button.pop();
                        ListItem.pop();
                    };
                    observedDeepRender();
                }
            }).render(isInitialRender);
        }, Repeat);
        List.pop();
        Column.pop();
        Navigation.pop();
    }
    pageMap(name: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (name === AdType[AdType.BANNER]) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new BannerAdPage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 198, col: 7 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "BannerAdPage" });
                    }
                });
            }
            else if (name === AdType[AdType.NATIVE]) {
                this.ifElseBranchUpdateFunction(1, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new NativeAdPage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 200, col: 7 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "NativeAdPage" });
                    }
                });
            }
            else if (name === AdType[AdType.ROLL]) {
                this.ifElseBranchUpdateFunction(2, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new RollAdPage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 202, col: 7 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "RollAdPage" });
                    }
                });
            }
            else if (name === AdType[AdType.SPLASH]) {
                this.ifElseBranchUpdateFunction(3, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new SplashAdPage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 204, col: 7 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "SplashAdPage" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(4, () => {
                });
            }
        }, If);
        If.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
interface ButtonOptions {
    text: ResourceStr;
    adRequestParams: advertising.AdRequestParams;
    shouldShowAd?: boolean;
}
async function requestOAID(context: Context): Promise<string | undefined> {
    let isPermissionGranted: boolean = false;
    try {
        const atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
        const result: PermissionRequestResult = await atManager.requestPermissionsFromUser(context, ['ohos.permission.APP_TRACKING_CONSENT']);
        isPermissionGranted = result.authResults[0] === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED;
    }
    catch (err) {
        hilog.error(0x0000, TAG, `Failed to request permission. Code is ${err.code}, message is ${err.message}`);
    }
    if (isPermissionGranted) {
        hilog.info(0x0000, TAG, 'Succeeded in requesting permission');
        try {
            const oaid = await identifier.getOAID();
            hilog.info(0x0000, TAG, 'Succeeded in getting OAID');
            return oaid;
        }
        catch (err) {
            hilog.error(0x0000, TAG, `Failed to get OAID. Code is ${err.code}, message is ${err.message}`);
        }
    }
    else {
        hilog.error(0x0000, TAG, 'Failed to request permission. User rejected');
    }
    return undefined;
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.huawei.ads.clientdemo", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
