import * as React from "react";
import RenderExtendMembers from "./RenderExtendMembers";
import RenderSimpleMembers from "./RenderSimpleMembers";


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
              <RenderSimpleMembers
              members={members}
              removeUser={removeUser}
              isGroupChosen={isGroupChosen}
              chosenGroupDisplayName={chosenGroupDisplayName}
            />
            )}
          </>
        </div>
      )}
    </div>
  );
}

export default GetMembers;
