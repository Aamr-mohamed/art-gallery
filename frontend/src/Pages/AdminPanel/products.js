import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/sidebar";
import axios from "axios";
import { customToast } from "../../Utils/toasts";
import ProductsTable from "../../Components/Table/productsTable";
import Modal from "../../Components/Modal/Modal";

const Products = () => {
    const backendUrl = process.env.REACT_APP_API_URL;
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        image: "",
        category: "",
    });
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editProductId, setEditProductId] = useState(null);
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${backendUrl}/products`);
            setProducts(response.data.products);
        } catch (error) {
            customToast("error", error.message);
        }
    };

    const handleCreate = async () => {
        try {
            const formData = new FormData();
            Object.keys(newProduct).forEach(key => {
                formData.append(key, newProduct[key]);
            });

            // Adjust the status field based on stock
            formData.append('status', newProduct.stock > 0);

            const response = await axios.post(`${backendUrl}/products`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setProducts([...products, response.data.product]);
            customToast("success", "Product created successfully");
            handleCloseModal();
            fetchProducts();
        } catch (error) {
            customToast("error", error.message);
        }
    };

    const handleUpdate = async (id, updatedProduct) => {
        try {
            const formData = new FormData();
            Object.keys(updatedProduct).forEach(key => {
                formData.append(key, updatedProduct[key]);
            });

            // Adjust the status field based on stock
            formData.append('status', updatedProduct.stock > 0);

            const response = await axios.patch(`${backendUrl}/products/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setProducts(products.map(product => product.id === id ? response.data.product : product));
            customToast("success", "Product updated successfully");
            handleCloseModal();
            fetchProducts();
        } catch (error) {
            customToast("error", error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${backendUrl}/products/${id}`);
            setProducts(products.filter(product => product.id !== id));
            customToast("success", "Product deleted successfully");
            fetchProducts();
        } catch (error) {
            customToast("error", error.message);
        }
    };

    const handleOpenModal = (product = null) => {
        if (product) {
            setEditMode(true);
            setEditProductId(product.id);
            setNewProduct({
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                image: product.image,
                category: product.category,
            });
            setPreviewImage(`http://localhost:8000/storage/${product.image}`);
        } else {
            setEditMode(false);
            setNewProduct({
                name: "",
                description: "",
                price: "",
                stock: "",
                image: "",
                category: "",
            });
            setPreviewImage('');
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setNewProduct({
            name: "",
            description: "",
            price: "",
            stock: "",
            image: "",
            category: "",
        });
        setPreviewImage('');
    };

    const handleSubmit = () => {
        if (editMode) {
            handleUpdate(editProductId, newProduct);
        } else {
            handleCreate();
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            setNewProduct({ ...newProduct, image: file });
        }
    };

    // Filter products based on searchTerm
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full flex flex-row">
            <div className="w-1/6">
                <Sidebar />
            </div>
            <div className="w-5/6 p-5">
                <h1 className="text-3xl font-bold text-center my-5">Admin Panel</h1>
                <h2 className="text-3xl font-bold my-5">Products</h2>
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-5 p-3 border border-gray-300 rounded-md"
                />

                <button
                    onClick={() => handleOpenModal()}
                    className="mb-5 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Create New Product
                </button>

                <ProductsTable
                    data={filteredProducts} // Pass filtered products to table
                    onDelete={handleDelete}
                    onEdit={(product) => handleOpenModal(product)}
                />

                <Modal show={showModal} handleClose={handleCloseModal} title={editMode ? "Edit Product" : "Create New Product"}>
                    <div className="p-6">
                        <form className="space-y-4">
                            {/* Form fields */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Enter product name"
                                    value={newProduct.name}
                                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <input
                                    id="description"
                                    type="text"
                                    placeholder="Enter product description"
                                    value={newProduct.description}
                                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                                    Price
                                </label>
                                <input
                                    id="price"
                                    type="number"
                                    placeholder="Enter product price"
                                    value={newProduct.price}
                                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                                    Stock
                                </label>
                                <input
                                    id="stock"
                                    type="number"
                                    placeholder="Enter product stock quantity"
                                    value={newProduct.stock}
                                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                    Category
                                </label>
                                <input
                                    id="category"
                                    type="text"
                                    placeholder="Enter product category"
                                    value={newProduct.category}
                                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                                    Image
                                </label>
                                <input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                                />
                                {previewImage && (
                                    <div className="mt-4">
                                        <img
                                            src={previewImage}
                                            alt="Image preview"
                                            className="max-w-full h-auto rounded-md"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end mt-4 space-x-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="inline-flex items-center px-4 py-2 bg-gray-500 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    {editMode ? "Update Product" : "Create Product"}
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default Products;
