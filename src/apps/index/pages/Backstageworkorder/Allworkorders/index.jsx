import React, { Component } from 'react';
import { Table,Button,Input,Grid ,DatePicker,Pagination,Dialog } from '@alifd/next';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Administrators from '../../Personal/components/Administrators/Administrators';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import '../../../layouts/BasicLayout/components/Header/index.scss';
import { workOrderworkList,workOrderdeleteWork,workOrderworkDetails } from '@indexApi';
import '../components/index.css';
import moment from "moment/moment";
import { Message } from "@alifd/next/lib/index";
// import { Dialog } from "@alifd/next/lib/index";

const { RangePicker } = DatePicker;
const { Row, Col } = Grid;

export default class Allworkorders extends Component {
  static displayName = 'Setting';

  constructor(props) {
    super(props);
    this.state = {
      sidebarnav: true, // 传给Nav界面，让其显示样式
      total: 0, // 总数据
      pageSize: 10, // 一页条数
      current: 1, // 页码
      isLoading: false,
      datas: [],
      value: {
        operationtime: [],
      },
    };
  }
  /* formChange = (value) => {
    this.props.onChange(value);
  }; */
  componentDidMount() {
    this.fetchData();
  }

  /* mockApi = (len) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getData(len)); // Promise.resolve(value)方法返回一个以给定值解析后的Promise 对象 成功以后携带数据
      }, 600);
    });
  }; */

  fetchData = (len) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        const pages = this.state.current;
        const pageSize = this.state.pageSize;
        const operationtime = this.state.value.operationtime;
        debugger;
        workOrderworkList({
          page: pages,
          pageSize,
          beginTime: operationtime,
        }).then(({ status,data })=>{
          debugger;
          if (data.errCode == 0) {
            this.setState({
              datas: data.data,
              isLoading: false,
            });
          } else {
            Message.success(data.message);
          }
        });
        /* this.mockApi(len).then((data) => { // data 里面为数据
          this.setState({
            data,
            isLoading: false,
          });
        }); */
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

  handleFilterChange = () => { // gengxin 5条新数据
    this.fetchData(5);
  };
  // 删除
  handleDelete = (id) => {
    debugger;
    const { datas } = this.state;
    workOrderdeleteWork({
      _id: id,
    }).then(({ status,data })=>{
      debugger;
      if (data.errCode == 0) {
        let index = -1;
        datas.forEach((item, i) => {
          if (item._id === id) {
            index = i;
          }
        });
        if (index !== -1) {
          datas.splice(index, 1);
          this.setState({
            datas,
          });
        }
      } else {
        Message.success(data.message);
      }
    });
    /* Dialog.confirm({
      title: '提示',
      content: '确认删除吗',
      onOk: () => {
        this.fetchData(10);
      },
    }); */
  };

  /* handleDetail = () => {
    Dialog.confirm({
      title: '提示',
      content: '暂不支持查看详情',
    });
  }; */
  // 详情
  handleDetail=(id)=> {
    this.props.history.push({ pathname: "/admin/backstageworkorder/Workorderdetails", state: { id } });
  }
  // 搜索框
  searchbtn() {
    this.refs.form.validateAll((errors, values) => {
      const arrivalDate = [];
      if (values.operationtime.length == 2) {
        const startdatestart = moment(values.operationtime[0]._d).valueOf();
        const startdateend = moment(values.operationtime[1]._d).valueOf();
        arrivalDate.push(startdatestart);
        arrivalDate.push(startdateend);
      }
      const pages = this.state.current;
      const pageSizes = this.state.pageSize;
      debugger;
      workOrderworkList({
        page: pages,
        pageSize: pageSizes,
        _id: values.worknumber,
        descriptions: values.relatedcharacters,
        beginTime: arrivalDate,
      }).then(({ status,data })=>{
        debugger;
        if (data.errCode == 0) {
          this.setState({
            datas: data.data,
          });
        }
      });
    });
  }
  renderOper = (value,index,record) => {
    return (
      <div>
        <a href="javascript:;" style={{ marginRight: '3px' }} onClick={this.handleDetail.bind(this,record._id)}>查看</a>
        <span>|</span>
        <a href="javascript:;" style={{ marginLeft: '3px' }} onClick={this.handleDelete.bind(this,record._id)} >删除</a>
        {/* <Button
          type="primary"
          style={{ marginRight: '5px' }}
          onClick={this.handleDetail}
        >
          查看
           <FormattedMessage id="app.btn.detail" />
        </Button>
        <Button type="normal" warning onClick={this.handleDelete}>
          删除
        </Button> */}
      </div>
    );
  };
  // 时间转换
  time=(e)=>{
    const updatedAt = moment(e).format('YYYY-MM-DD HH:mm:ss');
    return (
      <p>{updatedAt}</p>
    );
  }
  statusoneortwo=(e)=>{
    if (e == 1) {
      return ("受理中");
    } else if (e == 2) {
      return ("待评价");
    } else if (e == 3) {
      return ("已完成");
    } else if (e == 4) {
      return ("已存档");
    }
    return null;
  }
  render() {
    // const startValue = moment('2019-05-08', 'YYYY-MM-DD', true);
    // const endValue = moment('2017-12-15', 'YYYY-MM-DD', true);
    const { isLoading, datas, current, total, pageSize } = this.state;
    return (
      <div className='backstageworkorder'>
        <Nav defaultActiveKey='2' history={this.props.history} sidebarnav={this.state.sidebarnav} />
        <div className='wodegongdan'>
          <div className='wodegongdan-top'>
            <span>全部工单</span>
            <div className='wodegongdan-top-border' />
          </div>
          <div className='wodegongdan-conter'>
            <FormBinderWrapper
              value={this.state.value}
              onChange={this.formChange}
              ref="form"
            >
              <Row wrap gutter="20">
                <Col l="24">
                  <div className='wodegongdan-conter-main'>
                    <span>工单编号：</span>
                    <FormBinder name='worknumber'>
                      <Input placeholder='输入编号' hasClear />
                    </FormBinder>
                    <span>操作时间：</span>
                    <FormBinder name='operationtime'>
                      {/* <DatePicker /> */}
                      <RangePicker />
                      {/* <RangePicker showTime resetTime defaultValue={[startValue,endValue]} /> defaultValue={startValue}  */}
                    </FormBinder>
                    <span>关键字：</span>
                    <FormBinder name='relatedcharacters'>
                      <Input hsaClear />
                    </FormBinder>
                    <Button className='btn-all bg' size="large" type="secondary" onClick={this.searchbtn.bind(this)}>搜索</Button>
                  </div>
                </Col>
              </Row>
            </FormBinderWrapper>
          </div>
          <div className='wodegongdan-footer'>
            <Table loading={isLoading} dataSource={datas} hasBorder={false}>
              <Table.Column title="工单编号" dataIndex="_id" width={100} />
              <Table.Column title="工单标题" dataIndex="title" width={80} />
              <Table.Column title="描述" dataIndex="description" width={250} />
              <Table.Column title="优先级" dataIndex="level" width={70} />
              <Table.Column title="提交账号" dataIndex="account" width={100} />
              <Table.Column title="提交时间" dataIndex="createdAt" cell={this.time} width={100} />
              <Table.Column title="状态" dataIndex="status" cell={this.statusoneortwo} width={70} />
              <Table.Column
                title="操作"
                width={100}
                dataIndex="oper"
                cell={this.renderOper}
              />
            </Table>
            <Pagination
              style={styles.pagination}
              current={current}
              onChange={this.handlePaginationChange}
              pageSize={pageSize} // 界面展示多少条数据
              total={total} // 一共多少条数据
            />
          </div>
        </div>
      </div>
    );
  }
}
const styles = {
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
};
