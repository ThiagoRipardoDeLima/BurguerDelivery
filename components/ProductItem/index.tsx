import { Product } from '../../type/Product';
import Link from 'next/link';
import styles from './styles.module.css';
import { useAppContext } from '../../contexts/AppContext';
import { useFormatter } from '../../libs/useFormatter';

type Props = {
    data: Product;
}

export const ProductItem = ({ data }: Props) => {
    const { tenant } = useAppContext();
    const formatter  = useFormatter();

    let infoContainer = styles.info + ' ' + styles.colorName;

    return(
        <Link href={ `/${tenant?.slug}/product/${ data.id }` }>
            <a className={styles.container}>
                <div className={styles.head} style={{ backgroundColor: tenant?.secondColor }}></div>
                <div className={infoContainer}>
                    <div className={styles.img}>
                        <img src={ data.image } />
                    </div>
                    <div className={styles.categoryName}>{ data.categoryName }</div>
                    <div className={styles.name}>{ data.name }</div>
                    <div className={styles.price} style={{ color: tenant?.mainColor }} >{ formatter.formatPrice(data.price) }</div>
                </div>
            </a>
        </Link>
    );
}