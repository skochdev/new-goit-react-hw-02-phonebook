import * as S from './AddNewContact.styled';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import React from 'react';
import { Contact } from '../App/App';
import { nanoid } from 'nanoid';

// Yup validation schema ->
//
let LoginSchema = yup.object().shape({
  fullName: yup
    .string()
    .trim()
    .min(2, 'Full Name should consist of two or more letters')
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Name may contain only letters, apostrophe, dash and spaces'
    )
    .required('This field is required'),
  phoneNumber: yup
    .string()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Must start with +, should consist of numbers, dashes or spaces'
    )
    .required('This field is required'),
});

// Yup validation schema <-

// Formik-related ->
const initialValues: Contact = {
  fullName: '',
  phoneNumber: '',
  id: '',
};

const ValidationError = ({ name }: { name: string }) => {
  return (
    <ErrorMessage
      name={name}
      render={message => <S.ErrorText>{message}</S.ErrorText>}
    />
  );
};
// Formik-related <-

// Props +
interface Props {
  onAddNewContact: (newContact: Contact) => void;
}

// Props -

export const AddNewContact: React.FC<Props> = ({ onAddNewContact }) => {
  // collects form fields values and pass them up
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
        <S.FieldWrapper>
          <label>
            Full Name
            <Field type="text" name="fullName" placeholder="Obi-Wan Kenobi" />
          </label>
          <ValidationError name="fullName" />
        </S.FieldWrapper>
        <S.FieldWrapper>
          <label>
            Phone Number
            <Field
              type="phone"
              name="phoneNumber"
              placeholder="+380933065553"
            />
          </label>
          <ValidationError name="phoneNumber" />
        </S.FieldWrapper>
        <button type="submit">Add Contact</button>
      </S.Form>
    </Formik>
  );
};
