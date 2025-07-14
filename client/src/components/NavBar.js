import React, { useContext } from 'react';
import { Context } from "../index";
import { NavLink, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { FaUserShield, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import styles from '../styles/components/NavBar.module.css';

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token');
    };

    return (
        <nav className={styles.navbar}>
            <NavLink to={SHOP_ROUTE} className={styles.logo}>
                Wanste<span>Store</span>
            </NavLink>

            <div className={styles.controls}>
                {user.isAuth ? (
                    <>
                        <button
                            className={styles.navButton}
                            onClick={() => navigate(ADMIN_ROUTE)}
                        >
                            <FaUserShield className={styles.icon} />
                            Админ
                        </button>
                        <button
                            className={styles.navButton}
                            onClick={logOut}
                        >
                            <FaSignOutAlt className={styles.icon} />
                            Выйти
                        </button>
                    </>
                ) : (
                    <button
                        className={styles.navButton}
                        onClick={() => navigate(LOGIN_ROUTE)}
                    >
                        <FaSignInAlt className={styles.icon} />
                        Авторизация
                    </button>
                )}
            </div>
        </nav>
    );
});

export default NavBar;
