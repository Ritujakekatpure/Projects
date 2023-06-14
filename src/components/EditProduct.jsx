import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productService from "../service/product.service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EditProduct = () => {
  const [product, setProduct] = useState({
    id: "",
    productName: "",
    warranty: "",
    billNumber: "",
    date: "" 
  });

  const navigate = useNavigate();

  const { id } = useParams();
  console.log(id);

  const [msg, setMsg] = useState("");

  useEffect(() => {
    productService
      .getProductById(id)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setProduct({ ...product, [e.target.name]: value });
  };

  const ProductUpdate = (e) => {
    e.preventDefault();
  
    productService
      .editProduct(product)
      .then((res) => {
        toast.success("Edit Successfully"); // Show success toast
        navigate("/", { state: { showToast: true } });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-header fs-3 text-center">Edit Product</div>
              

              <div className="card-body">
                <form onSubmit={(e) => ProductUpdate(e)}>

                  <div className="mb-3">
                    <label>Enter Product Name</label>
                    <input
                      type="text"
                      name="productName"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={product.productName}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Enter Warranty</label>
                    <input
                      type="text"
                      name="warranty"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={product.warranty}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Enter Bill Number</label>
                    <input
                      type="text"
                      name="billNumber"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={product.billNumber}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Enter date</label>
                    <input
                      type="date"
                      name="date"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={product.date}
                      max={currentDate}
                    />
                  </div>

                  <button className="btn btn-primary col-md-12">Update</button>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProduct;