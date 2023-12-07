import { useState, useRef } from "react";

function SingleAccount({ acc, onRemove, onBalance, onAlert }) {
  const [actionBlock, setActionBlock] = useState(true);
  const [addBlock, setAddBlock] = useState(false);
  const [subBlock, setSubBlock] = useState(false);
  const [error, setError] = useState(false);

  const addField = useRef();
  const subField = useRef();

  const addHandler = () => {
    setAddBlock((prev) => !prev);
    setActionBlock((prev) => !prev);
  };

  const subHandler = () => {
    setSubBlock((prev) => !prev);
    setActionBlock((prev) => !prev);
  };

  const undoHandler = () => {
    setActionBlock(true);
    setAddBlock(false);
    setSubBlock(false);
    setError(false);
    addField.current.value = "";
    subField.current.value = "";
  };

  const addToBalance = () => {
    onAlert("Sekmigai pridėjote pinigus");
    onBalance(acc.id, acc.balance + Number(addField.current.value));
    addField.current.value = "";
    setActionBlock(true);
    setAddBlock(false);
  };
  const subToBalance = () => {
    if (acc.balance < Number(subField.current.value)) {
      setError((prev) => !prev);
      return;
    }
    onAlert("Sekmigai nuskaitėte pinigus");
    onBalance(acc.id, acc.balance - Number(subField.current.value));
    subField.current.value = "";
    setActionBlock(true);
    setSubBlock(false);
  };

  return (
    <tr>
      <td className="align-middle">{acc.name}</td>
      <td className="align-middle">{acc.surname}</td>
      <td className="align-middle">{acc.balance} Eur</td>
      <td className={actionBlock ? "text-end" : "d-none"}>
        <button onClick={() => addHandler(acc.id)} type="button" className="btn btn-success me-2">
          + Priėti lėšų
        </button>
        <button onClick={() => subHandler(acc.id)} type="button" className="btn btn-secondary me-2">
          - Atimti lėšų
        </button>
        <button onClick={() => onRemove(acc.id)} type="button" className="btn btn-danger">
          Ištrinti
        </button>
      </td>
      <td className={addBlock ? "" : "d-none"}>
        <div className="d-flex gap-2">
          <input type="number" ref={addField} className="form-control" />
          <button onClick={addToBalance} type="button" className="btn btn-success">
            Pridėti
          </button>
          <button onClick={undoHandler} type="button" className="btn btn-danger">
            Atšaukti
          </button>
        </div>
      </td>
      <td className={subBlock ? "" : "d-none"}>
        <div className="d-flex">
          <input type="number" ref={subField} className="form-control" />
          <button onClick={subToBalance} type="button" className="btn btn-success me-2">
            Atimti
          </button>
          <button onClick={undoHandler} type="button" className="btn btn-danger">
            Atšaukti
          </button>
        </div>
        {error && <p> Balansas per mažas</p>}
      </td>
    </tr>
  );
}

export default SingleAccount;
