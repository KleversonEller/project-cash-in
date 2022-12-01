import notFound from '../images/404-not-found.gif';

function NotFound() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <img className="h-2/6 w-2/6" src={notFound} alt="Imagem 404 not found" />
    </div>
  );
}

export default NotFound;
