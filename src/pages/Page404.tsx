import { Link } from 'react-router-dom';
import './Page404.scss';

function ErrorPage() {
  return (
    <div className="error-page">
      <div className="error-page__block">
        <h1>Error 404</h1>
      </div>
      <h2>
        Страница не найдена. <Link to="/">Перейти на главную</Link>
      </h2>
    </div>
  );
}

export default ErrorPage;