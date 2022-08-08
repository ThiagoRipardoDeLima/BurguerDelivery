import style from './styles.module.css';
import BackIcon from './backIcon.svg';
import { useAppContext } from '../../contexts/AppContext';
import Link from 'next/link';

type Props = {
    backHref: string,
    color: string,
    title?: string,
    subtitle?: string;
}

export const Header = ( { backHref, color, title, subtitle }: Props ) => {

    //const tenant = useAppContext();

    //console.log(tenant);

    return(
        <div className={ style.container }>
            <div className={ style.leftSide }>
                <Link href={backHref}>
                    <BackIcon color={color} />
                </Link>
            </div>
            <div className={ style.centerSide }>
                {title && <div className={ style.title }> {title} </div>}
                {subtitle && <div className={ style.subtitle }> {subtitle} </div>}
            </div>
            <div className={ style.rightSide }>...</div>
        </div>
    );
}