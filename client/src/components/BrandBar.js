import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Row, Card } from "react-bootstrap";
import styles from "../styles/components/BrandBar.module.css";

const BrandBar = observer(() => {
    const { device } = useContext(Context);

    return (
        <Row className="d-flex flex-wrap">
            <Card
                className={`${styles.card} ${!device.selectedBrand.id ? styles.active : ""}`}
                onClick={() => device.setSelectedBrand({})}
            >
                Все бренды
            </Card>
            {device.brands.map((brand) => (
                <Card
                    key={brand.id}
                    className={`${styles.card} ${device.selectedBrand.id === brand.id ? styles.active : ""}`}
                    onClick={() => device.setSelectedBrand(brand)}
                >
                    {brand.name}
                </Card>
            ))}
        </Row>
    );
});

export default BrandBar;
