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
        <Modal
            show={show}
            onHide={() => { onHide(); resetForm(); }}
            centered
            dialogClassName={styles.modalContent}
            backdropClassName={styles.backdrop}
        >
            <Modal.Header closeButton className={styles.modalHeader}>
                <Modal.Title>
                    {editingDevice ? "Редактировать устройство" : "Добавить устройство"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBody}>
                <Form>
                    <Dropdown className={styles.dropdown}>
                        <Dropdown.Toggle className={styles.dropdownToggle}>
                            {device.selectedType?.name || "Выберите тип"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className={styles.dropdownMenu}>
                            {device.types.map(type =>
                                <Dropdown.Item
                                    onClick={() => device.setSelectedType(type)}
                                    key={type.id}
                                    className={styles.dropdownItem}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className={styles.dropdown} style={{ marginTop: '1rem' }}>
                        <Dropdown.Toggle className={styles.dropdownToggle}>
                            {device.selectedBrand?.name || "Выберите бренд"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className={styles.dropdownMenu}>
                            {device.brands.map(brand =>
                                <Dropdown.Item
                                    onClick={() => device.setSelectedBrand(brand)}
                                    key={brand.id}
                                    className={styles.dropdownItem}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className={styles.formInput}
                        placeholder="Введите название устройства"
                        style={{ marginTop: '1rem' }}
                    />
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className={styles.formInput}
                        placeholder="Введите стоимость устройства"
                        type="number"
                        style={{ marginTop: '1rem' }}
                    />
                    <Form.Control
                        className={styles.formInput}
                        type="file"
                        onChange={selectedFile}
                        style={{ marginTop: '1rem' }}
                    />
                    <hr style={{ margin: '1rem 0' }} />
                    <Button
                        variant="outline-dark"
                        onClick={addInfo}
                        className={styles.btnOutlineDark}
                    >
                        Добавить новое свойство
                    </Button>
                    {info.map(i =>
                        <Row className={styles.infoRow} key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    placeholder="Введите название свойства"
                                    className={styles.formInput}
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    placeholder="Введите описание свойства"
                                    className={styles.formInput}
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeInfo(i.number)}
                                    variant="outline-danger"
                                    className={styles.btnOutlineDanger}
                                    style={{ width: '100%' }}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer className={styles.modalFooter}>
                <Button
                    variant="outline-danger"
                    onClick={() => { onHide(); resetForm(); }}
                    className={styles.btnOutlineDanger}
                >
                    Закрыть
                </Button>
                <Button
                    variant="outline-success"
                    onClick={saveDevice}
                    className={styles.btnOutlineSuccess}
                >
                    {editingDevice ? "Сохранить изменения" : "Добавить"}
                </Button>
            </Modal.Footer>
        </Modal>

    );
});

export default ModalDevice;
