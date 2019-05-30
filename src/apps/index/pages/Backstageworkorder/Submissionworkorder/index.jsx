/* eslint  react/no-string-refs: 0 */
import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Input, Radio, Select , Upload, Grid, Form, Step,Button } from '@alifd/next';
import Nav from '../components/Nav';
import '../components/index.css';

const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { xxs: 8, s: 6, l: 5 },
  wrapperCol: { s: 12, l: 10 },
};
function beforeUpload(info) {
  console.log('beforeUpload callback : ', info);
}

function onChange(info) {
  console.log('onChane callback : ', info);
}

function onSuccess(data, file) {
  console.log('onSuccess callback : ', file);
}

function onError(file) {
  console.log('onError callback : ', file);
}
const provinceData = ['电商', '生活', '餐饮', '网络技术', '服务'];
const cityData = {
  电商: ['刘雅琪', '刘晓军', '留情啊'],
  生活: ['朱娇娇', '朱柏乐', '祝票选'],
  餐饮: ['王力宏', '王晨阳', '王家兴'],
  网络技术: ['张子琪', '张一一', '张力'],
  服务: ['Nanjing', 'Suzhou', 'Zhenjiang'],

};
class Submissionworkorder extends Component {
  static displayName = 'Submissionworkorder';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        enterprisename: '',
        businesslicense: '',
        contactaddress: '',
        homedirectory: '',
        subdirectory: '',
        businesslicenseimg: [],
        legalpersonimg: [],
        username: '',
        useremail: '',
        userqq: '',
        jiamixinxi: '',
        selectiontime: '标准',
      },
      data: [],
      disabled: true,
    };
    this.handleProvinceChange = this.handleProvinceChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
  }
  // 层级选择
  handleProvinceChange(value) {
    const data = cityData[value];
    this.setState({ data, province: value, city: '', disabled: !data });
  }
  // 子数据
  handleCityChange(value) {
    this.setState({ city: value });
    console.log(this.state.province, value);
  }

  onDragOver = () => {
    console.log('dragover callback');
  };

  onDrop = (fileList) => {
    console.log('drop callback : ', fileList);
  };

  formChange = (value) => {
    console.log('value', value);
    this.setState({
      value,
    });
  };

  validateAllFormField = (values, errors) => {
    console.log('error', errors, 'value', values);
    if (!errors) {
      // 提交当前填写的数据
    } else {
      // 处理表单报错
    }
  };

  render() {
    const { data, disabled, province, city } = this.state;
    const selectiontime = [
      { value: '标准', label: '标准' },
      { value: '紧急', label: '紧急' },
    ];
    const {
      intl: { formatMessage },
    } = this.props;
    return (
      <div className='backstageworkorder'>
        <Nav defaultActiveKey='2' />
        <div className='submissionworkorder'>
          <div className='submissionworkorder-top'>
            <span>全部工单</span>
            <div className='submissionworkorder-top-border' />
          </div>
          <div className='submissionworkorder-main'>
            <div className='submissionworkorder-left'>
              <div className='submissionworkorder-left-step'>
                <Step current={2} shape="arrow" animation>
                  <Step.Item title="新建工单" />
                  <Step.Item title="处理工单" />
                  <Step.Item title="待评价" />
                  <Step.Item title="完成" />
                </Step>
              </div>
              <Form value={this.state.value} onChange={this.formChange} ref="form">
                <div style={styles.formContent}>
                  {/* 企业名称 */}
                  <FormItem
                    // label={formatMessage({ id: 'app.setting.name' })}
                    label='工单类型：'
                    {...formItemLayout}
                    required
                    maxLength={10}
                    requiredMessage={formatMessage({
                      id: 'app.setting.name.message',
                    })}
                  >
                    <Input name="enterprisename" placeholder="请输入您的工单类型" />
                  </FormItem>
                  {/* 企业营业执照号码 */}
                  <FormItem
                    // label={formatMessage({ id: 'app.setting.name' })}
                    label='工单标题：'
                    {...formItemLayout}
                    required
                    maxLength={18}
                    requiredMessage={formatMessage({
                      id: 'app.setting.name.message',
                    })}
                  >
                    <Input name="businesslicense" placeholder="工单标题" />
                  </FormItem>
                  {/* 企业联系地址 */}
                  <FormItem
                    // label={formatMessage({ id: 'app.setting.name' })}
                    label='工单描述：'
                    {...formItemLayout}
                    required
                    maxLength={20}
                    requiredMessage={formatMessage({
                      id: 'app.setting.name.message',
                    })}
                  >
                    <Input.TextArea
                      placeholder="Type your message here..."
                      rows='10'
                    />
                    <span>
                    温馨提示：您所提交的工单问题服务时间为周一至周五9:00-18:00（节假日除外 ）我们会在两个工作日内处理，请您耐心等待。
                  </span>
                  </FormItem>
                  <FormItem
                    // label={formatMessage({ id: 'app.setting.name' })}
                    label='加密信息：'
                    {...formItemLayout}
                    required
                    maxLength={18}
                    requiredMessage={formatMessage({
                      id: 'app.setting.name.message',
                    })}
                  >
                    <Input name="jiamixinxi" placeholder="工单标题" />
                    <span>请在此填写账号、密码和加密信息，我们会在后台为您处理，确保信息安全。</span>
                  </FormItem>
                  <FormItem
                    name='selectiontime'
                    // label={formatMessage({ id: 'app.setting.name' })}
                    label='紧急程度：'
                    {...formItemLayout}
                    required
                    maxLength={20}
                    requiredMessage={formatMessage({
                      id: 'app.setting.name.message',
                    })}
                  >
                    <Select style={styles.formSelect} dataSource={selectiontime} defaultValue="标准" />
                  </FormItem>
                  {/* 上传附件 */}
                  <FormItem
                    // label={formatMessage({ id: 'app.setting.avatar' })}
                    label='上传附件：'
                    {...formItemLayout}
                    required
                    requiredMessage={formatMessage({
                      id: 'app.setting.avatar.message',
                    })}
                  >
                    {/* action 为代理的模式，在.webpackrc.js中设置 */}
                    <Upload.Card
                      action="/web/beta/v1.0/uploadPhoto"
                      name="businesslicenseimg"
                      limit={1}
                      accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                      beforeUpload={beforeUpload}
                      onChange={onChange}
                      onSuccess={onSuccess}
                      onError={onError}
                      formatter={(res, file) => {
                        // (上传图片)函数里面根据当前服务器返回的响应数据
                        // 重新拼装符合组件要求的数据格式   res为后端返回的数据
                        // success: res.errCode === 200 ,200没有引号,这个坑踩了三个小时
                        return {
                          success: res.errCode === 0 ,
                          url: res.data.downloadURL,
                        };
                      }}
                    />
                  </FormItem>
                  {/* 联系人信息 */}
                  {/* 联系人姓名 */}
                  <FormItem
                    // label={formatMessage({ id: 'app.setting.website' })}
                    label='用户手机：'
                    {...formItemLayout}
                    required
                    requiredMessage={formatMessage({
                      id: 'app.setting.website.message',
                    })}
                  >
                    <Input
                      name="username"
                      placeholder="联系人真实姓名"
                    />
                  </FormItem>
                  {/* 联系人常用邮箱 */}
                  <FormItem
                    // label={formatMessage({ id: 'app.setting.email' })}
                    label='用户邮箱：'
                    {...formItemLayout}
                    required
                    requiredMessage={formatMessage({
                      id: 'app.setting.email.message',
                    })}
                  >
                    <Input htmlType="email" name="useremail" placeholder="联系人邮箱" />
                  </FormItem>
                  {/* 联系人qq */}

                  <div className='submissionworkorder-left-subbtn'>
                    <Button type="primary">保存</Button>
                    <Form.Submit
                      type="primary"
                      validate
                      onClick={this.validateAllFormField}
                    >
                      <FormattedMessage id="app.setting.submit" />
                    </Form.Submit>
                  </div>
                </div>
              </Form>
            </div>
            <div className='submissionworkorder-right'>
              <div className='personalenter-right-box'>
                <h2>提交工单注意事项：</h2>
                <span>请尽量描述清楚您的问题，建议留下与问题相关的网站网址或网站后台账号、密码，以方便高效解决您的问题；</span>
              </div>
              <div className='personalenter-right-box'>
                <span>建议留下您的手机或座机等联系方式，以便需要时可以及时联系到您；</span>
              </div>
              <div className='personalenter-right-box'>
                <span>请选择与您问题匹配的工单类型，以便您的问题直接分配给相关领域的专家，答复更快更精准；</span>
              </div>
              <div className='personalenter-right-box'>
                <span>公司基本信息将用于认证账户，会完全保密，信息提交后2个工作日内完成审核。</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  label: {
    textAlign: 'right',
  },
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formItem: {
    alignItems: 'center',
    marginBottom: 25,
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
};

export default injectIntl(Submissionworkorder);