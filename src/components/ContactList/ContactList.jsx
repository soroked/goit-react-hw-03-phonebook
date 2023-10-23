import { ContactListItem } from './ContactListItem';

export const ContactList = ({ deleteHandler, children }) => {
  return (
    <ul>
      <ContactListItem
        deleteHandler={deleteHandler}
        visibleContacts={children}
      />
    </ul>
  );
};
