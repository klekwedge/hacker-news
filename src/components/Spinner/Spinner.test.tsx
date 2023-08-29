import { render } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner component', () => {
  it('должен рендериться без ошибок', () => {
    const { container } = render(<Spinner />);
    expect(container).toBeInTheDocument();
  });

  it('должен иметь класс "box"', () => {
    const { container } = render(<Spinner />);
    const boxElement = container.querySelector('.box');
    expect(boxElement).toBeInTheDocument();
  });

  it('должен иметь дочерний элемент с классом "loader"', () => {
    const { container } = render(<Spinner />);
    const loaderElement = container.querySelector('.loader');
    expect(loaderElement).toBeInTheDocument();
  });
});
