import  { useState } from "react";
import * as React from "react";
import {
  Text,
  Dropdown,
  IDropdownOption,
  DefaultButton,
  TextField,
  Persona,
  Stack,
} from "@fluentui/react";
import { IAddADMembersProps } from "./IAddADMembersProps";

export default function RenderSimpleADMembers(props: IAddADMembersProps) {
  const { users, addUsers, isGroupChosen, chosenGroupDisplayName } = props;
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [suggestedUsers, setSuggestedUsers] = useState<any[]>([]);

  const handleUserChange = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption
  ) => {
    if (option) {
      setSelectedUserId(option.key.toString());
    } else {
      setSelectedUserId(null);
    }
  };

  // Update suggested users based on search text
  const updateSuggestedUsers = (text: string) => {
    const filtered = users.filter((user: any) =>
      user.displayName.toLowerCase().includes(text.toLowerCase())
    );
    setSuggestedUsers(filtered);
  };

  const handleSearchInputChange = (
    event: React.FormEvent<HTMLInputElement>,
    newValue?: string
  ) => {
    const newSearchText = newValue || "";
    setSearchText(newSearchText);
    updateSuggestedUsers(newSearchText);
  };

  const handleSuggestionClick = (userId: string) => {
    setSelectedUserId(userId);
    setSearchText("");
    setSuggestedUsers([]);
  };

  return (
    <>
      {isGroupChosen && (
        <>
          <h2>Add members to group {chosenGroupDisplayName}</h2>
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
            <Dropdown
              placeholder="Select a user from Entra ID"
              options={users.map((user: any) => ({
                key: user.id,
                text: user.displayName,
                
              }))}
              selectedKey={selectedUserId}
              onChange={handleUserChange}
              styles={{ dropdown: { width: 300 , marginTop: '27px' } }} // Adjust width as needed
            />
            <Text>or</Text>
            <TextField
              label="Search users in Entra ID"
              value={searchText}
              onChange={handleSearchInputChange}
              styles={{ fieldGroup: { width: 300 } }} // Adjust width as needed
            />
          </Stack>
          <Stack horizontal tokens={{ childrenGap: 10 }}>
            {suggestedUsers.map((user) => (
              <Persona
                key={user.id}
                text={user.displayName}
                secondaryText={user.jobTitle} // Or any other secondary information
                onClick={() => handleSuggestionClick(user.id)}
                styles={{ root: { cursor: "pointer" } }} // Make the persona clickable
              />
            ))}
          </Stack>
          <DefaultButton
            disabled={!selectedUserId}
            onClick={() => addUsers(selectedUserId)}
            text="Add User"
            styles={{ root: {marginTop: '15px'} }} // Make the persona clickable
          />
        </>
      )}
    </>
  );
}