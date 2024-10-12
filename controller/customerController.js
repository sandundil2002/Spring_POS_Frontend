import {
  getAllCustomers,
  saveCustomer,
  searchCustomer,
  updateCustomer,
  deleteCustomer,
} from "../model/customerModel.js";

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
    .done(function () {
      swal("Confirmation!", "Customer Saved Successfully!", "success");
    })
    .fail(function () {
      swal("Error!", "Customer Save Failed!", "error");
    });
});

$("#search-customer-btn").click(async function () {
  const customerId = $("#customer-id").val();

  if (customerId !== "") {
    try {
      const customerData = await searchCustomer(customerId);
      $("#first-name").val(customerData.firstName);
      $("#last-name").val(customerData.lastName);
      $("#address").val(customerData.address);
      $("#mobile").val(customerData.mobile);
      $("#email").val(customerData.email);
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  } else {
    swal("Warning!", "Customer Id Required", "info");
  }
});

$("#update-customer-btn").click(function () {
  const customerId = $("#customer-id").val();

  if (customerId !== "") {
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

    swal({
      title: "Are you sure?",
      text: "Do you want to update this customer!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        updateCustomer(customerId, customerData)
          .done(function () {
            swal("Confirmation!", "Customer Update Successfully!", "success");
          })
          .fail(function () {
            swal("Error!", "Customer Update Failed!", "error");
          });
      }
    });
  } else {
    swal("Warning!", "Customer Id Required", "info");
  }
});

$("#delete-customer-btn").click(function () {
  const customerId = $("#customer-id").val();

  if (customerId !== "") {
    swal({
      title: "Are you sure?",
      text: "Do you want to delete this customer!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteCustomer(customerId)
          .done(function () {
            swal("Confirmation!", "Customer Delete Successfully!", "success");
          })
          .fail(function () {
            swal("Error!", "Customer Delete Failed!", "error");
          });
      }
    });
  } else {
    swal("Warning!", "Customer Id Required", "info");
  }
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
  customerId.append(
    '<option value="">Search,Update or Delete Customer</option>'
  );

  customerIds.forEach(function (id) {
    customerId.append(`<option value="${id}">${id}</option>`);
  });
}
