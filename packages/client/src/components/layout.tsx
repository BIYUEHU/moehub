import { Flex, Layout } from 'antd';
import React from 'react';

const { Header, Footer, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px'
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px'
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#ffff',
  backgroundColor: '#333'
};

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  height: '100vh'
};

const layoutSecondStyle = {
  margin: '0 auto',
  width: 'min(85ch, 100% - 4rem)',
  marginLine: 'auto'
};

export default (outlet: React.ReactElement) => (
  <Flex gap="middle" wrap>
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>Header</Header>
      <Layout style={layoutSecondStyle}>
        <Content style={contentStyle}>{outlet}</Content>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </Layout>
  </Flex>
);
