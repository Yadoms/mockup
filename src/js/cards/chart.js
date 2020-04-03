import Chartist from "chartist";
import ChartistTooltip from "chartist-plugin-tooltips-updated";
import ChartistAxisTitle from "chartist-plugin-axistitle";
import { ready, findAll } from "../functions";

ready(() => {
  let $charts = findAll(".chart");
  if ($charts.length)
    $charts.forEach(($chart) => {
      let chartData = JSON.parse($chart.dataset.chart),
        data = {
          labels: [],
          series: [],
        };
      chartData.datas.forEach((d) => {
        let sd = [];
        d.data.forEach((o) => {
          data.labels.push(o.date);
          sd.push(o.value);
        });
        data.series.push(sd);
      });
      new Chartist.Line($chart, data, {
        width: "500px",
        showPoint: true,
        low: 0,
        showArea: true,
        plugins: [
          ChartistTooltip(),
          ChartistAxisTitle({
            axisX: {
              axisTitle: "Time (mins)",
              axisClass: "ct-axis-title",
              offset: {
                x: 0,
                y: 32,
              },
              textAnchor: "middle",
            },
            axisY: {
              axisTitle: chartData.unit,
              axisClass: "ct-axis-title",
              offset: {
                x: 0,
                y: -1,
              },
              flipTitle: false,
            },
          }),
        ],
      });
    });
});
