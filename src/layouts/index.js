import {Layout, ConfigProvider} from "antd";
import zhCN from 'antd/es/locale/zh_CN'

import Header from "@/layouts/Header";
import './index.scss';

const {Content} = Layout

function BasicLayout({children, location}) {
  if (location.pathname.indexOf('/detail/') === 0) {
    return children
  }

  return (
    <ConfigProvider locale={zhCN}>
      <Layout className='basic-layout'>
        <Header/>
        <Content className='content'>{children}</Content>
      </Layout>
    </ConfigProvider>
  );
}

export default BasicLayout;
