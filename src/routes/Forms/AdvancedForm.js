import React, { PureComponent } from 'react';
import {
  Card,
  Button,
  Form,
  Icon,
  Col,
  Row,
  DatePicker,
  TimePicker,
  Input,
  Select,
  Popover,
} from 'antd';
import { connect } from 'dva';
import FooterToolbar from 'components/FooterToolbar';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import TableForm from './TableForm';
import styles from './style.less';

const { Option } = Select;
const { RangePicker } = DatePicker;

const fieldLabels = {
  name: 'Name',
  url: 'URL',
  owner: 'Owner',
  approver: 'Approver',
  dateRange: 'Effective date',
  type: 'Warehouse type',
  name2: 'Task name',
  url2: 'Mission details',
  owner2: 'Performer',
  approver2: 'Responsible',
  dateRange2: 'Effective date',
  type2: 'Task type',
};

const tableData = [
  {
    key: '1',
    workId: '00001',
    name: 'John Brown',
    department: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    workId: '00002',
    name: 'Jim Green',
    department: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    workId: '00003',
    name: 'Joe Black',
    department: 'Sidney No. 1 Lake Park',
  },
];

class AdvancedForm extends PureComponent {
  state = {
    width: '100%',
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }

  resizeFooterToolbar = () => {
    const sider = document.querySelectorAll('.ant-layout-sider')[0];
    const width = `calc(100% - ${sider.style.width})`;
    const { width: stateWidth } = this.state;
    if (stateWidth !== width) {
      this.setState({ width });
    }
  };

  render() {
    const { width: stateWidth } = this.state;
    const { form, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFieldsAndScroll, getFieldsError } = form;
    const validate = () => {
      validateFieldsAndScroll((error, values) => {
        if (!error) {
          // submit the values
          dispatch({
            type: 'form/submitAdvancedForm',
            payload: values,
          });
        }
      });
    };
    const errors = getFieldsError();
    const getErrorInfo = () => {
      const errorCount = Object.keys(errors).filter(key => errors[key]).length;
      if (!errors || errorCount === 0) {
        return null;
      }
      const scrollToField = fieldKey => {
        const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
        if (labelNode) {
          labelNode.scrollIntoView(true);
        }
      };
      const errorList = Object.keys(errors).map(key => {
        if (!errors[key]) {
          return null;
        }
        return (
          <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
            <Icon type="cross-circle-o" className={styles.errorIcon} />
            <div className={styles.errorMessage}>{errors[key][0]}</div>
            <div className={styles.errorField}>{fieldLabels[key]}</div>
          </li>
        );
      });
      return (
        <span className={styles.errorIcon}>
          <Popover
            title="表单校验信息"
            content={errorList}
            overlayClassName={styles.errorPopover}
            trigger="click"
            getPopupContainer={trigger => trigger.parentNode}
          >
            <Icon type="exclamation-circle" />
          </Popover>
          {errorCount}
        </span>
      );
    };
    return (
      <PageHeaderLayout
        title="Advanced form"
        content="Advanced forms are common in scenarios where one-time input and submission of large amounts of data."
        wrapperClassName={styles.advancedForm}
      >
        <Card title="Warehouse management" className={styles.card} bordered={false}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.name}>
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Please enter the name of the warehouse' }],
                  })(<Input placeholder="Please enter the name of the warehouse" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.url}>
                  {getFieldDecorator('url', {
                    rules: [{ required: true, message: 'Please choose' }],
                  })(
                    <Input
                      style={{ width: '100%' }}
                      addonBefore="http://"
                      addonAfter=".com"
                      placeholder="Please enter"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.owner}>
                  {getFieldDecorator('owner', {
                    rules: [{ required: true, message: 'Please select an administrator' }],
                  })(
                    <Select placeholder="Please select an administrator">
                      <Option value="xiao">Juan Perez</Option>
                      <Option value="mao">Zhou Maomao</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.approver}>
                  {getFieldDecorator('approver', {
                    rules: [{ required: true, message: 'Please select an approver' }],
                  })(
                    <Select placeholder="Please select an approver">
                      <Option value="xiao">Roberto Lopez</Option>
                      <Option value="mao">Maria Taboada</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.dateRange}>
                  {getFieldDecorator('dateRange', {
                    rules: [{ required: true, message: 'Please select the effective date' }],
                  })(
                    <RangePicker placeholder={['Start date', 'End date']} style={{ width: '100%' }} />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.type}>
                  {getFieldDecorator('type', {
                    rules: [{ required: true, message: 'Please select a warehouse type' }],
                  })(
                    <Select placeholder="Please select a warehouse type">
                      <Option value="private">Public</Option>
                      <Option value="public">Private</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="任务管理" className={styles.card} bordered={false}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.name2}>
                  {getFieldDecorator('name2', {
                    rules: [{ required: true, message: 'Please enter' }],
                  })(<Input placeholder="Please enter" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.url2}>
                  {getFieldDecorator('url2', {
                    rules: [{ required: true, message: 'Please choose' }],
                  })(<Input placeholder="Please enter" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.owner2}>
                  {getFieldDecorator('owner2', {
                    rules: [{ required: true, message: 'Please select an administrator' }],
                  })(
                    <Select placeholder="Please select an administrator">
                      <Option value="xiao">Javier Robles</Option>
                      <Option value="mao">Edson Vidal</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.approver2}>
                  {getFieldDecorator('approver2', {
                    rules: [{ required: true, message: 'Please select an approver' }],
                  })(
                    <Select placeholder="请选择审批员">
                      <Option value="xiao">付晓晓</Option>
                      <Option value="mao">周毛毛</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.dateRange2}>
                  {getFieldDecorator('dateRange2', {
                    rules: [{ required: true, message: '请输入' }],
                  })(
                    <TimePicker
                      placeholder="提醒时间"
                      style={{ width: '100%' }}
                      getPopupContainer={trigger => trigger.parentNode}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.type2}>
                  {getFieldDecorator('type2', {
                    rules: [{ required: true, message: '请选择仓库类型' }],
                  })(
                    <Select placeholder="请选择仓库类型">
                      <Option value="private">私密</Option>
                      <Option value="public">公开</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="Member management" bordered={false}>
          {getFieldDecorator('members', {
            initialValue: tableData,
          })(<TableForm />)}
        </Card>
        <FooterToolbar style={{ width: stateWidth }}>
          {getErrorInfo()}
          <Button type="primary" onClick={validate} loading={submitting}>
            Submit
          </Button>
        </FooterToolbar>
      </PageHeaderLayout>
    );
  }
}

export default connect(({ global, loading }) => ({
  collapsed: global.collapsed,
  submitting: loading.effects['form/submitAdvancedForm'],
}))(Form.create()(AdvancedForm));