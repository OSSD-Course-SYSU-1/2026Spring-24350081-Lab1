if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { AdComponent } from "@ohos:advertising.AdComponent";
import type advertising from "@ohos:advertising";
import hilog from "@ohos:hilog";
import { AdStatus } from "@bundle:com.huawei.ads.clientdemo/entry/ets/constant/AdStatus";
import { AdType } from "@bundle:com.huawei.ads.clientdemo/entry/ets/constant/AdType";
import { AdsViewModel } from "@bundle:com.huawei.ads.clientdemo/entry/ets/viewmodel/AdsViewModel";
const TAG: string = 'Ads Demo-NativeAdPage';
export class NativeAdPage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.visibilityState = Visibility.Visible;
        this.viewModel = new AdsViewModel(this.getUIContext());
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.visibilityState = Visibility.Visible;
    }
    @Local
    private visibilityState: Visibility;
    private viewModel: AdsViewModel;
    aboutToAppear() {
        const adRequestParams: advertising.AdRequestParams = this.viewModel.getParamsFromNav(AdType.NATIVE);
        this.viewModel.loadAdWithMultiSlots([adRequestParams]);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.padding({ left: 16, right: 16 });
                    Column.width('100%');
                    Column.height('100%');
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    List.create();
                    List.scrollBar(BarState.Off);
                    List.width('100%');
                    List.height('100%');
                }, List);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Repeat<advertising.Advertisement>(this.viewModel.ads, this).each((repeatItem: RepeatItem<advertising.Advertisement>) => {
                        {
                            const itemCreation2 = (elmtId, isInitialRender) => {
                                ListItem.create(() => { }, false);
                            };
                            const observedDeepRender = () => {
                                this.observeComponentCreation2(itemCreation2, ListItem);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    __Common__.create();
                                    __Common__.width('100%');
                                    __Common__.visibility(this.visibilityState);
                                }, __Common__);
                                {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        if (isInitialRender) {
                                            let componentCall = new AdComponent(this, {
                                                ads: [repeatItem.item],
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
                                                            case AdStatus.AD_FAIL:
                                                                hilog.info(0x0000, TAG, 'Status is onAdFail');
                                                                this.visibilityState = Visibility.None;
                                                                break;
                                                        }
                                                    }
                                                }
                                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ads/NativeAdPage.ets", line: 42, col: 17 });
                                            ViewPU.create(componentCall);
                                            let paramsLambda = () => {
                                                return {
                                                    ads: [repeatItem.item],
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
                                                                case AdStatus.AD_FAIL:
                                                                    hilog.info(0x0000, TAG, 'Status is onAdFail');
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
                                    }, { name: "AdComponent" });
                                }
                                __Common__.pop();
                                ListItem.pop();
                            };
                            observedDeepRender();
                        }
                    }).render(isInitialRender);
                }, Repeat);
                List.pop();
                Column.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/ads/NativeAdPage" });
            NavDestination.hideTitleBar(true);
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
