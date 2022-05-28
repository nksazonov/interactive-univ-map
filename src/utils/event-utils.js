export function getLocationId(event) {
	return event.currentTarget.id;
}

export function getLocationName(event) {
	return event.currentTarget.attributes.name.value;
}

export function getLocationSelected(event) {
	return event.currentTarget.attributes['aria-checked'].value === 'true';
}