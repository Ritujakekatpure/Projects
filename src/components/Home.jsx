import React, { useEffect, useState } from "react";
import productService from "../service/product.service";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.showToast) {
      toast.success("Edit Successfully"); // Editsuccess toast
    }
  }, [location.state]);

  const init = () => {
    productService
      .getAllProduct()
      .then((res) => {
        setProductList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteProduct = (id) => {
    productService
      .deleteProduct(id)
      .then((res) => {
        toast.success("Delete Successfully"); // Delete success toast
        init();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12">
            <Link to={"addProduct"} className="btn  btn-success">
              Add Product
            </Link>
            <div className="card mt-3">
              <div className="card-header fs-3 text-center ">
                All Product List
              </div>
              <div className="card-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">SL No.</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Warranty</th>
                      <th scope="col">BillNumber</th>
                      <th scope="col">Date</th>
                      <th scope="col">Action</th>
                      <th scope="col">Assign</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList.map((p, num) => (
                      <tr key={p.id}>
                        <td>{num + 1}</td>
                        <td>{p.productName}</td>
                        <td>{p.warranty}</td>
                        <td>{p.billNumber}</td>
                        <td>{p.date}</td>
                        <td>
                          <Link
                            to={"editProduct/" + p.id}
                            className="btn btn-sm btn-primary"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="btn btn-sm btn-danger ms-1"
                          >
                            Delete
                          </button>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-primary">
                            Assign
                          </button>
                          <button className="btn btn-sm btn-danger ms-1">
                            Unassign
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Home;
