import React from 'react';
import styles from "./Paginator.module.css";

type PaginatorPropsType = {
    pageSize: number
    totalUsersCount: number
    onPageChanged: (pageNumber: number) => void
    currentPage: number
}
const Paginator = (props:PaginatorPropsType) => {
    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return (
        <div>
            {pages.map(p => {
                    // @ts-ignore
                    return <span className={props.currentPage === p && styles.selectedPage}
                                 onClick={(e) => {
                                     props.onPageChanged(p);
                                 }}>{p}</span>
                })}
            </div>
    );
};

export default Paginator;