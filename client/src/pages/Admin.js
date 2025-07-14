import React, { useState } from 'react';
import { Button, Container } from "react-bootstrap";
import ModalType from "../components/modals/ModalType";
import ModalDevice from "../components/modals/ModalDevice";
import ModalBrand from "../components/modals/ModalBrand";
import styles from '../styles/pages/Admin.module.css';

const Admin = () => {
    const [typeVisible, setTypeVisible] = useState(false);
    const [brandVisible, setBrandVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);

    return (
        <Container className={styles.containerFlexColumn}>
            <Button
                variant="outline-dark"
                className={styles.button}
                onClick={() => setTypeVisible(true)}
            >
                Управление типами устройств
            </Button>
            <Button
                variant="outline-dark"
                className={styles.button}
                onClick={() => setBrandVisible(true)}
            >
                Управление брендами устройств
            </Button>
            <Button
                variant="outline-dark"
                className={styles.button}
                onClick={() => setDeviceVisible(true)}
            >
                Добавить устройство
            </Button>
            <ModalType show={typeVisible} onHide={() => setTypeVisible(false)} />
            <ModalBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
            <ModalDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
        </Container>
    );
};

export default Admin;
