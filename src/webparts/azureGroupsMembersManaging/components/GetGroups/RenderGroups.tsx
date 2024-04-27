import * as React from 'react';
import { IGroup, IListGroupsProps } from './IListGroupsProps';
import styles from './RenderGroups.module.scss';
import { Stack, Text, TextField } from '@fluentui/react';


export default function RenderGroups(props: IListGroupsProps) {

  const [selectedGroupId, setSelectedGroupId] = React.useState<string | null>(null);
  const [selectedGroupDisplayName, setSselectedGroupDisplayName] = React.useState<string | null>(null);
  const [searchText, setSearchText] = React.useState<string>('');
  const { groups, getChosenGroupIdAndName } = props;
  console.log(selectedGroupDisplayName);
  
  const handleGroupClick = (groupId: string, displayName:string) => {
    getChosenGroupIdAndName(groupId,displayName);
    setSelectedGroupId(groupId);
    setSselectedGroupDisplayName(displayName);
    console.log('Selected Group ID:', groupId);
  };


  const renderGroupItem = (group: IGroup, index: number) => {
    const isSelected = selectedGroupId === group.id;
    return (
      <div
        key={group.id}
        className={`${styles.listItem} ${isSelected ? styles.selected : ''}`}
        onClick={() => handleGroupClick(group.id, group.displayName)}
      >
        <Text as="div" className={styles.groupTitle}>{group.displayName}</Text>
      </div>
    );
  };

// Filter groups based on the search input
const filteredGroups = groups.filter(group =>
  group.displayName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
);
  
  return (
    <div className={styles.container}>
      <h2>Available groups</h2>
      <TextField
        className="searchTextField"
        label="Search groups"
        value={searchText}
        onChange={(event, newValue) => setSearchText(newValue || '')}
      />
      <Stack horizontal wrap tokens={{ childrenGap: 10 }}>
        {filteredGroups.map(renderGroupItem)}
      </Stack>
    </div>
  );
}