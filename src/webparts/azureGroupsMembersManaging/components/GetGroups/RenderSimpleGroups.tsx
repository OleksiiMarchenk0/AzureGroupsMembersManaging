import * as React from 'react';
import { IGroup, IListGroupsProps } from './IListGroupsProps';
import { Dropdown, IDropdownOption } from '@fluentui/react';

export default function RenderGroups(props: IListGroupsProps) {
  const { groups, getChosenGroupIdAndName } = props;

  const handleGroupChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => {
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
      <h2>Select a group</h2>
      <Dropdown
        placeholder="Select a group"
        options={dropdownOptions}
        onChange={handleGroupChange}
        styles={{ dropdown: { width: 300 } }} // Adjust width as needed
      />
    </div>
  );
}