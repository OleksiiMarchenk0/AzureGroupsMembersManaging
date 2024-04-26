import * as React from "react";
import { Text } from "@fluentui/react";
import { IListMembersProps } from './IListMembersProps';
import { Persona, DefaultButton } from '@fluentui/react';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import styles from './RenderMembers.module.scss'; // Import the SCSS file

export default function RenderMembers(props: IListMembersProps) {
  const { members, removeUser, isGroupChosen } = props;

  return (
    <>
      {isGroupChosen && (
        <>
          <h2>Members of the group</h2>
          {members && members.length > 0 ? (
            members.map((member: any) => (
              <div key={member.id} className={mergeStyles({ position: 'relative', display: 'inline-block' })}>
                <Persona
                  imageUrl={member.imageUrl} // Provide the URL of the user's image
                  text={member.displayName} // Display name of the user
                  secondaryText={member.jobTitle} // Job title or secondary information
                />
                <DefaultButton
                  onClick={() => removeUser(member.id)} // Function to remove the user
                  iconProps={{ iconName: 'Cancel' }} // Use the Cancel icon
                  className={styles.cancelButton} // Apply the styles from SCSS
                />
              </div>
            ))
          ) : (
            <Text>No members found</Text>
          )}
        </>
      )}
    </>
  );
}
