import * as React from "react";
import { IListGroupsProps } from "./IListGroupsProps";
import styles from "./RenderGroups.module.scss";
import { Stack, Text, TextField } from "@fluentui/react";
import * as strings from "AzureGroupsMembersManagingWebPartStrings";
import { IGroupProps } from "./IGroupProps";

export default function RenderGroups(props: IListGroupsProps):JSX.Element {
  const [selectedGroupId, setSelectedGroupId] = React.useState<string | null>(
    null
  );
  const [selectedGroupDisplayName, setSselectedGroupDisplayName] =
    React.useState<string | null>(null);
  const [searchText, setSearchText] = React.useState<string>("");
  const { groups, getChosenGroupIdAndName , chosenGroupId} = props;
  console.log(selectedGroupDisplayName);

  const handleGroupClick = (groupId: string, displayName: string):void => {
    getChosenGroupIdAndName(groupId, displayName);
    setSelectedGroupId(groupId);
    setSselectedGroupDisplayName(displayName);
  };

  const renderGroupItem = (group: IGroupProps, index: number): JSX.Element => {
    const isSelected = selectedGroupId === group.id|| chosenGroupId === group.id;
    return (
      <div
        key={group.id}
        className={`${styles.listItem} ${isSelected ? styles.selected : ""}`}
        onClick={() => handleGroupClick(group.id, group.displayName)}
      >
        <Text as="div" className={styles.groupTitle}>
          {group.displayName}
        </Text>
      </div>
    );
  };

  // Filter groups based on the search input
  const filteredGroups = groups.filter(
    (group) =>
      group.displayName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
  );

  return (
    <div className={styles.container}>
      <Text variant="xLarge" styles={{ root: { fontWeight: "bold" } }}>
        {strings.Group.availableLabel}
      </Text>
      <TextField
        className="searchTextField"
        label={strings.Group.searchLabel}
        value={searchText}
        onChange={(event, newValue) => setSearchText(newValue || "")}
      />
      <Stack
        styles={{ root: { marginTop: "5px" } }}
        horizontal
        wrap
        tokens={{ childrenGap: 10 }}
      >
        {filteredGroups.map(renderGroupItem)}
      </Stack>
    </div>
  );
}
