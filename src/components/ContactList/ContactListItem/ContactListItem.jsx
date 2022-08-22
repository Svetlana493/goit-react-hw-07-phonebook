import PropTypes from 'prop-types';
import {
  ContactListItemBlock,
  ContactItemText,
  Button,
} from './ContactListItem.styled';

export const ContactListItem = ({ name, phone, id, deleteContact }) => {
  return (
    <ContactListItemBlock>
      <ContactItemText>
        {name}: {phone}
      </ContactItemText>
      <Button type="button" onClick={() => deleteContact(id)}>
        Delete
      </Button>
    </ContactListItemBlock>
  );
};

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
