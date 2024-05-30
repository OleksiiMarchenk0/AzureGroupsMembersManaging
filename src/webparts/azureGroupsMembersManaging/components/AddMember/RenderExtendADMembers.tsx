import * as React from "react";
import {
  Text,
  TextField,
  Persona,
  Stack,
  DefaultButton,
  MessageBar,
  MessageBarType,
} from "@fluentui/react";
import { mergeStyles } from "@fluentui/react/lib/Styling";
import styles from "./RenderADMembers.module.scss"; // Import the SCSS file
import { IMember } from "../GetMembers/IMember";
import { IAddADMembersSimpleProps } from "./IAddADMembersProps";
import * as strings from "AzureGroupsMembersManagingWebPartStrings";

export default function RenderExtendADMembers(props: IAddADMembersSimpleProps):JSX.Element {
  const { adusers, addUsers, isGroupChosen, chosenGroupDisplayName } = props;
  const [searchText, setSearchText] = React.useState<string>("");

  const filteredUsers = searchText
    ? adusers.filter(
        (user: IMember) =>
          (user.displayName &&
            user.displayName.toLowerCase().indexOf(searchText.toLowerCase()) !==
              -1) ||
          (user.mail &&
            user.mail.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
      )
    : adusers;

  return (
    <>
      {isGroupChosen && (
        <>
          <Text variant="large" styles={{ root: { fontWeight: "bold" } }}>
            {" "}
            {strings.Members.addToGroupLabel} {chosenGroupDisplayName}
          </Text>
          <TextField
            label={strings.Members.searchInEntraIDLabel}
            value={searchText}
            onChange={(event, newValue) => setSearchText(newValue || "")}
          />
          {filteredUsers && filteredUsers.length > 0 ? (
            <Stack className={mergeStyles(styles.usersContainer)}>
              {filteredUsers.map((user: IMember) => (
                <Stack
                  key={user.id}
                  horizontal
                  verticalAlign="center"
                  className={mergeStyles(styles.userContainer)}
                >
                  {user.imageUrl ? (
                    <Persona
                      imageUrl={user.imageUrl} // Provide the URL of the user's image
                      text={user.displayName} // Display name of the user
                      secondaryText={user.jobTitle} // Job title or secondary information
                    />
                  ) : (
                    <Persona
                      text={user.displayName} // Display name of the user
                      secondaryText={user.jobTitle} // Job title or secondary information
                    />
                  )}

                  <DefaultButton
                    onClick={() => addUsers(user.id)} // Function to add the user
                    iconProps={{ iconName: "Add" }} // Use the Add icon
                    className={styles.addButton} // Apply the styles from SCSS
                  />
                </Stack>
              ))}
            </Stack>
          ) : (
            <MessageBar
              styles={{ root: { marginTop: "5px" } }}
              messageBarType={MessageBarType.warning}
            >
              {strings.Members.noMembersFoundWarning}
            </MessageBar>
          )}
        </>
      )}
    </>
  );
}
