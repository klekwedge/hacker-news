import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import News from './News';

// Создаем фиктивные данные для тестов
const mockNews = {
  title: 'Test News',
  url: 'https://example.com',
  by: 'Test Author',
  id: 5,
  type: 'example',
  descendants: 10,
  score: 42,
  time: Date.now() / 1000,
  kids: [1, 2, 3], // Пример идентификаторов комментариев
};

describe('News component', () => {
  it('должен рендериться без ошибок', () => {
    const { container } = render(<News currentNews={mockNews} />);
    expect(container).toBeInTheDocument();
  });

  it('должен отображать заголовок и другую информацию', async () => {
    const { getByText } = render(<News currentNews={mockNews} />);

    await waitFor(() => {
      const title = getByText('Test News');
      const author = getByText('Author: Test Author');
      const score = getByText('Score: 42');
      const comments = getByText('Comments: loading...');

      expect(title).toBeInTheDocument();
      expect(author).toBeInTheDocument();
      expect(score).toBeInTheDocument();
      expect(comments).toBeInTheDocument();
    });
  });
});
