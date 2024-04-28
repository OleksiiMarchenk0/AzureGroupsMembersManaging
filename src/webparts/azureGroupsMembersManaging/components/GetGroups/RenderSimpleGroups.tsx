import * as React from "react";
import { IListGroupsProps } from "./IListGroupsProps";
import {
  Text,
  Dropdown,
  IDropdownOption,
  MessageBar,
  MessageBarType,
} from "@fluentui/react";
import * as strings from "AzureGroupsMembersManagingWebPartStrings";
import { IGroupProps } from "./IGroupProps";
export default function RenderGroups(props: IListGroupsProps) {
  const { groups, getChosenGroupIdAndName } = props;

  const handleGroupChange = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption
  ) => {
    if (option) {
      const groupId = option.key.toString();
      const displayName = option.text;
      getChosenGroupIdAndName(groupId, displayName);
    }
  };

  // Convert groups to dropdown options
  const dropdownOptions: IDropdownOption[] = groups.map(
    (group: IGroupProps) => ({
      key: group.id,
      text: group.displayName,
    })
  );

  return (
    <div>
      <Text variant="xLarge" styles={{ root: { fontWeight: "bold" } }}>
        {strings.Group.availableLabel}
      </Text>
      {dropdownOptions.length > 0 ? (
        <Dropdown
          placeholder={strings.Group.label}
          options={dropdownOptions}
          onChange={handleGroupChange}
          styles={{ dropdown: { width: 300, marginTop: "5px" } }} // Adjust width as needed
        />
      ) : (
        <MessageBar
          styles={{ root: { marginTop: "5px" } }}
          messageBarType={MessageBarType.warning}
        >
          {strings.Group.noAvailableWarningLabel}
        </MessageBar>
      )}
    </div>
  );
}
