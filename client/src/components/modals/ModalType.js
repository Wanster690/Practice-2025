import React, { useContext, useEffect, useState } from 'react';
import { Button, Dropdown, Form, Modal } from 'react-bootstrap';
import { createType, fetchTypes, updateType, deleteType } from '../../http/deviceAPI';
import { Context } from '../../index';
import styles from '../../styles/components/modals/ModalType.module.css';

const ModalType = ({ show, onHide }) => {
    const { device } = useContext(Context);
    const [name, setName] = useState('');
    const [selectedType, setSelectedType] = useState(null);

    useEffect(() => {
        if (show) fetchTypes().then(data => device.setTypes(data));
    }, [show, device]);

    const addType = () => {
        if (!name.trim()) return;
        createType({ name }).then(() => {
            setName('');
            setSelectedType(null);
            onHide();
        });
    };

    const handleUpdate = () => {
        if (!selectedType || !name.trim()) return;
        updateType(selectedType.id, name).then(() => {
            setName('');
            setSelectedType(null);
            onHide();
        });
    };

    const handleDelete = () => {
        if (!selectedType) return;
        const ok = window.confirm(
            `Удалить тип «${selectedType.name}»?\n` +
            'Все устройства этого типа останутся без категории.'
        );
        if (!ok) return;

        deleteType(selectedType.id).then(() => {
            setName('');
            setSelectedType(null);
            onHide();
        });
    };

    const chooseType = (type) => {
        setSelectedType(type);
        setName(type.name);
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Управление типами</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Dropdown className={styles.dropdown}>
                    <Dropdown.Toggle>
                        {selectedType ? selectedType.name : 'Выбрать тип'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {device.types.map(t =>
                            <Dropdown.Item key={t.id} onClick={() => chooseType(t)}>
                                {t.name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>

                <Form.Control
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Введите название типа"
                />
            </Modal.Body>

            <Modal.Footer>
                <Button variant="outline-success" onClick={addType}>Добавить</Button>
                <Button variant="outline-primary" onClick={handleUpdate} disabled={!selectedType}>Изменить</Button>
                <Button variant="outline-danger"  onClick={handleDelete} disabled={!selectedType}>Удалить</Button>
                <Button variant="outline-secondary" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalType;
