import { saveCustomer, getAllCustomers } from "../model/customerModel.js";

$(document).ready(async function () {
  try {
    const customerList = await getAllCustomers();
    loadCustomerTable(customerList);
    loadCustomerId(customerList.map((customers) => customers.customerId));
  } catch (error) {
    console.error("Error fetching customers:", error);
  }
});

$("#add-customer-btn").click(function () {
  const firstName = $("#first-name").val();
  const lastName = $("#last-name").val();
  const address = $("#address").val();
  const mobile = $("#mobile").val();
  const email = $("#email").val();

  const customerData = {
    firstName: firstName,
    lastName: lastName,
    address: address,
    mobile: mobile,
    email: email,
  };

  saveCustomer(customerData)
    .done(function (result) {
      swal("Confirmation!", "Customer Saved Successfully!", "success");
    })
    .fail(function (error) {
      swal("Error!", "Customer Save Failed!", "error");
    });
});

function loadCustomerTable(customerList) {
  $("#customer-table").empty();
  customerList.forEach(function (customer) {
    $(".table").append(
      "<tr> " +
        "<td>" +
        customer.customerId +
        "</td>" +
        "<td>" +
        customer.name +
        "</td>" +
        "<td>" +
        customer.address +
        "</td>" +
        "<td>" +
        customer.email +
        "</td>" +
        "<td>" +
        customer.mobile +
        "</td>" +
        "<td>" +
        customer.lastUpdatedAt +
        "</td>" +
        "</tr>"
    );
  });
}

function loadCustomerId(customerIds) {
  const customerId = $("#customer-id");
  customerId.empty();
  customerId.append('<option value="">Search,Update or Delete Customer</option>');

  customerIds.forEach(function (id) {
    customerId.append(
        `<option value="${id}">${id}</option>`
    )
  })
}
