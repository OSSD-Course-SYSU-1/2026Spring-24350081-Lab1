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
const TAG: string = 'Ads Demo-SplashAdPage';
export class SplashAdPage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.viewModel = new AdsViewModel(this.getUIContext());
        this.context = this.getUIContext().getHostContext() as common.UIAbilityContext;
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
    }
    private viewModel: AdsViewModel;
    private context: common.UIAbilityContext;
    aboutToAppear() {
        // Set the screen to portrait.
        this.setWindowPreferredOrientation(window.Orientation.PORTRAIT);
        const adRequestParams: advertising.AdRequestParams = this.viewModel.getParamsFromNav(AdType.SPLASH);
        this.viewModel.loadAd(adRequestParams);
    }
    aboutToDisappear() {
        // Set screen orientation to the default value. You can change the value based on the actual situation.
        this.setWindowPreferredOrientation(window.Orientation.UNSPECIFIED);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    RelativeContainer.create();
                    RelativeContainer.width('100%');
                    RelativeContainer.height('100%');
                }, RelativeContainer);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // Slogan image.
                    Image.create({ "id": 16777241, "type": 20000, params: [], "bundleName": "com.huawei.ads.clientdemo", "moduleName": "entry" });
                    // Slogan image.
                    Image.width('100%');
                    // Slogan image.
                    Image.height('100%');
                    // Slogan image.
                    Image.zIndex(0);
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // Display the custom icon, app name, and copyright information.
                    Column.create();
                    // Display the custom icon, app name, and copyright information.
                    Column.zIndex(1);
                    // Display the custom icon, app name, and copyright information.
                    Column.alignRules({ bottom: { anchor: '__container__', align: VerticalAlign.Bottom } });
                    // Display the custom icon, app name, and copyright information.
                    Column.width('100%');
                    // Display the custom icon, app name, and copyright information.
                    Column.height('13%');
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.margin({ bottom: 8 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 16777242, "type": 20000, params: [], "bundleName": "com.huawei.ads.clientdemo", "moduleName": "entry" });
                    Image.width(24);
                    Image.height(24);
                    Image.margin(8);
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create({ "id": 16777236, "type": 10003, params: [], "bundleName": "com.huawei.ads.clientdemo", "moduleName": "entry" });
                    Text.fontColor({ "id": 16777238, "type": 10001, params: [], "bundleName": "com.huawei.ads.clientdemo", "moduleName": "entry" });
                    Text.fontSize(16);
                }, Text);
                Text.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create({ "id": 16777223, "type": 10003, params: [], "bundleName": "com.huawei.ads.clientdemo", "moduleName": "entry" });
                    Text.fontColor({ "id": 16777238, "type": 10001, params: [], "bundleName": "com.huawei.ads.clientdemo", "moduleName": "entry" });
                    Text.fontSize(9);
                }, Text);
                Text.pop();
                Column.pop();
                // Display the custom icon, app name, and copyright information.
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.viewModel.ads.length !== 0) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                If.create();
                                if (this.viewModel.ads[0]?.isFullScreen) {
                                    this.ifElseBranchUpdateFunction(0, () => {
                                        this.splashFullScreen.bind(this)();
                                    });
                                }
                                else {
                                    this.ifElseBranchUpdateFunction(1, () => {
                                        this.splashHalfScreen.bind(this)();
                                    });
                                }
                            }, If);
                            If.pop();
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                RelativeContainer.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/ads/SplashAdPage" });
            NavDestination.hideTitleBar(true);
            NavDestination.ignoreLayoutSafeArea();
        }, NavDestination);
        NavDestination.pop();
    }
    private splashHalfScreen(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.zIndex(1);
            __Common__.width('100%');
            __Common__.height('87%');
            __Common__.transition(TransitionEffect.OPACITY.animation({ duration: 1000, curve: Curve.Friction }));
            __Common__.alignRules({ top: { anchor: '__container__', align: VerticalAlign.Top } });
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new AdComponent(this, {
                        ads: [this.viewModel.ads[0]],
                        displayOptions: this.viewModel.adDisplayOptions,
                        interactionListener: {
                            onStatusChanged: (status: string, ad: advertising.Advertisement, data: string) => {
                                switch (status) {
                                    case AdStatus.AD_OPEN:
                                        hilog.info(0x0000, TAG, 'Status is onAdOpen');
                                        break;
                                    case AdStatus.AD_CLICKED:
                                        hilog.info(0x0000, TAG, 'Status is onAdClick');
                                        break;
                                    case AdStatus.AD_CLOSED:
                                        hilog.info(0x0000, TAG, `Status is onAdClose, Close Reason is ${data}`);
                                        if (data === 'adShowEnded') {
                                            // 关闭原因为广告展示结束，可根据实际场景添加处理逻辑
                                        }
                                        this.viewModel.routeToHome();
                                        break;
                                    case AdStatus.AD_FAIL:
                                        hilog.info(0x0000, TAG, 'Status is onAdFail');
                                        this.viewModel.routeToHome();
                                        break;
                                }
                            }
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ads/SplashAdPage.ets", line: 94, col: 5 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            ads: [this.viewModel.ads[0]],
                            displayOptions: this.viewModel.adDisplayOptions,
                            interactionListener: {
                                onStatusChanged: (status: string, ad: advertising.Advertisement, data: string) => {
                                    switch (status) {
                                        case AdStatus.AD_OPEN:
                                            hilog.info(0x0000, TAG, 'Status is onAdOpen');
                                            break;
                                        case AdStatus.AD_CLICKED:
                                            hilog.info(0x0000, TAG, 'Status is onAdClick');
                                            break;
                                        case AdStatus.AD_CLOSED:
                                            hilog.info(0x0000, TAG, `Status is onAdClose, Close Reason is ${data}`);
                                            if (data === 'adShowEnded') {
                                                // 关闭原因为广告展示结束，可根据实际场景添加处理逻辑
                                            }
                                            this.viewModel.routeToHome();
                                            break;
                                        case AdStatus.AD_FAIL:
                                            hilog.info(0x0000, TAG, 'Status is onAdFail');
                                            this.viewModel.routeToHome();
                                            break;
                                    }
                                }
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "AdComponent" });
        }
        __Common__.pop();
    }
    private splashFullScreen(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.zIndex(1);
            __Common__.width('100%');
            __Common__.height('100%');
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new AdComponent(this, {
                        ads: [this.viewModel.ads[0]],
                        displayOptions: this.viewModel.adDisplayOptions,
                        interactionListener: {
                            onStatusChanged: (status: string, ad: advertising.Advertisement, data: string) => {
                                switch (status) {
                                    case AdStatus.AD_OPEN:
                                        hilog.info(0x0000, TAG, 'Status is onAdOpen');
                                        break;
                                    case AdStatus.AD_CLICKED:
                                        hilog.info(0x0000, TAG, 'Status is onAdClick');
                                        break;
                                    case AdStatus.AD_CLOSED:
                                        hilog.info(0x0000, TAG, `Status is onAdClose, Close Reason is ${data}`);
                                        if (data === 'adShowEnded') {
                                            // 关闭原因为广告展示结束，可根据实际场景添加处理逻辑
                                        }
                                        this.viewModel.routeToHome();
                                        break;
                                    case AdStatus.AD_FAIL:
                                        hilog.info(0x0000, TAG, 'Status is onAdFail');
                                        this.viewModel.routeToHome();
                                        break;
                                }
                            }
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ads/SplashAdPage.ets", line: 131, col: 5 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            ads: [this.viewModel.ads[0]],
                            displayOptions: this.viewModel.adDisplayOptions,
                            interactionListener: {
                                onStatusChanged: (status: string, ad: advertising.Advertisement, data: string) => {
                                    switch (status) {
                                        case AdStatus.AD_OPEN:
                                            hilog.info(0x0000, TAG, 'Status is onAdOpen');
                                            break;
                                        case AdStatus.AD_CLICKED:
                                            hilog.info(0x0000, TAG, 'Status is onAdClick');
                                            break;
                                        case AdStatus.AD_CLOSED:
                                            hilog.info(0x0000, TAG, `Status is onAdClose, Close Reason is ${data}`);
                                            if (data === 'adShowEnded') {
                                                // 关闭原因为广告展示结束，可根据实际场景添加处理逻辑
                                            }
                                            this.viewModel.routeToHome();
                                            break;
                                        case AdStatus.AD_FAIL:
                                            hilog.info(0x0000, TAG, 'Status is onAdFail');
                                            this.viewModel.routeToHome();
                                            break;
                                    }
                                }
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "AdComponent" });
        }
        __Common__.pop();
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
    rerender() {
        this.updateDirtyElements();
    }
}
