import * as React from "react";
import { Text, TextField, Persona, Stack, DefaultButton } from "@fluentui/react";
import { IAddADMembersProps } from './IAddADMembersProps';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import styles from './RenderADMembers.module.scss'; // Import the SCSS file
import { IMember } from "../GetMembers/IMember";

export default function RenderExtendADMembers(props: IAddADMembersProps) {
  const { users, addUsers, isGroupChosen , chosenGroupDisplayName} = props;
  const [searchText, setSearchText] = React.useState<string>('');

  const filteredUsers = searchText
  ? users.filter((user: IMember) => user.displayName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
  : users;

  return (
    <>
      {isGroupChosen && (
        <>
          <h2> Add members to group {chosenGroupDisplayName}</h2>
          <TextField
            label="Search users"
            value={searchText}
            onChange={(event, newValue) => setSearchText(newValue || '')}
          />
          {filteredUsers && filteredUsers.length > 0 ? (
            filteredUsers.map((user: IMember) => (
              <Stack key={user.id} horizontal verticalAlign="center" className={mergeStyles(styles.userContainer, user.isNew && styles.newUser)}>
                <Persona
                  imageUrl={user.imageUrl} // Provide the URL of the user's image
                  text={user.displayName} // Display name of the user
                  secondaryText={user.jobTitle} // Job title or secondary information
                />
                <DefaultButton
                  onClick={() => addUsers(user.id)} // Function to add the user
                  iconProps={{ iconName: 'Add' }} // Use the Add icon
                  className={styles.addButton} // Apply the styles from SCSS
                />
              </Stack>
            ))
          ) : (
            <Text>No users found</Text>
          )}
        </>
      )}
    </>
  );
}
