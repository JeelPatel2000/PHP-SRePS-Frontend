import React, {Component} from "react";
import SaleRecord from "./salerecord";
import CsvDownload from "react-json-to-csv";

class SalesReportTable extends Component {
	state = {
		currentSelectedReport: null,
		salesRecordIDFilter: "",
	};

	handleInput = ({currentTarget: input}) => {
		let state = {...this.state};
		state[input.name] = input.value;
		this.setState(state);
	};

	filerRecords = (_id) => {
		const temp_records = [...this.props.salesRecords];
		let new_records = temp_records.filter((record) => {
			if (
				record._id.includes(_id) ||
				record.customerName.toLowerCase().includes(_id.toLowerCase())
			)
				return record;
		});
		console.log(new_records);
		return new_records;
	};

	jsonToCsv = (data) => {
		let new_array = [];
		for (let row of data) {
			new_array.push([
				row._id,
				row.customerName,
				row.totalAmount,
				row.invoiceDate,
			]);
		}
		return new_array;
	};

	render() {
		const {salesRecordIDFilter} = this.state;
		//filtering records using the invoice id
		const filtered_records = this.filerRecords(salesRecordIDFilter);

		const {currentSelectedReport: selectedRecord} = this.state;
		return (
			<>
				<div className="col-lg-6">
					<div className="row">
						<div className="p-3">
							<CsvDownload
								data={this.jsonToCsv(this.props.salesRecords)}
								filename="sales_report.csv"
								style={{
									borderRadius: "6px",
									background: "silver",
								}}
							>
								Download Sales Report
							</CsvDownload>
						</div>
					</div>
					<input
						type="text"
						className="form-control"
						name="salesRecordIDFilter"
						onChange={this.handleInput}
						value={salesRecordIDFilter}
						placeholder="Filter using invoice ID or Customer Name"
					/>
					<table className="table table-hover table-md">
						<thead>
							<tr>
								<th>Invoice ID</th>
								<th>Customer Name</th>
								<th>Incvoice Date</th>
								<th>Amount</th>
							</tr>
						</thead>
						<tbody>
							{filtered_records.map((record) => (
								<tr
									className="table-row"
									onClick={() => this.setState({currentSelectedReport: record})}
								>
									<td>{record._id}</td>
									<td>{record.customerName}</td>
									<td>{record.invoiceDate}</td>
									<td>{record.totalAmount}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className="col-lg-6">
					<SaleRecord record={selectedRecord} />
				</div>
			</>
		);
	}
}

export default SalesReportTable;
