/* eslint jsx-a11y/no-noninteractive-element-interactions:0 */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';

@injectIntl
@withRouter
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      intl: { formatMessage },
    } = this.props;
    console.log(this.props);

    return (
      <div className="logged-user-w">
        <div className="logged-user-i">
          <div className="avatar-w">
            <img alt="" src={require('../../../../../../../../assets/img/img/avatar1.jpg')} />
          </div>

          <div className="logged-user-menu color-style-bright">
            <div className="logged-user-avatar-info">
              <div className="avatar-w">
                <img alt="" src={require('../../../../../../../../assets/img/img/avatar1.jpg')} />
              </div>
              <div className="logged-user-info-w">
                <div className="logged-user-name">
                  账号
                </div>
                <div className="logged-user-role">
                  超级管理员
                </div>
              </div>
            </div>
            <div className="bg-icon">
              <i className="os-icon os-icon-wallet-loaded"></i>
            </div>
            <ul>
              <li>
                <Link to='/personal/accountinformation'>
                  <i className="os-icon os-icon-user-male-circle2"></i><span>账户信息</span>
                </Link>
              </li>
              <li>
                <Link to='/personal/enterprisecertification'>
                  <i className="os-icon os-icon-coins-4"></i><span>企业认证</span>
                </Link>
              </li>
              <li>
                <Link to='/personal/costcenter'>
                  <i className="os-icon os-icon-others-43"></i><span>费用中心</span>
                </Link>
              </li>
              <li>
                <Link to='/personal/controloverinvoices'>
                  <i className="os-icon os-icon-others-43"></i><span>发票管理</span>
                </Link>
              </li>
              <li>
                <Link to='/personal/operationlog'>
                  <i className="os-icon os-icon-others-43"></i><span>操作日志</span>
                </Link>
              </li>
              <li>
                <a href="website.html"><i className="os-icon os-icon-signs-11"></i><span>退出</span></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
