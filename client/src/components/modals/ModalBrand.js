import React, { useContext, useEffect, useState } from 'react';
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { createBrand, fetchBrands, updateBrand, deleteBrand } from "../../http/deviceAPI";
import { Context } from "../../index";
import styles from '../../styles/components/modals/ModalBrand.module.css';

const ModalBrand = ({ show, onHide }) => {
    const { device } = useContext(Context);
    const [name, setName] = useState('');
    const [selectedBrand, setSelectedBrand] = useState(null);

    useEffect(() => {
        if (show) {
            fetchBrands().then(data => device.setBrands(data));
            setName('');
            setSelectedBrand(null);
        }
    }, [device, show]);

    const addBrand = () => {
        if (!name.trim()) return;
        createBrand({ name }).then(() => {
            onHide();
        });
    };

    const handleUpdate = () => {
        if (!selectedBrand || !name.trim()) return;
        updateBrand(selectedBrand.id, name).then(() => {
            onHide();
        });
    };

    const handleDelete = () => {
        if (!selectedBrand) return;
        const confirmDelete = window.confirm(`Вы действительно хотите удалить бренд "${selectedBrand.name}"? Это действие нельзя будет отменить.`);
        if (!confirmDelete) return;
        deleteBrand(selectedBrand.id).then(() => {
            onHide();
        });
    };

    const handleSelect = (brand) => {
        setSelectedBrand(brand);
        setName(brand.name);
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            className={styles.modal}
            backdropClassName={styles.backdrop}
        >
            <Modal.Header closeButton className={styles.modalHeader}>
                <Modal.Title className={styles.modalTitle}>Управление брендами</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBody}>
                <Dropdown className={styles.dropdown}>
                    <Dropdown.Toggle variant="outline-primary" className={styles.dropdownToggle}>
                        {selectedBrand ? selectedBrand.name : "Выбрать бренд"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className={styles.dropdownMenu}>
                        {device.brands.map(brand =>
                            <Dropdown.Item
                                key={brand.id}
                                onClick={() => handleSelect(brand)}
                                active={selectedBrand && selectedBrand.id === brand.id}
                                className={styles.dropdownItem}
                            >
                                {brand.name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Form.Control
                    className={styles.formInput}
                    placeholder="Введите имя бренда"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </Modal.Body>
            <Modal.Footer className={styles.modalFooter}>
                <Button variant="success" onClick={addBrand} className={styles.button}>Добавить</Button>
                <Button variant="primary" onClick={handleUpdate} disabled={!selectedBrand} className={styles.button}>Изменить</Button>
                <Button variant="danger" onClick={handleDelete} disabled={!selectedBrand} className={styles.button}>Удалить</Button>
                <Button variant="secondary" onClick={onHide} className={styles.button}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalBrand;
