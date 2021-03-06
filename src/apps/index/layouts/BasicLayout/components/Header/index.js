/* eslint jsx-a11y/no-noninteractive-element-interactions:0 */
import React, { Component } from 'react';
import { Balloon, Message } from '@alifd/next';
// import IceImg from '@icedesign/img';
import Layout from '@icedesign/layout';
import cx from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
// import { headerMenuConfig } from '../../../../menuConfig';
import SelectLang from '../../../../../../assets/Internationalization/SelectLang';
import Example from './components/Example';
import Information from './components/Information';
import Personnel from './components/Personnel';
import Administration from './components/Administration';
import { actions, reducers, connect } from '@indexStore';
import { userImg } from '@indexApi';

import './index.scss';

const Cookies = require('js-cookie');

@injectIntl
@withRouter
class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  componentDidMount() {
    userImg().then(({ status,data })=>{
      if (data.errCode == 0) {
        const imgUrl = data.data;
        // const imgUrls = `http://funplus.yue-net.com${imgUrl}`;
        // const imgUrls = `http://192.168.1.121:3000${imgUrl}`;
        this.props.editor(imgUrl);
      } else {
        Message.success(data.message);
      }
    });
    // Cookies.set('applicationId', '5d1023eb8e0d1931a86af94f');
  }
  // f9d61ca0837211e99467c3c360ea292a  ,0a1cc81090cb11e992cd4b62d0c37a7c,5d1023eb8e0d1931a86af94f
  handleSetting = () => {
    this.props.history.push('/setting');
  };
  /*  handleLogout = () => {
    this.props.history.push('/website');
  }; */
  getLocaleKey = (item) => {
    return `app.header.${item.name}`;
  };
  render() {
    const {
      isMobile,
      className,
      style,
      intl: { formatMessage },
    } = this.props;

    return (
      <Layout.Header
        theme="dark"
        className={cx('ice-design-layout-header', className)}
        style={{ ...style }}
      >
        {/* logo */}
        <div className='header-logo' >
          <div className='logo-element' />
          <div className='logo-label'>3FunPlus</div>
        </div>
        {/* 选项 */}
        <Example />
        {/* 搜索框 */}
        <div className="element-search autosuggest-search-activator">
          <i className="os-icon os-icon-search" />
          <input placeholder="输入关键词进行搜索" type="text" />
        </div>
        <SelectLang />
        <Information />
        <Personnel />
        <Administration />
      </Layout.Header>
    );
  }
}
export default connect(
  (state) => {
    return { Userinformation: state.Userinformation };
  },
  { ...actions.Userinformation },
  null,
  { withRef: true }
)(Header);
