import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import styles from '../styles/components/Pages.module.css';

const Pages = observer(() => {
    const { device } = useContext(Context);
    const pageCount = Math.ceil(device.totalCount / device.limit);
    const pages = [];

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1);
    }

    return (
        <div className={styles.paginationWrapper}>
            {pages.map(page => (
                <button
                    key={page}
                    className={`${styles.pageItem} ${device.page === page ? styles.active : ''}`}
                    onClick={() => device.setPage(page)}
                >
                    {page}
                </button>
            ))}
        </div>
    );
});

export default Pages;
