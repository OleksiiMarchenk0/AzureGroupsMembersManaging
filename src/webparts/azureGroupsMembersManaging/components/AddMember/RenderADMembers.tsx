import * as React from "react";
import { Button } from "@fluentui/react-components";

export default function RenderADMembers(props: IAddADMembersProps) {
  const { users, addUsers } = props;
  return (
    <>
      <h2> Add members to group</h2>
      {users.map((user: any) => (
        <div key={user.id}>
          <span> {user.displayName}</span>
          <Button
            onClick={() => {
              addUsers(user.id);
            }}
            appearance="primary"
          >
            Add
          </Button>
        </div>
      ))}
    </>
  );
}
