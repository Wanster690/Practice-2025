import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import styles from '../styles/components/BrandBar.module.css';

const BrandBar = observer(() => {
    const { device } = useContext(Context);

    return (
        <div className={styles.brandBarContainer}>
            <div
                className={`${styles.brandItem} ${!device.selectedBrand ? styles.brandItemActive : ''}`}
                onClick={() => device.setSelectedBrand(null)}
            >
                Все бренды
            </div>

            {device.filteredBrands.map(brand => (
                <div
                    key={brand.id}
                    className={`${styles.brandItem} ${device.selectedBrand?.id === brand.id ? styles.brandItemActive : ''}`}
                    onClick={() => device.setSelectedBrand(brand)}
                >
                    {brand.logo && <img src={process.env.REACT_APP_API_URL + brand.logo} alt={brand.name} className={styles.brandLogo} />}
                    {brand.name}
                </div>
            ))}
        </div>
    );
});

export default BrandBar;
