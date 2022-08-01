import style from './styles.module.css';
import backIcon from './backIcon.svg';

export const Header = () => {
    return(
        <div className={ style.container }>
            <div className={ style.leftSide }></div>
            <div className={ style.centerSide }></div>
            <div className={ style.rightSide }></div>
        </div>
    );
}