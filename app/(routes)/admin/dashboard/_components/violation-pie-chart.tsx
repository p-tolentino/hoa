import React from "react";
import { Box } from "@chakra-ui/react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ViolationPieChartProps {
  series: number[];
  labels: string[];
}

interface ViolationPieChartState {
  options: ApexOptions;
}

function formatLabel(label: string): string {
  // Insert a space before each uppercase letter, convert the whole string to lowercase, and then capitalize the first letter of each word
  const formattedLabel = label
    // Add space before uppercase letters and convert to lowercase
    .replace(/([A-Z])/g, ' $1').trim().toLowerCase()
    // Split the string into words, capitalize the first letter of each, and join them back
    .split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return formattedLabel;
}

class ViolationPieChart extends React.Component<ViolationPieChartProps, ViolationPieChartState> {
  constructor(props: ViolationPieChartProps) {
    super(props);
    const formattedLabels = props.labels.map(label => formatLabel(label));
    this.state = {
      options: {
        chart: {
          type: "pie",
          toolbar: {
            show: true, // Enable toolbar
            tools:{
              download:true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
            }
          },
          // Enable downloading options in toolbar

        },
        
        labels: formattedLabels,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
        title: {
          text: "Violation Summary: Types of Violation Reports",
          align: "left",
        },
        colors: ["#9F7AEA", "#ED64A6", "#4299E1", "#ED8936", "#38B2AC"],
      },
    };
  }

  componentDidUpdate(prevProps: ViolationPieChartProps) {
    // Check if labels prop has changed
    if (prevProps.labels !== this.props.labels) {
      const formattedLabels = this.props.labels.map(label => formatLabel(label));
      this.setState({
        options: {
          ...this.state.options,
          labels: formattedLabels,
        },
      });
    }
  }
  render() {
    return (
      <Box>
        <Chart
          options={this.state.options}
          series={this.props.series}
          type="pie"
          height={250}
          width={"100%"}
        />
      </Box>
    );
  }
}

export default ViolationPieChart;
