import styles from '../../styles/Login.module.css';
import Head from 'next/head';

import { GetServerSideProps } from 'next';
import { useApi } from '../../libs/useApi';
import { Tenant } from '../../type/Tenant';
import { useAppContext } from '../../contexts/AppContext';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';

const Login = (data: Props) => {
    const { tenant, setTenant } = useAppContext();

    useEffect(()=>{
        setTenant(data.tenant);
    }, []);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = () => {};

    return(
        <div className={styles.container}>
            <Head>
                <title>Login | {data.tenant.name} </title>
            </Head>

            <Header color={ data.tenant.mainColor } backHref={ `/${ data.tenant.slug }` } />

            <InputField 
                color={ data.tenant.mainColor }
                placeholder="Digite seu email"
                value={email}
                onChange={setEmail}
            />

            <InputField 
                color={ data.tenant.mainColor }
                placeholder="Digite sua senha"
                value={password}
                onChange={setPassword}
                password
            />

            <Button
                color={data.tenant.mainColor}
                label="Entrar"
                onClick={ handleSubmit }
                fill
             />

            <Button
                color={data.tenant.mainColor}
                label="Entrar"
                onClick={ handleSubmit }
             />
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