import React from "react";

function ActionEditor({ object, deleteObject, setObject }) {
  let urlRef = React.createRef();
  let iconRef = React.createRef();
let nameRef = React.createRef();

  const deleteSelf = () => {
    deleteObject(object);
  };

  const saveSelf = (e) => {
    setObject({ ...object, templateLink: urlRef.current.value, icon: iconRef.current.value, name: nameRef.current.value });
    e.preventDefault();
  };

  return (
    <div className="card cyan lighten-5">
      <div className="card-content">
        <form onSubmit={saveSelf}>
          <div className="row">
            <div className="input-field col s12">
              <label htmlFor="name">{"Name, URL, and Icon:"}</label>
              <textarea
                id="name"
                ref={nameRef}
                defaultValue={object.name}
                className="materialize-textarea"
              ></textarea>
              <textarea
                id="url"
                ref={urlRef}
                defaultValue={object.templateLink}
                className="materialize-textarea"
              ></textarea>
              <textarea
                id="icon"
                ref={iconRef}
                defaultValue={object.icon}
                className="materialize-textarea"
              ></textarea>
            </div>
          </div>
          <button className="btn waves-effect" type="submit">
            Save <i className="material-icons right">save</i>
          </button>

          <button className="btn waves-effect right" onClick={deleteSelf}>
            Delete <i className="material-icons right">delete_forever</i>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ActionEditor;
