import { Form, Row, Col, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import style from './index.module.scss';

interface IFieldItem {
  label: React.ReactNode;
  field: string;
  rules?: Array<any>;
  msg?: string;
  children?: React.ReactNode;
}

interface IProps extends FormComponentProps {
  fields: Array<IFieldItem>;
  onSearch?: (arg: any) => void;
  onReset?: (arg: any) => void;
}

const _Search: React.FC<IProps> = ({ form, fields = [], onSearch }) => {
  const getFields = () => {
    const count = 6;

    const { getFieldDecorator } = form;
    const children = [];
    for (const field of fields) {
      children.push(
        <Col xs={24} sm={12} md={6} key={field.field}>
          <Form.Item
            label={field.label}
            labelCol={{
              xs: { span: 24 },
              sm: { span: 12 },
              md: { span: 6 },
            }}
          >
            {getFieldDecorator(field.field, {
              rules: field.rules,
            })(
              field.children ? (
                field.children
              ) : (
                <Input width={'100%'} placeholder={field.msg || 'placeholder'} />
              )
            )}
          </Form.Item>
        </Col>
      );
    }
    return children;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      onSearch(values);
    });
  };

  const handleReset = () => {
    form.resetFields();
  };

  const submitContent = (
    <Form.Item>
      <Button type="primary" htmlType="submit">
        搜索
      </Button>
      <Button style={{ marginLeft: 8 }} onClick={handleReset}>
        重置
      </Button>
    </Form.Item>
  );

  return (
    <Form className={style.wrapper} layout="inline" onSubmit={handleSearch}>
      <Row className={style.content}>
        {getFields()}

        {fields.length <= 3 && <Col>{submitContent}</Col>}
      </Row>
      {fields.length > 3 && (
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            {submitContent}
          </Col>
        </Row>
      )}
    </Form>
  );
};

export const Search = Form.create<IProps>({ name: 'advanced_search' })(_Search);
