import * as React from "react";
import RenderMembers from "./RenderMembers";

function GetMembers(props: any) {
  const { isGroupChosen, members, loading, removeUser } = props;

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <RenderMembers
            members={members}
            removeUser={removeUser}
            isGroupChosen={isGroupChosen}
          />
        </>
      )}
    </div>
  );
}

export default GetMembers;
