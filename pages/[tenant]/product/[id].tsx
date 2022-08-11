import styles from '../../../styles/Product-id.module.css';
import { GetServerSideProps } from 'next';
import { useApi } from '../../../libs/useApi';
import { Tenant } from '../../../type/Tenant';
import { useAppContext } from '../../../contexts/AppContext';
import { useEffect } from 'react';
import { Product } from '../../../type/Product';
import Head from 'next/head';
import { Header } from '../../../components/Header';

const Product = (data: Props) => {
    const { tenant, setTenant } = useAppContext();

    useEffect(()=>{
        setTenant(data.tenant);
    }, []);

    return(
        <div className={styles.container}>
            <Head>
                <title>{data.product.name} | {data.tenant.name}</title>
            </Head>

            <div className={ styles.headerArea }>
                <Header 
                    color={data.tenant.mainColor}
                    backHref={`/${data.tenant.slug}`}
                    title='Produto'
                    invert
                />
            </div>
            <div className={ styles.headerBg } style={{ backgroundColor: data.tenant.mainColor }}></div>
            <div className={ styles.productImage }>
                <img src={data.product.image} />
            </div>
        </div>
        
        

    );
}

export default Product;

type Props = {
    tenant: Tenant
    product: Product
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tenant: tenantSlug, id } = context.query;
    const api = useApi(tenantSlug as string);

    const tenant = await api.getTenant();
    if(!tenant){
        return { redirect: { destination: '/', permanent: false } }
    }

    const product = await api.getProduct(id as string);

    return {
        props: {
            tenant,
            product
        }
    }
}