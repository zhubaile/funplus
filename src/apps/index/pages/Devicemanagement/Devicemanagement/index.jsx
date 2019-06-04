import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button , Tab, Message ,Switch,Pagination,Table,Select, Menu,MenuButton } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import Addgrouping from './Addgrouping';
import Official from './Adddevice/official';
import Custom from './Adddevice/custom';
import { deviceGroup } from '@indexApi';
import '../../index.css';

const { Item } = MenuButton;
const getData = (length = 10) => {
  return Array.from({ length }).map(() => {
    return {
      name: ['淘小宝', '淘二宝'],
      level: ['普通会员'],
      rule: ['余杭盒马店'],
    };
  });
};

export default class Devicemanagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      isLoading: false,
      data: [],
      listValue: '状态/全部',
    };
  }
  btnClick() {
    this.props.editor(this.input.getInputNode().value);
  }

  componentDidMount() {
    this.fetchData();
  }

  mockApi = (len) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getData(len)); // Promise.resolve(value)方法返回一个以给定值解析后的Promise 对象 成功以后携带数据  resolve(应该写ajax方法)
      }, 600);
    });
  };

  fetchData = (len) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        this.mockApi(len).then((data) => { // data 里面为数据
          this.setState({
            data,
            isLoading: false,
          });
        });
      }
    );
  };

  handlePaginationChange = (current) => {
    this.setState(
      {
        current,
      },
      () => {
        this.fetchData();
      }
    );
  };
  // 添加分组
  groupingopen() {

    this.Addgrouping.addgroupingopen();
  }
  // 添加设备
  deviceopen() {
    this.Custom.customopen();
  }
  renderRule = () => {
    return (
      <div>
        <select className='table-select'>
          <option value="volvo">默认规则</option>
          <option value="saab">自定义规则</option>
          <option value="opel">自定义规则</option>
          <option value="audi">新增规则</option>
        </select>
      </div>
    );
  };
  renderOper = () => {
    return (
      <div>
        <Switch className='div-switch' defaultChecked={false} />
      </div>
    );
  };
  zbl=(value)=>{
    debugger;
    this.setState({
      listValue: value,
    });
    // ajax 方法
  }
  render() {
    const { isLoading, data, current } = this.state;
    const Allstart = [
      { value: '状态/全部', label: '状态/全部' },
      { value: '可使用', label: '可使用' },
      { value: '离线', label: '离线' },
    ];
    const copybtn = (
      <Select onChange={this.zbl} style={{ width: '150px' }} placeholder={this.state.listValue} dataSource={Allstart} />
    );
    const phonebtn = (<Button>手机/邮箱验证查看</Button>);
    return (
      <div className='devicemanagement'>
        <Addgrouping ref={(node=>this.Addgrouping = node)} />
        <Official ref={(node=>this.Official = node)} />
        <Custom ref={(node=>this.Custom = node)} />
        <div className='devicemanagement-top'>
          设备列表
          <div className='devicemanagement-top-bottombor' />
          <div className='devicemanagement-top-btn'>
            <button>分组列表</button>
            <button onClick={this.groupingopen.bind(this)}>+添加分组</button>
          </div>
        </div>
        <div className='devicemanagement-main'>
          <div className='devicemanagement-main-top'>
            <button onClick={this.deviceopen.bind(this)}>添加设备</button>
            <Message type="notice">
              本组对应渠道：支付宝扫码渠道
            </Message>
          </div>
          <div className='devicemanagement-main-content'>
            <Table loading={isLoading} dataSource={data} hasBorder={false}>
              <Table.Column title="设备ID" dataIndex="name" />
              <Table.Column title="今日流水/笔" dataIndex="level" />
              <Table.Column title="昨日流水/笔" dataIndex="rule" />
              <Table.Column title="累计流水/笔" dataIndex="1" />
              <Table.Column title={copybtn} dataIndex="2" cell={this.renderRule} />
              <Table.Column title="类型" dataIndex="3" />
              <Table.Column
                title="操作"
                width={200}
                dataIndex="oper"
                cell={this.renderOper}
              />
            </Table>
            <Pagination
              style={{ marginTop: '20px', textAlign: 'right' }}
              current={current}
              onChange={this.handlePaginationChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
