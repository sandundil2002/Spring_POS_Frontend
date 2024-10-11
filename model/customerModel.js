export async function getAllCustomers() {
    return $.ajax({
      url: "http://localhost:8080/Spring_POS_API/api/v1/customers",
      method: "GET",
      dataType: "json",

      success: function(customerList) {            
        return customerList;
      },

      error: function (error) {
        console.log(error);
      }
    });
}

export function saveCustomer(customer) {
  return $.ajax({
    url: "http://localhost:8080/Spring_POS_API/api/v1/customers",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(customer),
  });
}