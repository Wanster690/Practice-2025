import React, { useState } from 'react';
import { Container, Row, Col, Card } from "react-bootstrap";
import { MdCategory } from "react-icons/md";
import { FaTags, FaPlusCircle } from "react-icons/fa";
import ModalType from "../components/modals/ModalType";
import ModalDevice from "../components/modals/ModalDevice";
import ModalBrand from "../components/modals/ModalBrand";
import styles from '../styles/pages/Admin.module.css';


const Admin = () => {
    const [typeVisible, setTypeVisible] = useState(false);
    const [brandVisible, setBrandVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);

    return (
        <Container className={styles.container}>
            <h1 className={styles.title}>Админ-панель управления</h1>
            <Row className={styles.row}>
                <Col md={4} sm={6} xs={12}>
                    <Card
                        className={styles.card}
                        onClick={() => setTypeVisible(true)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={e => (e.key === 'Enter' ? setTypeVisible(true) : null)}
                    >
                        <MdCategory className={styles.icon} />
                        <Card.Body>
                            <Card.Title className={styles.cardTitle}>Типы устройств</Card.Title>
                            <Card.Text className={styles.cardText}>Создавайте и редактируйте типы устройств</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4} sm={6} xs={12}>
                    <Card
                        className={styles.card}
                        onClick={() => setBrandVisible(true)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={e => (e.key === 'Enter' ? setBrandVisible(true) : null)}
                    >
                        <FaTags className={styles.icon} />
                        <Card.Body>
                            <Card.Title className={styles.cardTitle}>Бренды</Card.Title>
                            <Card.Text className={styles.cardText}>Добавляйте и управляйте брендами устройств</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4} sm={6} xs={12}>
                    <Card
                        className={styles.card}
                        onClick={() => setDeviceVisible(true)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={e => (e.key === 'Enter' ? setDeviceVisible(true) : null)}
                    >
                        <FaPlusCircle className={styles.icon} />
                        <Card.Body>
                            <Card.Title className={styles.cardTitle}>Добавить устройство</Card.Title>
                            <Card.Text className={styles.cardText}>Создавайте новые записи устройств</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <ModalType show={typeVisible} onHide={() => setTypeVisible(false)} />
            <ModalBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
            <ModalDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
        </Container>
    );
};

export default Admin;
