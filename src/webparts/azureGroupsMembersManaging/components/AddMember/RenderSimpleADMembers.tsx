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
  MessageBar,
  MessageBarType,
  PersonaSize,
  mergeStyles,
} from "@fluentui/react";
import { IAddADMembersSimpleProps } from "./IAddADMembersProps";
import styles from "../GetMembers/RenderMembers.module.scss";
import { IMember } from "../GetMembers/IMember";
import * as strings from "AzureGroupsMembersManagingWebPartStrings";

export default function RenderSimpleADMembers(props: IAddADMembersSimpleProps) {
  const { adusers, addUsers, isGroupChosen, chosenGroupDisplayName } = props;
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [suggestedUsers, setSuggestedUsers] = useState<IMember[]>([]);
  const [showWarning, setShowWarning] = useState<boolean>(false);

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
    setShowWarning(filtered.length === 0 && text !== "");
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
          <Text variant="large" styles={{ root: { fontWeight: "bold" } }}>
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
            <Text style={{ marginTop: "20px" }}>{strings.OrLabel}</Text>
            <TextField
              label={strings.Members.searchInEntraIDLabel}
              value={searchText}
              onChange={handleSearchInputChange}
              styles={{ fieldGroup: { width: 300, marginTop: "-1px" } }} // Adjust width as needed
            />
          </Stack>

          {suggestedUsers.map((user) => (
            <div key={user.id} className={mergeStyles(styles.memberContainer)}>
              <Persona
                key={user.id}
                text={user.displayName}
                size={PersonaSize.size32}
                onClick={() => handleSuggestionClick(user.id)}
                styles={{ root: { cursor: "pointer" } }} // Make the persona clickable
              />
            </div>
          ))}
          <DefaultButton
            disabled={!selectedUserId}
            onClick={() => addUsers(selectedUserId)}
            text={strings.Members.addUserBtnLabel}
            styles={{ root: { marginTop: "15px" } }} // Make the persona clickable
          />
          {showWarning && (
            <MessageBar  styles={{ root: { marginTop: "5px" } }} messageBarType={MessageBarType.warning}>
              {strings.Members.noMembersFoundWarning}
            </MessageBar>
          )}
        </>
      )}
    </>
  );
}
