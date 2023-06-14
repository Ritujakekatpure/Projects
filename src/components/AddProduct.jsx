import React, { useState ,useEffect} from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import productService from "../service/product.service.js";

const AddProduct = () => {
  const [product, setProduct] = useState({
    productName: "",
    warranty: "",
    billNumber: "",
    date: "",
  });
   

  const [errors , setErrors]= useState({})
  const [isSubmit , setIsSubmit]= useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setProduct({ ...product, [e.target.name]: value });
  };

  const ProductRegister = (e) => {
    e.preventDefault();

    setErrors( Validate(product));

    productService
      .saveProduct(product)
      .then((res) => {
        toast.success("Product Added Successfully");
        setProduct({
          productName: "",
          warranty: "",
          billNumber: "",
          date: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Validate = (product) =>{
    const err = {};
    if(!product.productName)
    {
      err.productName="product name is required";
    }
    if(!product.warranty)
    {
      err.warranty="Warranty is required";
    }
    if(!product.billNumber)
    {
      err.billNumber="Bill number is required";
    }
    if(!product.date)
    {
      err.date="date  is required";
    }
    else
    {
      err.productName="";
    }
    return err;
  }

  useEffect(()=>{
    if(Object.keys(errors).length===0 && isSubmit)
    console.log(product);
  }
  ,[errors])

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-header fs-3 text-center">Add Product</div>
              <div className="card-body">
                <form onSubmit={(e) => ProductRegister(e)}>
                  <div className="mb-3">
                    <label> Enter Product Name </label>
                    <input
                      type="text"
                      name="productName"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={product.productName}
                    />
                  <p style={{color:"red",fontWeight:"bold"}}>{errors.productName}</p>
                  </div>

                  <div className="mb-3">
                    <label> Enter Warranty </label>
                    <input
                      type="text"
                      name="warranty"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={product.warranty}
                    />
                    <p style={{color:"red",fontWeight:"bold"}}>{errors.warranty}</p>
                  </div>

                  <div className="mb-3">
                    <label> Enter BillNumber </label>
                    <input
                      type="text"
                      name="billNumber"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={product.billNumber}
                    />
                    <p style={{color:"red",fontWeight:"bold"}}>{errors.billNumber}</p>
                  </div>

                  <div className="mb-3">
                    <label> Enter Date </label>
                    <input
                      type="date"
                      name="date"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={product.date}
                      max={currentDate}
                    />
                    <p style={{color:"red",fontWeight:"bold"}}>{errors.date}</p>
                  </div>
                  <button className="btn btn-primary col-md-4 ms-4">
                    Submit
                  </button>
                  <button className="btn btn-primary col-md-4 ms-4 ">
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default AddProduct;
