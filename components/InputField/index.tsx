import { useState } from 'react';
import styles from './styles.module.css';
import EyeOn from './EyeOn.svg';
import EyeOff from './EyeOff.svg';

type Props = {
    color: string;
    placeholder: string;
    value: string;
    password?: boolean;
    onChange: (newValue: string) => void;
}

export const InputField = ( { color, placeholder, value, password, onChange }:Props ) => {
    
    const [showPassword, setShowPassword] = useState(false);
    const [focused, setFocused] = useState(false);

    return(
        <div 
            className={ styles.container }
            style={{ 
                borderColor: focused ? color : '#F9F9FB',
                backgroundColor: focused ? '#FFF' : '#F9F9FB'
            }}
        >
            <input 
                type= { password ? (showPassword ? 'text' : 'password' ) : 'text' }
                className={ styles.input }
                placeholder= { placeholder }
                value= { value }
                onChange= { e => onChange(e.target.value) }
                onFocus= {() => setFocused(true) }
                onBlur= {()=> setFocused(false) }
            />
            { password &&
                <div 
                    className={ styles.showPassword }
                    onClick={ () => setShowPassword(!showPassword) }
                >
                    { showPassword && <EyeOn color="#BBB" /> }
                    { !showPassword && <EyeOff color="#BBB" /> }
                </div>
            }
            
        </div>
    );
}