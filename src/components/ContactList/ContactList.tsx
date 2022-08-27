import { Contact } from '../App/App';
import * as S from './ContactList.styled';
import { Box } from '../../utils/Box';
import { AiFillCloseCircle } from 'react-icons/ai';
import React from 'react';

type Props = {
  contacts: Contact[];
  onDeleteContactClick: (id: string) => void;
};

export const ContactList: React.FC<Props> = ({
  contacts,
  onDeleteContactClick,
}) => {
  const handleDeleteContactClick = (id: string) => {
    onDeleteContactClick(id);
  };

  const contactsAvailable = contacts.length;

  if (!contactsAvailable) {
    return <Box as="h2">No results here</Box>;
  }

  return (
    <Box as={S.ContactList} mx="auto">
      {contactsAvailable && (
        <>
          {contacts.map(c => (
            <Box
              as="li"
              key={c.id}
              width="auto"
              display="flex"
              alignItems="center"
              justifyContent="space-between">
              <p>{c.fullName}</p>
              <p>{c.phoneNumber}</p>
              <S.RemoveButton
                type="button"
                onClick={() => handleDeleteContactClick(c.id)}>
                <AiFillCloseCircle size={20} />
              </S.RemoveButton>
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};
