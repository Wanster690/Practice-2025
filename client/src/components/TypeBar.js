import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import styles from '../styles/components/TypeBar.module.css';

const TypeBar = observer(() => {
    const { device } = useContext(Context);

    return (
        <div className={styles.typeBarContainer}>
            <div
                className={`${styles.typeItem} ${!device.selectedType ? styles.typeItemActive : ''}`}
                onClick={() => device.setSelectedType(null)}
            >
                Все типы
            </div>
            {device.filteredTypes.map(type => (
                <div
                    key={type.id}
                    className={`${styles.typeItem} ${device.selectedType?.id === type.id ? styles.typeItemActive : ''}`}
                    onClick={() => device.setSelectedType(type)}
                >
                    {type.name}
                </div>
            ))}
        </div>
    );
});

export default TypeBar;
