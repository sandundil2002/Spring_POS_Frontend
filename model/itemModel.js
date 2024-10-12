export async function getAllItems() {
    return $.ajax({
      url: "http://localhost:8080/Spring_POS_API/api/v1/items",
      method: "GET",
      dataType: "json",

      error: function (error) {
        console.log(error);
      },
    });  
}