import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';

import { useAuth, AuthProvider } from '../../hooks/auth';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Auth hook.', () => {
  it('should be able to signin.', async () => {
    // Arrange
    const userData = {
      email: 'johndoe@example.com',
      password: '123456',
    };

    const apiResponse = {
      user: {
        id: 'user-123',
        name: 'John Doe',
        email: userData.email,
      },
      token: 'token-123',
    };

    apiMock.onPost('sessions').reply(200, apiResponse);
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    // Act
    result.current.signin(userData);
    await waitForNextUpdate();

    // Assert
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:token',
      apiResponse.token,
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(apiResponse.user),
    );
    expect(result.current.user.email).toEqual(apiResponse.user.email);
  });

  it('should restored saved data from storage when auth inits.', () => {
    // Arrange
    const storageResponse = {
      user: {
        id: 'user-123',
        name: 'John Doe',
        email: 'johndoe@example.com',
      },
      token: 'token-123',
    };

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@GoBarber:token':
          return storageResponse.token;
        case '@GoBarber:user':
          return JSON.stringify(storageResponse.user);
        default:
          return null;
      }
    });

    // Act and Assert
    expect(result.current.user.email).toEqual(storageResponse.user.email);
  });

  it('should be able to signout.', () => {
    // Arrange
    const storageResponse = {
      user: {
        id: 'user-123',
        name: 'John Doe',
        email: 'johndoe@example.com',
      },
      token: 'token-123',
    };

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@GoBarber:token':
          return storageResponse.token;
        case '@GoBarber:user':
          return JSON.stringify(storageResponse.user);
        default:
          return null;
      }
    });

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    // Act
    act(() => {
      result.current.signout();
    });

    // Assert
    expect(removeItemSpy).toBeCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });

  it('should be able to update user data.', () => {
    // Arrange
    const userData = {
      id: 'user-123',
      name: 'John Doe',
      email: 'johndoe@example.com',
      avatar_url: 'avatar.jpg',
    };

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    // Act
    act(() => {
      result.current.updateUser(userData);
    });

    // Assert
    expect(setItemSpy).toBeCalledWith(
      '@GoBarber:user',
      JSON.stringify(userData),
    );
    expect(result.current.user).toEqual(userData);
  });
});
