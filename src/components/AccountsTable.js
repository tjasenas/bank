function AccountsTable({ children }) {
  return (
    <table className="table table-bordered mt-4">
      <thead className="table-dark">
        <tr>
          <th scope="col" className="col-1">
            Vardas
          </th>
          <th scope="col" className="col-1">
            Pavardė
          </th>
          <th scope="col" className="col-1">
            Sąskaitos likutis
          </th>
          <th scope="col" className="col-2 text-end">
            Veiksmai
          </th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

export default AccountsTable;
