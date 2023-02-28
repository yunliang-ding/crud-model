/* eslint-disable no-console */
import { createFromIconfontCN } from '@ant-design/icons';
import { notification } from 'antd';
import html2canvas from 'html2canvas';

/**
 * iconUrl
 */
export const iconUrl = '//at.alicdn.com/t/c/font_3520199_myxvkjekli.js';
/**
 * icon
 */
export const Icon = createFromIconfontCN({
  scriptUrl: iconUrl,
});

export const encode = (str): string => {
  try {
    return btoa(encodeURIComponent(str));
  } catch (error) {
    console.log(error);
    return '';
  }
};

export const decode = (str): string => {
  try {
    return decodeURIComponent(atob(str));
  } catch (error) {
    console.log(error);
    return '';
  }
};

export const isEmpty = (param: any) => {
  if (param === null || param === undefined) {
    return true;
  }
  if (Array.isArray(param)) {
    return param.length === 0;
  }
  if (typeof param === 'string') {
    return param.trim() === '';
  }
  if (typeof param === 'object') {
    return Object.keys(param).length === 0;
  }
  return false;
};

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

export const getUrlSearchParams: any = (
  search = decodeURIComponent(location.hash).split('?')[1],
) => {
  const params = {};
  const searchParams: any = new URLSearchParams(search);
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
};