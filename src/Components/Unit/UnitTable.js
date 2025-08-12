import { useNavigate } from "react-router-dom";

const UnitTable = ({data})=> {

  const navigate= useNavigate();
  return (
   <div className="table-container">
      <table className="custom-table">
        <thead>
        <tr>
          <th>Наименование</th>
          <th>состояние</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            <td>{row.name}</td>
            <td> <label style={row.status===0?{backgroundColor:'#329632'}:{backgroundColor:'#ff5800'}}>{row.status===0?'В работе':'В архиве'} </label> </td>
            <td style={{ textAlign: 'center' }}>
              <button onClick={()=>{navigate('/Units/editUnitPage?id='+row.id)}} class="btn btn-edit">✏️ </button>
             
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default UnitTable;
