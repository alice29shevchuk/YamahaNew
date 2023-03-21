import React, { useState } from "react";
import {Link} from 'react-router-dom';
const Pagination=({postsPerPage,totalPosts,paginate})=>{
    const pageNumbers = [];
    // const [postWithGraphic,setPostWithGraphic] = useState([]);
    for (let index = 1; index <= Math.ceil(totalPosts/postsPerPage); index++) {
        pageNumbers.push(index);
        
    }
    // setPostWithGraphic(arr.map(iter => (
    //     <Post id={iter.id} title={iter.title} price={iter.price}></Post>
    // )));
    return(
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <Link to="/" onClick={() => paginate(number)} className="page-link">
                            {number}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
export default Pagination;