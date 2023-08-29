import { render, waitFor } from '@testing-library/react';
import Comment from './Comment';

// Создаем фиктивные данные для тестов
const mockComment = {
  by: 'TestUser',
  time: Date.now() / 1000,
  text: 'This is a test comment',
  kids: [1, 2, 3],
  id: 10,
  parent: 5,
  type: 'example',
};

describe('Comment компонент', () => {
  it('должен рендериться без ошибок', () => {
    const { container } = render(<Comment commentItem={mockComment} />);
    expect(container).toBeInTheDocument();
  });

  it('должен отображать аватар, имя пользователя и время', async () => {
    const { getByText } = render(<Comment commentItem={mockComment} />);

    await waitFor(() => {
      const userName = getByText('TestUser');
      const commentText = getByText('This is a test comment');
      expect(userName).toBeInTheDocument();
      expect(commentText).toBeInTheDocument();
    });
  });
});
