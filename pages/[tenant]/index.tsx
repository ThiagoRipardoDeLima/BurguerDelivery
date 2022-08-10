import styles from '../../styles/Home.module.css';
import { SearchInput } from '../../components/SearchInput';
import { Banner } from '../../components/Banner';
import { ProductItem } from '../../components/ProductItem';
import { GetServerSideProps } from 'next';
import { useApi } from '../../libs/useApi';
import { Tenant } from '../../type/Tenant';
import { useAppContext } from '../../contexts/AppContext';
import { useEffect, useState } from 'react';
import { Product } from '../../type/Product';

const Home = (data: Props) => {
    const { tenant, setTenant } = useAppContext();

    useEffect(()=>{
        setTenant(data.tenant);
    }, []);

    const [products, setProducts] = useState<Product[]>(data.products);

    const handleSearch = (searchValue: string) => {
        console.log(searchValue);
    }

    return(
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerTop}>
                    <div className={styles.headerTopLeft}>
                        <div className={styles.headerTitle}>Seja Bem Vindo (a) 👋</div>
                        <div className={styles.headerSubTitle}>O que deseja para hoje?</div>
                    </div>
                    <div className={styles.headerTopRight}>
                        <div className={styles.menuButton}>
                            <div className={styles.menuButtonLine} style={{ backgroundColor: tenant?.mainColor }}></div>
                            <div className={styles.menuButtonLine} style={{ backgroundColor: tenant?.mainColor }}></div>
                            <div className={styles.menuButtonLine} style={{ backgroundColor: tenant?.mainColor }}></div>
                        </div>    
                    </div>
                </div>
                <div className={styles.headerBottom}>
                    <SearchInput onSearch={handleSearch} />
                </div>
            </header>

            <Banner />

            <div className={styles.grid}>
                {products.map((item, index) => (
                    <ProductItem 
                        key={index}
                        data={item}
                    />
                ))}
            </div>

        </div>
        

    );
}

export default Home;

type Props = {
    tenant: Tenant
    products: Product[]
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tenant: tenantSlug } = context.query;
    const api = useApi(tenantSlug as string);

    const tenant = await api.getTenant();
    if(!tenant){
        return { redirect: { destination: '/', permanent: false } }
    }

    const products = await api.getAllProducts();

    return {
        props: {
            tenant,
            products
        }
    }
}