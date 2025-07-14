import React from 'react';
import { Card, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from '../assets/star.png';
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import styles from '../styles/components/DeviceItem.module.css';

const DeviceItem = ({device}) => {
    const navigate = useNavigate();
    return (
        <Col md={3} className={styles.deviceCol} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
            <Card className={styles.card} border={"light"}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img} />
                <div className={styles.ratingBlock}>
                    <div>
                        {device.brand?.name || 'Бренд не указан'}
                    </div>
                    <div className={styles.ratingInner}>
                        <div>{device.rating}</div>
                        <Image width={18} height={18} src={star} />
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>
        </Col>
    );
};

export default DeviceItem;
