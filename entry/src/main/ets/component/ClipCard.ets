import { ClipItem } from '../model/ClipItem';

/**
 * 剪贴内容卡片组件
 * 点击复制到剪贴板，长按弹出操作菜单（置顶/移动/删除）
 */

@ComponentV2
export struct ClipCard {
  @Param clipItem: ClipItem = new ClipItem();
  @Param categoryName: string = '';
  @Param categoryColor: string = '#FF6B6B';
  @Param isHovered: boolean = false;
  @Param wideLayout: boolean = false;
  @Param showActions: boolean = true;
  @Event onMore: () => void = () => {};

  build() {
    Stack({ alignContent: Alignment.TopEnd }) {
      Column() {
        Row() {
          Text(this.clipItem.type === 'image' ? '🖼' : '📝')
            .fontSize(this.wideLayout ? 26 : 22)
            .margin({ right: 10 })

          Column() {
            if (this.clipItem.type === 'image') {
              if (this.clipItem.imageAvailable) {
                Image(this.clipItem.content)
                  .width('100%')
                  .height(this.wideLayout ? 160 : 120)
                  .objectFit(ImageFit.Cover)
                  .borderRadius(8)
              } else {
                // 分布式场景：图片文件仅在原设备可用
                Column() {
                  Text('🖼')
                    .fontSize(32)
                    .fontColor('#BBBBBB')
                  Text('图片仅在本设备可用')
                    .fontSize(11)
                    .fontColor('#BBBBBB')
                    .margin({ top: 4 })
                }
                .width('100%')
                .height(this.wideLayout ? 160 : 120)
                .justifyContent(FlexAlign.Center)
                .backgroundColor('#F5F5F5')
                .borderRadius(8)
              }
            } else {
              Text(this.clipItem.content.substring(0, this.wideLayout ? 300 : 200))
                .fontSize(this.wideLayout ? 16 : 14)
                .fontColor('#1A1A1A')
                .maxLines(this.wideLayout ? 5 : 3)
                .textOverflow({ overflow: TextOverflow.Ellipsis })
                .width('100%')
            }

            Row() {
              Text(this.formatTime(this.clipItem.createdAt))
                .fontSize(this.wideLayout ? 12 : 11)
                .fontColor('#999999')
              Blank()
              if (this.categoryName.length > 0) {
                Column() {
                  Text(this.categoryName)
                    .fontSize(this.wideLayout ? 12 : 10)
                    .fontColor(Color.White)
                    .maxLines(1)
                    .textOverflow({ overflow: TextOverflow.Ellipsis })
                }
                .constraintSize({ maxWidth: 100 })
                .padding({ left: 8, right: 8, top: 2, bottom: 2 })
                .borderRadius(8)
                .backgroundColor(this.categoryColor)
              }
              if (this.clipItem.isPinned) {
                Text('📌')
                  .fontSize(10)
                  .margin({ left: 4 })
              }
            }
            .width('100%')
            .margin({ top: 6 })
          }
          .layoutWeight(1)
        }
        .width('100%')
        .padding(this.wideLayout ? 20 : 14)
      }
      .width('100%')
      .backgroundColor(Color.White)
      .borderRadius(14)
      .clip(true)
      .border({ width: 1, color: '#F0F0F0' })

      // 平板/PC 端 "⋯" 更多操作按钮，避免长按手势与滚动容器冲突
      if (this.wideLayout && this.showActions) {
        Text('⋯')
          .fontSize(20)
          .fontColor('#999999')
          .padding({ left: 14, right: 14, top: 10, bottom: 14 })
          .onClick(() => {
            this.onMore();
          })
      }
    }
    .width('100%')
    .margin({ top: this.wideLayout ? 6 : 4, bottom: this.wideLayout ? 6 : 4 })
    .shadow(this.isHovered ? {
      radius: 8,
      color: 'rgba(0,0,0,0.1)',
      offsetX: 0,
      offsetY: 2
    } : {
      radius: 0,
      color: 'rgba(0,0,0,0)',
      offsetX: 0,
      offsetY: 0
    })
    .scale(this.isHovered ? { x: 1.02, y: 1.02 } : { x: 1, y: 1 })
    .animation({ duration: 200 })
  }

  private getImageFileName(): string {
    const parts: string[] = this.clipItem.content.split('/');
    if (parts.length > 0) {
      return parts[parts.length - 1];
    }
    return '图片';
  }

  private formatTime(timestamp: number): string {
    const date: Date = new Date(timestamp);
    const month: string = (date.getMonth() + 1).toString().padStart(2, '0');
    const day: string = date.getDate().toString().padStart(2, '0');
    const hour: string = date.getHours().toString().padStart(2, '0');
    const minute: string = date.getMinutes().toString().padStart(2, '0');
    return month + '-' + day + ' ' + hour + ':' + minute;
  }
}
