import { Flex, Layout } from 'antd';
import React from 'react';

const { Header, Footer, Content } = Layout;

const headerStyle: React.CSSProperties = {
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px'
};

const contentStyle: React.CSSProperties = {
  minHeight: 120,
  lineHeight: '120px',
  overflow: 'initial'
};

const footerStyle: React.CSSProperties = {
  color: '#ffff',
  backgroundColor: '#333'
};

const layoutStyle: React.CSSProperties = {
  textAlign: 'center',
  borderRadius: 8,
  minHeight: '100vh'
};

export default (outlet: React.ReactElement) => (
  <Flex gap="middle" wrap>
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>Header</Header>
      <Content style={contentStyle}>{outlet}</Content>
      <Footer style={footerStyle}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
    </Layout>
  </Flex>
);
