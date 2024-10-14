import { getAllItems, saveItem } from "../model/itemModel.js";

$(document).ready(function () {
  reloadItems();
});

$("#add-item-btn").click(function () {
  const category = $("#item-category").val();
  const unitPrice = $("#price").val();
  const qtyOnHand = $("#qty").val();
  const expireDate = $("#ex-date").val();

  const itemData = {
    category: category,
    unitPrice: unitPrice,
    qtyOnHand: qtyOnHand,
    expireDate: expireDate,
  };

  console.log(itemData);
  

  const promise = saveItem(itemData);
  promise.then(() => {
    reloadItems();
  });
});

function loadItemTable(itemList) {
  $("#item-table").empty();
  itemList.forEach(function (item) {
    $(".table").append(
      "<tr> " +
        "<td>" +
        item.itemCode +
        "</td>" +
        "<td>" +
        item.category +
        "</td>" +
        "<td>" +
        item.unitPrice +
        "</td>" +
        "<td>" +
        item.qtyOnHand +
        "</td>" +
        "<td>" +
        item.registerDate +
        "</td>" +
        "<td>" +
        item.expireDate +
        "</td>" +
        "</tr>"
    );
  });
}

function loadItemCode(itemCodes) {
  const itemCode = $("#item-code");
  itemCode.empty();
  itemCode.append('<option value="">Search,Update or Delete Item</option>');

  itemCodes.forEach(function (code) {
    itemCode.append(`<option value="${code}">${code}</option>`);
  });
}

async function reloadItems() {
  try {
    $("#price").val("");
    $("#qty").val("");
    $("#ex-date").val("");
    const itemList = await getAllItems();
    loadItemTable(itemList);
    loadItemCode(itemList.map((item) => item.itemCode));
  } catch (error) {
    console.error("Error fetching items:", error);
  }
}
