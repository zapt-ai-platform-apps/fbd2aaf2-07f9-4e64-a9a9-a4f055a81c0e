import { For, Show } from 'solid-js';
import ApartmentCard from './ApartmentCard';

function ApartmentList(props) {
  return (
    <div>
      <Show when={props.apartments.length > 0} fallback={<p class="text-center text-gray-600">No apartments found.</p>}>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <For each={props.apartments}>
            {(apartment) => <ApartmentCard apartment={apartment} />}
          </For>
        </div>
      </Show>
    </div>
  );
}

export default ApartmentList;