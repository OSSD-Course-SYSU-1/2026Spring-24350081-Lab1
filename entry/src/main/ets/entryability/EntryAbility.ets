import { AbilityConstant, ConfigurationConstant, UIAbility, Want } from '@kit.AbilityKit';
import { window } from '@kit.ArkUI';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { ContinuationBridge } from '../common/ContinuationBridge';

const TAG: string = 'Echo-EntryAbility';

export default class EntryAbility extends UIAbility {
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    hilog.info(0x0000, TAG, `Ability onCreate, launchReason=${launchParam.launchReason}`);
    try {
      this.context.getApplicationContext().setColorMode(ConfigurationConstant.ColorMode.COLOR_MODE_NOT_SET);
    } catch (e) {
      hilog.error(0x0000, TAG, `Failed to set color mode. Code is ${e.code}, message is ${e.message}`);
    }
    // 检查是否为跨端迁移启动：从 Want 参数恢复状态
    if (launchParam.launchReason === AbilityConstant.LaunchReason.CONTINUATION) {
      ContinuationBridge.instance.restoreFromWant(want);
      hilog.info(0x0000, TAG, 'Restored state from continuation launch');
    }
  }

  onDestroy(): void {
    hilog.info(0x0000, TAG, 'Ability onDestroy');
  }

  /**
   * 跨端迁移 — 源端回调
   * 系统决定迁移时调用，将当前 UI 状态打包到 wantParam 传递给对端设备
   */
  onContinue(wantParam: Record<string, Object>): AbilityConstant.OnContinueResult {
    hilog.info(0x0000, TAG, 'onContinue: snapshotting current state');
    ContinuationBridge.instance.snapshotToWantParam(wantParam);
    hilog.info(0x0000, TAG,
      `onContinue: tab=${ContinuationBridge.instance.currentTab}, ` +
      `search="${ContinuationBridge.instance.searchKeyword}", ` +
      `category=${ContinuationBridge.instance.selectedCategoryId}`);
    return AbilityConstant.OnContinueResult.AGREE;
  }

  /**
   * 跨端迁移 / 跨设备启动 — 对端回调（App 已在运行）
   * 从 Want 参数恢复迁移过来的状态
   */
  onNewWant(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    hilog.info(0x0000, TAG, `onNewWant: launchReason=${launchParam.launchReason}`);
    if (launchParam.launchReason === AbilityConstant.LaunchReason.CONTINUATION) {
      ContinuationBridge.instance.restoreFromWant(want);
      hilog.info(0x0000, TAG, 'Restored state from continuation (hot start)');
    }
  }

  onWindowStageCreate(windowStage: window.WindowStage): void {
    hilog.info(0x0000, TAG, 'Ability onWindowStageCreate');
    windowStage.loadContent('pages/Index', (err, data) => {
      if (err.code) {
        hilog.error(0x0000, TAG, `Failed to load the content. Cause: ${JSON.stringify(err)}`);
        return;
      }
      hilog.info(0x0000, TAG, `Succeeded in loading the content. Data: ${JSON.stringify(data)}`);
    });
  }

  onWindowStageDestroy(): void {
    hilog.info(0x0000, TAG, 'Ability onWindowStageDestroy');
  }

  onForeground(): void {
    hilog.info(0x0000, TAG, 'Ability onForeground');
  }

  onBackground(): void {
    hilog.info(0x0000, TAG, 'Ability onBackground');
  }
}
