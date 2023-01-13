import { createElement, useEffect, useState } from 'rax';
import { getStorage } from '@uni/storage';
import navigate from '@uni/navigate';
import { showToast } from '@uni/toast';
import { Page, Section, Block } from '@alifd/mobile-layout';
import { List } from '@alifd/meet';

export default function Home() {
  const [rssList, setRssList] = useState([]);

  useEffect(async () => {
    getStorage({
      key: 'rss',
    })
      .then((res) => {
        setRssList(
          res.data || [
            {
              name: 'xxx',
              url: 'https://rsshub.app/juejin/category/frontend',
            },
          ],
        );
      })
      .catch(async () => {
        await showToast({
          content: 'hello',
          type: 'fail',
          duration: 2000,
        });
      });
  }, []);

  return (
    <Page>
      <Section />
      <Section>
        <Block title="订阅列表">
          <List>
            {rssList?.map((item) => {
              const { name, url } = item;
              return (
                <List.Item
                  arrow="right"
                  title={name}
                  onClick={async () => {
                    await navigate.push({
                      url: '/rss-column',
                      isHash: true,
                    });
                  }}
                />
              );
            })}
          </List>
        </Block>
      </Section>
    </Page>
  );
}
