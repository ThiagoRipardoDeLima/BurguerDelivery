import styles from '../../styles/Login.module.css';
import Head from 'next/head';
import Link from 'next/link';

import { GetServerSideProps } from 'next';
import { useApi } from '../../libs/useApi';
import { Tenant } from '../../type/Tenant';
import { useAppContext } from '../../contexts/app';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';
import { useRouter } from 'next/router';
import { useAuthContext } from '../../contexts/auth';

const Login = (data: Props) => {
    const { tenant, setTenant } = useAppContext();
    const { setToken, setUser, user } = useAuthContext();
    const router = useRouter();

    useEffect(()=>{
        setTenant(data.tenant);
    }, []);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        setToken('1234');
        setUser({
            name: 'Thiago Ripardo',
            email: 'thiago.ripardo.86@gmail.com'
        });

        router.push(`/${data.tenant.slug}`);
    };

    const handleSignUp = () => {
        router.push(`/${data.tenant.slug}/signup`);
    };

    return(
        <div className={styles.container}>
            <Head>
                <title>Login | {data.tenant.name} </title>
            </Head>

            <Header color={ data.tenant.mainColor } backHref={ `/${ data.tenant.slug }` } />

            <div className={ styles.header }> { data.tenant.name } </div>
            <div 
                className={ styles.subtitle }
                style={{ borderBottomColor: data.tenant.mainColor }}
            >
                Use suas credenciais para realizar o login.
            </div>
            <div className={ styles.line }></div>

            <div className={ styles.formArea }>

                <div className={ styles.inputArea }>
                    <InputField 
                        color={ data.tenant.mainColor }
                        placeholder="Digite seu email"
                        value={email}
                        onChange={setEmail}
                    />
                </div>

                <div className={ styles.inputArea }>
                    <InputField 
                        color={ data.tenant.mainColor }
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={setPassword}
                        password
                    />
                </div>

                <div className={ styles.inputArea }>
                    <Button
                        color={data.tenant.mainColor}
                        label="Entrar"
                        onClick={ handleSubmit }
                        fill
                    />
                </div>

            </div>

            <div 
                className={ styles.forgetArea }
                style={{ borderBottomColor: data.tenant.mainColor }}
            >
                Esqueceu sua senha? <Link href={`/${data.tenant.slug}/forget`}><a style={{ color: data.tenant.mainColor }}>Clique aqui</a></Link>
            </div>
            <div className={ styles.line }></div>
            
            <div className={ styles.signupArea }>
                <Button
                    color={data.tenant.mainColor}
                    label="Quero me cadastrar"
                    onClick={ handleSignUp }
                />
            </div>
            
        </div>
    );
}

export default Login;

type Props = {
    tenant: Tenant
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tenant: tenantSlug } = context.query;
    const api = useApi(tenantSlug as string);

    const tenant = await api.getTenant();
    if(!tenant){
        return { redirect: { destination: '/', permanent: false } }
    }

    return {
        props: {
            tenant
        }
    }
}