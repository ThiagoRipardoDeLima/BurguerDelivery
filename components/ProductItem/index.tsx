import { Product } from '../../type/Product';
import Link from 'next/link';
import styles from './styles.module.css';

type Props = {
    data: Product;
    mainColor: string;
    secondColor: string;
}

export const ProductItem = ({ data, mainColor, secondColor }: Props) => {

    let infoContainer = styles.info + ' ' + styles.colorName;

    return(
        <Link href={ `/b7burger/product/${ data.id }` }>
            <a className={styles.container}>
                <div className={styles.head} style={{ backgroundColor: secondColor }}></div>
                <div className={infoContainer}>
                    <div className={styles.img}>
                        <img src={ data.image } />
                    </div>
                    <div className={styles.categoryName}>{ data.categoryName }</div>
                    <div className={styles.name}>{ data.name }</div>
                    <div className={styles.price} style={{ color: mainColor }} >{ data.price }</div>
                </div>
            </a>
        </Link>
    );
}