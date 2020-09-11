import React, { useCallback, useRef, useContext } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { ThemeContext } from 'styled-components'

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useToast } from '../../hooks/toast';

import BackgroundSlider from 'react-background-slider'

import bg1 from '../../assets/backgrounds/bg-be_the_hero1.jpg'
import bg2 from '../../assets/backgrounds/bg-be_the_hero2.jpg'
import bg3 from '../../assets/backgrounds/bg-be_the_hero3.jpg'
import bg4 from '../../assets/backgrounds/bg-be_the_hero4.jpg'

import logoImg from '../../assets/logo/be_the_hero.png'

import { Container, Content, AnimationContainer } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

interface BackgroundImage {
  images: string[];
  duration: number;
  transition: number;
}

const SignUp: React.FC = () => {
  const { logo } = useContext(ThemeContext)

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('/users', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu logon no GoBarber!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na cadastro',
          description: 'Ocorreu um error ao fazer cadastro, tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <BackgroundSlider
          images={[bg1, bg2, bg3, bg4]}
          duration={10} transition={2} />        
          <Content>
          <AnimationContainer>
            <img src={logoImg} alt="BeTheHero" />

            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Faça seu cadastro</h1>

              <Input name="name" icon={FiUser} placeholder="Nome" />

              <Input name="email" icon={FiMail} placeholder="E-mail" />

              <Input
                name="password"
                icon={FiLock}
                type="password"
                placeholder="Senha"
              />

              <Button type="submit">Cadastrar</Button>
            </Form>

            <Link to="/"
              style={{fontWeight: 'bold'}}>
              <FiArrowLeft />
              Voltar para logon
            </Link>
          </AnimationContainer>
        </Content>
    </Container>
  );
};

export default SignUp;
