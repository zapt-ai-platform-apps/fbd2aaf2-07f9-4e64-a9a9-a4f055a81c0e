import { createSignal, onMount } from 'solid-js';
import { supabase } from './supabaseClient';
import { Show } from 'solid-js';
import Login from './components/Login';
import SearchForm from './components/SearchForm';
import ApartmentList from './components/ApartmentList';

function App() {
  const [user, setUser] = createSignal(null);
  const [currentPage, setCurrentPage] = createSignal('login');
  const [apartments, setApartments] = createSignal([]);
  const [loading, setLoading] = createSignal(false);

  const checkUserSignedIn = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      setCurrentPage('homePage');
    }
  };

  onMount(checkUserSignedIn);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCurrentPage('login');
  };

  supabase.auth.onAuthStateChange((_, session) => {
    if (session?.user) {
      setUser(session.user);
      setCurrentPage('homePage');
    } else {
      setUser(null);
      setCurrentPage('login');
    }
  });

  const searchApartments = async (location) => {
    setLoading(true);
    try {
      const response = await fetch('/api/getApartments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ location })
      });
      if (response.ok) {
        const data = await response.json();
        setApartments(data.apartments);
      } else {
        console.error('Error fetching apartments:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching apartments:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-gray-800">
      <Show
        when={currentPage() === 'homePage'}
        fallback={<Login />}
      >
        <div class="max-w-6xl mx-auto">
          <div class="flex justify-between items-center mb-8">
            <h1 class="text-4xl font-bold text-purple-600">Apartment Finder</h1>
            <button
              class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
          <SearchForm onSearch={searchApartments} loading={loading()} />
          <ApartmentList apartments={apartments()} />
        </div>
      </Show>
    </div>
  );
}

export default App;