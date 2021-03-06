import React, { Component } from 'react';
import { Tab,Button,Input } from '@alifd/next';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Administrators from '../../Personal/components/Administrators/Administrators';
import '../../../layouts/BasicLayout/components/Header/index.scss';
import '../components/index.css';
import { workOrderuserRecord,workOrderuserRecordOne } from '@indexApi';
import { actions, reducers, connect } from '@indexStore';
import { Message } from "@alifd/next/lib/index";
import moment from 'moment';
import io from 'socket.io-client';

const Cookies = require('js-cookie');

const listss = [];
/* const socket = io('http://192.168.1.105:3000', { // 指定后台的url地址
  path: '/web/beta/v1.0/', // 如果需要的话添加 path 路径以及其他可选项
}); */
// const socket = io("ws://192.168.1.105:3000");

class Customerservice extends Component {
  static displayName = 'Setting';

  constructor(props) {
    super(props);
    this.state = {
      Probleminput: '', // 输入框内容
      datas: [], // 之前的聊天记录
      messagelist: [], // 此刻聊天的记录
      array: [], // 用户的个人信息
      // username: '', // 当前客服名称,8-19更改成array.byReplyName
      byReplyId: '', // 客服id
      userId: '', // 用户id
    };
    // this.socket = io.connect(`ws://192.168.1.121:3000`,{ path: '/chat' },{ transports: ['websocket', 'polling'] });
    this.socket = io.connect(`ws://funplus.yue-net.com`,{ path: '/chat' },{ transports: ['websocket', 'polling'] });
    // this.socket = io.connect(`ws://192.168.1.121:3000`);
    // this.socket = io.connect(`ws://47.100.188.156`);
    this.onScrollHandle = this.onScrollHandle.bind(this);
  }
  /* socket.on('getMsg',()=>{

}) */
  // 定时器
  tick(userId) {
    debugger;
    this.socket.emit('heartbeat',userId);
  }
  // 解除定时器
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  componentDidMount() {
    const userId = Cookies.get('userId');
    // this.interval = setInterval(() => this.tick(userId), 3000);
    // 初始聊天记录内容
    workOrderuserRecordOne({
      userId,
      senderType: 1,
    }).then(({ status,data })=>{
      debugger;
      if (data.errCode == 0) {
        this.setState({
          datas: data.data, // 聊天记录
          array: data.userInfo,
          // username: data.userInfo.byReplyName,
          userId,
          byReplyId: data.userInfo.byReplyId,
        },()=>{
          this.onScrollHandle(this.messagesEnd);
        });
      } else {
        Message.success(data.message);
      }
    });
  }
  componentWillMount() {
    const userid = Cookies.get('userId');
    this.socket.on('connect',(...arg)=>{
      console.log("链接成功");
      this.socket.emit('binduser',userid);
    });
    this.socket.on('disconnect',(...arg)=>{
      console.log("链接销毁");
    });
    this.socket.on('message',(msg)=>{
      console.log(msg);
      debugger;
      this.setState((prevState)=>{
        prevState.messagelist.push(msg);
        return prevState;
      },()=>{
        this.onScrollHandle(this.messagesEnd);
      });
    });
  }
  // 输入框事件
  probleminput(v,e) {
    this.setState({
      Probleminput: v,
    });
  }
  // 回车事件
  onprobleminputKey = (e) => {
    if (e.keyCode == 13) {
      this.subreply();
    }
  }
  // 获取客服的id
  customerserviceid(e) {
    debugger;
    const userid = Cookies.get('userId'); // 用户的id
    workOrderuserRecord({
      userId: userid,
      byReplyId: e,
      senderType: 1,
    }).then(({ status,data })=>{
      debugger;
      if (data.errCode == 0) {
        this.setState({
          datas: data.data, // 获取之前的聊天记录
          messagelist: [], // 此刻聊天记录清空
          array: data.userInfo,
          // username: data.userInfo.byReplyName,
          byReplyId: e,
          userId: userid,
        },()=>{
          this.onScrollHandle(this.messagesEnd);
        });
      } else {
        Message.success(data.message);
      }
    });
    /* this.setState({
      serviceid: e,
    }); */
  }
  // 提交、发送信息
  subreply() {
    const byReplyId = this.state.byReplyId; // 客服id
    const userId = this.state.userId; // 用户的id
    const messagelist = this.state.messagelist; // 此刻聊天的内容
    const customerContent = this.state.Probleminput; // 输入框的值
    const times = moment().valueOf();
    debugger;
    if (!customerContent) {
      return Message.success('输入问题不能为空');
    }
    const myMsg = {
      byReplyId,
      userId,
      customerContent,
      times,
      senderType: 1,
    };
    // this.socket.send(myMsg);
    this.socket.emit('sayTo',myMsg);
    this.setState((prevState)=>{
      prevState.messagelist.push(myMsg);
      prevState.Probleminput = '';
      return prevState;
    },()=>{
      this.onScrollHandle(this.messagesEnd);
    });
  }
  // 自动滑动到底部
  onScrollHandle(event) {
    const clientHeight = event.clientHeight;
    const scrollHeight = event.scrollHeight;
    const scrollTop = (scrollHeight - clientHeight);
    this.messagesEnd.scrollTop = scrollTop;
  }
  render() {
    const { datas, messagelist,array } = this.state;
    const username = array.byReplyName;
    /* let username;
    if (array.byReplyName) {
      username = array.byReplyName;
    } */
    // 此刻的聊天记录
    const zbla = (
      messagelist.map((item) => {
        const userid = this.state.userId; // 自己的id
        const times = moment(item.times).format('YYYY-MM-DD HH:mm:ss');
        console.log(times);
        debugger;
        return (
          <div>
            {
              item.userId == userid ? (
                <div className="chat-message self">
                  <div className="chat-message-avatar">
                    <img alt="头像" src={this.props.Userinformation} />
                    <div>
                      <p>{array.username}</p>
                      <span>{times}</span>
                    </div>
                  </div>
                  <div className="chat-message-content-w">
                    <div className="chat-message-content">
                      {item.customerContent}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="chat-message">
                  <div className="chat-message-avatar">
                    <img alt="" src={require('@img/img/avatar2.jpg')} />
                    <div>
                      <p>{username}</p>
                      <span>{times}</span>
                    </div>
                  </div>
                  <div className="chat-message-content-w">
                    <div className="chat-message-content">
                      {item.customerContent}
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        );
      })
    );
    return (
      <div className='backstageworkorder'>
        <Nav defaultActiveKey='1' history={this.props.history} customerserviceid={this.customerserviceid.bind(this)} />
        <div className='kefu'>
          <div className="kefu-main">
            <div className="kefu-main-head">
              <i className="os-icon os-icon-mail-07 left" />
              <div>
                {username}
              </div>
              <i className="os-icon os-icon-phone-15 right" />
            </div>
            <div className="kefu-main-chatcontent" ref={(node) => { this.messagesEnd = node; }} >
              <div className="chat-content">
                {
                  datas.map((item) => {
                    return (
                      <div>
                        {
                          item.senderType == 2 ? (
                            <div className="chat-message">
                              <div className="chat-message-avatar">
                                <img alt="" src={require('@img/img/avatar2.jpg')} />
                                <div>
                                  <p>{item.username}</p>
                                  <span>{moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                                </div>
                              </div>
                              <div className="chat-message-content-w">
                                <div className="chat-message-content">
                                  {item.message}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="chat-message self">
                              <div className="chat-message-avatar">
                                <img alt="头像" src={this.props.Userinformation} />
                                <div>
                                  <p>{item.username}</p>
                                  <span>{moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                                </div>
                              </div>
                              <div className="chat-message-content-w">
                                <div className="chat-message-content">
                                  {item.message}
                                </div>
                              </div>
                            </div>
                          )
                        }
                      </div>
                    );
                  })
                }
                {zbla}
              </div>
            </div>
            <div className="chat-controls">
              <div className="chat-input">
                <Input.TextArea
                  placeholder="Type your message here..."
                  rows={10}
                  value={this.state.Probleminput}
                  onChange={this.probleminput.bind(this)}
                  onKeyDown={this.onprobleminputKey}
                  disabled={!username}
                  // ref={node => this.charmessageself = node}
                />
                {/* <input placeholder="Type your message here..." type="text" /> */}
              </div>
              <div className="chat-input-extra">
                <div className="chat-extra-actions">
                  <a href="#"><i className="os-icon os-icon-mail-07" /></a><a href="#"><i className="os-icon os-icon-phone-18" /></a><a href="#"><i className="os-icon os-icon-phone-15" /></a>
                </div>
                <div className="chat-btn">
                  <Button type='primary' size='large' onClick={this.subreply.bind(this)} >发送</Button>
                </div>
              </div>
            </div>

          </div>
          <div className='kefu-right'>
            <Administrators array={array} />
          </div>
        </div>
      </div>
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
)(Customerservice);
