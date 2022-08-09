import styles from '../../styles/ForgetSendMail.module.css';
import Head from 'next/head';

import { GetServerSideProps } from 'next';
import { useApi } from '../../libs/useApi';
import { Tenant } from '../../type/Tenant';
import { useAppContext } from '../../contexts/AppContext';
import { useEffect } from 'react';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { useRouter } from 'next/router';
import { Icon } from '../../components/Icon';

const ForgetSendMail = (data: Props) => {
    const { tenant, setTenant } = useAppContext();
    const router = useRouter();

    useEffect(()=>{
        setTenant(data.tenant);
    }, []);

    const handleSubmit = () => {
        router.push(`/${data.tenant.slug}/login`);
    };

    return(
        <div className={styles.container}>
            <Head>
                <title>Esqueci a senha | {data.tenant.name} </title>
            </Head>

            <Header color={ data.tenant.mainColor } backHref={ `/${ data.tenant.slug }/login` } />

            <div className={ styles.iconArea}>
                <Icon icon={'sendMail'} color={data.tenant.mainColor} width={99} height={81} />
            </div>

            <div className={ styles.title }>Verifique seu e-mail</div>

            <div className={ styles.subtitle } >
                Enviamos as instruções para recuperação de senha para o seu e-mail.
            </div>

            <div className={ styles.formArea }>

                <div className={ styles.inputArea }>
                    <Button
                        color={data.tenant.mainColor}
                        label="Fazer Login"
                        onClick={ handleSubmit }
                        fill
                    />
                </div>

            </div>
            
        </div>
    );
}

export default ForgetSendMail;

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