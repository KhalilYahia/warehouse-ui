import { useNavigate } from 'react-router-dom';
import './ReceiptTable.css'

function ReceiptTable({data}) {

  const navigate =useNavigate();

  function DateFormatting(date)
  {
     return String(date.getDate()).padStart(2, '0') + '-' +
  String(date.getMonth() + 1).padStart(2, '0') + '-' +
  date.getFullYear();
  }


  return (
   <div className="table-container">
      <table className="custom-table">
        <thead>
        <tr>
          <th>Номер</th>
          <th>Дата</th>
          <th>Ресурс</th>
          <th>Единица измерения</th>
          <th>Количество</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
    {data.map((row, idx) => {
  // Defensive: if goods is empty, add a placeholder item
  if (row.goods.length === 0) {
    row.goods = [{ resourceName: '', unitName: '', quantity: 0 }];
  }

  return (
    <>
      {row.goods.map((good, gIdx) => (
        <tr key={`${idx}-${gIdx}`}>
          {gIdx === 0 && (
            <>
              <td rowSpan={row.goods.length}>{row.number}</td>
              <td rowSpan={row.goods.length}>{DateFormatting(new Date(row.date))}</td>
            </>
          )}
          <td>{good.resourceName}</td>
          <td>{good.unitName}</td>
          <td>{good.quantity}</td>
          {gIdx === 0 && (
            <td rowSpan={row.goods.length} style={{ textAlign: 'center' }}>
              <button
                onClick={() => {
                  navigate('/receipts/editReceipt?id=' + row.id);
                }}
                className="btn btn-edit"
              >
                ✏️
              </button>
            </td>
          )}
        </tr>
      ))}
      {row.goods.length > 0 && (
        <tr className="order-divider">
          <td colSpan="6"></td>
        </tr>
      )}
    </>
  );
})}
      </tbody>
    </table>
    </div>
  );
}

export default ReceiptTable;
