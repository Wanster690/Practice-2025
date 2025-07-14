import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteDevice, fetchOneDevice } from '../http/deviceAPI';
import bigStar from '../assets/bigStar.png';
import styles from '../styles/pages/DevicePage.module.css';
import ModalDevice from "../components/modals/ModalDevice";

const DevicePage = () => {
    const [device, setDevice] = useState({ info: [] });
    const [editVisible, setEditVisible] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data));
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Вы уверены, что хотите удалить это устройство?')) {
            await deleteDevice(id);
            navigate('/');
        }
    };

    return (
        <Container className={styles.container}>
            <Row className={styles.topRow}>
                <Col md={5} className={styles.imageWrapper}>
                    <Image
                        src={process.env.REACT_APP_API_URL + device.img}
                        alt={device.name}
                        className={styles.image}
                        fluid
                    />
                </Col>

                <Col md={7} className={styles.infoWrapper}>
                    <h1 className={styles.deviceName}>{device.name}</h1>

                    <div className={styles.ratingContainer}>
                        <img src={bigStar} alt="star" className={styles.starIcon} />
                        <span className={styles.rating}>{device.rating}</span>
                    </div>

                    <Card className={styles.priceCard}>
                        <div className={styles.priceText}>Цена от</div>
                        <div className={styles.priceValue}>{device.price} ₽</div>

                        <Button variant="primary" className={styles.buyButton}>
                            В корзину
                        </Button>

                        <div className={styles.actionButtons}>
                            <Button variant="outline-secondary" onClick={() => setEditVisible(true)}>
                                Редактировать
                            </Button>
                            <Button variant="outline-danger" onClick={handleDelete}>
                                Удалить
                            </Button>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Row className={styles.specsSection}>
                <h2>Характеристики</h2>
                {device.info.map((info, index) => (
                    <Row
                        key={info.id}
                        className={`${styles.specRow} ${index % 2 === 0 ? styles.specEven : styles.specOdd}`}
                    >
                        <div className={styles.specTitle}>{info.title}</div>
                        <div className={styles.specDescription}>{info.description}</div>
                    </Row>
                ))}
            </Row>

            <ModalDevice
                show={editVisible}
                onHide={() => setEditVisible(false)}
                editingDevice={device}
            />
        </Container>
    );
};

export default DevicePage;
