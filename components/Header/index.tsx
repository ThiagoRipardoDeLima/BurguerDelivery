import style from './styles.module.css';
import BackIcon from './backIcon.svg';
import { useAppContext } from '../../contexts/app';
import Link from 'next/link';

type Props = {
    backHref: string,
    color: string,
    title?: string,
    subtitle?: string;
    invert?: boolean
}

export const Header = ( { backHref, color, title, subtitle, invert }: Props ) => {

    return(
        <div className={ style.container }>
            <div className={ style.leftSide }>
                <Link href={backHref}>
                    <a className={invert ? style.buttonTransparent : ''}>
                        <BackIcon color={ invert ? "#FFF" : color} />
                    </a>                        
                </Link>
            </div>
            <div className={ style.centerSide }>
                {title && <div 
                    className={ style.title }
                    style={{ color: invert ? "#FFF" : "#1B1B1B" }}
                > {title} </div>}
                {subtitle && <div className={ style.subtitle }> {subtitle} </div>}
            </div>
            <div className={ style.rightSide }>...</div>
        </div>
    );
}