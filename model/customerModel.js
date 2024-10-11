export async function getAllCustomers() {
  return $.ajax({
    url: "http://localhost:8080/Spring_POS_API/api/v1/customers",
    method: "GET",
    dataType: "json",

    error: function (error) {
      console.log(error);
    },
  });
}

export async function saveCustomer(customer) {
  return $.ajax({
    url: "http://localhost:8080/Spring_POS_API/api/v1/customers",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(customer),
  });
}

export async function searchCustomer(customerId) {
  return $.ajax({
    url: "http://localhost:8080/Spring_POS_API/api/v1/customers/" + customerId,
    method: "GET",
    dataType: "json",

    error: function (error) {
      swal("Warning!", "Customer not found!", "info");
    },
  });
}
