// import axios from "axios";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// import { addItem } from "../Reducer/stockSlice";

function AddUpdateItem() {
  // stock has "_id" and any other array has "id"

  const state = useSelector((state) => state);
  const stock = useSelector((state) => state.stock);
  const { id } = useParams();
  var currentItem;
  if (id) {
    currentItem = stock.filter(
      (item) =>
        // console.log(item._id, " <-> ", id)
        item._id == id
    );
    console.log(currentItem[0].expiry.substring(0, 10));
  }

  const [itemData, setItemData] = useState({
    productId: currentItem ? currentItem[0]?.productId : "",
    name: currentItem ? currentItem[0]?.name : "",
    salt: currentItem ? currentItem[0]?.salt : "",
    costPrice: currentItem ? currentItem[0]?.costPrice : "",
    quantity: currentItem ? currentItem[0]?.quantity : "",
    price: currentItem ? currentItem[0]?.price : "",
    expiry: currentItem ? currentItem[0]?.expiry : "",
    shelf: currentItem ? currentItem[0]?.shelf : "",
  });
  console.log(itemData.expiry);
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(currentItem[0]);

  function clear() {
    setItemData({
      productId: "",
      name: "",
      salt: "",
      quantity: "",
      costPrice: "",
      price: "",
      expiry: "",
      shelf: "",
    });
  }

  // function handleGotoStock() {
  //   navigate("/home-page");
  // }

  async function handleAddItem(e) {
    e.preventDefault();
    var productId = document.getElementById("productId").value;
    var name = document.getElementById("itemName").value;
    var salt = document.getElementById("salt").value;
    var costPrice = document.getElementById("costPrice").value;
    var price = document.getElementById("price").value;
    var stock = document.getElementById("stock").value;
    var expiry = document.getElementById("expiry").value;
    var shelf = document.getElementById("shelfNo").value;

    const { data } = await axios.post(
      "https://hisaabkitaab-backend.vercel.app/createStock",
      // "http://localhost:8000/createStock",

      {
        // customer: state.user.id,
        productId: productId,
        name: name,
        salt: salt,
        costPrice: costPrice,
        price: price,
        quantity: stock,
        expiry: expiry,
        shelf: shelf,
        worksAt: state.user.worksAt,
        availability: true,
      }
    );

    alert("Item added in stock");
    clear();
    // console.log(state.user.worksAt);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const { data } = await axios.post(
      `https://hisaabkitaab-backend.vercel.app/updateStock/${id}`,
      // `http://localhost:8000/updateStock/${id}`,

      {
        // customer: state.user.id,
        productId: itemData.productId,
        name: itemData.name,
        salt: itemData.salt,
        costPrice: itemData.costPrice,
        price: itemData.price,
        quantity: itemData.quantity,
        expiry: itemData.expiry,
        shelf: itemData.shelf,
        worksAt: state.user.worksAt,
        availability: true,
      }
    );
    alert("Item Updated");
    navigate("/home-page");
    console.log(itemData);
  }

  //  ??????

  useEffect(() => {
    console.log(itemData);
  }, [itemData]);
  return (
    <div className="add-update-item">
      {id ? (
        <div className="add-update" id="updateItem">
          <div>
            <h1 style={{ textAlign: "center" }}>UPDATE ITEM</h1>
          </div>
          {/* <div className="filters-icon">
            <img
              src="https://cdn-icons-png.flaticon.com/128/3161/3161837.png"
              onClick={handleAddItem}
            />
          </div> */}
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              placeholder="ID/Batch No./Lot No."
              value={itemData.productId}
              id="productId"
              onChange={(e) =>
                setItemData({ ...itemData, productId: e.target.value })
              }
              required
            ></input>
            <input
              type="text"
              placeholder="Item Name"
              id="itemName"
              value={itemData.name}
              required
              onChange={(e) =>
                setItemData({ ...itemData, name: e.target.value })
              }
            ></input>
            <input
              type="text"
              placeholder="Description"
              id="salt"
              value={itemData.salt}
              required
              onChange={(e) =>
                setItemData({ ...itemData, salt: e.target.value })
              }
            ></input>
            <input
              type="text"
              placeholder="Cost Price"
              id="costPrice"
              value={itemData.costPrice}
              required
              onChange={(e) =>
                setItemData({ ...itemData, costPrice: e.target.value })
              }
            ></input>
            <input
              type="text"
              placeholder="Selling Price"
              id="price"
              value={itemData.price}
              required
              onChange={(e) =>
                setItemData({ ...itemData, price: e.target.value })
              }
            ></input>
            <input
              type="text"
              placeholder="Stock"
              id="stock"
              value={itemData.quantity}
              required
              onChange={(e) =>
                setItemData({ ...itemData, quantity: e.target.value })
              }
            ></input>
            {console.log(typeof itemData.expiry)}
            <input
              type="text"
              placeholder="Expiry"
              id="expiry"
              value={itemData.expiry.substring(0, 10)}
              required
              onChange={(e) =>
                setItemData({ ...itemData, expiry: e.target.value })
              }
            ></input>
            <input
              type="text"
              placeholder="Shelf No."
              id="shelfNo"
              value={itemData.shelf}
              required
              onChange={(e) =>
                setItemData({ ...itemData, shelf: e.target.value })
              }
            ></input>
            <button type="submit" className="submit-button">
              UPDATE ITEM
            </button>
            {/* {state.stock.length > 0 && (
              <button className="submit-button" onClick={handleGotoStock}>
                GO TO STOCK
              </button>
            )} */}
          </form>
        </div>
      ) : (
        <div className="add-update" id="addItem">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1>ADD NEW ITEM</h1>
          </div>
          <form onSubmit={handleAddItem}>
            <input
              type="text"
              placeholder="ID/Batch No./Lot No."
              value={itemData.productId}
              id="productId"
              onChange={(e) =>
                setItemData({ ...itemData, productId: e.target.value })
              }
              required
            ></input>
            <input
              type="text"
              placeholder="Item Name"
              value={itemData.name}
              id="itemName"
              onChange={(e) =>
                setItemData({ ...itemData, name: e.target.value })
              }
              required
            ></input>
            <input
              type="text"
              placeholder="Description"
              value={itemData.salt}
              id="salt"
              onChange={(e) =>
                setItemData({ ...itemData, salt: e.target.value })
              }
              required
            ></input>
            <input
              type="text"
              placeholder="Cost Price"
              value={itemData.costPrice}
              id="costPrice"
              onChange={(e) =>
                setItemData({ ...itemData, costPrice: e.target.value })
              }
              required
            ></input>
            <input
              type="text"
              placeholder="Selling Price"
              value={itemData.price}
              id="price"
              onChange={(e) =>
                setItemData({ ...itemData, price: e.target.value })
              }
              required
            ></input>
            <input
              type="text"
              placeholder="Stock"
              value={itemData.quantity}
              id="stock"
              onChange={(e) =>
                setItemData({ ...itemData, quantity: e.target.value })
              }
              required
            ></input>
            <input
              type="date"
              // type="text"
              placeholder="Expiry in yyyy-mm-dd"
              value={itemData.expiry}
              // onfocus="(this.type='date')"
              // onblur="(this.type='text')"
              id="expiry"
              onChange={(e) =>
                setItemData({ ...itemData, expiry: e.target.value })
              }
              required
            ></input>
            <input
              type="text"
              placeholder="Shelf No."
              value={itemData.shelf}
              id="shelfNo"
              onChange={(e) =>
                setItemData({ ...itemData, shelf: e.target.value })
              }
              required
            ></input>
            <button type="submit" className="submit-button">
              ADD ITEM TO STOCK
            </button>
            {/* {state.stock.length > 0 && (
              <button className="submit-button" onClick={handleGotoStock}>
                GO TO STOCK
              </button>
            )} */}
          </form>
        </div>
      )}
    </div>
  );
}

export default AddUpdateItem;
