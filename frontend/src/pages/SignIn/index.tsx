import React, { useRef, useCallback, useContext } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { ThemeContext } from 'styled-components'

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import BackgroundSlider from 'react-background-slider'

import bg1 from '../../assets/backgrounds/bg-be_the_hero1.jpg'
import bg2 from '../../assets/backgrounds/bg-be_the_hero2.jpg'
import bg3 from '../../assets/backgrounds/bg-be_the_hero3.jpg'
import bg4 from '../../assets/backgrounds/bg-be_the_hero4.jpg'

import logoImg from '../../assets/logo/be_the_hero.png'

import { Container, Content, AnimationContainer } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { logo } = useContext(ThemeContext)

  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha é obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description:
            'Ocorreu um error ao fazer login, cheque as credenciais.',
        });
      }
    },
    [signIn, addToast, history],
  );

  return (
    <Container>
      <BackgroundSlider
        images={[bg1, bg2, bg3, bg4]}
        duration={10} transition={2} />
        <Content>
          <AnimationContainer>
            <img src={logoImg} alt="YouPlace" />
            
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Faça seu logon</h1>

              <Input name="email" icon={FiMail} placeholder="E-mail" />

              <Input
                name="password"
                icon={FiLock}
                type="password"
                placeholder="Senha"
              />

              <Button type="submit">Entrar</Button>

              <Link to="/forgot-password">Esqueci minha senha</Link>
            </Form>

            <Link to="/signup"
              style={{fontWeight: 'bold'}}>
              <FiLogIn />
              Criar conta
            </Link>
          </AnimationContainer>
        </Content>
    </Container>
  );
};

export default SignIn;
