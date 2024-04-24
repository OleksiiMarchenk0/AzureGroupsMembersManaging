import * as React from "react";
import { useEffect } from "react";
import { getGroupsService } from "../../services/getGroupsService";
import { IGroupProps } from "./GroupProps";
import { Button } from '@fluentui/react-components';

export default function GetGroups(props: any) {
  const [groups, setGroups] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  useEffect(() => {
    const { context } = props;

    const fetchData = async () => {
      try {
        const groupsData = await getGroupsService(context);
        if (groupsData) {
          setGroups(groupsData);
        } else {
          console.error("Error: Invalid data structure");
        }
      } catch (error) {
        console.error("Error fetching groups:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [props.context]);
  return (
    <div>
      {loading ? (
        <div>Loading groups...</div>
      ) : (
        <div>
             <h2> Get groups</h2>
          {groups.map((group: IGroupProps) => (
            <Button onClick={()=>{props.getChosenGroupId(group.id)}}>{group.displayName}</Button>
          ))}
        </div>
      )}
    </div>
  );
}
