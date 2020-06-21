import { renderHook } from '@testing-library/react-hooks';
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
});
