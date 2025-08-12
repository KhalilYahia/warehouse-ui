
import { useEffect, useState } from 'react';
import './ShipmentTable.css'
import Select from "react-select";


function AddingTableShipment({AllActivatedInBalance, formData,setFormData}) {


  const handleAddRow = () => {
    const newFormData = structuredClone(formData);
    newFormData.goods.push({
        id: 0,
        resourceId: 0,
        resourceName: '',
        unitId: 0,
        unitName: '',
        quantity:0
    } );
    setFormData(newFormData);
   
  };

  const handleChange = (resourceId,unitId, value,maxValue) => {

    if(value>maxValue) value=maxValue;
    const newformData = structuredClone(formData);
    const index = newformData.goods.findIndex(
    item => item.resourceId === resourceId && item.unitId === unitId);

    if(value>0)
    {
    if (index===-1) {
    newformData.goods.push({
        id: 0,
        resourceId: resourceId,
        resourceName: '',
        unitId: unitId,
        unitName: '',
        quantity: value
    });
    }
    else
    {
      newformData.goods[index]=
      {
         id: 0,
        resourceId: resourceId,
        resourceName: '',
        unitId: unitId,
        unitName: '',
        quantity: value
      }
    }
    setFormData(newformData);
  }
  else
  {
    if (index!==-1) {
    newformData.goods.splice(index, 1);
     setFormData(newformData);
    }
  }
  };

  
  return (
   <div className="table-container" style={{paddingBottom:'100px'}}>
    <table border="1" cellPadding="5" style={{ borderCollapse: "collapse", overflow:'auto',border:'none' }} className='custom-table'>
      <thead>
        <tr style={{ backgroundColor: "rgb(190 43 111 / 63%)" }}>
         
          <th>Ресурс</th>
          <th>Единица измерения</th>
          <th>Количество</th>
          <th>Доступно</th>
        </tr>
      </thead>
      <tbody>
        {AllActivatedInBalance.map((row, index) => (
          <tr key={index}> 
            <td>
              {row.resourceName}
            </td>
            <td> {row.unitName} </td>
            <td>
              <input
                type="number"
                className='form-control'
                min={0}
                max={row.quantity}
                value={
                        formData.goods.find(
                          item => item.resourceId === row.resourceId && item.unitId === row.unitId
                        )?.quantity ?? ''
                      }
                onChange={(e) => handleChange(row.resourceId,row.unitId, e.target.value,row.quantity)}
              />
            </td>
            <td> {row.quantity} </td>
          </tr>
        ))}
      </tbody>
    </table>
</div>
  );
}

export default AddingTableShipment;
