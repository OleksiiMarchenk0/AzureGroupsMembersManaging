import * as React from 'react'
import { IGroupProps } from './IGroupProps';
import { Button } from "@fluentui/react-components";

export default function RenderGroups(props:IListGroupsProps) {
  const {groups, getChosenGroupId} = props;
  return (
    <div>
   <h2> Avaliable groups</h2>
    {groups.map((group: IGroupProps) => (
      <div>
        <Button
          onClick={() => {
            getChosenGroupId(group.id);
          }}
        >
          {group.displayName}
        </Button>
      </div>
    ))}
    </div>
  )
}
