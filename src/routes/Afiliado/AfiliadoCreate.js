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
export default class AfiliadoCreate extends PureComponent {
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
    
    return(
      <PageHeaderLayout
        title="Crear Afiliado"
        content="Crear nuevos Afiliados."
      >
        <Card bordered={false}>
          <Form hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="NSS">
              {getFieldDecorator('nss', {
                rules: [
                  {
                    required: true,
                    message: 'Ingresa el Número de Seguridad Social',
                  },
                ],
              })(<Input placeholder="Ingresa el Número de Seguridad Social" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Nombre">
              {getFieldDecorator('nombre', {
                rules: [
                  {
                    required: true,
                    message: 'Ingresa el Nombre completo del Afiliado',
                  },
                ],
              })(<Input placeholder="Ingresa el Nombre completo del Afiliado" />)}
            </FormItem>
            <Form.Item {...formItemLayout} label="Fecha de Afiliación">
              {getFieldDecorator('fechaafiliacion', {
                rules: [{ required: true, message: 'Favor de elegir' }],
              })(
                <DatePicker
                  placeholder="Fecha de Afiliación"
                  style={{ width: '100%' }}
                  getPopupContainer={trigger => trigger.parentNode}
                />
              )}
            </Form.Item>
            <FormItem {...formItemLayout} label="Observaciones">
              {getFieldDecorator('observaciones')
              (
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder="Ingresa alguna observación relacionada su la afiliación."
                  rows={4}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Sexo" help="Sexo del Afiliado">
              <div>
                {getFieldDecorator('sexo', {
                  initialValue: '0',
                })(
                  <Radio.Group>
                    <Radio value="1">Femenino</Radio>
                    <Radio value="2">Masculino</Radio>
                  </Radio.Group>
                )}
              </div>
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                Enviar
              </Button>
              <Button style={{ marginLeft: 8 }}>Guardar</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}