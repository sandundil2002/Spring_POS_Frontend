import { getAllCustomers } from "../model/orderModel.js";

$(document).ready(function () {
  loadCustomerId();

  $("#cus-mobile").change(function () {
    const selectedMobile = $(this).val();
    if (selectedMobile) {
      autoFillCustomerDetails(selectedMobile);
    } else {
      $("#cus-id").val("");
      $("#cus-name").val("");
    }
  });
});

async function loadCustomerId() {
  try {
    const customerList = await getAllCustomers();
    const cusMobile = $("#cus-mobile");
    cusMobile.empty();
    cusMobile.append('<option value="">Select Customer Mobile</option>');

    customerList.forEach(function (customer) {
      cusMobile.append(
        `<option value="${customer.mobile}">${customer.mobile}</option>`
      );
    });

    window.customers = customerList;
  } catch (error) {
    console.error("Error fetching customers:", error);
  }
}

function autoFillCustomerDetails(mobile) {
  const selectedCustomer = window.customers.find(
    (customer) => customer.mobile == mobile
  );

  if (selectedCustomer) {
    $("#cus-id").val(selectedCustomer.customerId);
    $("#cus-name").val(selectedCustomer.name);
  }
}