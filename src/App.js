import { useState, useEffect } from "react";
import "./App.css";
import AddAccountForm from "./components/AddAccountForm";
import AccountsTable from "./components/AccountsTable";
import SingleAccount from "./components/SingleAccount";

function App() {
  const [accounts, setAccounts] = useState([]);
  const [alert, setAlert] = useState("");
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (alert !== "") {
      setTimeout(() => {
        setAlert("");
      }, 3000);
    }
  }, [alert]);

  useEffect(() => {
    if (!init) {
      const getItem = JSON.parse(localStorage.getItem("accounts"));
      setAccounts(getItem);
      setInit((prev) => !prev);
    }
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }, [accounts, init]);

  const addAccountHnadle = (acc) => {
    setAlert("Vartotojas sekmigai pridėtas");

    setAccounts((prev) => {
      const newArr = [...prev, acc];
      const sorted = newArr.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      return sorted;
    });
  };

  const removeHandler = (id) => {
    setAlert("Vartotojas sekmigai ištrintas");
    setAccounts((prev) => prev.filter((acc) => acc.id !== id));
  };

  const balanceHnadler = (id, balance) => {
    setAccounts((prev) =>
      prev.map((acc) => {
        if (acc.id === id) {
          acc.balance = balance;
          return acc;
        }
        return acc;
      })
    );
  };
  const alertHandler = (text) => {
    setAlert(text);
  };

  return (
    <div className="container">
      {alert && (
        <div className="alert alert-primary mt-2" role="alert">
          {alert}
        </div>
      )}
      <AddAccountForm onAddAcc={addAccountHnadle} />
      {accounts.length > 0 && (
        <AccountsTable>
          {accounts.map((acc, i) => (
            <SingleAccount key={i} acc={acc} onRemove={removeHandler} onBalance={balanceHnadler} onAlert={alertHandler} />
          ))}
        </AccountsTable>
      )}
      {accounts.length === 0 && <p className="text-center mt-4">Kol kas nėra aktyvių vartotojų</p>}
    </div>
  );
}

export default App;
