import {Layout, ConfigProvider} from "antd";
import zhCN from 'antd/es/locale/zh_CN'

import Header from "@/layouts/Header";
import './index.scss';

const {Content} = Layout

function BasicLayout(props) {
  return (
    <ConfigProvider locale={zhCN}>
      <Layout className='basic-layout'>
        <Header/>
        <Content className='content'>{props.children}</Content>
      </Layout>
    </ConfigProvider>
  );
}

export default BasicLayout;
