import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { ListGroup } from "react-bootstrap";
import styles from "../styles/components/TypeBar.module.css";

const TypeBar = observer(() => {
    const { device } = useContext(Context);

    return (
        <ListGroup>
            <ListGroup.Item
                className={`${styles.item} ${!device.selectedType.id ? styles.active : ""}`}
                onClick={() => device.setSelectedType({})}
            >
                Все типы
            </ListGroup.Item>
            {device.types.map((type) => (
                <ListGroup.Item
                    key={type.id}
                    className={`${styles.item} ${device.selectedType.id === type.id ? styles.active : ""}`}
                    onClick={() => device.setSelectedType(type)}
                >
                    {type.name}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
});

export default TypeBar;
