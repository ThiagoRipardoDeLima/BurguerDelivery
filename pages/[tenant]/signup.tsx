import styles from '../../styles/SignUp.module.css';
import Head from 'next/head';
import Link from 'next/link';

import { GetServerSideProps } from 'next';
import { useApi } from '../../libs/useApi';
import { Tenant } from '../../type/Tenant';
import { useAppContext } from '../../contexts/AppContext';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';
import { useRouter } from 'next/router';

const Login = (data: Props) => {
    const { tenant, setTenant } = useAppContext();
    const router = useRouter();

    useEffect(()=>{
        setTenant(data.tenant);
    }, []);
    
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {};
    const handleSignUp = () => {
        router.push(`/${data.tenant.slug}/signup`);
    };

    return(
        <div className={styles.container}>
            <Head>
                <title>Cadastro | {data.tenant.name} </title>
            </Head>

            <Header color={ data.tenant.mainColor } backHref={ `/${ data.tenant.slug }/login` } />

            <div className={ styles.header }> { data.tenant.name } </div>
            <div 
                className={ styles.subtitle }
                style={{ borderBottomColor: data.tenant.mainColor }}
            >
                Preencha os campos para criar o seu cadastro.
            </div>
            <div className={ styles.line }></div>

            <div className={ styles.formArea }>

                <div className={ styles.inputArea }>
                    <InputField 
                        color={ data.tenant.mainColor }
                        placeholder="Digite seu nome"
                        value={nome}
                        onChange={setNome}
                    />
                </div>

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
                        label="Cadastrar"
                        onClick={ handleSubmit }
                        fill
                    />
                </div>

            </div>

            <div className={ styles.forgetArea }>
                Já tem cadastro? <Link href={`/${data.tenant.slug}/login`}><a style={{ color: data.tenant.mainColor }}>Fazer Login</a></Link>
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