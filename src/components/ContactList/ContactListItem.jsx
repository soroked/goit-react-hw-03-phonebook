export const ContactListItem = ({ deleteHandler, visibleContacts }) => {
  return (
    <>
      {visibleContacts.map(contact => (
        <li key={contact.id}>
          <p style={{ display: 'inline-block', margin: 0, marginRight: 10 }}>
            {contact.name}: {contact.number}
          </p>
          <button
            onClick={() => {
              deleteHandler(contact.id);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </>
  );
};
