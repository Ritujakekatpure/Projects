import React, { useState } from "react";
import productService from "../service/product.service.js";


const AddProduct = () => {
  const [msg, setMsg] = useState("");



  const [product, setProduct] = useState({
    productName: "",
    warranty: "",
    billNumber: "",
    // status:"",
    date: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setProduct({ ...product, [e.target.name]: value });
  };

 

  const ProductRegister = (e) => {
    e.preventDefault();
    // console.log(product);
    productService
      .saveProduct(product)
      .then((res) => {
        console.log("Product Added Sucessfully");
        setMsg("Product Added Sucessfully");
        setProduct({
          productName: "",
          warranty: "",
          billNumber: "",
          // status:"",
          date: "",
        });
        // let isValid = validateForm();
        // console.log(isValid);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-header fs-3 text-center">Add Product</div>
              {msg && <p className="fs-4 text-center text-success">{msg}</p>}
              <div className="card-body">
                <form onSubmit={(e) => ProductRegister(e)}>
                  <div className="mb-3">
                    <label> Enter Product Name </label>
                    <input
                      type="text"
                      name="productName"
                      required
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={product.productName}
                    />
                   
                  </div>

                  <div className="mb-3">
                    <label> Enter Warranty </label>
                    <input
                      type="text"
                      name="warranty"
                      required
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={product.warranty}
                    />
                  </div>

                  <div className="mb-3">
                    <label> Enter BillNumber </label>
                    <input
                      type="text"
                      name="billNumber"
                      required
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={product.billNumber}
                    />
                  </div>

                  {/* <div className="mb-3">
                    <label> Enter Status </label>
                    <input
                      type="text"
                      name="status"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={product.status}
                    />
                  </div> */}

                  <div className="mb-3">
                    <label> Enter Date </label>
                    <input
                      type="date"
                      name="date"
                      required
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={product.date}
                    />
                  </div>

                  <button className="btn btn-primary col-md-12">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;


