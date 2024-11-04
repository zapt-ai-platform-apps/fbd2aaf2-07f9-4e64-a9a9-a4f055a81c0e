import { createSignal } from 'solid-js';

function SearchForm(props) {
  const [location, setLocation] = createSignal('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location()) {
      props.onSearch(location());
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      props.loading = true;
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = `${position.coords.latitude},${position.coords.longitude}`;
        props.onSearch(coords);
      }, (error) => {
        console.error('Error getting location:', error);
        props.loading = false;
      });
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div class="mb-8">
      <form onSubmit={handleSubmit} class="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Enter city or zip code"
          value={location()}
          onInput={(e) => setLocation(e.target.value)}
          class="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          required
        />
        <button
          type="submit"
          class={`px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${props.loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={props.loading}
        >
          {props.loading ? 'Searching...' : 'Search'}
        </button>
        <button
          type="button"
          class={`px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${props.loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleUseCurrentLocation}
          disabled={props.loading}
        >
          {props.loading ? 'Locating...' : 'Use Current Location'}
        </button>
      </form>
    </div>
  );
}

export default SearchForm;