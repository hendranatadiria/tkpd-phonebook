import React from 'react'
import { Card, CardTitle, IconButton, TextField } from '../commons'
import styled from '@emotion/styled';
import { BackwardOutlined } from '@ant-design/icons';

const FormTextField = styled(TextField)`
margin-bottom: 0.5rem;
`;

export default function AddNewContact() {
  return (
    <Card>
    <CardTitle style={{marginBottom: '1rem'}}>Add New Contact</CardTitle>
    <FormTextField name="firstName" placeholder='First Name' />       
    <FormTextField name="lastName" placeholder='Last Name' />       
    <FormTextField name="phoneNumber" placeholder='Phone Number' />
  </Card>  )
}
