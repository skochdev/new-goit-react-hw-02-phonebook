import * as S from './AddNewContact.styled';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import styled from 'styled-components/macro';
import React from 'react';
import { Contact } from '../App';
import { nanoid } from 'nanoid';

let LoginSchema = yup.object().shape({
  fullName: yup.string().required(),
  phoneNumber: yup.string().required(),
});

interface Props {
  onAddNewContact: (newContact: Contact) => void;
}

const initialValues: Contact = {
  fullName: '',
  phoneNumber: '',
  id: '',
};

const ErrorText = styled.div`
  display: inline-block;
  font-size: ${p => p.theme.fontSizes.s};
  color: ${p => p.theme.colors.accent};
`;

const ValidationError = ({ name }: { name: string }) => {
  return (
    <ErrorMessage
      name={name}
      render={message => <ErrorText>{message}</ErrorText>}
    />
  );
};

export const AddNewContact: React.FC<Props> = ({ onAddNewContact }) => {
  const handleSubmit = (
    values: Contact,
    { resetForm }: { resetForm: () => void }
  ) => {
    onAddNewContact({ ...values, id: nanoid() });
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={LoginSchema}>
      <S.Form as={Form}>
        <label>
          Full Name
          <Field type="text" name="fullName" placeholder="fullName" />
        </label>
        <ValidationError name="fullName" />
        <label>
          Phone Number
          <Field type="phone" name="phoneNumber" placeholder="phoneNumber" />
        </label>
        <ValidationError name="phoneNumber" />
        <button type="submit">Submit</button>
      </S.Form>
    </Formik>
  );
};
