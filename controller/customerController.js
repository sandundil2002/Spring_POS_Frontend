import { saveCustomer } from "../model/customerModel.js";

$(document).ready(function () {
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
});
