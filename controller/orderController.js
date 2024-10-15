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
    $("#item-qty").attr(
      "Placeholder",
      "Available quantity is: " + selectedItem.qtyOnHand
    );
  }
}

$("#add-item-btn").click(function () {
  const addedItems = [];
  const customer = $("#cus-mobile").val();
  const category = $("#item-category").val();
  const unitPrice = parseFloat($("#item-price").val());
  const qty = parseInt($("#item-qty").val());

  if (customer && category && unitPrice && qty) {
    const totalPrice = unitPrice * qty;
    const item = { category, unitPrice, qty, totalPrice };
    addedItems.push(item);

    $("#added-items-table tbody").append(`
                <tr>
                    <td>${category}</td>
                    <td>${unitPrice.toFixed(2)}</td>
                    <td>${qty}</td>
                    <td>${totalPrice.toFixed(2)}</td>
                    <td><button class="btn btn-danger btn-sm remove-item-btn">Remove</button></td>
                </tr>
            `);

    $("#item-category").val("");
    $("#item-price").val("");
    $("#item-qty").val("");
  } else {
    swal("Warning!", "Please fill all item details!", "info");
  }

  $(document).on("click", ".remove-item-btn", function () {
    swal({
      title: "Are you sure?",
      text: "Do you want to remove this item!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willRemove) => {
      if (willRemove) {
        const rowIndex = $(this).closest("tr").index();
        addedItems.splice(rowIndex, 1);
        $(this).closest("tr").remove();
      }
    });
  });
});
