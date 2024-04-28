import * as React from "react";
import { IGroup, IListGroupsProps } from "./IListGroupsProps";
import {
  Text,
  Dropdown,
  IDropdownOption,
  MessageBar,
  MessageBarType,
} from "@fluentui/react";
import * as strings from "AzureGroupsMembersManagingWebPartStrings";
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
  const dropdownOptions: IDropdownOption[] = groups.map((group: IGroup) => ({
    key: group.id,
    text: group.displayName,
  }));

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
          styles={{ dropdown: { width: 300 } }} // Adjust width as needed
        />
      ) : (
        <MessageBar messageBarType={MessageBarType.warning}>
         {strings.Group.noAvailableWarningLabel}
        </MessageBar>
      )}
    </div>
  );
}
