import React, { useEffect, useState } from "react";
import productService from "../service/product.service";
import { Link } from "react-router-dom";

const Home = () => {
  const [productList, setProductList] = useState([]);
  
  const [msg, setMsg] = useState("");
  useEffect(() => {
    init();
  }, []);

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
        setMsg("Delete Sucessfully");
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
            <div className="card">
              <div className="card-header fs-3 text-center">
                All Product List
                {msg && <p className="fs-4 text-center text-success">{msg}</p>}
              </div>
              <div className="card-body">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">SL No.</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Warranty</th>
                      <th scope="col">BillNumber</th>
                      {/* <th scope="col">Status</th> */}
                      <th scope="col">Date</th>
                      <th scope="col">Action</th>
                      <th scope="col">Assign</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList.map((p, num) => (
                      <tr>
                        <td>{num + 1}</td>
                        <td>{p.productName}</td>
                        <td>{p.warranty}</td>
                        <td>{p.billNumber}</td>
                        {/* <td>{p.status}</td> */}
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
                          <button className="btn btn-sm btn-primary ">
                            Assign
                          </button>
                          <button className="btn btn-sm btn-danger ms-1 ">
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
    </>
  );
};

export default Home;
