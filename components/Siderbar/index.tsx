import { useRouter } from 'next/router';
import { useAuthContext } from '../../contexts/auth';
import { Tenant } from '../../type/Tenant';
import { Button } from '../Button';
import { SiderbarMenuItem } from '../SiderbarMenuItem';
import styles from './styles.module.css';

type Props = {
    tenant: Tenant;
    open: boolean;
    onClose: () => void
}

export const Siderbar = ({ tenant, open, onClose }:Props) => {

    const { user, setToken } = useAuthContext();

    const router = useRouter();

    return (
        <div 
            className={styles.container}
            style={{ width: open ? '100vw' : '' }}
        >
            <div className={styles.area}>

                <div className={styles.header}>
                    <div 
                        className={styles.loginArea}
                        style={{ borderBottomColor: tenant.mainColor }}
                    >
                        {user &&
                            <div className={styles.userInfo}>
                                <strong>{user.name}</strong>
                                Último pedido há x semanas
                            </div>
                        }

                        {!user &&
                            <Button 
                                color={tenant.mainColor}
                                label="Fazer login"
                                onClick={()=>{ router.push(`/${tenant.slug}/login`) }}
                                fill
                            />
                        }
                    </div>
                    <div 
                        className={styles.closeBtn}
                        style={{ color: tenant.mainColor }}
                        onClick={onClose}
                    >x</div>
                </div>

                <div className={styles.line}></div>

                <div className={styles.menu}>
                    <SiderbarMenuItem 
                        color={'#6A7D8B'}
                        icon='menu'
                        label='Cardápio'
                        onClick={onClose}
                    />

                    <SiderbarMenuItem 
                        color={'#6A7D8B'}
                        icon='cart'
                        label='Sacola'
                        onClick={() => router.push(`/${tenant.slug}/cart`) }
                    />

                    <SiderbarMenuItem 
                        color={'#6A7D8B'}
                        icon='fav'
                        label='Favoritos'
                        onClick={() => {}}
                        disabled
                    />

                    <SiderbarMenuItem 
                        color={'#6A7D8B'}
                        icon='order'
                        label='Meus Pedidos'
                        onClick={() => router.push(`/${tenant.slug}/orders`) }
                    />

                    <SiderbarMenuItem 
                        color={'#6A7D8B'}
                        icon='config'
                        label='Configurações'
                        onClick={() => {}}
                        disabled
                    />

                </div>

                <div className={styles.menuButton}>
                    { user &&
                        <SiderbarMenuItem 
                        color={'#6A7D8B'}
                        icon='logout'
                        label='Sair'
                        onClick={() => {
                            setToken('');
                            onClose();
                        }}
                        />
                    }
                </div>

            </div>
        </div>
    );
}