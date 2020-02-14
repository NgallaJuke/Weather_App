let ctx = document.getElementById("myChart").getContext("2d");
var gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, "rgba(255,255,255,0.5)");
gradient.addColorStop(1, "rgba(0,0,0,0)");
let chart = new Chart(ctx, {
  // The type of chart we want to create
  type: "bar",
  // The data for our dataset
  data: {
    labels: [
      "14h",
      "12h",
      "12h",
      "12h",
      "12h",
      "12h",
      "12h",
      "12h",
      "12h",
      "12h",
      "12h",
      "12h"
    ],
    datasets: [
      {
        backgroundColor: "rgba(255,255,255, 1)",
        pointBackgroundColor: "rgb(255, 255, 255)",
        borderColor: "rgb(255, 255, 255)",
        data: [60, 75, 5, 45, 20, 30, 60, 5, 70, 40, 40, 90]
      },
      {
        borderWidth: 2,
        pointBackgroundColor: "rgb(255, 255, 255)",
        borderColor: "rgb(255, 255, 255)",
        data: [60, 75, 5, 45, 20, 30, 60, 5, 70, 40, 40, 90],
        type: "line"
      }
    ]
  },

  // Configuration options go here
  options: {
    legend: {
      display: false
    },
    layout: {
      padding: {
        left: -20,
        right: 0,
        top: 20,
        bottom: -5
      }
    },
    scales: {
      xAxes: [
        {
          barPercentage: 0.02,
          gridLines: {
            offsetGridLines: true,
            color: "rgba(0, 0, 0, 0)"
          },
          ticks: {
            fontColor: "rgb(255,255,255)",
            padding: -5,
            fontSize: 12
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            color: "rgba(0, 0, 0, 0)"
          },
          ticks: {
            display: false,
            fontSize: 12
          },
          stacked: true
        }
      ]
    },
    hover: {
      animationDuration: 0
    },
    animation: {
      duration: 1000,
      onComplete: function() {
        let chartInstance = this.chart,
          ctx = chartInstance.ctx;
        ctx.font = Chart.helpers.fontString(
          Chart.defaults.global.defaultFontStyle,
          Chart.defaults.global.defaultFontFamily
        );
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        this.data.datasets.forEach(function(dataset, i) {
          let meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach(function(bar, index) {
            let data = dataset.data[index] + "°";
            ctx.fillText(data, bar._model.x, bar._model.y - 8);
          });
        });
      }
    }
  }
});

const menuBtn = document.querySelector(".menu-btn");
const fade = document.querySelector(".sidebar");
let menuOpen = false;
menuBtn.addEventListener("click", () => {
  // toggle the button hunberger to cross Sign
  if (!menuOpen) {
    // state is hunberger button
    fade.classList.remove("fade");
    menuBtn.classList.add("open");
    menuOpen = true;
  } else {
    // state is Cross button
    fade.classList.add("fade");
    menuBtn.classList.remove("open");
    menuOpen = false;
  }
});
