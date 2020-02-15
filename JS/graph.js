/* Start Chart.js */
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
      duration: 1800,
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

/* End Chart.js */

/* Start Sidebars toggle  */

const menuBtn = document.querySelector(".menu-btn");
const btn_search = document.querySelector(".btn_search");
const btn_option = document.querySelector(".btn_option");
const sidebar = document.querySelector(".sidebar");
const sidebar_right = document.querySelector(".sidebar_right");
const current_condition = document.querySelector(".current_condition");

let menuOpen = false;
let menuSearch = false;

menuBtn.addEventListener("click", () => {
  // toggle the button hunberger to cross Sign
  if (!menuOpen) {
    // state is hunberger button
    btn_search.classList.add("fade");

    sidebar.classList.add("active");
    menuBtn.classList.add("open");
    menuOpen = true;
  } else {
    // state is Cross button

    btn_search.classList.remove("fade");
    sidebar.classList.remove("active");
    menuBtn.classList.remove("open");

    menuOpen = false;
  }
});

// right button search

btn_search.addEventListener("click", () => {
  if (!menuSearch) {
    // state is hunberger button
    sidebar_right.style.display = "block";
    sidebar_right.classList.add("active");
    btn_option.classList.add("fade");

    menuSearch = true;
  } else {
    // state is Cross button
    sidebar_right.classList.remove("active");
    sidebar_right.style.display = "none";
    btn_option.classList.remove("fade");

    menuSearch = false;
  }
});
/* End Sidebars toggle  */

/* Start Loader  */
document.onreadystatechange = function() {
  if (document.readyState !== "complete") {
    document.querySelector(".app").style.visibility = "hidden";
    document.querySelector("#loader").style.visibility = "visible";
  } else {
    document.querySelector("#loader").style.display = "none";
    document.querySelector(".app").style.visibility = "visible";
  }
};
/* End Lodaer  */
