import SearchForm from './components/SearchForm';

export default function Home() {
  return (
    <div className="flex bg-[url('/images/wallpaper-image.jpg')] bg-cover bg-center  min-h-screen justify-center items-center">
      <SearchForm />
    </div>
  );
}
