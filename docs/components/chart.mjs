export function style() {
  return `
      .chart .ct-label,
      .chart .ct-axis-title {
        fill: var(--primaryColor);
        color: var(--primaryColor);
      }
      
      .chart .ct-grid {
        stroke: var(--primaryColor);
      }

      .chartist-tooltip {
        z-index: 999999;
      }
    `;
}

export function render(opts) {
  return `
      <div class="chart" data-chart="${btoa(JSON.stringify(opts.datas))}"></div>
    `;
}

export function init($element) {
  YadomsHelper.loader(
    '/components/lib/chartist/chartist.css',
    '/components/lib/chartist/chartist.min.js'
  ).then(function () {
    YadomsHelper.loader(
      '/components/lib/chartist/chartist-plugin-tooltip.css',
      '/components/lib/chartist/chartist-plugin-axistitle.min.js',
      '/components/lib/chartist/chartist-plugin-tooltip.min.js'
    ).then(() => {
      let $chart = $element.querySelector('.chart');
      let chartData = JSON.parse(atob($chart.dataset.chart)),
        data = {
          labels: [],
          series: [],
        };
      chartData.forEach((d) => {
        let sd = [];
        d.data.forEach((o) => {
          data.labels.push(o.date);
          sd.push(o.value);
        });
        data.series.push(sd);
      });
      new Chartist.Line($chart, data, {
        width: '100%',
        showPoint: true,
        low: 0,
        showArea: true,
        plugins: [
          Chartist.plugins.tooltip(),
          Chartist.plugins.ctAxisTitle({
            axisX: {
              axisTitle: 'Time (mins)',
              axisClass: 'ct-axis-title',
              offset: {
                x: 0,
                y: 32,
              },
              textAnchor: 'middle',
            },
            axisY: {
              axisTitle: chartData.unit,
              axisClass: 'ct-axis-title',
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
}
