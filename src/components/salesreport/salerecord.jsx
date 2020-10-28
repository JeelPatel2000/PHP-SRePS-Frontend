import React, { Fragment } from 'react';

const SaleRecord = ({record}) => {
    return ( 
        <Fragment>
            {record===null?"": <>
                <label>Customer Name</label>
                <input className="form-control" type="text" readOnly value={record.customerName}/>
                <br/>
                <label>Invoice Date</label>
                <input className="form-control" type="text" readOnly value={record.invoiceDate}/>
                <br/>
                <label>Products</label>
                <table className="table table-hover">
                    <thead>
                        <th>Product ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                    </thead>
                    <tbody>
                        {
                            record.products.map(item=>(
                                <tr>
                                    <td>{item._id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price*item.quantity}</td>
                                </tr>
                            ))
                        } 
                    </tbody>
                </table>
                <label>Total Amount</label>
                <input className="form-control" type="text" readOnly value={record.totalAmount}/>
                </>
            }

            
        </Fragment>
     );
}
 
export default SaleRecord;