import React, { useContext, useState } from 'react';
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import styles from '../styles/pages/Auth.module.css';

const Auth = observer(() => {
    const { user } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();

    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            user.setUser(data);
            user.setIsAuth(true);
            navigate(SHOP_ROUTE);
        } catch (e) {
            alert(e.response?.data?.message || "Ошибка при входе/регистрации");
        }
    };

    return (
        <Container className={styles.container}>
            <Card className={styles.card}>
                <h2 className={styles.title}>{isLogin ? "Вход в аккаунт" : "Регистрация"}</h2>
                <Form className={styles.form}>
                    <Form.Control
                        className={styles.formControl}
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className={styles.formControl}
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className={styles.row}>
                        {isLogin ?
                            <div className={styles.linkText}>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрироваться!</NavLink>
                            </div>
                            :
                            <div className={styles.linkText}>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войти!</NavLink>
                            </div>
                        }
                        <Button
                            className={styles.authButton}
                            onClick={click}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
