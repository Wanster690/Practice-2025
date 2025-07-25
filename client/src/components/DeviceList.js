import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import DeviceItem from "./DeviceItem";
import styles from '../styles/components/DeviceList.module.css';

const DeviceList = observer(() => {
    const { device } = useContext(Context);

    return (
        <Row className={styles.deviceRow}>
            {device.devices.map(device =>
                <DeviceItem key={device.id} device={device} />
            )}
        </Row>
    );
});

export default DeviceList;
