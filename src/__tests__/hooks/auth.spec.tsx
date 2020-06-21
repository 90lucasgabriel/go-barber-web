import { renderHook } from '@testing-library/react-hooks';

import { useAuth, AuthProvider } from '../../hooks/auth';

describe('Auth hook.', () => {
  it('should be able to signin.', () => {
    // Arrange
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const userData = {
      email: 'johndoe@example.com',
      password: '123456',
    };

    // Act
    result.current.signin(userData);

    // Assert
    expect(result.current.user.email).toEqual(userData.email);
  });
});
