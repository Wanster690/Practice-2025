import React, { useContext, useEffect, useState } from 'react';
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { createType, fetchTypes, updateType, deleteType } from "../../http/deviceAPI";
import { Context } from "../../index";
import styles from '../../styles/components/modals/ModalType.module.css';

const ModalType = ({ show, onHide }) => {
    const { device } = useContext(Context);
    const [name, setName] = useState('');
    const [selectedType, setSelectedType] = useState(null);

    useEffect(() => {
        if (show) {
            fetchTypes().then(data => device.setTypes(data));
            setName('');
            setSelectedType(null);
        }
    }, [device, show]);

    const addType = () => {
        if (!name.trim()) return;
        createType({ name }).then(() => {
            onHide();
        });
    };

    const handleUpdate = () => {
        if (!selectedType || !name.trim()) return;
        updateType(selectedType.id, name).then(() => {
            onHide();
        });
    };

    const handleDelete = () => {
        if (!selectedType) return;
        const confirmDelete = window.confirm(`Вы действительно хотите удалить тип "${selectedType.name}"? Это действие нельзя будет отменить.`);
        if (!confirmDelete) return;
        deleteType(selectedType.id).then(() => {
            onHide();
        });
    };

    const handleSelect = (type) => {
        setSelectedType(type);
        setName(type.name);
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
                <Modal.Title className={styles.modalTitle}>Управление типами</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBody}>
                <Dropdown className={styles.dropdown}>
                    <Dropdown.Toggle variant="outline-primary" className={styles.dropdownToggle}>
                        {selectedType ? selectedType.name : "Выбрать тип"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className={styles.dropdownMenu}>
                        {device.types.map(type =>
                            <Dropdown.Item
                                key={type.id}
                                onClick={() => handleSelect(type)}
                                active={selectedType && selectedType.id === type.id}
                                className={styles.dropdownItem}
                            >
                                {type.name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Form.Control
                    className={styles.formInput}
                    placeholder="Введите имя типа"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </Modal.Body>
            <Modal.Footer className={styles.modalFooter}>
                <Button variant="success" onClick={addType} className={styles.button}>Добавить</Button>
                <Button variant="primary" onClick={handleUpdate} disabled={!selectedType} className={styles.button}>Изменить</Button>
                <Button variant="danger" onClick={handleDelete} disabled={!selectedType} className={styles.button}>Удалить</Button>
                <Button variant="secondary" onClick={onHide} className={styles.button}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalType;
