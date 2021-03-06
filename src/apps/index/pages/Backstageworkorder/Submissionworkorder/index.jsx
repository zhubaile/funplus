/* eslint  react/no-string-refs: 0 */
import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Input, Radio, Select , Upload, Grid, Form, Step,Button,Message } from '@alifd/next';
import Nav from '../components/Nav';
import { workOrderworkOrderInsert } from '@indexApi';
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
class Submissionworkorder extends Component {
  static displayName = 'Submissionworkorder';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      sidebarnav: false, // 传给Nav界面，让其显示样式
      value: {
        // enterprisename: '',
        title: '',
        description: '',
        // encryptMessage: '',
        level: '标准',
        avatar: [],
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

  // 提交
  validateAllFormField = (values, errors) => {
    if (errors) {
      return null;
    }
    let images;
    if (values.avatar.length == 1) {
      images = values.avatar[0].response.names;
    }
    debugger;
    workOrderworkOrderInsert({
      type: '1',
      image: images,
      ...values,
    }).then(({ status,data })=>{
      if (data.errCode == 0) {
        Message.success(data.message);
        this.props.history.push('/admin/backstageworkorder/Allworkorders');
      } else {
        Message.success(data.message);
      }
    });
  };

  render() {
    const { data, disabled, province, city } = this.state;
    const level = [
      { value: '标准', label: '标准' },
      { value: '紧急', label: '紧急' },
    ];
    const {
      intl: { formatMessage },
    } = this.props;
    return (
      <div className='backstageworkorder'>
        <Nav defaultActiveKey='2' history={this.props.history} sidebarnav={this.state.sidebarnav} />
        <div className='submissionworkorder'>
          <div className='submissionworkorder-top'>
            <span>提交工单</span>
            <div className='submissionworkorder-top-border' />
          </div>
          <div className='submissionworkorder-main'>
            <div className='submissionworkorder-left'>
              <Form value={this.state.value} onChange={this.formChange} ref="form">
                <div style={styles.formContent}>
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
                    <Input name="title" placeholder="工单标题" />
                  </FormItem>
                  {/* 企业联系地址 */}
                  <FormItem
                    // label={formatMessage({ id: 'app.setting.name' })}
                    label='工单描述：'
                    {...formItemLayout}
                    required
                    // maxLength={20}
                    requiredMessage={formatMessage({
                      id: 'app.setting.name.message',
                    })}
                  >
                    <Input.TextArea
                      name='description'
                      placeholder="Type your message here..."
                      rows={10}
                    />
                    <span>
                    温馨提示：您所提交的工单问题服务时间为周一至周五9:00-18:00（节假日除外 ）我们会在两个工作日内处理，请您耐心等待。
                    </span>
                  </FormItem>
                  {/* <FormItem
                    // label={formatMessage({ id: 'app.setting.name' })}
                    label='加密信息：'
                    {...formItemLayout}
                    required
                    maxLength={18}
                    requiredMessage={formatMessage({
                      id: 'app.setting.name.message',
                    })}
                  >
                    <Input name="encryptMessage" placeholder="选填" />
                    <span>请在此填写账号、密码和加密信息，我们会在后台为您处理，确保信息安全。</span>
                  </FormItem> */}
                  <FormItem
                    // name='selectiontime'
                    // label={formatMessage({ id: 'app.setting.name' })}
                    label='紧急程度：'
                    {...formItemLayout}
                    required
                    requiredMessage={formatMessage({
                      id: 'app.setting.name.message',
                    })}
                  >
                    <Select name='level' style={styles.formSelect} dataSource={level} defaultValue="标准" />
                  </FormItem>
                  {/* 上传附件 */}
                  {/* <FormItem
                    // label={formatMessage({ id: 'app.setting.avatar' })}
                    label='上传附件：'
                    {...formItemLayout}
                  >
                    <Upload.Card
                      action="/web/beta/v1.0/upload/uploadPhoto"
                      name="avatar"
                      limit={1}
                      accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                      beforeUpload={beforeUpload}
                      onChange={onChange}
                      onSuccess={onSuccess}
                      onError={onError}
                      formatter={(res, file) => {
                        return {
                          success: res.errCode === 0 ,
                          url: res.data.downloadURL,
                          names: res.data.name,
                        };
                      }}
                    />
                  </FormItem> */}
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
                      name="linkPhone"
                      placeholder="联系人真实手机号"
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
                    <Input htmlType="email" name="linkEmail" placeholder="联系人邮箱" />
                  </FormItem>
                  {/* 联系人qq */}

                  <div className='submissionworkorder-left-subbtn'>
                    <Button style={{ borderColor: '#A3D0FD' }} type="primary">保存</Button>
                    <Form.Submit
                      style={{ backgroundColor: '#245CE3', color: '#ffffff' }}
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

            {/*            <div className='submissionworkorder-right'>
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
            </div> */}

            <div className='submissionworkorder-right'>
              <h2>提交工单注意事项：</h2>
              <ul>
                <li>请尽量描述清楚您的问题，建议留下与问题相关的网站网址或网站后台账号、密码，以方便高效解决您的问题；</li>
                <li>建议留下您的手机或座机等联系方式，以便需要时可以及时联系到您；</li>
                <li>请选择与您问题匹配的工单类型，以便您的问题直接分配给相关领域的专家，答复更快更精准；</li>
                <li>公司基本信息将用于认证账户，会完全保密，信息提交后2个工作日内完成审核。</li>
              </ul>
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
