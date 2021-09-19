import React from 'react';
import {Affix, Menu, Dropdown, Icon} from "antd";
import {Link, withRouter} from "umi";

import './index.scss'

const Header = ({location}) => {
  const menu = (
    <Menu>
      <Menu.Item>
        <span>退出</span>
      </Menu.Item>
    </Menu>
  )

  return (
    <Affix offsetTop={0}>
      <div className='header'>
        <h2 className='logo'>Ftrack Widget Visualization</h2>
        <Menu className='menus' mode='horizontal'
              selectedKeys={[location.pathname]} theme='dark'>
          <Menu.Item key='/'>
            <Link to='/'>首页</Link>
          </Menu.Item>
        </Menu>
        <div className="right">
          <Dropdown overlay={menu}>
            <a href="/">
              <Icon type='user' style={{marginRight: 3}}/>admin
            </a>
          </Dropdown>
        </div>
      </div>
    </Affix>
  );
};

export default withRouter(Header);
