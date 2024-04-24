import * as React from "react";
import { useEffect } from "react";
import { getGroupsService } from "../../services/getGroupsService";
import { IGroupProps } from "./GroupProps";
import { Button } from "@fluentui/react-components";
import { getGroupOwnersService } from "../../services/getGroupOwnersService";

export default function GetGroups(props: any) {
  const [groups, setGroups] = React.useState<any[]>([]);
  const [filteredGroups, setFilteredGroups] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const { context } = props;
  console.log(groups);
  
  useEffect(() => {
    const fetchAllGroups = async () => {
      try {
        const groupsData = await getGroupsService(context);
        if (groupsData) {
          console.log(groupsData);
          setFilteredGroups(groupsData);
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

    fetchAllGroups();
  }, [props.context]);

  useEffect(() => {
    const fetchOwnersOfGroups = async (groups: any) => {
      console.log("run");
      
      groups.forEach(function (group: any) {
        console.log(group);
        
        console.log(group.id);
        
        getGroupOwnersAsync(group.id);
      });
    };
    // dokńczyć filtrowanie listy grup dla użytkownika
    fetchOwnersOfGroups(filteredGroups);
  }, [filteredGroups]);

  const getGroupOwnersAsync = async (groupId: string) => {
    console.log(`here ${groupId}`);
    
    const response = await getGroupOwnersService(context, groupId);
    console.log("Owners");
    
    console.log(response);

  };

  return (
    <div>
      {loading ? (
        <div>Loading groups...</div>
      ) : (
        <div>
          <h2> Get groups</h2>
          {filteredGroups.map((group: IGroupProps) => (
            <Button
              onClick={() => {
                props.getChosenGroupId(group.id);
              }}
            >
              {group.displayName}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
