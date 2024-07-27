import React from "react";

const ProductsTable = ({ data, onDelete, onEdit }) => {
  return (
    <table className="table-auto w-full text-left">
      <thead>
        <tr>
          <th className="px-4 py-2">ID</th>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Description</th>
          <th className="px-4 py-2">Price</th>
          <th className="px-4 py-2">Stock</th>
          <th className="px-4 py-2">Category</th>
          <th className="px-4 py-2">Image</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((product) => (
            <tr key={product.id}>
              <td className="border px-4 py-2">{product.id}</td>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">{product.description}</td>
              <td className="border px-4 py-2">{product.price}</td>
              <td className="border px-4 py-2">{product.stock}</td>
              <td className="border px-4 py-2">{product.category}</td>
              <td className="border px-4 py-2">
                {product.image ? (
                  <img
                    src={`http://localhost:8000/storage/${product.image}`}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td className="border px-4 py-2">
                {product.status ? "In Stock" : "Out of Stock"}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => onEdit(product)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="9" className="text-center">
              No products found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ProductsTable;
