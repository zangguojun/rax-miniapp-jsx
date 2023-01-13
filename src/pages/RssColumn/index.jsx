import { createElement, useEffect, useState } from 'rax';
import { showToast, hideToast } from '@uni/toast';
import { setClipboard } from '@uni/clipboard';
import { getCurrentPages } from '@uni/application';
import request from '@uni/request';
import { Page } from '@alifd/mobile-layout';
import { XMLParser } from 'fast-xml-parser';

export default (props) => {
  // const [route] = getCurrentPages();
  const [rssData, setRssData] = useState({});
  const [error, setError] = useState({});
  const { title, link, description, lastBuildDate, item } = rssData?.rss?.channel || {};

  const handleCopyUrl = async () => {
    await setClipboard({
      text: link,
    });
  };

  useEffect(() => {
    showToast({
      content: '等待....',
      type: 'loading',
      duration: 10000,
    });
    request({
      // url: route?.hash?.url,
      url: 'https://rsshub.app/juejin/category/frontend',
      method: 'GET',
      dataType: 'json',
      success: async (res) => {
        const parser = new XMLParser();
        const jsonObj = parser.parse(res.data);
        setRssData(jsonObj);
        await hideToast();
      },
      fail: async () => {
        await showToast({
          content: 'hello',
          type: 'fail',
          duration: 2000,
        });
        setError(true);
      },
    });
  }, []);

  return (
    <Page>
      <Page.Header onClick={handleCopyUrl}>{error ? '渲染异常，请检测rss链接是否可用' : title}</Page.Header>
    </Page>
  );
};
