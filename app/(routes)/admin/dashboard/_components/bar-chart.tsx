import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface FinancialSummary {
  yearMonth: string;
  income: number;
  expense: number;
  net: number;
}

interface BarChartProps {
  financialSummary: FinancialSummary[];
}

interface BarChartState {
  series: {
    name: string;
    data: number[];
  }[];
  options: ApexOptions;
  currentPage: number;
}

function formatYearMonth(yearMonth: string): string {
  const parts = yearMonth.split("-");
  // Ensure parts are converted to numbers where necessary
  const year = Number(parts[0]);
  const month = Number(parts[1]) - 1; // Adjust for 0-indexed months in JavaScript Date
  const date = new Date(year, month);

  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

class BarChart extends React.Component<BarChartProps, BarChartState> {
  constructor(props: BarChartProps) {
    super(props);
    this.state = {
      series: [],
      options: {
        chart: {
          height: 350,
          type: "bar",
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [],
        },
      },
      currentPage: 1, // Assuming you still want pagination, otherwise, you can remove this
    };
  }

  componentDidMount() {
    this.updateChartData();
  }

  componentDidUpdate(prevProps: BarChartProps) {
    if (
      JSON.stringify(prevProps.financialSummary) !==
      JSON.stringify(this.props.financialSummary)
    ) {
      this.updateChartData();
    }
  }

  updateChartData = () => {
    const { financialSummary } = this.props;

    // Prepare data for the chart
    const incomeData = financialSummary.map((item) => item.income);
    const expenseData = financialSummary.map((item) => item.expense);
    const categories = financialSummary.map((item) =>
      formatYearMonth(item.yearMonth)
    );

    this.setState({
      series: [
        { name: "Income", data: incomeData },
        { name: "Expenses", data: expenseData },
      ],
      options: {
        ...this.state.options,
        xaxis: { ...this.state.options.xaxis, categories },
      },
    });
  };
  render() {
    return (
      <Box>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={250}
          width={"100%"}
        />
        {/* Add pagination buttons if necessary */}
      </Box>
    );
  }
}

export default BarChart;
