import { getAllCustomers, getAllItems } from "../model/orderModel.js";

$(document).ready(function () {
  loadCustomerMobiles();
  loadItemCategories();

  $("#cus-mobile").change(function () {
    const selectedMobile = $(this).val();
    if (selectedMobile) {
      autoFillCustomerDetails(selectedMobile);
    } else {
      $("#cus-id").val("");
      $("#cus-name").val("");
    }
  });

  $("#item-category").change(function () {
    const selectedItem = $(this).val();
    if (selectedItem) {
      autoFillItemDetails(selectedItem);
    } else {
      $("#item-price").val("");
    }
  });
});

async function loadCustomerMobiles() {
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

async function loadItemCategories() {
  try {
    const itemList = await getAllItems();
    const itemCategory = $("#item-category");
    itemCategory.empty();
    itemCategory.append('<option value="">Select Item Category</option>');

    itemList.forEach(function (item) {
      itemCategory.append(
        `<option value="${item.category}">${item.category}</option>`
      );
    });

    window.items = itemList;
  } catch (error) {
    console.error("Error fetching items:", error);
  }
}

function autoFillItemDetails(category) {
  const selectedItem = window.items.find((item) => item.category == category);

  if (selectedItem) {
    $("#item-price").val(selectedItem.unitPrice);
    $("#item-qty").attr("Placeholder", "Available quantity is: " + selectedItem.qtyOnHand)
  }
}