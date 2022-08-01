import styles from '../../styles/Home.module.css';
import { GetServerSideProps } from 'next';
import { useApi } from '../../libs/useApi';
import { Tenant } from '../../type/Tenant';
import { useAppContext } from '../../contexts/AppContext';
import { useEffect } from 'react';
import { Header } from '../../components/Header';
import Head from 'next/head';

const Login = (data: Props) => {
    const { tenant, setTenant } = useAppContext();
    useEffect(()=>{
        setTenant(data.tenant);
    }, []);

    return(
        <div className={styles.container}>
            <Head>
                <title>Login | {data.tenant.name} </title>
            </Head>

            <Header />
        </div>
    );
}

export default Login;

type Props = {
    tenant: Tenant
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tenant: tenantSlug } = context.query;
    const api = useApi();

    const tenant = await api.getTenant(tenantSlug as string);
    if(!tenant){
        return { redirect: { destination: '/', permanent: false } }
    }

    return {
        props: {
            tenant
        }
    }
}