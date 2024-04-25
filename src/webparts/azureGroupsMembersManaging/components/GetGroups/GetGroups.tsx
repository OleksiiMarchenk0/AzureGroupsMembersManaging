import * as React from "react";
import { useEffect } from "react";
import { getGroupsService } from "../../services/getGroupsService";
import { IGroupProps } from "./GroupProps";
import { Button } from "@fluentui/react-components";
import { getGroupOwnersService } from "../../services/getGroupOwnersService";
import { RecognizeUserRoleHelper } from "../../helper/RecognizeUserRoleHelper";

export default function GetGroups(props: any) {
  const [groups, setGroups] = React.useState<any[]>([]);
  const [filteredGroups, setFilteredGroups] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  // const [globalAdmins, setGlobalAdmins] = React.useState<any[]>([]);
  // const [me, setMe] = React.useState<any[]>([]);
  const templateRoleId = "62e90394-69f5-4237-9190-012177145e10";

  const { context } = props;


  useEffect(() => {
    RecognizeUserRoleHelper(context, templateRoleId);
  }, [context]);

  //Getting all groups
  useEffect(() => {
    const fetchAllGroups = async () => {
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

    fetchAllGroups();
  }, [props.context]);

  // Filtering groups
  useEffect(() => {
    //const me = getMe(context);

    groups.map((group) => {
      getGroupOwnersService(context, group.id).then(
        (response: any) => response.json
      );
    });
    setFilteredGroups(groups);
  }, [groups]);

  return (
    <div>
      {loading ? (
        <div>Loading groups...</div>
      ) : (
        <div>
          <h2> Get groups</h2>
          {filteredGroups.map((group: IGroupProps) => (
            <div>
              <Button
                onClick={() => {
                  props.getChosenGroupId(group.id);
                }}
              >
                {group.displayName}
              </Button>
            </div>
          ))}
        
        </div>
      )}
    </div>
  );
}
