import React from "react";
import { Box } from "@chakra-ui/react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface FinancialSummary {
  yearMonth: string;
  income: number;
  expense: number;
  net: number; // Making this non-optional since you want to display it
}

interface LineChartProps {
  financialSummary: FinancialSummary[];
}

interface LineChartState {
  series: {
    name: string;
    data: number[];
  }[];
  options: ApexOptions;
}


function formatYearMonth(yearMonth: string): string {
  const parts = yearMonth.split('-');
  // Ensure parts are converted to numbers where necessary
  const year = Number(parts[0]);
  const month = Number(parts[1]) - 1; // Adjust for 0-indexed months in JavaScript Date
  const date = new Date(year, month);

  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}



class LineChart extends React.Component<LineChartProps, LineChartState> {
  state: LineChartState = {
    series: [
      {
        name: "Revenue",
        data: [],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Financial Summary: Revenue per Month",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [],
      },
    },
  };

  componentDidMount() {
    const { financialSummary } = this.props;
    // Sort financialSummary by yearMonth
    const sortedFinancialSummary = [...financialSummary].sort((a, b) => a.yearMonth.localeCompare(b.yearMonth));

    const netData = sortedFinancialSummary.map((item) => item.net);
    const categories = sortedFinancialSummary.map((item) => formatYearMonth(item.yearMonth));

    this.setState({
        series: [{ name: "Revenue", data: netData }],
        options: {
            ...this.state.options,
            xaxis: { ...this.state.options.xaxis, categories },
        },
    });
}

componentDidUpdate(prevProps: { financialSummary: any; }) {
    // Check if financialSummary prop has changed
    if (JSON.stringify(prevProps.financialSummary) !== JSON.stringify(this.props.financialSummary)) {
        const { financialSummary } = this.props;
        // Sort financialSummary by yearMonth
        const sortedFinancialSummary = [...financialSummary].sort((a, b) => a.yearMonth.localeCompare(b.yearMonth));

        const netData = sortedFinancialSummary.map((item) => item.net);
        const categories = sortedFinancialSummary.map((item) => formatYearMonth(item.yearMonth));

        this.setState({
            series: [{ name: "Revenue", data: netData }],
            options: {
                ...this.state.options,
                xaxis: { ...this.state.options.xaxis, categories },
            },
        });
    }
}

  render() {
    return (
      <Box>
        <Chart options={this.state.options} series={this.state.series} type="line" height={350} width={"100%"} />
      </Box>
    );
  }
}

export default LineChart;