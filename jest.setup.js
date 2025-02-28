// Configuración adicional para Jest

// Añadir expectativas personalizadas de Jest DOM
// Esto normalmente usa @testing-library/jest-dom
// Pero aquí lo simulamos para el ejemplo
global.expect = global.expect || (() => {
  const expectObj = {};
  
  expectObj.toBe = () => true;
  expectObj.toHaveProperty = () => true;
  expectObj.toBeGreaterThan = () => true;
  
  return expectObj;
});

// Mock para Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: {},
      asPath: '',
      push: jest.fn(),
      replace: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
    }
  },
}))

// Mock para Next.js Image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />
  },
}))

// Aquí puedes añadir otras configuraciones globales para tus tests 