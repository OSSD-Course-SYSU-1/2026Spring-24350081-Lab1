if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import type advertising from "@ohos:advertising";
import { AutoAdComponent } from "@ohos:advertising.AutoAdComponent";
import hilog from "@ohos:hilog";
import { AdStatus } from "@bundle:com.huawei.ads.clientdemo/entry/ets/constant/AdStatus";
import { AdType } from "@bundle:com.huawei.ads.clientdemo/entry/ets/constant/AdType";
import { AdsViewModel } from "@bundle:com.huawei.ads.clientdemo/entry/ets/viewmodel/AdsViewModel";
const TAG: string = 'Ads Demo-BannerAdPage';
export class BannerAdPage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.visibilityState = Visibility.Visible;
        this.adRequestParams = { adId: '' };
        this.ratio = -1;
        this.viewModel = new AdsViewModel(this.getUIContext());
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.visibilityState = Visibility.Visible;
    }
    @Local
    private visibilityState: Visibility;
    private adRequestParams: advertising.AdRequestParams;
    private ratio: number;
    private viewModel: AdsViewModel;
    aboutToAppear() {
        this.adRequestParams = this.viewModel.getParamsFromNav(AdType.BANNER);
        if (this.adRequestParams.adWidth && this.adRequestParams.adHeight) {
            this.ratio = this.adRequestParams.adWidth / this.adRequestParams.adHeight;
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Stack.create({ alignContent: Alignment.Bottom });
                    Stack.width('100%');
                    Stack.height('100%');
                }, Stack);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 16777240, "type": 20000, params: [], "bundleName": "com.huawei.ads.clientdemo", "moduleName": "entry" });
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    __Common__.create();
                    __Common__.width('100%');
                    __Common__.aspectRatio(this.ratio);
                    __Common__.visibility(this.visibilityState);
                }, __Common__);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new AutoAdComponent(this, {
                                adParam: this.adRequestParams,
                                adOptions: this.viewModel.adOptions,
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
                                                if (data === 'adCloseBtnClicked') {
                                                    // 关闭原因为点击关闭按钮，可根据实际场景添加处理逻辑
                                                }
                                                this.visibilityState = Visibility.None;
                                                break;
                                            case AdStatus.AD_LOAD:
                                                hilog.info(0x0000, TAG, 'Status is onAdLoad');
                                                break;
                                            case AdStatus.AD_FAIL:
                                                hilog.error(0x0000, TAG, 'Status is onAdFail');
                                                this.visibilityState = Visibility.None;
                                                break;
                                        }
                                    }
                                }
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ads/BannerAdPage.ets", line: 43, col: 9 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    adParam: this.adRequestParams,
                                    adOptions: this.viewModel.adOptions,
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
                                                    if (data === 'adCloseBtnClicked') {
                                                        // 关闭原因为点击关闭按钮，可根据实际场景添加处理逻辑
                                                    }
                                                    this.visibilityState = Visibility.None;
                                                    break;
                                                case AdStatus.AD_LOAD:
                                                    hilog.info(0x0000, TAG, 'Status is onAdLoad');
                                                    break;
                                                case AdStatus.AD_FAIL:
                                                    hilog.error(0x0000, TAG, 'Status is onAdFail');
                                                    this.visibilityState = Visibility.None;
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
                    }, { name: "AutoAdComponent" });
                }
                __Common__.pop();
                Stack.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/ads/BannerAdPage" });
            NavDestination.hideTitleBar(true);
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
