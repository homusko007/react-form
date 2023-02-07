import _ from './Form.module.css';
import { useForm } from 'react-hook-form';
import {useEffect} from 'react';

export const Form = () => {
    const {
        register,
        handleSubmit,
        setFocus,
        reset,
        formState: { errors }
    } = useForm({
        mode: "onBlur", 
        defaultValues: {
          email: '',
          password: ''
        }
        });

    useEffect(() => {
        setFocus("email");
      }, [setFocus]);

    const onSubmit = (data) => {
        console.log(data);
        reset({  // сбросить форму после отправки
              email: '',
              password: '',
              save: false,
            })
    };

    return (
        <form className={_.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={_.wrap}>
                <label className={_.label} htmlFor='email'>Email</label>
                <input
                    className={_.input}
                    id='email'
                    {...register('email', {
                        required: {
                            value: true,
                            message: 'Введите в это поле',
                        },
                        pattern: {
                            value: /^.+@.+\..+$/,
                            message: 'Неверный email'
                        }
                    })}
                    type='text'
                    aria-invalid={!!errors.email}
                />
                {errors.email && <p className={_.error}>{errors.email.message}</p>}
            </div>

            <div className={_.wrap}>
                <label className={_.label} htmlFor='password'>Пароль</label>
                <input
                    className={_.input}
                    type='password'
                    id='password'
                    {...register('password', {
                        required: {
                            value: true,
                            message: 'Введите в это поле',
                        },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/,
                            message: 'Неверно введен пароль'
                        }
                    })}
                    aria-invalid={!!errors.password}
                />
                {errors.password && <p className={_.error}>{errors.password.message}</p>}
            </div>

            <div className={_.wrapCheckbox}>
                <input
                    className={_.checkbox}
                    type='checkbox'
                    id='save'
                    {...register('save')}
                />
                <label className={_.labelCheckbox} htmlFor='save'>Запомнить пароль</label>
            </div>
            <button className={_.submit} type='submit'>Войти</button>
        </form>
    )
}

/*export const Form = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailDirty, setEmailDirty] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [save, setSave] = useState(false);
    const [checkErrorForm, setCheckErrorForm] = useState(false);
    const [isPending, setIsPending] = useState(false);

const validEmail = (value) => {
    setEmailError(/^.+@.+\..+$/.test(value))
}

    const handleEmail = ({target}) => {
        setEmail(target.value);
        validEmail(target.value)
    };

    const validPassword = (value) => {
        setPasswordError(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/.test(value))
    } 

    const handlePassword = ({target}) => {
        setPassword(target.value);
        validPassword(target.value)
    };

    const handleSave = ({target}) => {
       setSave(target.checked) 
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!emailError || !passwordError) {
            setCheckErrorForm(true);
            return;
        }
        setIsPending(true);
        console.log({
            email,
            password,
            save
        });
    }

    return (
        <form className={_.form} onSubmit={handleSubmit}>
            <div className={_.wrap}>
                <label className={_.label} htmlFor='email'>Email</label>
                <input 
                className={_.input} 
                id='email' 
                name='email' 
                type='text'
                value={email}
                onChange={handleEmail}
                onBlur={() => {
                    setEmailDirty(true);
                }}
                disabled={isPending}               
                />
                {!emailError && emailDirty &&  <p className={_.error}>Сообщение об ошибке</p>}
            </div>

            <div className={_.wrap}>
                <label className={_.label} htmlFor='password'>Пароль</label>
                <input
                className={_.input}
                type='password'
                id='password'
                name='password'
                value={password}
                onChange={handlePassword}
                onBlur={() => {
                    setPasswordDirty(true);
                }} 
                disabled={isPending} 
                />
                {!passwordError && passwordDirty && <p className={_.error}>Сообщение об ошибке</p>}
            </div>

            <div className={_.wrapCheckbox}>
                <input
                className={_.checkbox} 
                type='checkbox' 
                id='save' 
                name='save'
                onChange={handleSave} 
                checked={save}
                disabled={isPending}  />
                <label className={_.labelCheckbox} htmlFor='save'>Запомнить пароль</label>
            </div>

            {isPending ? (
                <p className={_.pending}>Отправка</p>
            ) : (
                <button className={_.submit} type='submit'>Войти</button>)}
            {checkErrorForm && (!passwordError || emailError) && (
            <p className={_.errorSubmit}>Форма не заполнена</p>
            )}
        </form>
    )
}*/
