/**
 * 剪贴内容数据模型
 */
export class ClipItem {
  id: number = 0;
  type: string = 'text';
  content: string = '';
  categoryId: number = 1;
  isPinned: boolean = false;
  createdAt: number = Date.now();
  expiresAt: number = 0;
  /** 图片文件是否在本地设备可用（分布式场景下远端图片文件路径无效） */
  imageAvailable: boolean = true;
}
