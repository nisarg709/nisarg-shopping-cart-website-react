import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Select from 'react-select';

import axios from 'axios';
import {
    saveProduct,
    listProducts,
    deleteProdcut,
} from '../actions/productActions';
import {listCategory, listSubCategory} from "../actions/categoryActions";

function ProductsScreen(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [imageDB, setImageDB] = useState('');
    const [status, setStatus] = useState({label: 'active', value: 'active'});
    const [categoryName, setCategory] = useState('');
    const [subCategoryName, setSubCategory] = useState('');
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);
    const productList = useSelector((state) => state.productList);
    const categoryList = useSelector((state) => state.categoryList);
    const subCategoryList = useSelector((state) => state.subCategoryList);

    let products = productList.products.data
    let category = categoryList.category.data
    let subCategory = subCategoryList.subCategory.data

    let catsArr = []
    let subCatsArr = []
    let selectedCat = {}
    let selectedSubCat = {}
    if (category) {
        category.map((cat) => {
            catsArr.push({
                label: cat.category_name, value: cat.id
            })
            if (cat.category_name === categoryName) {
                selectedCat = {label: cat.category_name, value: cat.id}
            }
        })
    }

    if (subCategory) {
        subCategory.map((subCat) => {
            subCatsArr.push({
                label: subCat.sub_category_name, value: subCat.id
            })
            if (subCat.sub_category_name === subCategoryName) {
                selectedSubCat = {label: subCat.sub_category_name, value: subCat.id}
            }
        })
    }

    const productSave = useSelector((state) => state.productSave);
    const {
        loading: loadingSave,
        success: successSave,
        error: errorSave,
    } = productSave;

    const productDelete = useSelector((state) => state.productDelete);
    const {
        loading: loadingDelete,
        success: successDelete,
        error: errorDelete,
    } = productDelete;

    const setCategoryAndGetSubCategory = (e, id) => {
        setCategory({
            label: e.label,
            value: e.value
        })
        dispatch(listSubCategory(e.value));
    }

    const setSubCategoryValue = (e, id) => {
        setSubCategory({
            label: e.label,
            value: e.value
        })
    }

    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
            setModalVisible(false);
        }
        dispatch(listProducts());
        dispatch(listCategory());
        dispatch(listSubCategory());

        return () => {
        };
    }, [successSave, successDelete]);

    const openModal = (product) => {
        setModalVisible(true);
        if (Object.entries(product).length === 0) {
            console.log("out")
            setId(null);
            setName('');
            setPrice(null);
            setDescription('');
            setImage('');
            setCategory('');
            setSubCategory('');
            setStatus({label: 'active', value: 'active'});


        } else {

            setId(product.id);
            setName(product.product_name);
            setPrice(product.price);
            setDescription(product.description);
            setImage(product.image);
            setCategory(product.category);
            setSubCategory(product.sub_category);
            setStatus({label: product.status, value: product.status});
        }

    };
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            saveProduct({
                id,
                product_name: name,
                price,
                image: imageDB,
                category: categoryName ? categoryName : categoryName.label,
                sub_category: subCategoryName ? subCategoryName : subCategoryName.label,
                status: status.label,
                description,
            })
        );
    };
    const deleteHandler = (product) => {
        dispatch(deleteProdcut(product.id));
    };
    const uploadFileHandler = (e) => {
        setImage('');
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setUploading(true);
        axios
            .post('http://localhost:8000/api/uploads', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                setImage('http://localhost:8000/images/products/' + response.data.data);
                setImageDB(response.data.data);
                setUploading(false);
            })
            .catch((err) => {
                console.log(err);
                setUploading(false);
            });
    };
    return (
        <div className="content content-margined">
            <div className="product-header">
                <h3>Products</h3>
                <button className="button primary" onClick={() => openModal({})}>
                    Create Product
                </button>
            </div>
            {modalVisible && (
                <div className="form">
                    <form onSubmit={submitHandler}>
                        <ul className="form-container">
                            <li>
                                <h2> {id ? 'Update' : 'Create'} Product
                                </h2>
                            </li>
                            <li>
                                {loadingSave && <div>Loading...</div>}
                                {errorSave && <div>{errorSave}</div>}
                            </li>

                            <li>
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    id="name"
                                    onChange={(e) => setName(e.target.value)}
                                ></input>
                            </li>
                            <li>
                                <label htmlFor="price">Price</label>
                                <input
                                    type="text"
                                    name="price"
                                    value={price}
                                    id="price"
                                    onChange={(e) => setPrice(e.target.value)}
                                ></input>
                            </li>
                            <li>
                                <label htmlFor="image">Image</label>
                                <img src={image} alt="product"></img>
                                <input type="file" onChange={(e) => uploadFileHandler(e)}></input>
                                {uploading && <div>Uploading...</div>}
                            </li>
                            <li>
                                <label htmlFor="category">Category</label>

                                <Select defaultValue={selectedCat ? selectedCat : ''}
                                        options={catsArr}
                                        onChange={(e) => setCategoryAndGetSubCategory(e)}/>

                            </li>
                            <li>
                                <label htmlFor="name">Sub Category</label>
                                <Select
                                    defaultValue={selectedSubCat ? selectedSubCat : ''}
                                    options={subCatsArr}
                                    onChange={(e) => setSubCategoryValue(e)}/>
                            </li>
                            <li>
                                <label htmlFor="description">Description</label>
                                <textarea
                                    rows="8"
                                    name="description"
                                    value={description}
                                    id="description"
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </li>
                            <li>
                                <label htmlFor="status">Status {status.label}</label>
                                <Select
                                    defaultValue={{label: status.label, value: status.value}}
                                    options={[
                                        {label: 'active', value: 'active'},
                                        {label: 'inactive', value: 'inactive'}
                                    ]
                                    }
                                    onChange={(e) => setStatus({
                                        label: e.label,
                                        value: e.value
                                    })}/>
                            </li>
                            <li>
                                <button type="submit" className="button primary">
                                    {id ? 'Update' : 'Create'}
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={() => setModalVisible(false)}
                                    className="button secondary"
                                >
                                    Back
                                </button>
                            </li>
                        </ul>
                    </form>
                </div>
            )}

            <div className="product-list">
                <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Sub Category</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products && products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.product_name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.sub_category}</td>
                            <td>{product.status}</td>
                            <td>
                                <button className="button" onClick={() => openModal(product)}>
                                    Edit
                                </button>
                                {' '}
                                <button
                                    className="button"
                                    onClick={() => deleteHandler(product)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductsScreen;
