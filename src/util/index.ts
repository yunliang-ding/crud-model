/* eslint-disable no-console */
import { createFromIconfontCN } from '@ant-design/icons';
import { notification } from 'antd';
import html2canvas from 'html2canvas';

/**
 * iconUrl
 */
export const iconUrl = '//at.alicdn.com/t/c/font_3945872_hr5g04sst09.js';
/**
 * icon
 */
export const Icon = createFromIconfontCN({
  scriptUrl: iconUrl,
});

/**
 * html2canvas
 * @param element
 * @param filename
 */
 export const copyImg = async (element) => {
  return new Promise((res) => {
    html2canvas(element, {
      useCORS: true,
    }).then((canvas) => {
      canvas.toBlob(async (blob) => {
        // 将blob对象放入剪切板item中
        const type: any = blob?.type;
        if(navigator.clipboard){
          await navigator.clipboard
          // eslint-disable-next-line @iceworks/best-practices/recommend-polyfill
          .write([new ClipboardItem({ [type]: blob } as any)])
          .then(
            () => {
              res(true);
              notification.success({
                message: '提示',
                description: '已保存到粘贴板',
              });
            },
            () => {
              res(true);
              notification.warning({
                message: '提示',
                description: '保存截图失败',
              });
            },
          );
        } else {
          alert('请在安全域名下使用')
          res(true);
        }
      }, 'image/png');
    });
  });
};
