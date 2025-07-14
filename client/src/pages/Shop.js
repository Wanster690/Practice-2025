import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Container, Row, Col } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import Pages from "../components/Pages";
import { fetchBrands, fetchDevices, fetchTypes } from "../http/deviceAPI";
import styles from '../styles/pages/Shop.module.css';

const Shop = observer(() => {
    const { device } = useContext(Context);

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
        fetchBrands().then(data => device.setBrands(data));
        fetchDevices(null, null, 1, device.limit).then(data => {
            device.setDevices(data.rows);
            device.setTotalCount(data.count);
        });
    }, [device]);

    useEffect(() => {
        const typeId = device.selectedType?.id || null;
        const brandId = device.selectedBrand?.id || null;

        fetchDevices(typeId, brandId, device.page, device.limit).then(data => {
            device.setDevices(data.rows);
            device.setTotalCount(data.count);
        });
    }, [device, device.selectedType, device.selectedBrand, device.page]);

    return (
        <Container className={styles.container}>
            <Row>
                <Col md={3} className={styles.sidebar}>
                    <TypeBar />
                </Col>
                <Col md={9} className={styles.content}>
                    <div className={styles.brandBarWrapper}>
                        <BrandBar />
                    </div>
                    <div className={styles.deviceListWrapper}>
                        <DeviceList devices={device.filteredDevices} />
                        <Pages />
                    </div>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
