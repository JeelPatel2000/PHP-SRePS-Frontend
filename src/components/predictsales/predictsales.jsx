import React, {Component, Fragment} from "react";
import Chart from "chart.js";

class PredictSales extends Component {
	chartRef = React.createRef();

	calculateMonthlySales = (data) => {
		let o = [
			[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		];

		for (let row of data) {
			let month = row.invoiceDate.slice(5, 7);

			console.log(month);

			o[1][month - 1] += row.totalAmount;
		}

		console.log(o);
		return o;
	};

	predictMonthlySales(monthly_sales) {
		let total = 0;
		for (let i of monthly_sales[1]) total += i;

		return total / 12;
	}

	componentDidMount() {
		const {salesRecords} = this.props;

		let monthly_sales = this.calculateMonthlySales(salesRecords);

		console.log(salesRecords);
		const myChartRef = this.chartRef.current.getContext("2d");

		new Chart(myChartRef, {
			type: "bar",
			data: {
				//Bring in data
				labels: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
					"August",
					"September",
					"October",
					"November",
					"December",
				],
				datasets: [
					{
						label: "Sales",
						data: monthly_sales[1],
					},
				],
			},
			options: {
				//Customize chart options
			},
		});
	}

	render() {
		const {salesRecords} = this.props;
		let monthly_sales = this.calculateMonthlySales(salesRecords);
		let nextMonthPredictedSales = this.predictMonthlySales(monthly_sales);

		return (
			<Fragment>
				<h1>Sales Prediction</h1>
				<div className="row">
					<div className="col-lg-6">
						<canvas id="myChart" ref={this.chartRef}></canvas>
					</div>
					<div className="col-lg-6">
						<h3>
							Predicted Sales for Next Month:{" $"}
							{Math.round(nextMonthPredictedSales)}
						</h3>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default PredictSales;
