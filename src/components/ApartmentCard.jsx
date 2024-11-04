function ApartmentCard(props) {
  const handleContact = () => {
    // Implement contact action here
    alert(`Thank you for your interest in ${props.apartment.name}! We will contact you soon.`);
  };

  return (
    <div class="bg-white p-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
      <img
        src={props.apartment.image || 'PLACEHOLDER'}
        alt={props.apartment.name}
        class="w-full h-40 object-cover rounded-lg mb-4"
        data-image-request="modern apartment building"
      />
      <h3 class="text-xl font-bold text-purple-600 mb-2">{props.apartment.name}</h3>
      <p class="text-gray-700 mb-2">{props.apartment.address}</p>
      <p class="text-gray-700 mb-4">Specials: {props.apartment.specials || 'None'}</p>
      <button
        class="w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
        onClick={handleContact}
      >
        Contact Me
      </button>
    </div>
  );
}

export default ApartmentCard;