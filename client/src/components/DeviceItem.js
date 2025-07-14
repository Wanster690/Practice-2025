import React from 'react';
import { Card, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import styles from '../styles/components/DeviceItem.module.css';

const DeviceItem = ({ device }) => {
    const navigate = useNavigate();

    return (
        <Col md={4} lg={3} className={styles.deviceCol} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
            <Card className={styles.card} border="light" >
                <div className={styles.imageWrapper}>
                    <Image
                        src={process.env.REACT_APP_API_URL + device.img}
                        alt={device.name}
                        className={styles.deviceImage}
                        fluid
                    />
                </div>
                <Card.Body className={styles.cardBody}>
                    <div className={styles.brandName}>
                        {device.brand?.name || 'Бренд не указан'}
                    </div>
                    <div className={styles.rating}>
                        <span>{device.rating.toFixed(1)}</span> <span className={styles.star}>⭐</span>
                    </div>
                    <Card.Title className={styles.deviceName}>
                        {device.name}
                    </Card.Title>
                    <div className={styles.price}>
                        {device.price.toLocaleString('ru-RU')} ₽
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default DeviceItem;
