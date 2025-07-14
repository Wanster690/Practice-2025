import React, { useContext, useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form, Row, Col } from "react-bootstrap";
import { Context } from "../../index";
import { createDevice, fetchBrands, fetchTypes, updateDevice } from "../../http/deviceAPI";
import { observer } from "mobx-react-lite";

import styles from '../../styles/components/modals/ModalDevice.module.css';

const ModalDevice = observer(({ show, onHide, editingDevice }) => {
    const { device } = useContext(Context);

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState([]);
    const [id, setId] = useState(null);

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
        fetchBrands().then(data => device.setBrands(data));
    }, [device]);

    useEffect(() => {
        if (editingDevice) {
            setName(editingDevice.name || '');
            setPrice(editingDevice.price || 0);
            setInfo(editingDevice.info?.map(i => ({ ...i, number: i.id })) || []);
            setId(editingDevice.id);

            const selectedType = device.types.find(type => type.id === editingDevice.typeId);
            const selectedBrand = device.brands.find(brand => brand.id === editingDevice.brandId);
            if (selectedType) device.setSelectedType(selectedType);
            if (selectedBrand) device.setSelectedBrand(selectedBrand);
        } else {
            resetForm();
        }
    }, [device, editingDevice, device.types, device.brands]);

    const resetForm = () => {
        setName('');
        setPrice(0);
        setFile(null);
        setInfo([]);
        setId(null);
    };

    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }]);
    };

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number));
    };

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i));
    };

    const selectedFile = e => {
        setFile(e.target.files[0]);
    };

    const saveDevice = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        if (file) formData.append('img', file);
        formData.append('brandId', device.selectedBrand.id);
        formData.append('typeId', device.selectedType.id);
        formData.append('info', JSON.stringify(info.map(({ number, ...rest }) => rest)));

        if (editingDevice) {
            updateDevice(id, formData).then(() => {
                onHide();
                resetForm();
            });
        } else {
            createDevice(formData).then(() => {
                onHide();
                resetForm();
            });
        }
    };

    return (
        <Modal show={show} onHide={() => { onHide(); resetForm(); }} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {editingDevice ? "Редактировать устройство" : "Добавить устройство"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className={styles.mt2}>
                        <Dropdown.Toggle>
                            {device.selectedType.name || "Выберите тип"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item
                                    onClick={() => device.setSelectedType(type)}
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className={styles.mt2}>
                        <Dropdown.Toggle>
                            {device.selectedBrand.name || "Выберите бренд"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand =>
                                <Dropdown.Item
                                    onClick={() => device.setSelectedBrand(brand)}
                                    key={brand.id}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className={styles.mt3}
                        placeholder="Введите название устройства"
                    />
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className={styles.mt3}
                        placeholder="Введите стоимость устройства"
                        type="number"
                    />
                    <Form.Control
                        className={styles.mt3}
                        type="file"
                        onChange={selectedFile}
                    />
                    <hr />
                    <Button variant="outline-dark" onClick={addInfo} className={styles.btnOutlineDark}>
                        Добавить новое свойство
                    </Button>
                    {info.map(i =>
                        <Row className={styles.mt4} key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    placeholder="Введите название свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    placeholder="Введите описание свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeInfo(i.number)}
                                    variant="outline-danger"
                                    className={styles.btnOutlineDanger}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={() => { onHide(); resetForm(); }} className={styles.btnOutlineDanger}>Закрыть</Button>
                <Button variant="outline-success" onClick={saveDevice} className={styles.btnOutlineSuccess}>
                    {editingDevice ? "Сохранить изменения" : "Добавить"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default ModalDevice;
