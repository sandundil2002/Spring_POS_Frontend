$(document).ready(function () {
  // Fetch data from the server if needed (optional)
  $.ajax({
    url: "/api/sales-data", // Assume this endpoint returns the sales data
    method: "GET",
    success: function (response) {
      // You can update the chart data here using the response
      renderChart(response.labels, response.data);
    },
    error: function () {
      // Fallback data if API call fails
      const labels = [
        "Soap",
        "Biscuits",
        "Noodles",
        "Rice",
        "Sugar",
        "Chicken",
        "Ice Cream",
        "Books",
        "Vegetables",
        "Eggs",
        "Milk",
        "Salt",
      ];
      const data = [65, 59, 80, 81, 56, 50, 100, 20, 35, 55, 10, 70];
      renderChart(labels, data);
    },
  });

  function renderChart(labels, data) {
    var ctx = document.getElementById("myBarChart").getContext("2d");
    var myBarChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Item Stock",
            data: data,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
});
