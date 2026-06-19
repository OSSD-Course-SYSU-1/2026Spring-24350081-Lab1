import { Want } from '@kit.AbilityKit';

/**
 * 跨端迁移状态桥接模块
 *
 * 用于 EntryAbility（非 UI）与 Index（@ComponentV2）之间共享迁移状态：
 * - 源端：Index/ViewModel 在状态变化时更新桥接字段，EntryAbility.onContinue() 读取
 * - 对端：EntryAbility.onCreate()/onNewWant() 写入桥接字段，Index.aboutToAppear()/onPageShow() 读取并恢复
 */

export class ContinuationBridge {
  /** 当前激活的 Tab 索引：0=剪贴板, 1=分类, 2=设置 */
  currentTab: number = 0;
  /** 当前搜索关键词 */
  searchKeyword: string = '';
  /** 当前分类筛选 ID（0=全部） */
  selectedCategoryId: number = 0;
  /** 是否有待恢复的迁移数据（对端标记） */
  pendingRestore: boolean = false;

  /** 单例 */
  static instance: ContinuationBridge = new ContinuationBridge();

  /**
   * 源端调用：快照当前 UI 状态到 wantParam
   */
  snapshotToWantParam(wantParam: Record<string, Object>): void {
    wantParam['echo_tab'] = this.currentTab;
    wantParam['echo_search'] = this.searchKeyword;
    wantParam['echo_category'] = this.selectedCategoryId;
  }

  /**
   * 对端调用：从 Want.parameters 恢复迁移数据到桥接
   */
  restoreFromWant(want: Want): void {
    const params: Record<string, Object> | undefined = want.parameters;
    if (!params) {
      return;
    }
    const tabRaw: Object | undefined = params['echo_tab'];
    if (tabRaw !== undefined && tabRaw !== null) {
      this.currentTab = Number(tabRaw);
    }
    const searchRaw: Object | undefined = params['echo_search'];
    if (searchRaw !== undefined && searchRaw !== null) {
      this.searchKeyword = searchRaw as string;
    }
    const catRaw: Object | undefined = params['echo_category'];
    if (catRaw !== undefined && catRaw !== null) {
      this.selectedCategoryId = Number(catRaw);
    }
    this.pendingRestore = true;
  }

  /**
   * Index 调用：消费待恢复的迁移数据（返回后重置 pendingRestore）
   */
  consumeIfPending(): ContinuationRestoreData | null {
    if (!this.pendingRestore) {
      return null;
    }
    this.pendingRestore = false;
    return {
      targetTab: this.currentTab,
      targetSearchKeyword: this.searchKeyword,
      targetCategoryId: this.selectedCategoryId
    };
  }
}

/** 迁移恢复数据结构 */
export interface ContinuationRestoreData {
  targetTab: number;
  targetSearchKeyword: string;
  targetCategoryId: number;
}
