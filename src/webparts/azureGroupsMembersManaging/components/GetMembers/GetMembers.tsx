import * as React from "react";
import RenderExtendMembers from "./RenderExtendMembers";


function GetMembers(props: any) {
  const { isGroupChosen, members, loading, removeUser,view, chosenGroupDisplayName } = props;

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <>
            {view === "Extended" ? (
              <>
                <RenderExtendMembers
                  members={members}
                  removeUser={removeUser}
                  isGroupChosen={isGroupChosen}
                  chosenGroupDisplayName={chosenGroupDisplayName}
                />
              </>
            ) : (
              <div>Normal view members</div>
            )}
          </>
        </div>
      )}
    </div>
  );
}

export default GetMembers;
