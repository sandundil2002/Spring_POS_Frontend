export function saveCustomer(customerData) {
  return $.ajax({
    url: "http://localhost:8080/Spring_POS_API/api/v1/customers",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(customerData),
  });
}