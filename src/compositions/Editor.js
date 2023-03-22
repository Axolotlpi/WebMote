import Grid from "../components/Grid";
import ActionEditor from "../components/ActionEditor";
import { Link } from "react-router-dom";
import {
  generateNewAction,
  writeActionsToStore,
  deleteActionsFromStore,
} from "../helpers/Actions";

function Editor({ actions, setActions }) {
  const updateAction = (action) => {
    writeActionsToStore([action]);
    setActions(actions.map((a) => (a.id === action.id ? action : a)));
  };

  const createAction = () => {
    setActions([...actions, generateNewAction()]);
  };

  const deleteAction = (action) => {
    deleteActionsFromStore([action.id]);
    setActions(actions.filter((a) => a.id !== action.id));
  };

  return (
    <>
      <Grid>
        {actions &&
          actions.map((action) => (
            <ActionEditor
              key={action.id}
              object={action}
              setObject={updateAction}
              deleteObject={deleteAction}
            />
          ))}
      </Grid>
      <div className="row">
        <div className="col s2 offset-s5">
          <button onClick={createAction} className="btn-large waves-effect">
            New
            <i className="material-icons right">add_box</i>
          </button>
        </div>
      </div>
      <Link
        to="/"
        className="btn-floating btn-large waves-effect cyan darken-1 stick-to-bottom-right"
      >
        <i className="material-icons">settings_remote</i>
      </Link>
    </>
  );
}

export default Editor;
