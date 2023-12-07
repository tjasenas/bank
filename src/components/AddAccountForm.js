import { useState, useRef } from "react";

function AddAccountForm({ onAddAcc }) {
  const [toggle, setToggle] = useState(false);
  const name = useRef();
  const surname = useRef();

  const toggleForm = () => {
    setToggle((prev) => !prev);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    onAddAcc({
      id: (Math.random() + 1).toString(36).substring(7),
      name: name.current.value,
      surname: surname.current.value,
      balance: 0,
    });
    setToggle((prev) => !prev);
    name.current.value = "";
    surname.current.value = "";
  };

  return (
    <div className="pt-4 d-flex flex flex-column align-items-end">
      <button onClick={toggleForm} type="button" className="btn btn-secondary">
        + Priėti Vartotoją
      </button>

      {toggle && (
        <form onSubmit={submitHandler} className="d-flex gap-2 w-50 mt-4">
          <input type="text" ref={name} placeholder="Vardas" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <input type="text" ref={surname} placeholder="Pavardė" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default AddAccountForm;
