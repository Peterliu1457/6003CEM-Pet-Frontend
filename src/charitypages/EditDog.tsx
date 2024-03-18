import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Checkbox, Button, Upload, Typography, Space, Divider, message } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UploadOutlined } from '@ant-design/icons';
import { breeds } from '../type/Breed';
import axios from 'axios';
import { IDog } from '../type/Dog';
import { useParams } from 'react-router-dom';
import useGetDog from '../hooks/getDog';

const { Title } = Typography;
const { Option } = Select;


const EditDog: React.FC = () => {
  const {dogId} = useParams();  
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const { dog, loading } = useGetDog(dogId as string);  
  const formik = useFormik<IDog>({
    initialValues: {
      name: '',
      age: 0,
      gender: 'male',
      breed: breeds[0].value,
      size: 'small',
      vaccine: false,
      photos: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      age: Yup.number().positive('Age must be a positive number').required('Age is required'),
      photos: Yup.array().min(1, 'At least one photo is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.put(`/api/dogs/${dogId}`, {
            ...values,
            photos: [...previewImages]
        });
        message.success('Dog updated successfully');
        
      } catch (err) {
        message.error('Error updating dog');
      }
    },
  });

  useEffect(() => {
    if (dog) {
        formik.setValues(dog, false);
        setPreviewImages(dog.photos);
    }
  }, [dog]);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result as string;
      setPreviewImages((prevImages) => [...prevImages, base64Image]);
      formik.setFieldValue('photos', [...formik.values.photos, base64Image]);
    };
  };

  if (loading) { 
    return <div>Loading...</div>;
  }

  if (!dog) {
    return <div>"Dog not found"</div>;
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        overflow: 'auto'
      }}
    >
      <div style={{ width: 600, backgroundColor: 'white', padding: '40px', borderRadius: '8px' }}>
        <Title level={3} style={{ textAlign: 'center', fontFamily: 'Roboto, sans-serif' }}>
          Edit Dog
        </Title>
        <Divider />
        <Form onFinish={formik.handleSubmit} layout='vertical'>
          <Form.Item
            help={formik.errors.name}
            validateStatus={formik.errors.name ? 'error' : undefined}
          >
            <Input name='name' placeholder="Name" value={formik.values.name} onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item
            help={formik.errors.age}
            validateStatus={formik.errors.age ? 'error' : undefined}
          >
            <Input name='age' type="number" placeholder="Age" value={formik.values.age} onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item name="gender" label='Gender'>
            <Select defaultValue={'male'} value={formik.values.gender} onChange={(value) => formik.setFieldValue('gender', value)}>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Dog breed"
            help={formik.errors.breed}
            validateStatus={formik.errors.breed ? 'error' : undefined}
          >
            <Select defaultValue={breeds[0].value} value={formik.values.breed} 
                onChange={(value) => formik.setFieldValue('breed', value)}>
              {breeds.map((breed) => (
                <Option key={breed.value} value={breed.value}>
                    {breed.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item  label="Dog size">
            <Select defaultValue={'small'} value={formik.values.size} onChange={(value) => formik.setFieldValue('size', value)}>
              <Option value="small">Small</Option>
              <Option value="medium">Medium</Option>
              <Option value="big">Big</Option>
            </Select>
          </Form.Item>
          <Form.Item valuePropName="checked">
            <Checkbox checked={formik.values.vaccine} onChange={(e) => formik.setFieldValue('vaccine', e.target.checked)}>
              Vaccinated
            </Checkbox>
          </Form.Item>
          <Form.Item
            help={formik.errors.photos}
            validateStatus={formik.errors.photos ? 'error' : undefined}
          >
            <Upload
              listType="picture-card"
              showUploadList={false}
              multiple
              beforeUpload={(file) => {
                handleImageUpload(file);
                return false; 
              }}
            >
              <Button icon={<UploadOutlined />}>Upload Photos</Button>
            </Upload>
            <Space wrap>
              {previewImages.map((image, index) => (
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <img  src={image} alt={`Preview ${index}`} style={{ maxWidth: '100px' }} />
                    <Button type="primary" danger onClick={() => {
                        setPreviewImages((prevImages) => prevImages.filter((_, i) => i !== index));
                        formik.setFieldValue('photos', formik.values.photos.filter((_, i) => i !== index));
                    }}>Remove</Button>
                </div>
              ))}
            </Space>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditDog;