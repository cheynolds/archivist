javascript: (() => {

var c = document.querySelectorAll(".g-item-sortable");
var books = [];
for (var i = 0; i < c.length; i++) {
  var book = {};
  var id = c[i].getAttribute("data-itemid");
  book["n"] = i;
  book["id"] = id;
  try {
    book["title"] = c[i].querySelector("#itemName_" + id).title;
  } catch (err) {
    book["title"] = "";
  }

  try {
    book["priceDrop"] = c[i].querySelector("#itemInfo_" + id+"> div > div.a-column.a-span12.g-span12when-narrow.g-span7when-wide > div.a-row.a-spacing-small.a-size-small > div.a-row.itemPriceDrop > span:nth-child(3)").textContent;
  } catch (err) {
    book["priceDrop"] = "";
  }

  try {
    book["percentDrop"] = c[i].querySelector("#itemPriceDrop_" + id).textContent;
  } catch (err) {
    book["percentDrop"] = "";
  }

  try {
    book["listName"] = c[i].querySelector("#profile-list-name").textContent;
  } catch (err) {
    book["listName"] = "";
  }

  try {
    book["link"] = c[i].querySelector("#itemName_" + id).href;
  } catch (err) {
    book["link"] = "";
  }

  try {
    book["author"] = c[i].querySelector("#item-byline-" + id).innerText;
  } catch (err) {
    book["author"] = "";
  }
  
  try {
    book["image"] = c[i].querySelector("#itemImage_" + id + " img").src;
  } catch (err) {
    book["image"] = "";
  }
  
  try {
    book["price"] = c[i].querySelector("#itemPrice_" + id).innerText;
   } catch (err) {
    book["price"] = "";
  }

  try {
    book["itemAddedDate"] = c[i]
      .querySelector("#itemAddedDate_" + id).innerText
    

  } catch (err) {
    book["itemAddedDate"] = "";
  }

  try {
    book["itemPurchasedDate"] = c[i]
      .querySelector("#itemPurchasedDate_" + id).innerText
    
  } catch (err) {
    book["itemPurchasedDate"] = "";
  }

  try {
    book["asin"] = JSON.parse(
      c[i].getAttribute("data-reposition-action-params")
    ).itemExternalId.match(/ASIN:(.+?)\|/)[1];
  } catch (err) {
    book["asin"] = "";
  }
  books.push(book);
}

document.body.innerText = "";

function maketd(val) {
  var td = document.createElement("td");
  td.innerHTML = val.trim();
  return td;
}

var table = document.createElement("table");
table.style.margin="10px";

var head = document.createElement("tr");
table.appendChild(head);

var head_title = document.createElement("th");
head_title.innerText = "Title";
head.appendChild(head_title);

var head_image = document.createElement("th");
head_image.innerText = "Image";
head.appendChild(head_image);

var head_author = document.createElement("th");
head_author.innerText = "Brand";
head.appendChild(head_author);

var head_asin = document.createElement("th");
head_asin.innerText = "ASIN/ISBN";
head.appendChild(head_asin);

var head_price = document.createElement("th");
head_price.innerText = "Price";
head.appendChild(head_price);

var head_dateAdded = document.createElement("th");
head_dateAdded.innerText = "Date Added";
head.appendChild(head_dateAdded);

var head_datePurchased = document.createElement("th");
head_datePurchased.innerText = "Date Purchased";
head.appendChild(head_datePurchased);

var head_link = document.createElement("th");
head_link.innerText = "Link";
head.appendChild(head_link);


for (var i = 0; i < books.length; i++) {
  let tr = document.createElement("tr");

  tr.appendChild(maketd("## " + books[i].title));
  tr.appendChild(maketd("%%"));
  tr.appendChild(maketd("listCategory:: "+books[i].listName));
  tr.appendChild(maketd("ASIN:: " +books[i].asin));
  tr.appendChild(maketd("foundDate::  " +books[i].itemAddedDate.replace("Item added ","")));
  tr.appendChild(maketd("foundPrice::" + books[i].priceDrop.replace("(was ", "").replace("when added to List)","")));
  tr.appendChild(maketd("lastPrice:: "+books[i].price));  
  tr.appendChild(maketd("percentDrop::" + books[i].percentDrop.replace("Price dropped ", "")));
  tr.appendChild(maketd("itemPurchased::" +books[i].itemPurchasedDate));
  tr.appendChild(maketd("inStock:: 0"));
  tr.appendChild(maketd("productLink:: "+ `<a href='${books[i].link}'>Non-Referal Link</a>`));
  tr.appendChild(maketd("referralLink:: "+ `<a href='${books[i].link}+"&linkCode=ll1&tag=prographer-20&linkId=3a1c421b95bb0d60da1c0fe6c72daf74&language=en_US"'>Referal Link</a>`));
  tr.appendChild(maketd("%%"));
  tr.appendChild(maketd(`<img src=${books[i].image} width="250">`));
  tr.appendChild(maketd("tags:: #brand/" +books[i].author.replace("by ", "").replace(/\(.+?\)/, "").replace(" ", "")));
  tr.appendChild(maketd(books[i].title));
  tr.appendChild(maketd("ASIN:: " +books[i].asin));
  tr.appendChild(maketd("### "+books[i].price));
  tr.appendChild(maketd(`<a href='${books[i].link}+"&linkCode=ll1&tag=prographer-20&linkId=3a1c421b95bb0d60da1c0fe6c72daf74&language=en_US"'>#### via Amazon</a>`));
  
  table.appendChild(tr);
}

document.body.appendChild(table);


})();

