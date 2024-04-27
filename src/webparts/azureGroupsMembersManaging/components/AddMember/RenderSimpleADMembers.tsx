import { useState } from "react";
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
import { IAddADMembersSimpleProps } from "./IAddADMembersProps";
import { IMember } from "../GetMembers/IMember";
import * as strings from "AzureGroupsMembersManagingWebPartStrings";

export default function RenderSimpleADMembers(props: IAddADMembersSimpleProps) {
  const { adusers, addUsers, isGroupChosen, chosenGroupDisplayName } = props;
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [suggestedUsers, setSuggestedUsers] = useState<IMember[]>([]);

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
    const filtered = adusers.filter(
      (user: IMember) =>
        user.displayName.toLowerCase().indexOf(text.toLowerCase()) !== -1
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
          <Text variant="xLarge" styles={{ root: { fontWeight: "bold" } }}>
            {" "}
            {strings.Members.addToGroupLabel} {chosenGroupDisplayName}
          </Text>
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
            <Dropdown
              placeholder={strings.SelectAUserFromEntraIDLabel}
              options={adusers.map((user: IMember) => ({
                key: user.id,
                text: user.displayName,
              }))}
              selectedKey={selectedUserId}
              onChange={handleUserChange}
              styles={{ dropdown: { width: 300, marginTop: "27px" } }} // Adjust width as needed
            />
            <Text style={{ marginTop: '20px' }}>{strings.OrLabel}</Text>
            <TextField
              label={strings.Members.searchInEntraIDLabel}
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
                secondaryText={user.jobTitle}
                onClick={() => handleSuggestionClick(user.id)}
                styles={{ root: { cursor: "pointer" } }} // Make the persona clickable
              />
            ))}
          </Stack>
          <DefaultButton
            disabled={!selectedUserId}
            onClick={() => addUsers(selectedUserId)}
            text={strings.Members.addUserBtnLabel}
            styles={{ root: { marginTop: "15px" } }} // Make the persona clickable
          />
        </>
      )}
    </>
  );
}
