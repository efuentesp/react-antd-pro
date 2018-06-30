import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting, form } = this.props;
    const { getFieldDecorator, getFieldValue } = form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderLayout
        title="Basic form"
        content="Form pages are used to collect or verify information to users, and basic forms are common in form scenarios where there are fewer data items."
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="Title">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter a title',
                  },
                ],
              })(<Input placeholder="Give the target a name" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Start and end dates">
              {getFieldDecorator('date', {
                rules: [
                  {
                    required: true,
                    message: 'Please select starting and ending dates',
                  },
                ],
              })(<RangePicker style={{ width: '100%' }} placeholder={['Start date', 'End date']} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Target description">
              {getFieldDecorator('goal', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter a description of the goal',
                  },
                ],
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder="Please enter your staged work goals"
                  rows={4}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Metrics">
              {getFieldDecorator('standard', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter a metric',
                  },
                ],
              })(<TextArea style={{ minHeight: 32 }} placeholder="Please enter a metric" rows={4} />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  Client
                  <em className={styles.optional}>
                    (optional)
                    <Tooltip title="Target service object">
                      <Icon type="info-circle-o" style={{ marginRight: 4 }} />
                    </Tooltip>
                  </em>
                </span>
              }
            >
              {getFieldDecorator('client')(
                <Input placeholder="Please describe the customer you serve, internal customer direct @ name / job number" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  Inviting critics
                  <em className={styles.optional}>(optional)</em>
                </span>
              }
            >
              {getFieldDecorator('invites')(
                <Input placeholder="Please direct 
                @name/work number, up to 5 people can be invited"
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  Weigths
                  <em className={styles.optional}>(optional)</em>
                </span>
              }
            >
              {getFieldDecorator('weight')(<InputNumber placeholder="Please enter" min={0} max={100} />)}
              <span className="ant-form-text">%</span>
            </FormItem>
            <FormItem {...formItemLayout} label="Open target" help="Customers and appraisers are shared by default">
              <div>
                {getFieldDecorator('public', {
                  initialValue: '1',
                })(
                  <Radio.Group>
                    <Radio value="1">Public</Radio>
                    <Radio value="2">Partially public</Radio>
                    <Radio value="3">Private</Radio>
                  </Radio.Group>
                )}
                <FormItem style={{ marginBottom: 0 }}>
                  {getFieldDecorator('publicUsers')(
                    <Select
                      mode="multiple"
                      placeholder="Open to"
                      style={{
                        margin: '8px 0',
                        display: getFieldValue('public') === '2' ? 'block' : 'none',
                      }}
                    >
                      <Option value="1">Colleague A</Option>
                      <Option value="2">Colleague B</Option>
                      <Option value="3">Colleague C</Option>
                    </Select>
                  )}
                </FormItem>
              </div>
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                Submit
              </Button>
              <Button style={{ marginLeft: 8 }}>Save</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
