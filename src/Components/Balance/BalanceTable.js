import './BalanceTable.css'

function BalanceTable({data}) {

  return (
   <div className="table-container">
      <table className="custom-table">
        <thead>
        <tr>
          <th>Ресурс</th>
          <th>Единица измерения</th>
          <th>Количество</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            <td>{row.resourceName}</td>
            <td>{row.unitName}</td>
            <td style={{ textAlign: 'center' }}>{row.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default BalanceTable;
