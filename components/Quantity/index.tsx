import { useEffect, useState } from 'react';
import { useFormatter } from '../../libs/useFormatter';
import styles from './styles.module.css';

type Props = {
    color: string;
    count: number;
    onUpdateCount: (newCount: number) => void;
    min?: number;
    max?: number;
    small?: boolean;
}

export const Quantity = ( { color, count, onUpdateCount, min, max, small }:Props ) => {
    const [canRemove, setCanRemove] = useState(false);
    const [canAdd, setCanAdd] = useState(false);

    useEffect(()=>{
        setCanRemove((!min || (min && count > min)) ? true : false);
        setCanAdd((!max || (max && count < max)) ? true : false);
    }, [count, min, max]);

    const formatter = useFormatter();

    const handleRemove = () => {
        if(canRemove)
            onUpdateCount(--count);
    }

    const handleAdd = () => {
        if(canAdd)
            onUpdateCount(++count);
    }

    return (
        <div className={ styles.container }>
            <div 
                className={ styles.button }
                onClick={handleRemove}
                style={{
                    color: canRemove ? '#FFF' : '#96A3AB',
                    backgroundColor: canRemove ? color : '#F2F4F5',
                    width: small ? 42 : 48,
                    height: small ? 42 : 48
                }}
            >-</div>
            <div 
                className={ styles.qt }
                style={{ fontSize: small ? 16 : 18 }}
            >{ formatter.formatQuantity(count, 1)}</div>
            <div 
                className={ styles.button }
                onClick={handleAdd}
                style={{
                    color: canAdd ? '#FFF' : '#96A3AB',
                    backgroundColor: canAdd ? color : '#F2F4F5',
                    width: small ? 42 : 48,
                    height: small ? 42 : 48
                }}
            >+</div>
        </div>
    );
}