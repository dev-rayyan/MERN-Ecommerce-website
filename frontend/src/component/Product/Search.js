import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import MetaData from "../layout/MetaData";

const Search = ({ history }) => {
	const [keyword, setKeyword] = useState("");
	let navigate = useNavigate();
	const searchSubmitHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			navigate(`/products/${keyword}`);
		} else {
			navigate("/products");
		}
	};
	return (
		<Fragment>
			<MetaData title="Search A Product --- Ecommerce" />

			<form className="searchBox" onSubmit={searchSubmitHandler}>
				<input
					type="text"
					placeholder="Search a Product ..."
					onChange={(e) => setKeyword(e.target.value)}
				/>
				<input type="submit" value="Search" />
			</form>
		</Fragment>
	);
};

export default Search;
