import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import Input from '../../components/Input';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

describe('Input Component', () => {
  it('should be able to render an input.', () => {
    // Arrange
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    // Act and Assert
    expect(getByPlaceholderText('E-mail')).toBeTruthy();
  });

  it('should render highlight on input focus.', async () => {
    // Arrange
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElement = getByPlaceholderText('E-mail');
    const containerElement = getByTestId('input-container');

    // Act
    fireEvent.focus(inputElement);

    // Assert
    await wait(() => {
      expect(containerElement).toHaveStyle('border-color: #FF9000');
      expect(containerElement).toHaveStyle('color: #FF9000');
    });
  });

  it('should remove highlight on input blur.', async () => {
    // Arrange
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElement = getByPlaceholderText('E-mail');
    const containerElement = getByTestId('input-container');

    // Act
    fireEvent.focus(inputElement);
    fireEvent.blur(inputElement);

    // Assert
    await wait(() => {
      expect(containerElement).not.toHaveStyle('border-color: #FF9000');
      expect(containerElement).not.toHaveStyle('color: #FF9000');
    });
  });

  it('should keep border highlight when input filled.', async () => {
    // Arrange
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElement = getByPlaceholderText('E-mail');
    const containerElement = getByTestId('input-container');

    // Act
    fireEvent.change(inputElement, {
      target: { value: 'johndoe@example.com' },
    });
    fireEvent.blur(inputElement);

    // Assert
    await wait(() => {
      expect(containerElement).toHaveStyle('color: #FF9000');
    });
  });
});
