/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable arrow-body-style */
// eslint-disable-next-line no-use-before-define
import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import { bankTypes } from '../../../constants/cardBanks';
import FORM_KEY from '../../../constants/keys';
import Input from '../../atoms/Input/Input';
import Card from '../../molecules/Card/Card';
import Modal from '../../molecules/Modal/Modal';
import BankSelector from '../../organisms/CardRegisterForm/BankSelector/BankSelector';
import InputContainer from '../../molecules/InputContainer/InputContainer';
import CardRegisterNumberInputs from '../../organisms/CardRegisterForm/RegisterNumberInputs/RegisterNumberInputs';
import CardRegisterButtons from '../../organisms/CardRegisterForm/RegisterButtons/RegisterButtons';

const StyledForm = styled.form`
  float: center;
  min-width: 22em;
  max-width: 30em;
  background-color: #fff;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.25);
  border-radius: 1rem;
  margin: 3rem auto;
  padding: 2rem;
`;

const InlineBlockDiv = styled.div`
  display: inline-block;
  width: 50%;
`;

type CardRegisterFormProps = {
  className?: string,
};

type valueObjType = {
  [key: string]: string,
};

type modalContentType = 'BankSelector' | 'VirtualKeyboard';

const CardRegisterForm = ({ className }: CardRegisterFormProps) => {
  // eslint-disable-next-line no-unused-vars
  const [isModalDisplayed, setIsModalDisplayed] = useState(false);
  const [modalContent, setModalContent] = useState<modalContentType>('BankSelector');
  const [values, setValues] = useState<valueObjType>({
    [FORM_KEY.CARD_BANK]: '',
    [FORM_KEY.CARD_NUMBER]: '',
    [FORM_KEY.CARD_NUMBER_FIRST]: '',
    [FORM_KEY.CARD_NUMBER_SECOND]: '',
    [FORM_KEY.CARD_NUMBER_THIRD]: '',
    [FORM_KEY.CARD_NUMBER_FOURTH]: '',
    [FORM_KEY.CARD_EXPIRATION]: '',
    [FORM_KEY.CARD_CVC]: '',
    [FORM_KEY.CARD_OWNER]: '',
    [FORM_KEY.CARD_PASSWORD_FIRST]: '',
    [FORM_KEY.CARD_PASSWORD_SECOND]: '',
  });

  type refObjType = {
    [key: string]: React.RefObject<any>;
  };

  const refs: refObjType = {
    [FORM_KEY.CARD_NUMBER_FIRST]: useRef<HTMLInputElement>(null),
    [FORM_KEY.CARD_NUMBER_SECOND]: useRef<HTMLInputElement>(null),
    [FORM_KEY.CARD_NUMBER_THIRD]: useRef<HTMLInputElement>(null),
    [FORM_KEY.CARD_NUMBER_FOURTH]: useRef<HTMLInputElement>(null),
    [FORM_KEY.CARD_EXPIRATION]: useRef<HTMLInputElement>(null),
    [FORM_KEY.CARD_CVC]: useRef<HTMLInputElement>(null),
    [FORM_KEY.CARD_OWNER]: useRef<HTMLInputElement>(null),
    [FORM_KEY.CARD_PASSWORD_FIRST]: useRef<HTMLInputElement>(null),
    [FORM_KEY.CARD_PASSWORD_SECOND]: useRef<HTMLInputElement>(null),
    [FORM_KEY.SUBMIT_BUTTON]: useRef<HTMLButtonElement>(null),
  };

  const handleCardNumberChange = (event: React.ChangeEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    if (value.length > 4) {
      return;
    }
    if (value.length === 4) {
      if (name === FORM_KEY.CARD_NUMBER_FIRST) {
        refs[FORM_KEY.CARD_NUMBER_SECOND].current?.focus();
      } else if (name === FORM_KEY.CARD_NUMBER_SECOND) {
        setValues({ ...values, [name]: value });
        setModalContent('BankSelector');
        setIsModalDisplayed(true);
      } else if (name === FORM_KEY.CARD_NUMBER_THIRD) {
        refs[FORM_KEY.CARD_NUMBER_FOURTH].current?.focus();
      } else if (name === FORM_KEY.CARD_NUMBER_FOURTH) {
        refs[FORM_KEY.CARD_EXPIRATION].current?.focus();
      }
    }
    setValues({ ...values, [name]: value });
  };

  const handleBankClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const { dataset } = event.target as HTMLDivElement;
    setValues({ ...values, [FORM_KEY.CARD_BANK]: dataset.name! });
    setIsModalDisplayed(false);
    refs[FORM_KEY.CARD_NUMBER_THIRD].current?.focus();
  };

  const handleExpirationChange = (event: React.ChangeEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    if (value.length > 5) {
      return;
    } if (value.length === 2 && values[name].length === 1) {
      setValues({ ...values, [name]: `${value}/` });
      return;
    } if (value.length === 3 && values[name].length === 2) {
      setValues({ ...values, [name]: `${value.substr(0, 2)}/${value[2]}` });
      return;
    } if (value.length === 3 && values[name].length === 4) {
      setValues({ ...values, [name]: value.substr(0, 2) });
      return;
    } if (value.length === 5) {
      refs[FORM_KEY.CARD_CVC].current?.focus();
    }
    setValues({ ...values, [name]: value });
  };

  const handleCVCChange = (event: React.ChangeEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    if (value.length > 3) {
      return;
    } if (value.length === 3) {
      refs[FORM_KEY.CARD_OWNER].current?.focus();
    }
    setValues({ ...values, [name]: value });
  };

  const handleOwnerNameChange = (event: React.ChangeEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    setValues({ ...values, [name]: value });
  };

  const handlePasswordChange = (event: React.ChangeEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    if (value.length > 1) {
      return;
    }
    if (name === FORM_KEY.CARD_PASSWORD_FIRST) {
      refs[FORM_KEY.CARD_PASSWORD_SECOND].current?.focus();
    } else {
      setIsModalDisplayed(false);
      refs[FORM_KEY.SUBMIT_BUTTON].current?.focus();
    }
    setValues({ ...values, [name]: value });
  };

  const handleDiscedFocus = () => {
    setModalContent('VirtualKeyboard');
    setIsModalDisplayed(true);
  };

  const handleNonDiscedFocus = () => {
    setIsModalDisplayed(false);
  };

  const isPositiveIntWithLen = (len: number, ...arr: string[]): boolean => {
    const isPositiveInt: RegExp = new RegExp(`^[0-9]{${len}}$`);
    return (
      arr.every((str: string) => (isPositiveInt.test(str)))
    );
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isPositiveIntWithLen(4, values[FORM_KEY.CARD_NUMBER_FIRST],
      values[FORM_KEY.CARD_NUMBER_THIRD], values[FORM_KEY.CARD_NUMBER_FOURTH])) {
      // TODO: 에러 UI 표시
      return;
    } if (!isPositiveIntWithLen(3, values[FORM_KEY.CARD_CVC])) {
      // TODO: 에러 UI 표시
      return;
    } if (!isPositiveIntWithLen(2, values[FORM_KEY.CARD_EXPIRATION].substr(0, 2),
      values[FORM_KEY.CARD_EXPIRATION].substr(3))) {
      // TODO: 에러 UI 표시
      return;
    } if (!isPositiveIntWithLen(1, values[FORM_KEY.CARD_PASSWORD_FIRST],
      values[FORM_KEY.CARD_PASSWORD_SECOND])) {
      // TODO: 에러 UI 표시
      // eslint-disable-next-line no-useless-return
      return;
    }
    // TODO: 제출 처리
  };

  const renderCardNumbers = () => {
    const disced3 = String().padEnd(values[FORM_KEY.CARD_NUMBER_THIRD].length, '*');
    const disced4 = String().padEnd(values[FORM_KEY.CARD_NUMBER_FOURTH].length, '*');
    return `${values[FORM_KEY.CARD_NUMBER_FIRST]} ${values[FORM_KEY.CARD_NUMBER_SECOND]} ${disced3} ${disced4}`;
  };

  return (
    <StyledForm className={className}>
      <Modal
        className="card-register__modal"
        display={isModalDisplayed}
        // eslint-disable-next-line no-unused-expressions
        onBackgroundClick={() => { modalContent === 'BankSelector' ? null : setIsModalDisplayed(false); }}
        // TODO: 이벤트리스너 설정
      >
        {(modalContent === 'BankSelector'
          ? (<BankSelector className="card-register__bank-selector" onClick={handleBankClick} />)
          : ('Virtual Keyboard'))}
      </Modal>
      <Card
        className="card-register__card-preview"
        numbers={renderCardNumbers()}
        owner={values[FORM_KEY.CARD_OWNER]}
        bankName={values[FORM_KEY.CARD_BANK] as bankTypes}
        expiration={values[FORM_KEY.CARD_EXPIRATION]}
      />
      <CardRegisterNumberInputs
        classNames={{
          container: 'card-register__input-container--card-number',
          input: 'card-register__input--card-number',
          span: 'card-register__span--card-number',
        }}
        label="카드 번호"
        values={values}
        refs={refs}
        onChange={handleCardNumberChange}
        onFocus={handleDiscedFocus}
      />
      <InlineBlockDiv>
        <label htmlFor="card-expiration">카드 유효기간</label>
        <InputContainer className="card-register__input-container--card-expiration">
          <Input
            className="card-register__input--card-expiration"
            name={FORM_KEY.CARD_EXPIRATION}
            value={values[FORM_KEY.CARD_EXPIRATION]}
            onChange={handleExpirationChange}
            onFocus={handleNonDiscedFocus}
            placeholder="MM/YY"
            ref={refs[FORM_KEY.CARD_EXPIRATION]}
            required
          />
        </InputContainer>
      </InlineBlockDiv>
      <InlineBlockDiv>
        <label htmlFor="card-cvc">뒷면 보안코드 3자리</label>
        <InputContainer className="card-register__input-container--card-cvc">
          <Input
            className="card-register__input--card-cvc"
            type="number"
            name={FORM_KEY.CARD_CVC}
            value={values[FORM_KEY.CARD_CVC]}
            placeholder="CVC"
            onChange={handleCVCChange}
            onFocus={handleDiscedFocus}
            ref={refs[FORM_KEY.CARD_CVC]}
            required
          />
        </InputContainer>
      </InlineBlockDiv>
      <br />
      <label htmlFor="card-owner">카드 소유자 이름</label>
      <InputContainer className="card-register__input-container--card-owner">
        <Input
          className="card-register__input--card-owner"
          type="text"
          name={FORM_KEY.CARD_OWNER}
          value={values[FORM_KEY.CARD_OWNER]}
          onChange={handleOwnerNameChange}
          onFocus={handleNonDiscedFocus}
          placeholder="카드에 표시된 이름과 동일하게 입력하세요"
          ref={refs[FORM_KEY.CARD_OWNER]}
          required
        />
      </InputContainer>
      <label>
        비밀번호 앞 2자리
        <br />
        <InputContainer className="card-register__input-container--card-password" key="card-password__1">
          <Input
            className="card-register__input--card-password"
            type="password"
            name={FORM_KEY.CARD_PASSWORD_FIRST}
            value={values[FORM_KEY.CARD_PASSWORD_FIRST]}
            onChange={handlePasswordChange}
            onFocus={handleDiscedFocus}
            ref={refs[FORM_KEY.CARD_PASSWORD_FIRST]}
            required
          />
        </InputContainer>
        <InputContainer className="card-register__input-container--card-password" key="card-password__2">
          <Input
            className="card-register__input--card-password"
            type="number"
            name={FORM_KEY.CARD_PASSWORD_SECOND}
            value={values[FORM_KEY.CARD_PASSWORD_SECOND]}
            onChange={handlePasswordChange}
            onFocus={handleDiscedFocus}
            ref={refs[FORM_KEY.CARD_PASSWORD_SECOND]}
            required
          />
        </InputContainer>
        * *
      </label>
      <CardRegisterButtons
        classNames={{
          submit: 'card-register__button--submit',
          cancel: 'card-register__button--cancel',
        }}
        refs={refs}
        onSubmit={handleSubmit}
        onCancel={() => {}}
      />
    </StyledForm>
  );
};

CardRegisterForm.defaultProps = {
  className: '',
};

export default CardRegisterForm;