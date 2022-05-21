import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../../components/Input';
import Button from '../../components/Button';
import * as S from './styles';

import { AuthContext } from '../../contexts/Auth/AuthContext';

const SignIn = () => {
  const auth = useContext(AuthContext);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validation)
  });

  let navigate = useNavigate();

  const login = async (data) => {
    try {
      const isLogged = await auth.signIn(data.email, data.password);

      if(isLogged)
        navigate('/home');
      else
        alert('Algo deu errado.');  
  
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <S.Container>
      <S.Content>
        <S.H1>Login</S.H1>
        <S.Form onSubmit={handleSubmit(login)}>
          <S.ContentFields>
            <Input
              type="email"
              name="email"
              placeholder="E-mail"
              ref={register('email')}
            />
            <S.labelError>{errors.email?.message}</S.labelError>
          </S.ContentFields>
          <S.ContentFields>
            <Input
              type="password"
              name="password"
              placeholder="Senha"
              ref={register('password')}
            />
            <S.labelError>{errors.password?.message}</S.labelError>
          </S.ContentFields>
          <Button Text="Entrar" Type="submit" />
          <S.LabelSignUp>
            Não tem um conta?
            <S.Strong>
              <Link to="/signUp">&nbsp;Registre-se.</Link>
            </S.Strong>
          </S.LabelSignUp>
        </S.Form>
      </S.Content>
    </S.Container>
  );
}

export default SignIn;

const validation = yup.object().shape({
  email: yup
    .string()
    .email('O campo e-mail é inválido.')
    .required('O campo e-mail é obrigatório.'),
  password: yup
    .string()
    .required('O campo senha é obrigatório.')
    .min(8, 'O campo senha deve ter ao menos 8 caracteres.')
});