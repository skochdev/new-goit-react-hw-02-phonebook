import * as S from './AddNewContact.styled';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import 'yup-phone';
import styled from 'styled-components/macro';
import React from 'react';
import { Contact } from '../App';
import { nanoid } from 'nanoid';

let LoginSchema = yup.object().shape({
  fullName: yup
    .string()
    .trim()
    .min(2, 'Full Name should consist of two or more letters')
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required(),
  phoneNumber: yup
    .string()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required(),
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
