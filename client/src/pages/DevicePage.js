import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import {useNavigate, useParams} from 'react-router-dom';
import {deleteDevice, fetchOneDevice} from '../http/deviceAPI';
import bigStar from '../assets/bigStar.png';
import styles from '../styles/pages/DevicePage.module.css';
import ModalDevice from "../components/modals/ModalDevice";

const DevicePage = () => {
    const [device, setDevice] = useState({ info: [] });
    const [editVisible, setEditVisible] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate()

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
            <Row>
                <Col md={4}>
                    <Image
                        className={styles.image}
                        src={process.env.REACT_APP_API_URL + device.img}
                        alt={device.name}
                        fluid
                    />
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{device.name}</h2>
                        <div
                            className={styles.ratingWrapper}
                            style={{ backgroundImage: `url(${bigStar})` }}
                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card className={styles.cardPrice}>
                        <h3>От: {device.price} руб.</h3>
                        <Button variant="outline-dark" className="mt-2">
                            Добавить в корзину
                        </Button>
                        <div className={styles.buttonGroup}>
                            <Button
                                variant="outline-primary"
                                onClick={() => setEditVisible(true)}
                            >Редактировать</Button>

                            <Button variant="outline-danger" onClick={handleDelete}>
                                Удалить
                            </Button>
                        </div>

                    </Card>
                </Col>
            </Row>

            <Row className={styles.specsRow}>
                <h1>Характеристики</h1>
                {device.info.map((info, index) => (
                    <Row
                        key={info.id}
                        className={`${styles.specRow} ${index % 2 === 0 ? styles.specRowEven : ''}`}
                    >
                        {info.title} : {info.description}
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
