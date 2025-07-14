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
        fetchBrands().then(data => device.setBrands(data));
    }, [device, show]);

    const addBrand = () => {
        if (!name.trim()) return;
        createBrand({ name }).then(() => {
            setName('');
            setSelectedBrand(null);
            onHide();
        });
    };

    const handleUpdate = () => {
        if (!selectedBrand || !name.trim()) return;
        updateBrand(selectedBrand.id, name).then(() => {
            setName('');
            setSelectedBrand(null);
            onHide();
        });
    };

    const handleDelete = () => {
        if (!selectedBrand) return;
        const confirmDelete = window.confirm(`Вы действительно хотите удалить бренд "${selectedBrand.name}"? Это действие нельзя будет отменить.`)
        if (!confirmDelete) return;
        deleteBrand(selectedBrand.id).then(() => {
            setName('');
            setSelectedBrand(null);
            onHide();
        });
    };

    const handleSelect = (brand) => {
        setSelectedBrand(brand);
        setName(brand.name);
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Управление брендами</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Dropdown className={styles.dropdown}>
                    <Dropdown.Toggle>
                        {selectedBrand ? selectedBrand.name : "Выбрать бренд"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {device.brands.map(brand =>
                            <Dropdown.Item key={brand.id} onClick={() => handleSelect(brand)}>
                                {brand.name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Form.Control
                    placeholder="Введите имя бренда"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={addBrand}>Добавить</Button>
                <Button variant="outline-primary" onClick={handleUpdate} disabled={!selectedBrand}>Изменить</Button>
                <Button variant="outline-danger" onClick={handleDelete} disabled={!selectedBrand}>Удалить</Button>
                <Button variant="outline-secondary" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalBrand;
