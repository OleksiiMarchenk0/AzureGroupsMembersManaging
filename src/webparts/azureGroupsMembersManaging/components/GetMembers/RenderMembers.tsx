import * as React from "react";
import { Button } from "@fluentui/react-components";

export default function RenderMembers(props: IListMembersProps) {
  const { members, removeUser, isGroupChosen } = props;
  return (
    <>
      {isGroupChosen ? (
        <>
          <h2> Get members of groups</h2>

          {members && members.length > 0 ? (
            members.map((member: any) => (
              <div key={member.id}>
                <span> {member.displayName}</span>
                <Button
                  onClick={() => {
                    removeUser(member.id);
                  }}
                  appearance="primary"
                >
                  Remove
                </Button>
              </div>
            ))
          ) : (
            <div>Empty list of members</div>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
