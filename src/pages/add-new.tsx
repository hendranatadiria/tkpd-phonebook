import { AllCapsHeader, BottomBarContainer, HelperText, IconButton, OutlinedButton, StyledButton, TextField, TextHeader } from '@/components/commons'
import { colors } from '@/config/theme';
import { useAppDispatch, useAppSelector } from '@/redux';
import { fetchContacts, fetchFavorites } from '@/redux/slices/phonebook';
import { insertContactSchema } from '@/schema/phonebook';
import { INSERT_CONTACT } from '@/services/phonebook';
import {LeftOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { ApolloError, useMutation } from '@apollo/client';
import styled from '@emotion/styled';
import { useFormik } from 'formik'
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react'
import toast from 'react-hot-toast';
import PhoneInputWithCountrySelect from 'react-phone-number-input';
import 'react-phone-number-input/style.css'



const StyledPhoneInput = styled(PhoneInputWithCountrySelect)`
    border: none;
    margin-bottom: 1rem;
    border-radius: 0;
    background-color: transparent;
    &:focus {
        outline: none;
        border-bottom: 2px solid ${colors.primary};
    }
    & input {
        background-color: transparent;
        border: none;
        border-bottom: 2px solid ${colors.textPrimary};
        &:focus {
            outline: none;
            border-bottom: 2px solid ${colors.primary};
        }
    }
`;

const PhoneInputContainer = styled.div`
    display: flex;
    align-items: space-between;
    justifyContent: center;
    gap: 0.5rem;
    margin: 0.75rem 0px;
    background-color: #f5f5f5;
    padding: 0.7rem 0.8rem 0px 0.7rem;
    border-radius: 0.5rem;

`;

const RemoveItemBtn = styled(StyledButton)`
    background-color: #f44336;
    padding: 0rem 0.5rem;
    font-size: 0.8rem;
    max-height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TitleButton = styled.button`
    font-size: 1.5rem;
    padding: 0px;
    margin-right: 0.5rem;
    & .anticon {
        vertical-align: initial;
    }

`;

export default function AddNewPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [addContact] = useMutation(INSERT_CONTACT, {
        onCompleted: () => {
            console.log("FINISHED!!!");
            dispatch(fetchContacts(state.currentPage));
            dispatch(fetchFavorites());
            router.push('/');
        }
    });
    const state = useAppSelector(state => state.phonebook);

    const initialValues: {
        first_name: string,
        last_name: string,
        phones: string[],
    } = {
        first_name: '',
        last_name: '',
        phones: [''],
    };

    const formik = useFormik({
        initialValues,
        validationSchema: insertContactSchema,
        onSubmit: (values) => {
            const {first_name, last_name, phones} = values;
            const mappedPhones = phones.map(phone => ({number: phone}));
            try {

            addContact({
                variables: {
                    first_name,
                    last_name,
                    phones: mappedPhones
                }
            }).then((response) => {
                console.log(response);
            });
            } catch (e) {
                console.log(e);
                if (e instanceof ApolloError) {
                    toast.error(e.message);
                } else {
                    toast.error('An error occured');
                }
            }
        },
    });

    const removePhone = useCallback((index: number) => {
        const newPhones = [...formik.values.phones];
        newPhones.splice(index, 1);
        formik.setFieldValue('phones', newPhones);
    }, [formik]);

    const updatePhone = useCallback((index: number, value?: string) => {
        const newPhones = [...formik.values.phones];
        newPhones[index] = value ?? '';
        formik.setFieldValue('phones', newPhones);
    }, [formik]);

    const addPhone = useCallback(() => {
        const newPhones = [...formik.values.phones];
        newPhones.push('');
        formik.setFieldValue('phones', newPhones);
    }, [formik]);

    const navigateHome = useCallback(() => {
        router.push('/');
    }, [router]);

    console.log(formik.errors);


  return (<>
        <Head>
            <title>Add New Contact - Tokopedia WPE Test Project - Bernardinus Hendra Natadiria</title>
        </Head>
        <TextHeader>
            <TitleButton onClick={navigateHome}><LeftOutlined/></TitleButton>
            Add New Contact
        </TextHeader>
        <TextField name="first_name" placeholder='First Name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.first_name}
            error={Boolean(formik.touched.first_name) && Boolean(formik.errors.first_name)} helperText={(Boolean(formik.touched.first_name) && Boolean(formik.errors.first_name)) ? formik.errors.first_name : ''}/>
        
        <TextField name="last_name" placeholder='Last Name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.last_name}
            error={Boolean(formik.touched.last_name) && Boolean(formik.errors.last_name)} helperText={(Boolean(formik.touched.last_name) && Boolean(formik.errors.last_name)) ? formik.errors.last_name : ''}/>

        <AllCapsHeader>
            Phone Numbers
        </AllCapsHeader>
        {formik.values.phones?.map((phone, index) => {
            return (
                <PhoneInputContainer key={index} >
                    <div style={{flexGrow: 1}}>
                        <StyledPhoneInput  name={`phones.${index}`} placeholder='Phone Number' 
                        onChange={(value) => updatePhone(index, value)} value={phone}/>
                        {Boolean(formik.errors.phones?.[index]) && <HelperText error={Boolean(formik.errors.phones?.[index])}>
                        {(Boolean(formik.errors.phones?.[index])) ? formik.errors.phones?.[index] : ''}
                        </HelperText>}
                    </div>
                        {index !== 0 && (
                        <RemoveItemBtn type="button" 
                            onClick={() => removePhone(index)}>
                            <MinusOutlined/>
                        </RemoveItemBtn>
                        )}
                </PhoneInputContainer>
            )
        })}

        <OutlinedButton type="button" onClick={() => addPhone()} fullWidth>
            <PlusOutlined /> Add Number
        </OutlinedButton>
        
        <BottomBarContainer>
            <StyledButton type="submit" onClick={() => formik.handleSubmit()} fullWidth>
                Save Contact
            </StyledButton>
        </BottomBarContainer>

    </>
  )
}
