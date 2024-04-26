import * as React from 'react';
//import { DetailsList, DetailsListLayoutMode, SelectionMode } from '@fluentui/react';
//import { mergeStyles } from '@fluentui/react/lib/Styling';
//import { List } from '@fluentui/react/lib/List';
import { IGroup, IListGroupsProps } from './IListGroupsProps';
import styles from './RenderGroups.module.scss';
import { Stack, Text } from '@fluentui/react';


export default function RenderGroups(props: IListGroupsProps) {

  const [selectedGroupId, setSelectedGroupId] = React.useState<string | null>(null);
  const { groups, getChosenGroupId } = props;
  const handleGroupClick = (groupId: string) => {
    getChosenGroupId(groupId); // Notify parent component of the selected group ID
    setSelectedGroupId(groupId); // Update the selected group ID in state
    console.log('Selected Group ID:', groupId); // Log the selected group ID to the console
  };
  const renderGroupItem = (group: IGroup, index: number) => {
    const isSelected = selectedGroupId === group.id;
    return (
      <div
        key={group.id}
        className={`${styles.listItem} ${isSelected ? styles.selected : ''}`}
        onClick={() => handleGroupClick(group.id)}
      >
        <Text as="div" className={styles.groupTitle}>{group.displayName}</Text>
      </div>
    );
  };
  return (
    <div className={styles.container}>
      <h2>Available groups</h2>
      <Stack horizontal wrap tokens={{ childrenGap: 10 }}>
        {groups.map(renderGroupItem)}
      </Stack>
    </div>
  );
}